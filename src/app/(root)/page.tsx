import type { Metadata } from "next";
import LocaleRedirector from "@/components/shared/locale-redirector";
import PortfolioPage from "@/features/portfolio/components/portfolio-page";
import { buildHomeMetadata } from "@/features/portfolio/services/metadata.service";
import { defaultLocale } from "@/shared/constants/i18n.constants";

// "/" hiển thị bản ngôn ngữ mặc định; canonical trỏ về /vi nên không bị tính là nội dung trùng lặp.
export function generateMetadata(): Metadata {
    return buildHomeMetadata(defaultLocale);
}

export default function RootPage() {
    return (
        <>
            <LocaleRedirector />
            <PortfolioPage locale={defaultLocale} initialSection={null} />
        </>
    );
}
