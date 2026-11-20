import {
    locales,
    defaultLocale,
    type Locale,
} from "@/shared/constants/i18n.constants";

const STORAGE_KEY = "preferred_locale";

export function isSupportedLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}

// Đọc lựa chọn đã lưu — chỉ tồn tại nếu người dùng từng CHỦ ĐỘNG chọn qua dropdown
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

// Suy ra locale từ ngôn ngữ trình duyệt, khớp theo 2 ký tự đầu (vd "en-US" → "en")
export function detectBrowserLocale(): Locale {
    if (typeof window === "undefined") return defaultLocale;

    const candidates = window.navigator.languages?.length
        ? window.navigator.languages
        : [window.navigator.language];

    for (const candidate of candidates) {
        const short = candidate.slice(0, 2).toLowerCase();
        const matched = locales.find((l) => l === short);
        if (matched) return matched;
    }

    return defaultLocale;
}

// Chuỗi ưu tiên đầy đủ: đã lưu → browser language → mặc định
export function resolvePreferredLocale(): Locale {
    return getStoredLocale() ?? detectBrowserLocale();
}
