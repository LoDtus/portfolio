import Image from "next/image";
import type { CSSProperties } from "react";
import HighlightedText from "@/features/portfolio/components/highlighted-text";
import SectionLink from "@/features/portfolio/components/section-link";
import TiltFrame from "@/features/portfolio/components/tilt-frame";
import { PROFILE } from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";

// Hero một mình trên màn hình đầu tiên. Bên phải là ảnh chân dung (đã có sẵn vòng tròn nền, đầu nhô ra khỏi vòng).
export default function HeroSection({
    locale,
    content,
}: {
    locale: Locale;
    content: PortfolioContent;
}) {
    const { hero } = content;

    return (
        <section
            aria-labelledby="hero-title"
            className="bg-bg-main"
        >
            <div className="print-auto-height site-container grid min-h-[calc(100dvh-6.75rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <div>
                    <p
                        data-enter
                        style={{ "--enter-index": 0 } as CSSProperties}
                        className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-ink"
                    >
                        <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
                        {hero.eyebrow}
                    </p>
                    {/* Mỗi từ của tên trồi lên từ sau một "khung cắt" (xem .hero-word trong globals.css), lần lượt từng từ. */}
                    <h1
                        id="hero-title"
                        className="font-display text-5xl font-bold uppercase leading-[1.05] text-heading sm:text-6xl lg:text-7xl"
                    >
                        {hero.name.split(" ").map((word, index) => (
                            <span key={`${word}-${index}`}>
                                {index > 0 ? " " : null}
                                <span className="hero-word-mask">
                                    <span
                                        className="hero-word"
                                        style={{ "--word-index": index } as CSSProperties}
                                    >
                                        {word}
                                    </span>
                                </span>
                            </span>
                        ))}
                    </h1>
                    <p
                        data-enter
                        style={{ "--enter-index": 2 } as CSSProperties}
                        className="mt-5 text-balance font-display text-xl font-semibold text-accent-ink sm:text-2xl"
                    >
                        {hero.role}
                    </p>
                    <p
                        data-enter
                        style={{ "--enter-index": 3 } as CSSProperties}
                        className="mt-8 max-w-xl text-lg leading-8 text-text-main"
                    >
                        <HighlightedText
                            text={hero.intro}
                            phrases={[hero.introHighlight]}
                        />
                    </p>
                    <div
                        data-enter
                        style={{ "--enter-index": 4 } as CSSProperties}
                        className="no-print mt-10 flex flex-wrap gap-4"
                    >
                        <SectionLink
                            locale={locale}
                            sectionId="projects"
                            isActive={false}
                            className="btn btn-primary"
                            onNavigate={null}
                        >
                            {hero.primaryCta}
                        </SectionLink>
                        <SectionLink
                            locale={locale}
                            sectionId="contact"
                            isActive={false}
                            className="btn btn-outline"
                            onNavigate={null}
                        >
                            {hero.secondaryCta}
                        </SectionLink>
                    </div>
                </div>

                <TiltFrame className="mx-auto w-full max-w-md lg:max-w-lg">
                    <Image
                        src={PROFILE.portrait.src}
                        alt={hero.photoAlt}
                        width={PROFILE.portrait.width}
                        height={PROFILE.portrait.height}
                        priority
                        sizes="(min-width: 1024px) 512px, 90vw"
                        className="h-auto w-full"
                    />
                </TiltFrame>
            </div>
        </section>
    );
}
