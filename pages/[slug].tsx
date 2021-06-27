import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Container from '../components/container'
import Header from '../components/header'
import { getAllArticles, getArticleBySlug, Meta } from '../lib/articles';
import markdownToHtml from '../lib/markdown';

type ArticleProps = {
    meta: Meta,
    content: string,
}

const Article: NextPage<ArticleProps> = ({ meta, content, ...props }) => {
    if(!meta) {
        return <></>;
    }

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
                    as="script"
                />
                <link
                    href={`https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css`}
                    rel="stylesheet"
                />
            </Head>
            <Container meta={meta}>
                <article className="prose dark:prose-dark" dangerouslySetInnerHTML={{ __html: content as string }} />
            </Container>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const article = getArticleBySlug(params.slug as string);
    const content = await markdownToHtml(article.content || '');

    return {
        props: {
            ...article,
            content,
            slug: params.slug
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const articles = getAllArticles();

    return {
        paths: articles.map((article) => {
            return {
                params: {
                    slug: article.slug
                }
            };
        }),
        fallback: true
    };
}

export default Article;