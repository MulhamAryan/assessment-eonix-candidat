
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    // Important: Ceci permet d'éviter certains conflits avec Bootstrap
    important: true,
    plugins: [],
}