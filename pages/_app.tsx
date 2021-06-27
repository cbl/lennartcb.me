
import { useEffect } from 'react'
import Head from "next/head";
import React from "react";
import { AppProps } from "next/app";
import useDarkMode from "../hooks/theme";
import "prismjs/themes/prism-tomorrow.css";
import "../styles/app.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const theme = useDarkMode();

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} {...theme} />
        </>
    );
}

export default MyApp;