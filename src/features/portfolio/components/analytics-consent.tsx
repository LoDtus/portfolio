"use client";

import { useEffect, useState } from "react";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import {
    loadAnalytics,
    readAnalyticsConsent,
    saveAnalyticsConsent,
    type AnalyticsConsent as ConsentChoice,
} from "@/shared/utils/analytics.util";

// Sự kiện để nút "Cài đặt cookie" ở chân trang mở lại banner.
export const OPEN_ANALYTICS_CONSENT_EVENT = "portfolio:open-analytics-consent";

// Banner đồng ý cookie cho Google Analytics. Chưa đồng ý thì không tải gì của Google; từ chối thì không tải và không hỏi lại
// (lựa chọn lưu trong trình duyệt, đổi được bằng nút "Cài đặt cookie" ở chân trang). Không render nếu chưa cấu hình Measurement ID.
export default function AnalyticsConsent({
    measurementId,
    labels,
}: {
    measurementId: string;
    labels: PortfolioContent["ui"]["analytics"];
}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Đọc lựa chọn đã lưu sau lần render đầu (localStorage chỉ có ở trình duyệt, đọc sớm hơn sẽ lệch với HTML từ server).
        const timer = window.setTimeout(() => {
            const stored = readAnalyticsConsent();
            if (stored === "granted") loadAnalytics(measurementId);
            if (stored === null) setIsOpen(true);
        }, 0);

        const reopen = () => setIsOpen(true);
        window.addEventListener(OPEN_ANALYTICS_CONSENT_EVENT, reopen);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener(OPEN_ANALYTICS_CONSENT_EVENT, reopen);
        };
    }, [measurementId]);

    const choose = (choice: ConsentChoice) => {
        saveAnalyticsConsent(choice);
        if (choice === "granted") loadAnalytics(measurementId);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-label={labels.bannerLabel}
            className="no-print fixed inset-x-0 bottom-0 z-50 border-t-2 border-accent bg-band-deep text-white shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.5)]"
        >
            <div className="site-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-white/90">{labels.message}</p>
                <div className="flex shrink-0 gap-3">
                    <button
                        type="button"
                        onClick={() => choose("granted")}
                        className="btn btn-light cursor-pointer px-6 py-2 text-sm"
                    >
                        {labels.accept}
                    </button>
                    <button
                        type="button"
                        onClick={() => choose("denied")}
                        className="btn btn-on-dark cursor-pointer px-6 py-2 text-sm"
                    >
                        {labels.decline}
                    </button>
                </div>
            </div>
        </div>
    );
}
