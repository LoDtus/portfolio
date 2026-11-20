"use client";

import { useEffect } from "react";
import {
    REVEAL_HIDE_MARGIN_PX,
    REVEAL_HIDE_ROOT_MARGIN,
    REVEAL_SHOW_ROOT_MARGIN,
} from "@/features/portfolio/constants/reveal.constants";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

const REVEAL_SELECTOR = ".reveal, .reveal-bar";
const ACTIVE_CLASS = "reveal-js";
const REVEALED_CLASS = "is-revealed";

// Điều khiển hiệu ứng xuất hiện khi cuộn (CSS ở mục 6b của globals.css) bằng hai IntersectionObserver lệch nhau:
// - observer "hiện" thêm `is-revealed` khi phần tử vào vùng nhìn thấy (hiệu ứng vào chạy, và chạy lại mỗi lần quay lại);
// - observer "ẩn" gỡ `is-revealed` (đặt lại, tức thì) chỉ khi phần tử đã cách màn hình hơn 100px, tức người xem không thấy nó biến mất.
// Lớp `reveal-js` trên <html> chỉ được thêm trong lần gọi đầu của observer "hiện", cùng lúc với `is-revealed` của các phần tử
// đang hiện, nên phần đang ở trong màn hình lúc mở trang không bị nháy ẩn rồi hiện.
// Không render gì cả; không chạy khi người dùng bật "giảm chuyển động" (nội dung hiện bình thường).
export default function RevealObserver() {
    const prefersMotion = usePrefersMotion();

    useEffect(() => {
        if (!prefersMotion) return undefined;

        const root = document.documentElement;
        const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

        const showObserver = new IntersectionObserver(
            (entries) => {
                root.classList.add(ACTIVE_CLASS);
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add(REVEALED_CLASS);
                });
            },
            { rootMargin: REVEAL_SHOW_ROOT_MARGIN, threshold: 0 },
        );
        const hideObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) return;
                    // Thông báo của hai observer đến bất đồng bộ: một thông báo "đã ra xa" cũ có thể đến sau thông báo "đã vào"
                    // mới. Vì vậy chỉ ẩn khi vị trí thật ngay lúc này vẫn nằm ngoài màn hình quá biên.
                    const { top, bottom } = entry.target.getBoundingClientRect();
                    const isFarAbove = bottom < -REVEAL_HIDE_MARGIN_PX;
                    const isFarBelow = top > window.innerHeight + REVEAL_HIDE_MARGIN_PX;
                    if (isFarAbove || isFarBelow) entry.target.classList.remove(REVEALED_CLASS);
                });
            },
            { rootMargin: REVEAL_HIDE_ROOT_MARGIN, threshold: 0 },
        );
        targets.forEach((target) => {
            showObserver.observe(target);
            hideObserver.observe(target);
        });

        return () => {
            showObserver.disconnect();
            hideObserver.disconnect();
            root.classList.remove(ACTIVE_CLASS);
            targets.forEach((target) => target.classList.remove(REVEALED_CLASS));
        };
    }, [prefersMotion]);

    return null;
}
