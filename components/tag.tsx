import { FunctionComponent } from 'react';
let classNames = require('classnames');

type TagProps = {
    name: string,
    className?: string
}

const Tag: FunctionComponent<TagProps> = ({ name, className }) => (
    <div className={classNames({
        'inline-block text-xs px-3 rounded-full py-1': true,
        'bg-red-400 text-red-900': name == 'laravel',
        'bg-indigo-400 text-indigo-900': name == 'PHP',
        'bg-orange-400 text-orange-900': name == 'Java',
        'bg-cyan-700 text-cyan-100': name == 'TypeScript',
        'bg-sky-400 text-sky-900': name == 'React',
        'bg-green-300 text-green-900': name == 'Vue',
        className: true
    })}>
        {name}
    </div>
)

export default Tag;