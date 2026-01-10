/** @type {import('next').NextConfig} */
// Force Rebuild - Hardcoded Key - 2026-01-10T14:30:00
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'sketchcabs.com',
                    },
                ],
                destination: 'https://www.sketchcabs.com/:path*',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
