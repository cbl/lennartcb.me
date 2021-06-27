---
title: "Runtime (Big O) Of Laravel's One-Of-Many Relationship"
description: "Determining the runtime (Big O) of laravel's new one-of-many relationship."
date: 'June 26, 2021'
---

# Runtime (Big O) Of Laravel's One-Of-Many Relationship

## Introduction

Recently, I made a pull request on GitHub to the laravel framework ([laravel/framework#37362](https://github.com/laravel/framework/pull/37362)) to add a solution for creating **one-to-one** relations that are a subsequence of a larger **one-to-many** relationships.

In this article I am going to explain the generated sql query and the runtime (Big O) of the implementation. The goal is to provide a better understanding of what is going on under the hood and how performance improvements can be made if necessary.

## The Problems

First, I will explain the problems that a sql query must solve in order to cover all possible use cases. To picture the problems I will use the following example: A user has many **logins** but only one **latest login**.

### Eager Loading

Laravel's **Eager Loading** provides a convinient way to eliminate "N+1" query problems when loading relationships for multiple models. It loads all necessary relations in a separate query. Given the case the related logins for all users with the ids **1,2,3,4 and 5** are needed, the query would look like this:

```sql
select * from logins where logins.user_id in (1,2,3,4,5)
```

Retrieving all `latestLogin`'s for each create a `greates-n-per-group` problem - there is a whole section on [stackoverflow](https://stackoverflow.com/questions/tagged/greatest-n-per-group?tab=Votes) which deals with this kind of queries.

### Querying Relationship Existence

The implementation must also work when creating existence queries, where constraints are added to a subquery, e.g. to filter models for which a certain relation exists. Let's say we want to load all users who last logged in on a mobile device:

```php
User::whereHas('latestLogin', function($query){
    $query->where('device', 'mobile');
});
```

Eloquent adds a and existence constraint to the user query so the generated query would look like this:

```sql
select * from users
where exists (
    select * from logins
    where logins.user_id = users.id
    and logins.device = 'mobile'
)
```

However, this query invites all users who have already logged in on a mobile device.

### Selects

The last problem that needs to be solved is that eloquent overrides selects when retrieving results like this:

```php
$user->latestLogin()->select('device')->exists(); // device will not be selected
```

This means that no subselect can be added as in the following example:

```sql
select *, (select * from logins where ...) from users
```

## Two Approaches

To solve all three problems described above, I have found two solutions. One uses a subselect and one uses an inner join. Here are the pull requests for both implementations:

-   inner join approach: [framework/pull#37362](https://github.com/laravel/framework/pull/37362)
-   subselect approach: [framework/pull#37252](https://github.com/laravel/framework/pull/37252)

As will be shown later, the inner join approach is much faster.

### Subselect Approach

First I briefly show the subselect query. Here, for each login, it is checked whether there is a login with the same id and the same user_id that is the last login orderd by id:

```sql
select *
from logins
where exists (
	select (
		select latest_login.id
		from logins AS latest_login
		where latest_login.user_id = logins.user_id
		order by id desc
		limit 1
	) as latest_login_id
	where latest_login_id = logins.id
)
```

In order to get information about the runtime, `explain analyze` can be performed on the query:

```sql
explain analyze select * from ...
```

The following shows the result for 4 users with 25 logins each.

```sql
-> Filter: exists(select #2)  (cost=10.25 rows=100)
    -> Table scan on logins  (cost=10.25 rows=100)
    -> Select #2 (subquery in condition; dependent)
        -> Limit: 1 row(s)
            -> Filter: (latest_login_id = logins.id)
                -> Rows fetched before execution  (cost=0.00..0.00 rows=1)
                -> Select #3 (subquery in condition; dependent)
                    -> Limit: 1 row(s)  (cost=2.76 rows=1)
                        -> Sort: latest_login.id DESC, limit input to 1 row(s) per chunk  (cost=2.76 rows=25)
                            -> Index lookup on latest_login using logins_user_id_index (user_id=logins.user_id)
        -> Select #3 (subquery in projection; dependent)
            -> Limit: 1 row(s)  (cost=2.76 rows=1)
                -> Sort: latest_login.id DESC, limit input to 1 row(s) per chunk  (cost=2.76 rows=25)
                    -> Index lookup on latest_login using logins_user_id_index (user_id=logins.user_id)
```

We can see, that all existing logins are selected. The runtime of the query is therefore `O(m)` where **m** is the total number of logins.

### Inner Join Approach

The query filters the intersection of the relation joined with itself using an inner join:

```sql
select *
from logins
inner join (
    select MAX(id) as id
    from logins
    group by logins.user_id
) as latest_login
on latest_login.id = logins.id
```

Running `explain format=tree` on the query (again 4 users with 25):

```sql
-> Nested loop inner join  (cost=4.81 rows=5)
    -> Filter: (latest_login.id is not null)  (cost=2.21..3.06 rows=5)
        -> Table scan on latest_login  (cost=0.51..2.56 rows=5)
            -> Materialize  (cost=2.51..4.56 rows=5)
                -> Index range scan on logins using index_for_group_by(logins_user_id_index)  (cost=1.50 rows=5)
    -> Single-row index lookup on logins using PRIMARY (id=latest_login.id)  (cost=0.27 rows=1)
```

Unlike the subselect approach, only the required logins are selected here. Here the runtime is `O(n)` where **n** is the number of aggregates or users in this case.

The runtime can be described in three different ways:

-   **Best Case**: The number of aggregates is reduced. This means that only the latest logins for a certain number, which is smaller than the total number of users, are selected. Here **n** is a constant that can be neglected for big O, so the runtime is `O(1)`.
-   **Worst Case**: The number of aggregates is not reduced. So the latest logins are selected for all users. Here the runtime is `O(n)`.
-   **Expected Case**: Both cases, the best case and the worst case, can occur. The best case occurs, for example, for eager loading, where the aggregates are limited to a collection of users. The worst case occurs when querying relationship existence. E.g.: all users who last logged in on a mobile device are selected. Here the number of aggregates is not reduced.

### Comparing Both Approaches

In order to compare the worst case of the inner join (`O(n)`) approach with the runtime of the subselect approach (`O(m)`), one has to take a look at the parameters `n` and `m`. `n` as the number of aggregates is in almost all cases much smaller than `m` and in no case larger. To relate this to our example, the total number of users is less than or equal to the total number of logins, whereas it can be assumed that the number of users is much smaller.

So it can be said that `O(n) < O(m)`.

## Improving Performance

We know that the worst case can be avoided by reducing the number of aggregates. In most, this can be done with eloquent. Heres how...

Given the case that bookings have many states but only one current state. The current state is the last added entry. The schema looks like this:

```
bookings
- id
- created_at

booking_states
- id
- booking_id
- state
```

Let's say we want to load all bookings that have the current state "successfull" that where created today. This could be done like this:

```php
Booking::whereHas('currentState', function($q) {
    $q->where('state', 'successfull');
})->whereBetween('created_at', [
    now()->startOfDay(),
    now()->endOfDay(),
]);
```

The resulted sql query has the runtime `O(n)`. As described before, the runtime can be improved by reducing the number of aggregates in the inner join clause. For this purpose, the constraint that filters the bookings for today can be used:

```php
Booking::whereHas('currentState', function($q) {
    $q->where('state', 'successfull');

    // Get the sub query builder instance.
    $subQuery = $q->getOneOfManySubQuery();

    // Add an existence query to the sub query.
    $subQuery->whereHas('booking', function($bookingQuery) {

        // Reduce the number of aggregates.
        $query->whereBetween('created_at', [
            now()->startOfDay(),
            now()->endOfDay(),
        ]);
    });
});
```

Now the runtime is <code>O(n<span class="sub">t</span>)</code> where <strong>n<span class="sub">t</span></strong> is the number of bookings that where created today.
