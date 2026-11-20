import type { MetadataRoute } from "next";
import { SEO } from "@/features/portfolio/constants/profile.constants";
import { defaultLocale, locales } from "@/shared/constants/i18n.constants";
import { getSiteUrl } from "@/shared/utils/site-url.util";

export const dynamic = "force-static";

// Chỉ liệt kê URL chuẩn (canonical): trang chủ từng ngôn ngữ (hiện chưa có trang chi tiết project).
// Các route cuộn tới mục (/vi/education...) có canonical về trang chủ nên không đưa vào.
// Mỗi URL kèm đủ bản thay thế ngôn ngữ, gồm cả chính nó (hreflang tự tham chiếu) và x-default.
export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = getSiteUrl();
    // Ngày cập nhật nội dung thật (không dùng ngày build) để Google tin tín hiệu lastmod.
    const lastModified = new Date(SEO.contentUpdatedAt);
    const images = [`${siteUrl}${SEO.ogImage.path}`];

    const alternates = {
        languages: {
            ...Object.fromEntries(
                locales.map((alt) => [alt, `${siteUrl}/${alt}`]),
            ),
            "x-default": `${siteUrl}/${defaultLocale}`,
        },
    };

    const homes = locales.map((locale) => ({
        url: `${siteUrl}/${locale}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 1,
        images,
        alternates,
    }));

    return homes;
}
