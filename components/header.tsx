import Head from "next/head";
import { FunctionComponent } from 'react';

type HeaderProps = {
    isDark?: boolean,
    toggleDarkMode?: () => void
}

const Header: FunctionComponent<HeaderProps> = ({ isDark = false, toggleDarkMode = null }) => (
    <>
        <header className="lg:flex top-0 z-30 mx-auto h-20 max-w-4xl px-10 lg:px-0 pt-10 pb-32 lg:pb-20 lg:pt-20 justify-between">
            {typeof toggleDarkMode === 'function' &&
                <button
                    className="mb-6 lg:mb-0 mt-1 bg-blueGray-200 active:bg-blueGray-300 text-blueGray-800 dark:bg-blueGray-800 dark:active:bg-blueGray-700 dark:text-white w-9 h-9 rounded flex items-center justify-around"
                    onClick={toggleDarkMode}
                >
                    {isDark &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    }
                    {!isDark &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    }
                </button>
            }
            <div className="flex-grow lg:ml-7 h-20 flex flex-wrap items-center">
                <a href="/">
                    <h1 className="text-3xl text-blueGray-600 dark:text-blueGray-400 font-semibold">
                        lennartcb
                    </h1>
                </a>
                <div className="flex justify-between w-full">
                    <nav className="text-lg font-medium">
                        <ul className="flex gap-x-4 text-blue-500">
                            <li className="active:text-blue-600">
                                <a href="/articles">Articles</a>
                            </li>
                            <li className="active:text-blue-600">
                                <a href="/projects">Projects</a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="text-blueGray-600 dark:text-blueGray-400 inline-flex space-x-2">
                        <a href="https://twitter.com/lennartcb" target="_blank">
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" /></svg>
                        </a>
                        <a href="https://github.com/cbl" target="_blank">
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" /></svg>
                        </a>
                        <a href="mailto:lennart.carbe@gmail.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    </>
)


export default Header;