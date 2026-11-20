"use client";

import { useEffect, useRef } from "react";
import type { SectionId } from "@/features/portfolio/types/portfolio.types";
import { replaceSectionHash } from "@/features/portfolio/utils/section-hash.utils";

// Dưới ngưỡng này coi như đang ở đầu trang: URL sạch, không có hash.
const TOP_THRESHOLD_PX = 8;

// Cập nhật hash trên URL theo mục đang xem khi người dùng cuộn (ví dụ /vi#experience), về đầu trang thì xóa hash.
// Chỉ bắt đầu sau lần cuộn đầu tiên: lúc mới mở trang, vị trí có thể chưa kịp nhảy tới hash trong URL
// (liên kết dạng /vi#projects), ghi sớm sẽ xóa mất mục đích của liên kết.
export function useSectionHashSync(activeId: SectionId | null): void {
    const hasScrolledRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            hasScrolledRef.current = true;
            if (window.scrollY <= TOP_THRESHOLD_PX) replaceSectionHash(null);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (activeId === null || !hasScrolledRef.current) return;
        if (window.scrollY <= TOP_THRESHOLD_PX) return;
        replaceSectionHash(activeId);
    }, [activeId]);
}
