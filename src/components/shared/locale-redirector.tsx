"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/shared/constants/i18n.constants";
import { resolvePreferredLocale } from "@/shared/utils/locale.util";

// Chỉ chạy tại "/" — không đặt ở bất kỳ trang /[locale]/... nào khác,
// để tôn trọng đúng URL người dùng/Googlebot đã truy cập trực tiếp
// (theo khuyến nghị SEO quốc tế của Google: không tự ý redirect người
// dùng đã vào đúng 1 URL locale cụ thể).
export default function LocaleRedirector() {
    const router = useRouter();

    useEffect(() => {
        let hasInteracted = false;

        const triggerRedirectOnce = () => {
            if (hasInteracted) return;
            hasInteracted = true;

            const preferred = resolvePreferredLocale();
            if (preferred !== defaultLocale) {
                router.replace(`/${preferred}`);
            }

            window.removeEventListener("scroll", triggerRedirectOnce);
            window.removeEventListener("pointerdown", triggerRedirectOnce);
        };

        // Người dùng thật gần như luôn scroll/click trong vài giây đầu —
        // nếu không có tương tác nào (khả năng cao là crawler), không redirect.
        const fallbackTimer = setTimeout(triggerRedirectOnce, 3000);

        window.addEventListener("scroll", triggerRedirectOnce, { once: true });
        window.addEventListener("pointerdown", triggerRedirectOnce, {
            once: true,
        });

        return () => {
            clearTimeout(fallbackTimer);
            window.removeEventListener("scroll", triggerRedirectOnce);
            window.removeEventListener("pointerdown", triggerRedirectOnce);
        };
    }, [router]);

    return null;
}
