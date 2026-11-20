import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/utils/site-url.util";

export const dynamic = "force-static";

// Cho phép mọi bot (gồm cả bot tìm kiếm AI) quét trang công khai. Một nhóm "*" duy nhất:
// liệt kê riêng từng bot sẽ vô tình chặn các bot không có tên trong danh sách.
// Trang lỗi (/error/) không chặn ở đây mà gắn noindex, để bot vẫn đọc được thẻ noindex.
export default function robots(): MetadataRoute.Robots {
    const siteUrl = getSiteUrl();

    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    };
}
