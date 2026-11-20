import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import DocumentShell from "@/components/shared/document-shell";
import { SITE_VIEWPORT } from "@/features/portfolio/services/metadata.service";
import { requireLocale } from "@/features/portfolio/services/content.service";
import { locales } from "@/shared/constants/i18n.constants";
import { getSiteUrl } from "@/shared/utils/site-url.util";

export const dynamicParams = false;

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export const viewport = SITE_VIEWPORT;

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
};

// Root layout của từng ngôn ngữ: đặt <html lang> đúng với nội dung (vi/en).
export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <DocumentShell lang={requireLocale(locale)}>{children}</DocumentShell>;
}
