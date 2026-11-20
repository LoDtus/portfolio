import { notFound } from "next/navigation";
import CONTENT_EN from "@/features/portfolio/constants/content-en.constants";
import CONTENT_VI from "@/features/portfolio/constants/content-vi.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";
import { isSupportedLocale } from "@/shared/utils/locale.util";

const CONTENT_BY_LOCALE: Record<Locale, PortfolioContent> = {
    vi: CONTENT_VI,
    en: CONTENT_EN,
};

export function getPortfolioContent(locale: Locale): PortfolioContent {
    return CONTENT_BY_LOCALE[locale];
}

// Chuyển tham số route (string) thành Locale hợp lệ; locale lạ thì trả về 404.
export function requireLocale(value: string): Locale {
    if (!isSupportedLocale(value)) notFound();
    return value;
}
