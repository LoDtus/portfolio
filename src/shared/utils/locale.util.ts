import { locales, type Locale } from "@/shared/constants/i18n.constants";

const STORAGE_KEY = "preferred_locale";

export function isSupportedLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}

// Đọc lựa chọn đã lưu: chỉ tồn tại nếu người dùng từng CHỦ ĐỘNG bấm nút đổi ngôn ngữ.
// Không đoán theo ngôn ngữ trình duyệt: trang mặc định là tiếng Việt.
export function getStoredLocale(): Locale | null {
    if (typeof window === "undefined") return null;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored && isSupportedLocale(stored) ? stored : null;
    } catch {
        // localStorage có thể bị chặn (private mode nghiêm ngặt, policy trình duyệt) — không để vỡ app
        return null;
    }
}

export function setStoredLocale(locale: Locale) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
        // bỏ qua nếu không ghi được — không có lựa chọn nào tốt hơn để fallback
    }
}
