/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // example: className="text-gray-slate-dark"
                paper: "#F9F2ED",
                "gray-slate-dark": "#304159", // tailwind: text-slate-800
                "orange-sweet": "#FF7E67", // tailwind: text-orange-500
            },
        },
        fontFamily: {
            // example: className="font-Inter"
            Inter: ["Inter", "sans-serif"],
        },
    },
    plugins: [],
};
