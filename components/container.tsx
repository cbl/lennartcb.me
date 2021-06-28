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
        description: `Software developer, IT-Systems enthusiast, Carpenter.`,
        image: 'https://lennartcb.me/static/images/banner.jpg',
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
                <meta property="og:site_name" content="Lennart Carstens-Behrens" />
                <meta property="og:description" content={_meta.description} />
                <meta property="og:title" content={_meta.title} />
                <meta property="og:image" content={_meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@lennartcb" />
                <meta name="twitter:title" content={_meta.title} />
                <meta name="twitter:description" content={_meta.description} />
                <meta name="twitter:image" content={_meta.image} />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-200667548-1"></script>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `                    
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        gtag('config', 'UA-200667548-1');
                    `
                    }}
                />
            </Head>
            <Header />
            <main className="px-10 lg:pl-16 py-14 max-w-4xl mx-auto">
                

                {children}
            </main>
        </>
    );
    
}

export default Main;