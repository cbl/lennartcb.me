import Head from "next/head";
import { getAllArticles, Article } from '../lib/articles';
import { NextPage } from "next";
import ReactMarkdown from 'react-markdown'
import Container from '../components/container'
import Header from '../components/header';

type ArticlesProps = {
    articles: Article[],
}

const Articles: NextPage<ArticlesProps> = ({ articles, ...props }) => (
    <>
        <Head>
            <title>Articles - Lennart Carstens-Behrens</title>
        </Head>
        <Header {...props} />
        <Container>
            <div className="">
                <ul className="border-t border-b border-blueGray-200 dark:border-blueGray-600 divide-y divide-blueGray-200 dark:divide-blueGray-600 text-gray-700 dark:text-blueGray-200">
                    {(articles).map((article, i) => (
                        <li className="py-10" key={i}>
                            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                                <dl>
                                    <dt className="sr-only">Published On</dt>
                                    <dd>
                                        <time dateTime={new Date(article.meta.date).toISOString()}>{article.meta.date}</time>
                                    </dd>
                                </dl>
                                <div className="space-y-5 xl:col-span-3">
                                    <h2 className="text-2xl font-bold"><a href={`/${article.slug}`}>{article.meta.title}</a></h2>
                                    <div className="prose dark:prose-dark">
                                        <ReactMarkdown>{article.meta.description}</ReactMarkdown>
                                    </div>
                                    <a href={`/${article.slug}`} className="mt-4 text-blue-500 flex">
                                        Read more →
                                    </a>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    </>
)

Articles.getInitialProps = () => ({ articles: getAllArticles() })

export default Articles;
