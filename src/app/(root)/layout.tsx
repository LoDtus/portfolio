import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import DocumentShell from "@/components/shared/document-shell";
import { SITE_VIEWPORT } from "@/features/portfolio/services/metadata.service";
import { defaultLocale } from "@/shared/constants/i18n.constants";
import { getSiteUrl } from "@/shared/utils/site-url.util";

export const viewport = SITE_VIEWPORT;

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
};

// Root layout cho "/" và /error/*: những trang không nằm dưới một locale cụ thể.
export default function RootGroupLayout({ children }: { children: ReactNode }) {
    return <DocumentShell lang={defaultLocale}>{children}</DocumentShell>;
}
