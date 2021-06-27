import {
    useEffect,
    useState,
    useCallback
} from "react";


function useDarkMode() {
    const [isDark, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if ('theme' in localStorage) {
            setDarkMode(localStorage.theme == 'dark' ? true : false);
        } else {
            setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(isDark ? 'dark' : 'light');
        localStorage.theme = isDark ? 'dark' : 'light';
    }, [isDark])


    const toggleDarkMode = useCallback(() => {
        setDarkMode(!isDark);
    }, [isDark, setDarkMode]);

    return { isDark, setDarkMode, toggleDarkMode };
};


export default useDarkMode;