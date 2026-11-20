"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import type { Locale } from "@/shared/constants/i18n.constants";
import { lockSectionHash } from "@/features/portfolio/utils/section-hash.utils";
import { getScrollDuration } from "@/shared/utils/scroll.util";

// Liên kết thương hiệu (logo + tên): đang ở trang chủ thì cuộn mượt lên đầu trang và xóa hash;
// ở trang khác (ví dụ chi tiết project) thì điều hướng về trang chủ như link thường.
export default function BrandLink({
    locale,
    className,
    onNavigate,
    children,
}: {
    locale: Locale;
    className: string;
    // Gọi sau khi bấm (ví dụ đóng menu mobile); null nếu không cần.
    onNavigate: (() => void) | null;
    children: ReactNode;
}) {
    const lenis = useLenis();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        // Trang chủ luôn có mốc #about; không có thì để Link tự điều hướng.
        if (document.getElementById("about") === null) return;

        event.preventDefault();
        if (lenis) {
            const duration = getScrollDuration(window.scrollY);
            lockSectionHash((duration + 0.3) * 1000);
            lenis.scrollTo(0, { duration });
        } else {
            lockSectionHash(1200);
            // "auto" để CSS `scroll-behavior` (và prefers-reduced-motion) quyết định.
            window.scrollTo({ top: 0, behavior: "auto" });
        }
        window.history.replaceState(window.history.state, "", `/${locale}`);
        if (onNavigate !== null) onNavigate();
    };

    return (
        <Link href={`/${locale}`} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
