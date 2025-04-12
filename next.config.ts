import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            'localhost', // For local development
            'your-api-domain.com', // Replace with your actual API domain
        ],
    },
    // Enable React strict mode for better development experience
    reactStrictMode: true,
};

export default nextConfig;
