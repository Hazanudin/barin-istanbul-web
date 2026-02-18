/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.public.blob.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "fonts.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        dangerouslyAllowSVG: true,
        unoptimized: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
