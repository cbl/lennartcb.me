import Head from "next/head";
import { FunctionComponent } from "react";
import Header from '../components/header';
import Container from '../components/container';

const IndexPage: FunctionComponent = (props) => (
    <>
        <Head>
            <title>Hello - Lennart Carstens-Behrens</title>
        </Head>
        <Header {...props} />
        <Container>
            <div className="xl:flex justify-between gap-10">
                <div className="mb-10 xl:mb-0 flex xl:block justify-around">
                    <img className="rounded-full w-64 xl:w-24" src="https://avatars.githubusercontent.com/u/29352871?v=4" />
                </div>

                <div className="flex-grow prose dark:prose-dark">
                    <h1>Hello!</h1>
                    <h2>My name is Lennart Carstens-Behrens.</h2>
                    <p>
                        I'm a informatics student at the <a href="https://www.htwk-leipzig.de/de/startseite/">Htwk Leipzig</a> and a developer at the <a href="https://aw-studio.de">Alle Wetter</a> Studio for Design and Development.
                        I spend my free time working on Open-Source projects, learning about IT-Systems or exploring the lakes around Leipzig.
                    </p>
                    <p>
                        Besides software development, I like to build things with wood.
                    </p>
                </div>
            </div>
        </Container>
    </>
);

export default IndexPage;
