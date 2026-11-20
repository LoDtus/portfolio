import AboutSection from "@/features/portfolio/components/about-section";
import ContactSection from "@/features/portfolio/components/contact-section";
import EducationSection from "@/features/portfolio/components/education-section";
import ExperienceSection from "@/features/portfolio/components/experience-section";
import HeroSection from "@/features/portfolio/components/hero-section";
import InitialSectionScroller from "@/features/portfolio/components/initial-section-scroller";
import ProjectsSection from "@/features/portfolio/components/projects-section";
import RevealObserver from "@/features/portfolio/components/reveal-observer";
import SiteFooter from "@/features/portfolio/components/site-footer";
import SiteHeader from "@/features/portfolio/components/site-header";
import SkillsSection from "@/features/portfolio/components/skills-section";
import { MAIN_CONTENT_ID } from "@/features/portfolio/constants/sections.constants";
import { getPortfolioContent } from "@/features/portfolio/services/content.service";
import {
    buildPersonJsonLd,
    serializeJsonLd,
} from "@/features/portfolio/services/structured-data.service";
import type { SectionId } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";
import { getSiteUrl } from "@/shared/utils/site-url.util";

// Một trang cuộn render hoàn toàn phía server (chữ nằm sẵn trong HTML cho HR và AI quét).
// `initialSection` chỉ dùng cho các route cũ cuộn tới một mục khi mở.
export default async function PortfolioPage({
    locale,
    initialSection,
}: {
    locale: Locale;
    initialSection: SectionId | null;
}) {
    const content = getPortfolioContent(locale);
    const jsonLd = serializeJsonLd(buildPersonJsonLd(content, getSiteUrl()));

    return (
        <>
            <SiteHeader locale={locale} content={content} />

            <main id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
                <div id="about">
                    <HeroSection locale={locale} content={content} />
                    <AboutSection content={content} />
                </div>
                <SkillsSection content={content} />
                <EducationSection content={content} />
                <ExperienceSection content={content} />
                <ProjectsSection content={content} />
                <ContactSection content={content} />
            </main>

            <SiteFooter locale={locale} content={content} />

            <RevealObserver key={locale} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd }}
            />

            {initialSection !== null ? (
                <InitialSectionScroller locale={locale} sectionId={initialSection} />
            ) : null}
        </>
    );
}
