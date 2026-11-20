"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/features/portfolio/types/portfolio.types";

// Mục được coi là "đang xem" khi đầu mục đã lên tới đường nằm ở 40% chiều cao viewport.
const ACTIVATION_LINE_RATIO = 0.4;
// Sai số (px) khi coi như đã cuộn tới đáy trang.
const BOTTOM_TOLERANCE_PX = 2;

interface TrackedSection {
    id: SectionId;
    element: HTMLElement;
}

// Mục cuối cùng có đầu đã vượt đường kích hoạt. Ở đáy trang luôn là mục cuối, vì mục cuối (Liên hệ)
// thấp hơn viewport nên không bao giờ chạm đường kích hoạt.
function findActiveId(sections: readonly TrackedSection[]): SectionId | null {
    const last = sections[sections.length - 1];
    if (last === undefined) return null;

    const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
    if (isAtBottom) return last.id;

    const line = window.innerHeight * ACTIVATION_LINE_RATIO;
    let activeId: SectionId | null = null;
    sections.forEach(({ id, element }) => {
        if (element.getBoundingClientRect().top <= line) activeId = id;
    });
    return activeId;
}

// Trả về id của mục đang xem, để tô sáng mục tương ứng trên nav (và đồng bộ hash, xem useSectionHashSync).
// `sectionIds` phải theo đúng thứ tự xuất hiện trên trang.
export function useScrollSpy(
    sectionIds: readonly SectionId[],
): SectionId | null {
    const [activeId, setActiveId] = useState<SectionId | null>(null);

    useEffect(() => {
        const sections = sectionIds.flatMap((id) => {
            const element = document.getElementById(id);
            return element === null ? [] : [{ id, element }];
        });

        // Trang không có các section này (ví dụ trang chi tiết project): không có gì để theo dõi.
        if (sections.length === 0) return undefined;

        let frameId = 0;
        const update = () => {
            frameId = 0;
            setActiveId(findActiveId(sections));
        };
        const schedule = () => {
            if (frameId === 0) frameId = window.requestAnimationFrame(update);
        };

        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.cancelAnimationFrame(frameId);
        };
    }, [sectionIds]);

    return activeId;
}
