import CopyAsMarkdown from "@/features/portfolio/components/copy-as-markdown";
import AboutSection from "@/features/portfolio/components/about-section";
import ContactSection from "@/features/portfolio/components/contact-section";
import EducationSection from "@/features/portfolio/components/education-section";
import ExperienceSection from "@/features/portfolio/components/experience-section";
import HeroSection from "@/features/portfolio/components/hero-section";
import InitialSectionScroller from "@/features/portfolio/components/initial-section-scroller";
import ProjectsSection from "@/features/portfolio/components/projects-section";
import ReferencesSection from "@/features/portfolio/components/references-section";
import RevealObserver from "@/features/portfolio/components/reveal-observer";
import SpotlightEffect from "@/features/portfolio/components/spotlight-effect";
import StaticCopyPreparer from "@/features/portfolio/components/static-copy-preparer";
import SiteFooter from "@/features/portfolio/components/site-footer";
import SiteHeader from "@/features/portfolio/components/site-header";
import SkillsSection from "@/features/portfolio/components/skills-section";
import { MAIN_CONTENT_ID } from "@/features/portfolio/constants/sections.constants";
import { getLivePortfolio } from "@/features/portfolio/services/link-availability.service";
import { buildPageMarkdown } from "@/features/portfolio/services/page-markdown.service";
import { resolveProgramUrl } from "@/features/portfolio/services/education-link.service";
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
    // Nội dung đã bỏ các nút "Website" không còn truy cập được (kiểm tra lúc build).
    const { content, projects } = await getLivePortfolio(locale);
    const jsonLd = serializeJsonLd(buildPersonJsonLd(content, projects, getSiteUrl()));
    const programUrl = await resolveProgramUrl();

    return (
        <>
            <SiteHeader locale={locale} content={content} />

            <main id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
                <div id="about">
                    <HeroSection locale={locale} content={content} />
                    <AboutSection content={content} />
                </div>
                <SkillsSection content={content} />
                <EducationSection content={content} programUrl={programUrl} />
                <ExperienceSection content={content} />
                <ProjectsSection content={content} projects={projects} />
                <ReferencesSection content={content} />
                <ContactSection content={content} />
            </main>

            <SiteFooter locale={locale} content={content} />

            <RevealObserver key={locale} />
            <StaticCopyPreparer />
            <SpotlightEffect />
            <CopyAsMarkdown markdown={buildPageMarkdown(content, projects, programUrl, getSiteUrl())} />
            <div aria-hidden="true" className="scroll-progress no-print" />

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
