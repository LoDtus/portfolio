import type { NextConfig } from "next";
import fs from "node:fs";

const PORT = process.env.PORT || "unknown";
const APP_URL = process.env.APP_URL || "unknown";
const IS_DOCKER = process.env.IS_DOCKER === "true" || fs.existsSync("/.dockerenv");

console.log("\n==================================================");
console.log("APPLICATION CONFIGURATION");
console.log("==================================================");
console.log(`Port   : ${PORT}`);
console.log(`Url    : ${APP_URL}`);
console.log(`Docker : ${IS_DOCKER}`);
console.log("==================================================\n");

const nextConfig: NextConfig = {
    output: "export",
    turbopack: {},
    webpack: (config, { dev }) => {
        if (dev && IS_DOCKER) {
            config.watchOptions = {
                poll: IS_DOCKER ? 1000 : false,
                aggregateTimeout: 300,
                ignored: [
                    "**/node_modules/**",
                    "**/.next/**",
                    "**/.git/**",
                    "**/.eslintcache"
                ],
            };
        }
        return config;
    },
    allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.*.*"],

    // 1. Tối ưu hóa trình biên dịch của Next.js (SWC Compiler)
    compiler: {
        // Tự động xóa bỏ các lệnh console.log khi build, giữ lại console.error và console.warn
        removeConsole: { exclude: ["error", "warn"] },
    },
    experimental: {
        // Tối ưu hóa dung lượng Bundle từ các thư viện UI
        optimizePackageImports: [
            "@mui/material",
            "@mui/icons-material",
            "antd",
            "lucide-react",
            "framer-motion",
        ],
    },
    images: {
        // Tối ưu hóa hình ảnh
        unoptimized: true,
        formats: ["image/webp", "image/avif"], // Giới hạn các định dạng ảnh chất lượng cao, dung lượng siêu nhẹ (Tự convert ảnh sang webp/avif)
        minimumCacheTTL: 31536000, // Cache 1 năm cho tài nguyên tĩnh
        dangerouslyAllowSVG: true, // Hỗ trợ SVG icon/logo cho portfolio
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    reactStrictMode: true, // Sử dụng Strict Mode
    poweredByHeader: false, // Tắt header X-Powered-By để bảo mật (Không cho hacker biết web dùng Next.js)
    trailingSlash: false, // Chuẩn hóa URL cho SEO (Ép bỏ dấu gạch chéo ở cuối URL để tránh trùng lặp nội dung)
};

export default nextConfig;
