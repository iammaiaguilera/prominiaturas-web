/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['"Unbounded"', 'sans-serif'],
                'display': ['"Unbounded"', 'sans-serif'],
            },
            colors: {
                'pm-green': '#D5EC2C',
                'pm-green-dark': '#9ED800',
                'pm-purple': '#C59BFD',
                'pm-purple-dark': '#591DCC',
                'pm-cream': '#FBFCEB',
                'pm-dark': '#191B32',
                'pm-kontigo': '#FF7400',
            }
        },
    },
    plugins: [],
}
