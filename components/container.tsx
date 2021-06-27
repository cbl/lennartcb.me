import { FunctionComponent } from 'react';
import Head from "next/head";
import Header from './header';
import { useRouter } from 'next/router';

type ContainerProps = {
    meta?: {
        title?: string,
        description?: string,
        image?: string,
        type?: string,
    }
}

const Main: FunctionComponent<ContainerProps> = ({ children, meta }) => {
    const router = useRouter();

    const _meta = {
        title: 'Lennart Carstens-Behrens',
        description: `Software developer, IT-Systems enthusiast, Zimmermann.`,
        image: 'https://lennartcb.me/static/images/banner.png',
        type: 'website',
        ...meta
    };

    return (
        <>
            <Head>
                <title>{_meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={_meta.description} name="description" />
                <meta property="og:url" content={`https://lennartcb.me${router.asPath}`} />
                <link rel="canonical" href={`https://lennartcb.me${router.asPath}`} />
                <meta property="og:type" content={_meta.type} />
                <meta property="og:site_name" content="Lee Robinson" />
                <meta property="og:description" content={_meta.description} />
                <meta property="og:title" content={_meta.title} />
                <meta property="og:image" content={_meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@lennartcb" />
                <meta name="twitter:title" content={_meta.title} />
                <meta name="twitter:description" content={_meta.description} />
                <meta name="twitter:image" content={_meta.image} />
            </Head>
            <Header />
            <main className="px-10 lg:pl-16 py-14 max-w-4xl mx-auto">
                

                {children}
            </main>
        </>
    );
    
}

export default Main;