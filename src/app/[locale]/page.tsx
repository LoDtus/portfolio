import type { Metadata } from "next";
import PortfolioPage from "@/features/portfolio/components/portfolio-page";
import { requireLocale } from "@/features/portfolio/services/content.service";
import { buildHomeMetadata } from "@/features/portfolio/services/metadata.service";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    return buildHomeMetadata(requireLocale(locale));
}

export default async function LocaleHomePage({ params }: PageProps) {
    const { locale } = await params;
    return <PortfolioPage locale={requireLocale(locale)} initialSection={null} />;
}
