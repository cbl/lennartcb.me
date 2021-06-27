const colors = require('tailwindcss/colors');
const typographyStyles = require('@tailwindcss/typography/src/styles');

const typo = (theme) => typographyStyles(theme).DEFAULT.css;

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    purge: {
        enabled: true,
        content: [
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}',
        ],
        options: {
            safelist: ['dark'],
        },
    },
    theme: {
        typography: (theme) => ({
            DEFAULT: {
                css: [
                    {
                        ...typo(theme)[0],
                        a: {
                            color: theme('colors.blue.500'),
                            textDecoration: 'underline',
                            fontWeight: '500',
                        },
                        'ol > li::before': {
                            content:
                                'counter(list-item, var(--list-counter-style, decimal)) "."',
                            position: 'absolute',
                            fontWeight: '400',
                            color: theme('colors.blueGray.500'),
                        },
                        'ul > li::before': {
                            content: '""',
                            position: 'absolute',
                            backgroundColor: theme('colors.blueGray.300'),
                            borderRadius: '50%',
                        },
                        pre: {
                            backgroundColor: theme('colors.blueGray.700'),
                            color: theme('colors.gray.200'),
                            overflowX: 'auto',
                        },
                    },
                    typo(theme)[1],
                    typo(theme)[2],
                ],
            },
            dark: {
                css: {
                    color: theme('colors.blueGray.200'),
                    a: {
                        color: theme('colors.blue.500'),
                    },
                    'h1, h2, h3, h4, h5, h6': {
                        color: theme('colors.white'),
                    },
                    strong: {
                        color: theme('colors.blueGray.100'),
                    },
                    'ol > li::before': {
                        color: theme('colors.blueGray.500'),
                    },
                    'ul > li::before': {
                        backgroundColor: theme('colors.blueGray.500'),
                    },
                    pre: {
                        backgroundColor: theme('colors.blueGray.800'),
                    },
                    'p > code, li > code': {
                        color: theme('colors.blueGray.400'),
                    },
                    blockquote: {
                        color: theme('colors.blueGray.200'),
                        borderLeftColor: theme('colors.blueGray.500'),
                    },
                },
            },
        }),
        extend: {
            colors,
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active', 'dark', 'dark-active'],
            textColor: ['active', 'dark'],
            typography: ['dark'],
        },
    },
    plugins: [
        require('@tailwindcss/typography')({
            modifiers: [],
        }),
    ],
};
