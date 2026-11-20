"use client";

import "lenis/dist/lenis.css";
import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

// lerp 0.14: đuổi theo con lăn nhanh, độ trễ cảm nhận được vừa đủ (mặc định của Lenis là 0.1, mượt hơn nhưng "trôi" hơn).
// syncTouch tắt: màn hình cảm ứng giữ cuộn native (quán tính của hệ điều hành), không bị can thiệp.
const LENIS_OPTIONS: LenisOptions = {
    autoRaf: true,
    lerp: 0.14,
    smoothWheel: true,
    syncTouch: false,
    stopInertiaOnNavigate: true,
};

// Cuộn mượt toàn trang. Người dùng bật "giảm chuyển động" thì không gắn Lenis, giữ cuộn native hoàn toàn.
export default function SmoothScroll() {
    const canAnimate = usePrefersMotion();

    if (!canAnimate) return null;

    return <ReactLenis root options={LENIS_OPTIONS} />;
}
