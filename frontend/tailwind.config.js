/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // light theme
                "paper": "#FAF7F5",
                "paper-yellow": "#EFEAE6",
                "paper-more-yellow": "#ECE3CA",
                "gray-sweet": "#6B7280",
                "purple-dark": "#291334",
                // dark theme
                "midnight": "#0F172A",
                "midnight-dark": "#0C1425",
                "midnight-blue": "#1E293B",
                "gray-dark": "#1E293B",
                "white-grayish": "#C8CBD0",
                // both theme
                "pink-sweet": "#EC4899",
                "purple-namielle": "#761AE4",
                "pink-namielle": "#E96063",
                "red-error": "#FF5861",
                "green-success": "#00A96E",
                "blue-info": "#00B5FF",
            },
        },
        fontFamily: {
            // example: className="font-Inter"
            Inter: ["Inter", "sans-serif"],
        },
    },
    plugins: [],
};
