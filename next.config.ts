import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        // 기존 Webpack 설정을 확장합니다.
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "src"), // '@'를 src 디렉토리로 매핑
        };

        return config;
    },

    images: {
        domains: ['lh3.googleusercontent.com', 'nwezfnytabthwgbgajso.supabase.co'], // ✅ 여기에 도메인 추가
    },

    // ✅ SWC 최적화 옵션
    compiler: {
        removeConsole: false
    }
};

export default nextConfig;
