import "../styles/app.css";

import Head from "next/head";
import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from 'next-themes'
import "prismjs/themes/prism-tomorrow.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider attribute="class">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;