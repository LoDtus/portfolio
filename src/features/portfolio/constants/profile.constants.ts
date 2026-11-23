import {
    countWorkedMonths,
    formatExperienceYears,
} from "@/features/portfolio/utils/experience-duration.utils";
import type { Locale } from "@/shared/constants/i18n.constants";
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
    // Trang liệt kê toàn bộ kho mã nguồn công khai (nút "xem thêm dự án" ở mục Dự án).
    githubRepositoriesUrl: "https://github.com/LoDtus?tab=repositories",
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
    // Ảnh chân dung đã tách nền, có sẵn vòng tròn terracotta phía sau (public/image/me).
    portrait: { src: "/image/me/me-001.avif", width: 800, height: 897 },
} as const;

// Dữ kiện SEO dùng chung cho metadata, sitemap và dữ liệu có cấu trúc.
export const SEO = {
    // Ngày cập nhật nội dung gần nhất ("YYYY-MM-DD"); sửa nội dung trang thì nhớ đổi ngày này (dùng cho sitemap và dateModified).
    contentUpdatedAt: "2026-11-23",
    // Ảnh chia sẻ mạng xã hội 1200x630 (JPEG vì Facebook/Zalo không đọc ổn định AVIF/WebP).
    ogImage: { path: "/og/og-image.jpg", width: 1200, height: 630 },
    // Tên khác của chủ trang: biệt danh và tên đầy đủ có dấu (để tìm theo tên tiếng Việt).
    alternateNames: ["LoDtus", "Nguyễn Trung Long"],
    knowsLanguage: ["vi", "en"],
    // Lĩnh vực nghiệp vụ đã làm (không gắn tên nơi làm): để người tìm theo chủ đề kiểm nghiệm, kiểm định, y tế vẫn gặp trang.
    // Mọi cụm đều có thật trong nội dung trang (kỹ năng mềm và dự án ERP).
    domainTopics: {
        vi: ["Kiểm nghiệm", "Kiểm định", "Y tế", "ISO/IEC 17025", "Quản lý hồ sơ kiểm nghiệm", "Phần mềm ERP"],
        en: ["Laboratory testing", "Inspection", "Healthcare", "ISO/IEC 17025", "Testing record management", "ERP software"],
    },
} as const;

// Các kênh liên hệ theo thứ tự hiển thị ở mục Liên hệ (chân trang lấy lại đúng thứ tự này, bỏ điện thoại và địa chỉ).
// Logo lấy từ public/logo; GitHub, điện thoại, địa chỉ dùng biểu tượng vẽ sẵn.
// Điện thoại, Gmail, địa chỉ có `copyText`: bấm vào chỉ sao chép (số điện thoại không có dấu cách để dán là gọi được ngay).
export const CONTACT_CHANNELS: readonly ContactChannelFacts[] = [
    {
        id: "phone",
        value: PROFILE.phoneDisplay,
        href: `tel:${PROFILE.phoneE164}`,
        icon: "phone",
        logo: null,
        isExternal: false,
        copyText: PROFILE.phoneDisplay.replace(/\s/g, ""),
    },
    {
        id: "zalo",
        value: PROFILE.phoneDisplay,
        href: PROFILE.zaloUrl,
        icon: "logo",
        logo: "/logo/zalo.svg",
        isExternal: true,
        copyText: null,
    },
    {
        id: "email",
        value: PROFILE.email,
        href: `mailto:${PROFILE.email}`,
        icon: "logo",
        logo: "/logo/gmail.svg",
        isExternal: false,
        copyText: PROFILE.email,
    },
    {
        id: "facebook",
        value: "nguyentrunglong.LoDtus",
        href: PROFILE.facebookUrl,
        icon: "logo",
        logo: "/logo/facebook.svg",
        isExternal: true,
        copyText: null,
    },
    {
        id: "linkedin",
        value: "in/nguyentrunglong",
        href: PROFILE.linkedinUrl,
        icon: "logo",
        logo: "/logo/linkedin.svg",
        isExternal: true,
        copyText: null,
    },
    {
        id: "github",
        value: "github.com/LoDtus",
        href: PROFILE.githubUrl,
        icon: "github",
        logo: null,
        isExternal: true,
        copyText: null,
    },
    {
        id: "address",
        value: PROFILE.address.display,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROFILE.address.display)}`,
        icon: "address",
        logo: null,
        isExternal: true,
        copyText: PROFILE.address.display,
    },
];

// Hai bản CV (PDF) đặt trong public/cv; thêm hoặc thay file ở đó là đủ, không cần sửa code.
export const CV_FILES: Readonly<Record<Locale, { href: string; fileName: string }>> = {
    vi: {
        href: "/cv/NguyenTrungLong-FullstackDeveloper-vi.pdf",
        fileName: "NguyenTrungLong-FullstackDeveloper-vi.pdf",
    },
    en: {
        href: "/cv/NguyenTrungLong-FullstackDeveloper-en.pdf",
        fileName: "NguyenTrungLong-FullstackDeveloper-en.pdf",
    },
};

// Trang mạng xã hội/hồ sơ của chính chủ, dùng cho dữ liệu có cấu trúc (schema.org sameAs).
export const SAME_AS_URLS: readonly string[] = [
    PROFILE.githubUrl,
    PROFILE.linkedinUrl,
    PROFILE.facebookUrl,
];

export const EDUCATION = {
    schoolName: "Thang Long University",
    // Tên tiếng Việt và các cách gọi phổ biến của trường (dữ liệu có cấu trúc, để tìm theo tên nào cũng ra).
    schoolAlternateNames: [
        "Trường Đại học Thăng Long",
        "Đại học Thăng Long",
        "ĐH Thăng Long",
        "Thăng Long University",
        "TLU",
    ],
    schoolUrl: "https://thanglong.edu.vn",
    // Trang giới thiệu trường trên Wikipedia tiếng Việt (đã kiểm tra tồn tại), dùng làm sameAs để công cụ tìm kiếm nối đúng thực thể.
    schoolWikipediaUrl:
        "https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Th%C4%83ng_Long",
    schoolLocality: "Hà Nội",
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
        { src: "/image/education/tlu-001.avif", width: 1200, height: 848, position: "50% 30%" },
        { src: "/image/education/tlu-002.avif", width: 1200, height: 800 },
        { src: "/image/education/tlu-003.avif", width: 1200, height: 800 },
    ],
} as const;

// Thông tin người tham chiếu (chữ giới thiệu theo ngôn ngữ nằm trong content-*.constants.ts).
// Email và số điện thoại hiện thẳng thành chữ; các trang khác là thẻ liên kết. Trường rỗng/null thì giao diện bỏ qua.
export const REFERENCES: readonly ReferenceFacts[] = [
    {
        id: "nguyen-huy-toan",
        name: "Nguyễn Huy Toán",
        organization: null,
        seo: {
            alternateNames: [
                "Nguyen Huy Toan",
                "Toan Nguyen Huy",
                "TS. Nguyễn Huy Toán",
                "Dr. Nguyen Huy Toan",
            ],
            worksFor: [
                { name: "Verysell AI", url: "https://verysell.ai/" },
                { name: "SmartDev", url: null },
            ],
            parentOrganization: "Verysell Group",
            alumniOf: "Chonnam National University",
            mentions: [],
            knowsAbout: ["Artificial Intelligence", "Deep Learning", "Computer Vision"],
        },
        photos: [
            { src: "/image/reference-nht/nht-001.avif", width: 400, height: 400, position: "50% 25%" },
            { src: "/image/reference-nht/nht-002.avif", width: 1000, height: 666, position: "46% 50%" },
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
        seo: {
            alternateNames: ["Tran Tien Quan"],
            worksFor: [],
            parentOrganization: null,
            alumniOf: "Hanoi University of Science and Technology",
            mentions: ["VinBrain", "MB Bank", "ASCEND Vietnam 2026", "Swinburne Hackathon"],
            knowsAbout: ["AI agent", "MCP", "n8n", "Claude", "Generative AI"],
        },
        photos: [
            { src: "/image/reference-ttq/ttq-001.avif", width: 800, height: 1192, position: "50% 15%" },
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
        "Socket.IO",
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
        "On-premise Server",
        "Synology NAS",
    ],
    tools: ["Git", "GitHub", "Claude Code", "Cursor", "Visual Studio Code", "Postman"],
    design: [
        "Figma",
        "Microsoft Office",
        "CapCut",
        "Adobe Photoshop",
        "Adobe Premiere Pro",
        "Adobe Lightroom",
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
    // Ảnh đại diện của dự án (đặt trong public/image/projects); null nghĩa là chưa có, thẻ dự án bỏ phần ảnh.
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
// Tên công ty đầy đủ theo từng ngôn ngữ nằm ở content-vi/en; `company` ở đây là tên gọi ngắn.
// IRDOP và Lifetex chỉ được liệt kê (`isDiscoverable: false`): không làm SEO cho hai nơi này, xem ExperienceCompany.
export const UDATA: ExperienceCompany = {
    id: "udata",
    company: "Udata",
    companyUrl: null,
    isDiscoverable: true,
    logo: "/image/experiment-udata/logo.svg",
    logoWidth: 380,
    logoHeight: 100,
    startedAt: "2026-06",
    endedAt: "2026-11",
    photos: [
        { src: "/image/experiment-udata/udata-001.avif", width: 960, height: 600 },
        { src: "/image/experiment-udata/udata-002.avif", width: 960, height: 600 },
        { src: "/image/experiment-udata/udata-003.avif", width: 960, height: 600 },
    ],
    projects: [
        {
            id: "uboard-esg",
            links: [{ kind: "website", url: "https://uboardesg.vn/" }],
            stack: [
                "Python",
                "TypeScript",
                "Next.js",
                "Redux Toolkit",
                "Tailwind CSS",
                "Ant Design",
                "FastAPI",
                "SQLAlchemy",
                "Alembic",
                "PostgreSQL",
                "Redis",
                "Socket.IO",
                "MinIO",
                "Authentik",
                "Docker",
                "Docker Compose",
                "Claude Code",
            ],
        },
        {
            id: "uleadgen",
            links: [{ kind: "website", url: "https://uleadgen.net/" }],
            stack: [
                "Python",
                "TypeScript",
                "Next.js",
                "Tailwind CSS",
                "FastAPI",
                "SQLAlchemy",
                "PostgreSQL",
                "Redis",
                "FastMCP",
                "LangGraph",
                "LiteLLM",
                "Langfuse",
                "Docker",
                "Docker Compose",
                "Claude Code",
            ],
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
            stack: [
                "Python",
                "TypeScript",
                "FastAPI",
                "FastMCP",
                "SQLAlchemy",
                "PostgreSQL",
                "Redis",
                "Next.js",
                "Tailwind CSS",
                "Docker Compose",
                "Cursor",
            ],
        },
    ],
};

export const IRDOP: ExperienceCompany = {
    id: "irdop",
    company: "IRDOP",
    // Không liên kết tên cơ quan; địa chỉ website nằm ở thẻ "Website" của dự án (gắn nofollow).
    companyUrl: null,
    isDiscoverable: false,
    logo: "/image/experiment-02/logo.webp",
    logoWidth: 360,
    logoHeight: 110,
    startedAt: "2025-10",
    endedAt: "2026-03",
    photos: [
        { src: "/image/experiment-02/workplace-02-001.avif", width: 960, height: 600 },
        { src: "/image/experiment-02/workplace-02-002.avif", width: 960, height: 600 },
        { src: "/image/experiment-02/workplace-02-003.avif", width: 960, height: 600 },
    ],
    projects: [
        {
            id: "internal-erp",
            links: [{ kind: "website", url: "https://irdop.org/" }],
            stack: [
                "TypeScript",
                "React",
                "Node-RED",
                "NestJS",
                "Node.js",
                "Gemini AI",
                "PostgreSQL",
                "Redis",
                "MinIO",
                "Docker",
                "Docker Compose",
                "Frigate",
                "Cursor",
            ],
        },
    ],
};

export const LIFETEX: ExperienceCompany = {
    id: "lifetex",
    company: "LifeteX",
    companyUrl: null,
    isDiscoverable: false,
    logo: "/image/experiment-03/logo.webp",
    logoWidth: 178,
    logoHeight: 129,
    startedAt: "2024-03",
    endedAt: "2024-06",
    photos: [
        { src: "/image/experiment-03/workplace-03-001.avif", width: 960, height: 600 },
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

// Các nơi đã làm việc, dùng để tính tổng số năm kinh nghiệm (xem experience-duration.utils.ts).
// Thêm công ty mới thì thêm vào đây; `endedAt: null` nghĩa là đang làm, tự lấy tháng hiện tại làm mốc kết thúc.
export const EXPERIENCE_COMPANIES: readonly ExperienceCompany[] = [UDATA, IRDOP, LIFETEX];

// Tổng số năm kinh nghiệm dạng chữ ("1.5+"), tính lúc build từ EXPERIENCE_COMPANIES và tháng hiện tại (xem formatExperienceYears).
export const EXPERIENCE_YEARS = formatExperienceYears(countWorkedMonths(EXPERIENCE_COMPANIES));

// Số dự án đã tham gia, hiển thị dạng "10+". Chủ trang tự đếm, gồm cả dự án chưa liệt kê chi tiết trên trang
// (hiện trang liệt kê PROJECTS và các dự án trong mục Kinh nghiệm); tăng số này khi tham gia thêm dự án.
const PARTICIPATED_PROJECTS_MIN = 10;
export const PARTICIPATED_PROJECTS = `${PARTICIPATED_PROJECTS_MIN}+`;
