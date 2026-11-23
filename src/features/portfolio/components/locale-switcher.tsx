"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { locales, type Locale } from "@/shared/constants/i18n.constants";
import { isSupportedLocale, setStoredLocale } from "@/shared/utils/locale.util";

// "band": chữ trắng trên thanh indigo (desktop). "drawer": nút có viền trên nền sáng của menu mobile.
export type LocaleSwitcherVariant = "band" | "drawer";

// Một nút duy nhất đổi sang ngôn ngữ kế tiếp (hiện có hai ngôn ngữ nên là "ngôn ngữ còn lại"): cả nút là vùng bấm, dễ chạm hơn hai chữ nhỏ riêng lẻ.
// Hai mã ngôn ngữ vẫn hiện cùng lúc, mã đang dùng được tô đậm, để người xem biết trang đang ở ngôn ngữ nào.
export default function LocaleSwitcher({
    locale,
    switchLabel,
    variant,
    onNavigate,
}: {
    locale: Locale;
    // Mô tả hành động theo ngôn ngữ hiện tại, ví dụ "Chuyển sang tiếng Anh".
    switchLabel: string;
    variant: LocaleSwitcherVariant;
    // Gọi sau khi đổi ngôn ngữ (ví dụ đóng menu mobile); null nếu không cần.
    onNavigate: (() => void) | null;
}) {
    const pathname = usePathname();
    const target = locales[(locales.indexOf(locale) + 1) % locales.length] ?? locale;

    // Đổi segment locale, giữ nguyên phần còn lại của đường dẫn (ví dụ /vi/projects/x → /en/projects/x).
    const buildHref = (nextLocale: Locale) => {
        const segments = pathname.split("/").filter(Boolean);
        const [first] = segments;
        if (first !== undefined && isSupportedLocale(first)) {
            segments[0] = nextLocale;
        } else {
            segments.unshift(nextLocale);
        }
        return `/${segments.join("/")}`;
    };

    // Thẻ <a> thường (không phải next/link): trình duyệt tải lại cả trang của ngôn ngữ mới, nên <html lang>, metadata
    // và JSON-LD đều đúng ngay từ HTML tĩnh, và React không phải dựng lại thẻ <script> (của next-themes, JSON-LD) ở phía client.
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        setStoredLocale(target); // ghi nhớ đây là lựa chọn chủ động của người dùng
        // Giữ nguyên vị trí (hash) để đổi ngôn ngữ không đẩy người xem về đầu trang.
        event.currentTarget.href = `${buildHref(target)}${window.location.hash}`;
        if (onNavigate !== null) onNavigate();
    };

    const styles = STYLES[variant];

    return (
        <a
            href={buildHref(target)}
            hrefLang={target}
            aria-label={switchLabel}
            title={switchLabel}
            onClick={handleClick}
            className={styles.button}
        >
            {locales.map((code) => (
                <span
                    key={code}
                    aria-hidden="true"
                    className={`${styles.code} ${code === locale ? styles.active : styles.inactive}`}
                >
                    {code}
                </span>
            ))}
        </a>
    );
}

const STYLES: Record<
    LocaleSwitcherVariant,
    { button: string; code: string; active: string; inactive: string }
> = {
    band: {
        button:
            "inline-flex h-8 items-stretch border border-white/40 text-sm font-bold uppercase tracking-wide transition-all duration-200 active:scale-98 hover:border-white",
        code: "inline-flex min-w-9 items-center justify-center px-2",
        active: "bg-white text-band",
        inactive: "text-white/75",
    },
    drawer: {
        button:
            "inline-flex min-h-11 items-stretch border border-border-main text-sm font-bold uppercase tracking-wide transition-all duration-200 active:scale-98 hover:border-heading",
        code: "inline-flex min-w-14 items-center justify-center px-4",
        active: "bg-band text-white",
        inactive: "text-heading",
    },
};
