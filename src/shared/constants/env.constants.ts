const ENV = {
    PORT: process.env.NEXT_PUBLIC_PORT,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Measurement ID của Google Analytics 4 ("G-XXXXXXXXXX"); trống thì không tải Analytics (ví dụ khi chạy dev).
    GA_ID: process.env.NEXT_PUBLIC_GA_ID,
} as const;

export default ENV;