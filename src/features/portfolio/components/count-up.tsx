"use client";

import { useEffect, useRef } from "react";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

const NUMBER_PATTERN = /\d+(?:[.,]\d+)?/g;
const DURATION_MS = 900;
// Chờ một nhịp để số bắt đầu chạy cùng lúc khung chứa nó hoàn tất hiệu ứng hiện ra.
const START_DELAY_MS = 150;
// Mỗi con số chỉ chạy tối đa ngần này đơn vị trước khi tới giá trị thật (năm 2021 chạy từ 2011, không phải từ 0),
// để số lớn không đếm lâu; số nhỏ hơn thế (GPA, số dự án) vẫn chạy từ 0.
const MAX_COUNT_SPAN = 10;
// Chỉ bắt đầu chạy khi phần lớn con số đã nằm trong màn hình.
const VISIBLE_THRESHOLD = 0.6;

function easeOutCubic(progress: number): number {
    return 1 - (1 - progress) ** 3;
}

interface NumberToken {
    start: number;
    target: number;
    decimals: number;
}

function readToken(match: string): NumberToken {
    const normalized = match.replace(",", ".");
    const dot = normalized.indexOf(".");
    const target = Number(normalized);
    return {
        start: Math.max(0, target - MAX_COUNT_SPAN),
        target,
        decimals: dot === -1 ? 0 : normalized.length - dot - 1,
    };
}

// Chạy mọi con số trong `value` tới giá trị thật (ví dụ "2021 – 2026", "3.2", "4"), giữ nguyên các ký tự còn lại; xem MAX_COUNT_SPAN.
// HTML từ server chứa sẵn giá trị cuối (SEO, không JS, không nhảy bố cục); client đặt về 0 rồi đếm lên khi con số hiện trên màn hình.
// Cập nhật thẳng vào DOM bằng requestAnimationFrame (không setState mỗi khung hình). Giảm chuyển động thì đứng yên ở giá trị cuối.
export default function CountUp({ value }: { value: string }) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const prefersMotion = usePrefersMotion();

    useEffect(() => {
        const element = elementRef.current;
        if (element === null || !prefersMotion) return undefined;

        const format = (progress: number): string =>
            value.replace(NUMBER_PATTERN, (match) => {
                const { start, target, decimals } = readToken(match);
                const current = (start + (target - start) * progress).toFixed(decimals);
                return match.includes(",") ? current.replace(".", ",") : current;
            });

        let frameId = 0;
        let delayId = 0;
        element.textContent = format(0);

        const run = () => {
            const startedAt = performance.now();
            const tick = (now: number) => {
                const progress = Math.min(1, (now - startedAt) / DURATION_MS);
                element.textContent = format(easeOutCubic(progress));
                if (progress < 1) frameId = requestAnimationFrame(tick);
            };
            frameId = requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                observer.disconnect();
                delayId = window.setTimeout(run, START_DELAY_MS);
            },
            { threshold: VISIBLE_THRESHOLD },
        );
        observer.observe(element);

        return () => {
            observer.disconnect();
            window.clearTimeout(delayId);
            cancelAnimationFrame(frameId);
            element.textContent = value;
        };
    }, [value, prefersMotion]);

    // key đổi theo `value` để React thay hẳn phần tử khi đổi ngôn ngữ (không cập nhật vào nút chữ đã bị ta ghi đè).
    return (
        <span key={value} ref={elementRef} className="tabular-nums">
            {value}
        </span>
    );
}
