"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

const MAX_TILT_DEG = 5;
const POINTER_QUERY = "(hover: hover) and (pointer: fine)";

// Khung nghiêng nhẹ theo con trỏ chuột (chỉ khi có chuột, và người dùng không giảm chuyển động).
// Chỉ đổi transform của chính khung này và không nghe sự kiện cuộn, nên không ảnh hưởng thao tác cuộn trang.
export default function TiltFrame({
    children,
    className,
}: {
    children: ReactNode;
    className: string;
}) {
    const frameRef = useRef<HTMLDivElement>(null);
    const prefersMotion = usePrefersMotion();

    useEffect(() => {
        const frame = frameRef.current;
        if (frame === null || !prefersMotion) return undefined;
        if (!window.matchMedia(POINTER_QUERY).matches) return undefined;

        let frameId = 0;
        let offsetX = 0;
        let offsetY = 0;

        const apply = () => {
            frameId = 0;
            frame.style.transform = `perspective(900px) rotateX(${-offsetY * MAX_TILT_DEG * 2}deg) rotateY(${offsetX * MAX_TILT_DEG * 2}deg)`;
        };
        const schedule = () => {
            if (frameId === 0) frameId = requestAnimationFrame(apply);
        };
        const onMove = (event: PointerEvent) => {
            const rect = frame.getBoundingClientRect();
            offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            offsetY = (event.clientY - rect.top) / rect.height - 0.5;
            schedule();
        };
        const onLeave = () => {
            offsetX = 0;
            offsetY = 0;
            schedule();
        };

        frame.addEventListener("pointermove", onMove);
        frame.addEventListener("pointerleave", onLeave);
        return () => {
            frame.removeEventListener("pointermove", onMove);
            frame.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(frameId);
            frame.style.transform = "";
        };
    }, [prefersMotion]);

    return (
        <div ref={frameRef} className={`tilt-frame ${className}`}>
            {children}
        </div>
    );
}
