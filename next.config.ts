import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "nwezfnytabthwgbgajso.supabase.co",
            },
        ],
    },

    compiler: {
        removeConsole: false,
    },
};

export default nextConfig;
