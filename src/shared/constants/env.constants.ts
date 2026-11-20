const ENV = {
    PORT: process.env.NEXT_PUBLIC_PORT,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
} as const;

export default ENV;