import ENV from "@/shared/constants/env.constants";

// Tên miền của hệ sinh thái cá nhân, dùng khi biến môi trường chưa được cấu hình.
const FALLBACK_SITE_URL = "https://longvi.org";

// Trả về URL gốc của site (không có dấu "/" cuối).
// NEXT_PUBLIC_APP_URL có thể là giá trị mẫu (ví dụ "http://localhost:xxxx") hoặc rỗng,
// nên phải kiểm tra hợp lệ trước khi đưa vào metadataBase/sitemap để không làm vỡ build.
export function getSiteUrl(): string {
    const raw = ENV.APP_URL?.trim();
    if (!raw) return FALLBACK_SITE_URL;

    try {
        const parsed = new URL(raw);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return FALLBACK_SITE_URL;
        }
        return parsed.origin;
    } catch {
        // Giá trị cấu hình không phải URL (ví dụ placeholder): dùng URL mặc định thay vì làm vỡ build.
        return FALLBACK_SITE_URL;
    }
}
