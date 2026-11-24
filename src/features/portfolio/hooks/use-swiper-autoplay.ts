"use client";

import { useEffect, type RefObject } from "react";
import type { Swiper as SwiperInstance } from "swiper/types";
import { GALLERY_VISIBLE_THRESHOLD } from "@/features/portfolio/constants/experience.constants";

// Điều khiển tự chuyển ảnh của một Swiper: chỉ chạy khi khung ảnh đang hiện trên màn hình (sau `offsetMs`), dừng khi đã cuộn qua.
// `isAutoplay` false thì chỉ dừng hẳn (một ảnh, người dùng giảm chuyển động, hoặc không yêu cầu tự chạy).
export function useSwiperAutoplay({
    swiper,
    containerRef,
    isAutoplay,
    offsetMs,
}: {
    swiper: SwiperInstance | null;
    containerRef: RefObject<HTMLElement | null>;
    isAutoplay: boolean;
    offsetMs: number;
}): void {
    useEffect(() => {
        const container = containerRef.current;
        if (swiper === null || container === null) return undefined;

        // Khi Swiper bị gỡ (ví dụ đổi ngôn ngữ làm trang mới thay trang cũ), nó tự destroy() và xóa module `autoplay`;
        // gọi tiếp `swiper.autoplay.stop()` lúc đó sẽ ném lỗi và làm cả trang báo "This page couldn't load".
        const stopAutoplay = () => {
            if (!swiper.destroyed) swiper.autoplay.stop();
        };
        const startAutoplay = () => {
            if (!swiper.destroyed) swiper.autoplay.start();
        };

        // Swiper tự bắt đầu chạy ngay khi khởi tạo; dừng lại để ta quyết định lúc bắt đầu (lệch pha, đang hiện).
        stopAutoplay();
        if (!isAutoplay) return undefined;

        let timerId: number | undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                window.clearTimeout(timerId);
                if (entry?.isIntersecting) {
                    timerId = window.setTimeout(startAutoplay, offsetMs);
                } else {
                    stopAutoplay();
                }
            },
            { threshold: GALLERY_VISIBLE_THRESHOLD },
        );
        observer.observe(container);

        return () => {
            observer.disconnect();
            window.clearTimeout(timerId);
            stopAutoplay();
        };
    }, [swiper, containerRef, isAutoplay, offsetMs]);
}
