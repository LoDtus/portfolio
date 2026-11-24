"use client";

import { useEffect } from "react";
import { loadAnalytics } from "@/shared/utils/analytics.util";

// Tải Google Analytics ngay khi người xem vào trang (không có banner đồng ý cookie, theo yêu cầu của chủ trang).
// Không render gì cả; không có Measurement ID thì không được gắn vào trang.
export default function AnalyticsLoader({ measurementId }: { measurementId: string }) {
    useEffect(() => {
        loadAnalytics(measurementId);
    }, [measurementId]);

    return null;
}
