import type {
    ContactChannelFacts,
    ExperienceCompany,
    NeutralSkillGroupId,
    ProjectLink,
    ReferenceFacts,
    ProjectSlug,
    SkillGroupId,
} from "@/features/portfolio/types/portfolio.types";

// Dữ kiện không phụ thuộc ngôn ngữ. Sửa ở đây là đủ cho cả bản vi và en.

export const PROFILE = {
    name: "Long Nguyen",
    githubUrl: "https://github.com/LoDtus",
    facebookUrl: "https://www.facebook.com/nguyentrunglong.LoDtus/",
    linkedinUrl: "https://www.linkedin.com/in/nguyentrunglong/",
    zaloUrl: "https://zalo.me/0375467302",
    email: "nguyentrunglong.150903@gmail.com",
    // Hiển thị cho người đọc; `phoneE164` dùng cho liên kết tel: và dữ liệu có cấu trúc.
    phoneDisplay: "0375 467 302",
    phoneE164: "+84375467302",
    ecosystemUrl: "https://longvi.org",
    address: {
        locality: "Vĩnh Hưng",
        region: "Hà Nội",
        country: "VN",
        display: "Vĩnh Hưng, Hà Nội",
    },
    // Logo thương hiệu của trang (đã có sẵn trong public/logo).
    logo: "/logo/longvi.svg",
    // Ảnh chân dung đã tách nền, có sẵn vòng tròn terracotta phía sau (public/images/me).
    portrait: { src: "/images/me/me-001.avif", width: 800, height: 897 },
} as const;

// Dữ kiện SEO dùng chung cho metadata, sitemap và dữ liệu có cấu trúc.
export const SEO = {
    // Ngày cập nhật nội dung gần nhất ("YYYY-MM-DD"); sửa nội dung trang thì nhớ đổi ngày này (dùng cho sitemap và dateModified).
    contentUpdatedAt: "2026-11-22",
    // Ảnh chia sẻ mạng xã hội 1200x630 (JPEG vì Facebook/Zalo không đọc ổn định AVIF/WebP).
    ogImage: { path: "/og/og-image.jpg", width: 1200, height: 630 },
    // Tên khác của chủ trang: biệt danh và tên đầy đủ có dấu (để tìm theo tên tiếng Việt).
    alternateNames: ["LoDtus", "Nguyễn Trung Long"],
    knowsLanguage: ["vi", "en"],
} as const;

// Các kênh liên hệ theo thứ tự hiển thị. Logo lấy từ public/logo; GitHub, điện thoại, địa chỉ dùng biểu tượng vẽ sẵn.
export const CONTACT_CHANNELS: readonly ContactChannelFacts[] = [
    {
        id: "zalo",
        value: PROFILE.phoneDisplay,
        href: PROFILE.zaloUrl,
        icon: "logo",
        logo: "/logo/zalo.svg",
        isExternal: true,
    },
    {
        id: "phone",
        value: PROFILE.phoneDisplay,
        href: `tel:${PROFILE.phoneE164}`,
        icon: "phone",
        logo: null,
        isExternal: false,
    },
    {
        id: "email",
        value: PROFILE.email,
        href: `mailto:${PROFILE.email}`,
        icon: "logo",
        logo: "/logo/gmail.svg",
        isExternal: false,
    },
    {
        id: "github",
        value: "github.com/LoDtus",
        href: PROFILE.githubUrl,
        icon: "github",
        logo: null,
        isExternal: true,
    },
    {
        id: "facebook",
        value: "nguyentrunglong.LoDtus",
        href: PROFILE.facebookUrl,
        icon: "logo",
        logo: "/logo/facebook.svg",
        isExternal: true,
    },
    {
        id: "linkedin",
        value: "in/nguyentrunglong",
        href: PROFILE.linkedinUrl,
        icon: "logo",
        logo: "/logo/linkedin.svg",
        isExternal: true,
    },
    {
        id: "address",
        value: PROFILE.address.display,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROFILE.address.display)}`,
        icon: "address",
        logo: null,
        isExternal: true,
    },
];

// Trang mạng xã hội/hồ sơ của chính chủ, dùng cho dữ liệu có cấu trúc (schema.org sameAs).
export const SAME_AS_URLS: readonly string[] = [
    PROFILE.githubUrl,
    PROFILE.linkedinUrl,
    PROFILE.facebookUrl,
];

export const EDUCATION = {
    schoolName: "Thang Long University",
    schoolUrl: "https://thanglong.edu.vn",
    // Liên kết ngành học; nếu trang này không còn (404/410) thì nút "Xem ngành học" dùng `schoolUrl` (xem education-link.service.ts).
    majorUrl: "https://thanglong.edu.vn/vi/nganh-hoc/cong-nghe-thong-tin",
    // Năm thành lập trường, dùng để tính "hơn/gần N năm" theo năm hiện tại.
    foundedYear: 1988,
    startYear: 2021,
    endYear: 2026,
    gpa: "3.2",
    gpaScale: "4",
    // Logo dùng nguyên bản, không biến dạng, đặt trên nền trắng (brand.thanglong.edu.vn/logo).
    logoColor: "/logo/thang-long-university.webp",
    // Các ảnh của trường (slide, mỗi lần một ảnh). Ảnh nguồn nằm trong workspace/assets-source/images/education.
    photos: [
        { src: "/images/education/thang-long-graduation.avif", width: 1200, height: 848, position: "50% 30%" },
        { src: "/images/education/thang-long-computer-lab.avif", width: 1200, height: 800 },
        { src: "/images/education/thang-long-study-group.avif", width: 1200, height: 800 },
    ],
} as const;

// Thông tin người tham chiếu (chữ giới thiệu theo ngôn ngữ nằm trong content-*.constants.ts).
// Email và số điện thoại hiện thẳng thành chữ; các trang khác là thẻ liên kết. Trường rỗng/null thì giao diện bỏ qua.
export const REFERENCES: readonly ReferenceFacts[] = [
    {
        id: "nguyen-huy-toan",
        name: "Nguyễn Huy Toán",
        organization: null,
        photos: [
            { src: "/images/reference-nht/nht-001.avif", width: 400, height: 400, position: "50% 25%" },
            { src: "/images/reference-nht/nht-002.avif", width: 1000, height: 666, position: "46% 50%" },
        ],
        email: "toannh@udata.ai",
        phoneE164: "+84862820165",
        phoneDisplay: "0862820165",
        links: [
            {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/toan-nguyen-huy-ph-d-205035146/",
            },
            {
                label: "Verysell AI",
                url: "https://verysell.ai/ai-lab-team/dr-toan-nguyen-huy/",
            },
        ],
    },
    {
        id: "tran-tien-quan",
        name: "Trần Tiến Quân",
        organization: null,
        photos: [
            { src: "/images/reference-ttq/ttq-001.avif", width: 800, height: 1192, position: "50% 15%" },
        ],
        email: "quantran98@gmail.com",
        phoneE164: "+84981044945",
        phoneDisplay: "0981044945",
        links: [
            { label: "quanaibuilder.com", url: "https://quanaibuilder.com/" },
            { label: "TikTok", url: "https://www.tiktok.com/@quanaibuilder" },
        ],
    },
];

// Dải thông tin liên hệ nhanh phía trên header (chỉ là chữ, không phải liên kết), theo thứ tự hiển thị. Số điện thoại viết liền như yêu cầu.
export const TOP_BAR_ITEMS = [
    { id: "phone", value: PROFILE.phoneDisplay.replace(/\s/g, "") },
    { id: "email", value: PROFILE.email },
    { id: "address", value: PROFILE.address.display },
] as const;

// Tên hiển thị của gói dịch vụ Cloudflare đã dùng (gộp Tunnel, Workers, Pages, R2); tech-links.constants.ts dùng lại đúng chuỗi này.
export const CLOUDFLARE_ECOSYSTEM = "Cloudflare ecosystem (Tunnel, Workers, Pages, R2)";

// Danh sách công nghệ theo nhóm. Kỹ năng mềm có chữ theo ngôn ngữ nên nằm trong `skills.softSkills` của nội dung.
export const SKILL_ITEMS: Record<NeutralSkillGroupId, readonly string[]> = {
    languages: ["TypeScript", "JavaScript", "Java", "Python"],
    frontend: [
        "Next.js",
        "React",
        "React Native",
        "Flutter",
        "Tailwind CSS",
        "Ant Design",
        "Redux Toolkit",
    ],
    backend: [
        "NestJS",
        "Node.js",
        "FastAPI",
        "Spring Boot",
        "WebSocket",
        "Apache Kafka",
        "Firebase",
    ],
    database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
    deploy: [
        "Docker",
        "Docker Compose",
        "Nginx",
        CLOUDFLARE_ECOSYSTEM,
        "Synology NAS",
        "On-premise server",
    ],
    tools: ["Git", "GitHub", "Claude Code", "Cursor", "Postman"],
    design: [
        "Figma",
        "Microsoft Office",
        "Adobe Photoshop",
        "Adobe Premiere Pro",
        "Adobe Lightroom",
        "CapCut",
        "Google Flow",
        "ElevenLabs",
    ],
};

export const SKILL_GROUP_ORDER: readonly SkillGroupId[] = [
    "languages",
    "frontend",
    "backend",
    "database",
    "deploy",
    "tools",
    "design",
    "soft",
];

export interface ProjectConfig {
    slug: ProjectSlug;
    // Mốc thời gian dạng "YYYY-MM". `startedAt` null nghĩa là chưa có; `endedAt` null (khi đã có `startedAt`) nghĩa là đang làm.
    startedAt: string | null;
    endedAt: string | null;
    links: readonly ProjectLink[];
    tech: readonly string[];
    // Ảnh đại diện của dự án (đặt trong public/images/projects); null nghĩa là chưa có, thẻ dự án bỏ phần ảnh.
    thumbnail: { src: string; width: number; height: number } | null;
}

// Thứ tự hiển thị do người dùng chốt (mới nhất trước).
export const PROJECTS: readonly ProjectConfig[] = [
    {
        slug: "location-insight",
        startedAt: "2026-09",
        endedAt: null,
        links: [
            { kind: "website", url: "https://moanland.com" },
            { kind: "github", url: "https://github.com/LoDtus/location-insight" },
        ],
        tech: [
            "NestJS",
            "TypeORM",
            "Next.js",
            "Tailwind CSS",
            "Redux",
            "REST API",
            "Socket.IO",
            "Claude API",
            "PostGIS",
            "Vietmap API",
            "Nginx",
            "PostgreSQL",
            "Redis",
            "Elasticsearch",
            "MinIO",
            "Docker",
            "Docker Compose",
            "Claude Code",
        ],
        thumbnail: null,
    },
    {
        slug: "vinfastreev",
        startedAt: "2026-09",
        endedAt: "2026-09",
        links: [{ kind: "website", url: "https://vinfastreev.com/" }],
        tech: [
            "Next.js",
            "Headless WordPress",
            "PHP",
            "MariaDB",
            "Docker",
            "GitHub Actions CI/CD",
            "Cloudflare Tunnel",
            "Sentry",
            "Better Stack",
            "Telegram Bot",
        ],
        thumbnail: null,
    },
    {
        slug: "affiliate-product-catalog",
        startedAt: "2026-04",
        endedAt: null,
        links: [
            {
                kind: "github",
                url: "https://github.com/LoDtus/affiliate-product-catalog",
            },
        ],
        tech: [
            "Next.js",
            "NestJS",
            "MongoDB",
            "Redux",
            "RESTful API",
            "JWT",
            "Docker",
            "Cloudflare Tunnel",
        ],
        thumbnail: null,
    },
    {
        slug: "city-incidents-management-system",
        startedAt: null,
        endedAt: null,
        links: [
            {
                kind: "github",
                url: "https://github.com/LoDtus/city-incidents-management-system",
            },
        ],
        tech: [
            "Spring Framework",
            "Next.js",
            "Redux",
            "StompJS",
            "Leaflet",
            "MySQL",
            "RESTful API",
            "WebSocket",
            "JWT",
        ],
        thumbnail: null,
    },
];

// Thứ tự hiển thị (gần nhất đến xa nhất) do người dùng cung cấp: Udata, IRDOP, Lifetex.
// Có đủ `startedAt` nên sortExperienceEntries tự xếp theo ngày; thứ tự khai báo ở content-vi/en là phương án dự phòng.
// Chưa có địa chỉ website của Udata và Lifetex nên để null thay vì đoán.
export const UDATA: ExperienceCompany = {
    id: "udata",
    company: "Udata",
    companyUrl: null,
    logo: "/images/experiment-udata/logo.svg",
    logoWidth: 380,
    logoHeight: 100,
    startedAt: "2026-06",
    endedAt: "2026-12",
    photos: [
        { src: "/images/experiment-udata/udata-001.avif", width: 960, height: 600 },
        { src: "/images/experiment-udata/udata-002.avif", width: 960, height: 600 },
        { src: "/images/experiment-udata/udata-003.avif", width: 960, height: 600 },
    ],
    projects: [
        {
            id: "uboard-esg",
            links: [{ kind: "website", url: "https://uboardesg.vn/" }],
            stack: [
                "Next.js",
                "Tailwind CSS",
                "Ant Design",
                "FastAPI",
                "SQLAlchemy",
                "Alembic",
                "Celery",
                "Redis",
                "PostgreSQL",
                "Docker",
                "Vitest",
                "MinIO",
                "Authentik",
                "Claude Code",
            ],
        },
        {
            id: "uleadgen",
            links: [{ kind: "website", url: "https://uleadgen.net/" }],
            stack: [],
        },
        {
            id: "ugate",
            links: [
                {
                    kind: "googlePlay",
                    url: "https://play.google.com/store/apps/details?id=com.udata.ai.ugate",
                },
                {
                    kind: "appStore",
                    url: "https://apps.apple.com/vn/app/ugate-industrial-ai/id6755030679",
                },
            ],
            stack: ["Next.js", "Cursor"],
        },
    ],
};

export const IRDOP: ExperienceCompany = {
    id: "irdop",
    company: "IRDOP",
    companyUrl: "https://irdop.org/",
    logo: "/images/experiment-irdop/logo.webp",
    logoWidth: 360,
    logoHeight: 110,
    startedAt: "2025-10",
    endedAt: "2026-04",
    photos: [
        { src: "/images/experiment-irdop/irdop-001.avif", width: 960, height: 600 },
        { src: "/images/experiment-irdop/irdop-002.avif", width: 960, height: 600 },
        { src: "/images/experiment-irdop/irdop-003.avif", width: 960, height: 600 },
    ],
    projects: [
        {
            id: "internal-erp",
            links: [],
            stack: [
                "React",
                "NestJS",
                "Node.js",
                "Node-RED",
                "Redis",
                "Gemini AI",
                "PostgreSQL",
                "Docker",
                "Synology NAS",
                "Cloudflare",
                "Frigate",
                "Cursor",
            ],
        },
    ],
};

export const LIFETEX: ExperienceCompany = {
    id: "lifetex",
    company: "Lifetex",
    companyUrl: null,
    logo: "/images/experiment-lifetex/logo.webp",
    logoWidth: 178,
    logoHeight: 129,
    startedAt: "2024-03",
    endedAt: "2026-06",
    photos: [
        { src: "/images/experiment-lifetex/lifetex-001.avif", width: 960, height: 600 },
    ],
    projects: [
        {
            id: "life-office",
            links: [
                {
                    kind: "googlePlay",
                    url: "https://play.google.com/store/apps/details?id=dev.lifetex.offical",
                },
                {
                    kind: "appStore",
                    url: "https://apps.apple.com/vn/app/life-office/id1515136258",
                },
                {
                    kind: "youtube",
                    url: "https://www.youtube.com/watch?v=GzqXdYtChQM",
                },
            ],
            stack: ["React Native", "Firebase", "Google Maps API"],
        },
    ],
};
