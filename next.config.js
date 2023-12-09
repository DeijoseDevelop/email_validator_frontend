/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    env: {
        BACKEND_API_KEY: process.env.BACKEND_API_KEY
    }
}

module.exports = nextConfig
