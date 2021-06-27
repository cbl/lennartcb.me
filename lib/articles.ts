import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const articlesDirectory = join(process.cwd(), 'articles');

export type Meta = {
    title: string,
    description: string,
    date: string
}

export type Article = {
    slug: string,
    meta: Meta,
    content: string
}

export function getArticleBySlug(slug: string): Article {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(articlesDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data as Meta, content };
}

export function getAllArticles() {
    const slugs = fs.readdirSync(articlesDirectory);
    const articles = slugs.map((slug) => getArticleBySlug(slug));

    return articles;
}
