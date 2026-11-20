"use client";

import { useEffect } from "react";
import type { SectionId } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";

// Dành cho các route cũ (/vi/education, /vi/experience, /vi/projects): cuộn tới đúng mục
// rồi chuẩn hóa URL về dạng hash (/vi#education) để mọi liên kết cũ vẫn dùng được.
export default function InitialSectionScroller({
    locale,
    sectionId,
}: {
    locale: Locale;
    sectionId: SectionId;
}) {
    useEffect(() => {
        const target = document.getElementById(sectionId);
        if (!target) return;

        target.scrollIntoView({ behavior: "instant", block: "start" });
        window.history.replaceState(
            window.history.state,
            "",
            `/${locale}#${sectionId}`,
        );
    }, [locale, sectionId]);

    return null;
}
