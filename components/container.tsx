import { FunctionComponent } from 'react';

const Container: FunctionComponent = ({ children }) => (
    <main className="px-10 lg:pl-16 py-14 max-w-4xl mx-auto">
        {children}
    </main>
)

export default Container;