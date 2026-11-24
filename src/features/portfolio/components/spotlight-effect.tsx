"use client";

import { useEffect } from "react";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

const POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const SPOTLIGHT_SELECTOR = ".spotlight";

// Vệt sáng đi theo con trỏ trên các thẻ có lớp `.spotlight` (xem globals.css): chỉ ghi hai biến CSS --mx và --my.
// Một bộ nghe pointermove duy nhất ở document (ủy quyền sự kiện), gom theo khung hình; không nghe sự kiện cuộn.
export default function SpotlightEffect() {
    const prefersMotion = usePrefersMotion();

    useEffect(() => {
        if (!prefersMotion || !window.matchMedia(POINTER_QUERY).matches) {
            return undefined;
        }

        let frameId = 0;
        let pending: PointerEvent | null = null;

        const apply = () => {
            frameId = 0;
            const event = pending;
            pending = null;
            if (event === null || !(event.target instanceof Element)) return;
            const card = event.target.closest<HTMLElement>(SPOTLIGHT_SELECTOR);
            if (card === null) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
            card.style.setProperty("--my", `${event.clientY - rect.top}px`);
        };
        const onMove = (event: PointerEvent) => {
            pending = event;
            if (frameId === 0) frameId = requestAnimationFrame(apply);
        };

        document.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            document.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(frameId);
        };
    }, [prefersMotion]);

    return null;
}
