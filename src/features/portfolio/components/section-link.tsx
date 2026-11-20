"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import type { SectionId } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";
import { lockSectionHash } from "@/features/portfolio/utils/section-hash.utils";
import { getScrollDuration, getScrollTopFor } from "@/shared/utils/scroll.util";

// Thời gian khóa ghi hash theo cuộn (xem lockSectionHash): bằng thời gian cuộn cộng thêm một khoảng đệm.
const HASH_LOCK_MARGIN_SECONDS = 0.3;
// Cuộn native không báo trước thời gian nên khóa một khoảng cố định đủ dài cho cuộn mượt của trình duyệt.
const NATIVE_SCROLL_LOCK_MS = 1200;

// Liên kết tới một mục trên trang chủ. Trên trang chủ: cuộn mượt tới mục (Lenis, hoặc cuộn native nếu
// người dùng giảm chuyển động) mà không tải lại. Trang khác (ví dụ chi tiết project): điều hướng về /{locale}#mục.
// Offset cho thanh nav sticky lấy từ `scroll-padding-top` của <html> (xem getScrollTopFor).
export default function SectionLink({
    locale,
    sectionId,
    className,
    isActive,
    onNavigate,
    children,
}: {
    locale: Locale;
    sectionId: SectionId;
    className: string;
    isActive: boolean;
    // Gọi sau khi bấm (ví dụ đóng menu mobile); null nếu không cần.
    onNavigate: (() => void) | null;
    children: ReactNode;
}) {
    const lenis = useLenis();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById(sectionId);
        if (target === null) return;

        event.preventDefault();
        if (lenis) {
            const top = getScrollTopFor(target);
            const duration = getScrollDuration(top - window.scrollY);
            lockSectionHash((duration + HASH_LOCK_MARGIN_SECONDS) * 1000);
            lenis.scrollTo(top, { duration });
        } else {
            lockSectionHash(NATIVE_SCROLL_LOCK_MS);
            // "auto" để CSS `scroll-behavior` (và prefers-reduced-motion) quyết định.
            target.scrollIntoView({ behavior: "auto", block: "start" });
        }
        window.history.replaceState(null, "", `/${locale}#${sectionId}`);
        if (onNavigate !== null) onNavigate();
    };

    return (
        <Link
            href={`/${locale}#${sectionId}`}
            aria-current={isActive ? "location" : undefined}
            className={className}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
}
