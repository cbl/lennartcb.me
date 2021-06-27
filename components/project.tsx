import { FunctionComponent } from 'react';
import Tag from './tag';

type ProjectProps = {
    link: string,
    title: string,
    tags?: string[]
};

const Project: FunctionComponent<ProjectProps> = ({ link, title, children, tags = [] }) => (
    <div className="space-y-2 xl:space-y-0 xl:items-baseline">
        <div className="space-y-5 xl:col-span-3">
            <h2 className="text-2xl font-bold mb-4">
                <a href={link} target="_blank">{title}</a>
            </h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((name) => (
                    <Tag name={name} key={name} />
                ))}
            </div>
            <div className="prose dark:prose-dark max-w-full">
                {children}
            </div>
            <div className="mt-4">
                <a href={link} target="_blank" className="mt-4 text-blue-500 flex">
                    Check it out →
                </a>
            </div>
        </div>

    </div>
)

export default Project;