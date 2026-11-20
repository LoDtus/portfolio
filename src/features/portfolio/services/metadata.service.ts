import type { Metadata, Viewport } from "next";
import { PROFILE, SEO } from "@/features/portfolio/constants/profile.constants";
import { getPortfolioContent } from "@/features/portfolio/services/content.service";
import {
    defaultLocale,
    locales,
    type Locale,
} from "@/shared/constants/i18n.constants";

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
    vi: "vi_VN",
    en: "en_US",
};

// Từ khóa meta: Google bỏ qua nhưng Bing và một số công cụ vẫn đọc; chỉ liệt kê cụm có thật trong nội dung.
const KEYWORDS: Record<Locale, readonly string[]> = {
    vi: [
        "Long Nguyen",
        "lập trình viên Fullstack",
        "lập trình viên web Hà Nội",
        "Next.js",
        "NestJS",
        "FastAPI",
        "React",
        "Docker",
        "portfolio",
    ],
    en: [
        "Long Nguyen",
        "Fullstack Developer",
        "web developer Hanoi",
        "Next.js",
        "NestJS",
        "FastAPI",
        "React",
        "Docker",
        "portfolio",
    ],
};

// Cho phép hiện đoạn trích và ảnh xem trước tối đa trong kết quả tìm kiếm.
const ROBOTS = {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
    },
} as const;

// Trang không nên được lập chỉ mục (ví dụ trang lỗi).
export const NO_INDEX_METADATA: Metadata = {
    robots: { index: false, follow: false },
};

// themeColor theo giao diện sáng/tối của trang, để thanh địa chỉ trên di động cùng tông.
export const SITE_VIEWPORT: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0e1a13" },
    ],
};

function buildLanguageAlternates(path: string): Record<string, string> {
    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
        languages[locale] = `/${locale}${path}`;
    });
    languages["x-default"] = `/${defaultLocale}${path}`;
    return languages;
}

function buildOpenGraphImage(alt: string) {
    return {
        url: SEO.ogImage.path,
        width: SEO.ogImage.width,
        height: SEO.ogImage.height,
        alt,
        type: "image/jpeg",
    };
}

// Mọi route cuộn tới một mục (/vi, /vi/education...) cùng canonical về /{locale}
// để không bị coi là nội dung trùng lặp.
export function buildHomeMetadata(locale: Locale): Metadata {
    const content = getPortfolioContent(locale);
    const canonical = `/${locale}`;
    const otherLocales = locales.filter((item) => item !== locale);

    return {
        title: content.meta.title,
        description: content.meta.description,
        applicationName: PROFILE.name,
        keywords: [...KEYWORDS[locale]],
        authors: [{ name: PROFILE.name, url: PROFILE.githubUrl }],
        creator: PROFILE.name,
        publisher: PROFILE.name,
        category: "technology",
        robots: ROBOTS,
        alternates: {
            canonical,
            languages: buildLanguageAlternates(""),
        },
        openGraph: {
            type: "website",
            siteName: PROFILE.name,
            title: content.meta.title,
            description: content.meta.description,
            url: canonical,
            locale: OPEN_GRAPH_LOCALE[locale],
            alternateLocale: otherLocales.map((item) => OPEN_GRAPH_LOCALE[item]),
            images: [buildOpenGraphImage(content.meta.title)],
        },
        twitter: {
            card: "summary_large_image",
            title: content.meta.title,
            description: content.meta.description,
            images: [SEO.ogImage.path],
        },
    };
}
