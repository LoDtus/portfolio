"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { locales, type Locale } from "@/shared/constants/i18n.constants";
import { isSupportedLocale, setStoredLocale } from "@/shared/utils/locale.util";

// "band": chữ trắng trên thanh indigo (desktop). "drawer": nút có viền trên nền sáng của menu mobile.
export type LocaleSwitcherVariant = "band" | "drawer";

export default function LocaleSwitcher({
    locale,
    label,
    variant,
    onNavigate,
}: {
    locale: Locale;
    label: string;
    variant: LocaleSwitcherVariant;
    // Gọi sau khi đổi ngôn ngữ (ví dụ đóng menu mobile); null nếu không cần.
    onNavigate: (() => void) | null;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Đổi segment locale, giữ nguyên phần còn lại của đường dẫn (ví dụ /vi/projects/x → /en/projects/x).
    const buildHref = (target: Locale) => {
        const segments = pathname.split("/").filter(Boolean);
        const [first] = segments;
        if (first !== undefined && isSupportedLocale(first)) {
            segments[0] = target;
        } else {
            segments.unshift(target);
        }
        return `/${segments.join("/")}`;
    };

    const handleClick = (event: MouseEvent<HTMLAnchorElement>, target: Locale) => {
        event.preventDefault();
        setStoredLocale(target); // ghi nhớ đây là lựa chọn chủ động của người dùng
        // Giữ nguyên vị trí (hash) để đổi ngôn ngữ không đẩy người xem về đầu trang.
        router.push(`${buildHref(target)}${window.location.hash}`);
        if (onNavigate !== null) onNavigate();
    };

    const isDrawer = variant === "drawer";

    return (
        <div
            role="group"
            aria-label={label}
            className={isDrawer ? "flex items-center gap-2" : "flex items-center"}
        >
            {locales.map((target, index) => {
                const isCurrent = target === locale;
                return (
                    <span key={target} className="flex items-center">
                        {!isDrawer && index > 0 ? (
                            <span aria-hidden="true" className="px-1 text-white/40">
                                /
                            </span>
                        ) : null}
                        <Link
                            href={buildHref(target)}
                            hrefLang={target}
                            lang={target}
                            aria-current={isCurrent ? "true" : undefined}
                            onClick={(event) => handleClick(event, target)}
                            className={getLinkClassName(isDrawer, isCurrent)}
                        >
                            {target}
                        </Link>
                    </span>
                );
            })}
        </div>
    );
}

function getLinkClassName(isDrawer: boolean, isCurrent: boolean): string {
    if (isDrawer) {
        const base =
            "inline-flex min-h-10 min-w-14 items-center justify-center border px-4 text-sm font-bold uppercase tracking-wide";
        return isCurrent
            ? `${base} border-band bg-band text-white`
            : `${base} border-border-main text-heading hover:border-heading`;
    }
    const base = "px-1 text-sm font-bold uppercase tracking-wide";
    return isCurrent ? `${base} text-white` : `${base} text-white/60 hover:text-white`;
}
