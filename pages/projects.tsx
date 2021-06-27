import Head from "next/head";
import { NextPage } from "next";
import ReactMarkdown from 'react-markdown'
import Container from '../components/container'
import Header from '../components/header';
import Project from '../components/project'

type ProjectsProps = {
    //
}

const Projects: NextPage<ProjectsProps> = ({ ...props }) => (
    <>
        <Head>
            <title>Projects - Lennart Carstens-Behrens</title>
        </Head>
        <Header {...props} />
        <Container>
            <div className="">
                <ul className="max-w-2xl border-t border-b border-blueGray-200 dark:border-blueGray-600 divide-y divide-blueGray-200 dark:divide-blueGray-600 text-gray-700 dark:text-blueGray-200">
                    <li className="py-10">
                        <Project
                            link="https://github.com/macramejs"
                            title="macramejs"
                            tags={['TypeScript', 'React', 'Vue']}
                        >
                            Comming soon...
                        </Project>
                    </li>
                    <li className="py-10">
                        <Project
                            link="https://github.com/cbl/algorithm-analyzer"
                            title="algorithm-analyzer"
                            tags={['Java']}
                        >
                            A tool to analyze various sorting algorithms, graphs or binary trees. The repository contains implementations for algorithms that where taught in the <i>Sommersemester 2021</i> at the Htwk Leipzig.
                        </Project>
                    </li>
                    <li className="py-10">
                        <Project
                            link="https://github.com/aw-studio/laravel-states"
                            title="laravel-states"
                            tags={['PHP', 'laravel']}
                        >
                            An event-sourcing approach for a finite state machine to keep track of state changes in laravel.
                        </Project>
                    </li>
                    <li className="py-10">
                        <Project
                            link="https://litstack.io/"
                            title="litstack"
                            tags={['PHP', 'laravel', 'Vue']}
                        >
                            A package for building Admin-Interfaces that help maintaining the data of laravel applications. The framework includes an intuitive interface and the tools needed to manage Users, Models and free Forms for Pages, Settings etc.
                        </Project>
                    </li>
                </ul>
            </div>
        </Container>
    </>
)

export default Projects;
