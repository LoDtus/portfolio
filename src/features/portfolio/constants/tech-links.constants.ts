import { CLOUDFLARE_ECOSYSTEM } from "@/features/portfolio/constants/profile.constants";

// Trang chủ chính thức của từng công nghệ, công cụ; thẻ (badge) nào có tên ở đây thì thành liên kết.
// Thẻ không có tên ở đây (kỹ năng mềm, chứng chỉ) hiển thị dạng chữ, không có liên kết.
export const TECH_LINKS: Readonly<Record<string, string>> = {
    // Ngôn ngữ
    TypeScript: "https://www.typescriptlang.org/",
    JavaScript: "https://developer.mozilla.org/docs/Web/JavaScript",
    Java: "https://www.java.com/",
    Python: "https://www.python.org/",
    PHP: "https://www.php.net/",

    // Frontend
    "Next.js": "https://nextjs.org/",
    React: "https://react.dev/",
    "React Native": "https://reactnative.dev/",
    "Tailwind CSS": "https://tailwindcss.com/",
    Redux: "https://redux.js.org/",
    "Ant Design": "https://ant.design/",
    Leaflet: "https://leafletjs.com/",
    StompJS: "https://stomp-js.github.io/",

    // Backend
    NestJS: "https://nestjs.com/",
    "Node.js": "https://nodejs.org/",
    FastAPI: "https://fastapi.tiangolo.com/",
    FastMCP: "https://gofastmcp.com/",
    "Spring Boot": "https://spring.io/projects/spring-boot",
    "Spring Framework": "https://spring.io/projects/spring-framework",
    "Apache Kafka": "https://kafka.apache.org/",
    "Node-RED": "https://nodered.org/",
    "Socket.IO": "https://socket.io/",
    WebSocket: "https://developer.mozilla.org/docs/Web/API/WebSockets_API",
    "REST API": "https://developer.mozilla.org/docs/Glossary/REST",
    "RESTful API": "https://developer.mozilla.org/docs/Glossary/REST",
    JWT: "https://jwt.io/",
    TypeORM: "https://typeorm.io/",
    SQLAlchemy: "https://www.sqlalchemy.org/",
    Alembic: "https://alembic.sqlalchemy.org/",
    Celery: "https://docs.celeryq.dev/",
    Vitest: "https://vitest.dev/",
    Authentik: "https://goauthentik.io/",
    "Headless WordPress": "https://developer.wordpress.org/rest-api/",

    // Dữ liệu
    PostgreSQL: "https://www.postgresql.org/",
    PostGIS: "https://postgis.net/",
    MySQL: "https://www.mysql.com/",
    MariaDB: "https://mariadb.org/",
    MongoDB: "https://www.mongodb.com/",
    Redis: "https://redis.io/",
    Elasticsearch: "https://www.elastic.co/elasticsearch",
    MinIO: "https://min.io/",

    // Triển khai, vận hành
    Docker: "https://www.docker.com/",
    "Docker Compose": "https://docs.docker.com/compose/",
    Nginx: "https://nginx.org/",
    [CLOUDFLARE_ECOSYSTEM]: "https://www.cloudflare.com/",
    Cloudflare: "https://www.cloudflare.com/",
    "Cloudflare Tunnel":
        "https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/",
    "GitHub Actions CI/CD": "https://github.com/features/actions",
    Sentry: "https://sentry.io/",
    "Better Stack": "https://betterstack.com/",
    "Telegram Bot": "https://core.telegram.org/bots",
    Frigate: "https://frigate.video/",

    // AI và API
    "Claude API": "https://www.anthropic.com/api",
    "Claude Max": "https://claude.com/pricing/max",
    "Gemini AI": "https://gemini.google/",
    "Vietmap API": "https://maps.vietmap.vn/",
    "Google Maps API": "https://developers.google.com/maps",

    // Công cụ
    "Claude Code (Max)": "https://claude.com/product/claude-code",
    "Claude Code": "https://claude.com/product/claude-code",
    Cursor: "https://cursor.com/",
    Firebase: "https://firebase.google.com/",
    "Synology NAS": "https://www.synology.com/",
    Postman: "https://www.postman.com/",
    Figma: "https://www.figma.com/",
    "Microsoft Office": "https://www.microsoft365.com/",
    Adobe: "https://www.adobe.com/",
    CapCut: "https://www.capcut.com/",
    "Google Flow": "https://labs.google/flow/about",
    ElevenLabs: "https://elevenlabs.io/",
};

export function getTechUrl(name: string): string | null {
    return TECH_LINKS[name] ?? null;
}
