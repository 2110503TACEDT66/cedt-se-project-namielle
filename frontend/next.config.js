/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["drive.google.com"],
        domains: ["unsplash.com"],
        domains: ["images.unsplash.com"]
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    env: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    },
};

module.exports = nextConfig;
