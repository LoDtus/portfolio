import CountUp from "@/features/portfolio/components/count-up";
import HighlightedText from "@/features/portfolio/components/highlighted-text";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

export default function AboutSection({ content }: { content: PortfolioContent }) {
    const { about } = content;

    return (
        <section
            aria-labelledby="about-title"
            className="border-y border-border-main bg-surface py-20 lg:py-24"
        >
            <div className="site-container">
                <SectionHeading
                    id="about-title"
                    title={about.title}
                    description={about.description}
                    tone="light"
                />

                <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
                    <div className="space-y-5 text-lg leading-8 text-text-main">
                        {about.paragraphs.map((paragraph, index) => (
                            <p
                                key={paragraph}
                                className={`reveal reveal-left ${REVEAL_DELAY_CLASSES[index % REVEAL_DELAY_CLASSES.length]}`}
                            >
                                <HighlightedText
                                    text={paragraph}
                                    phrases={about.highlights}
                                />
                            </p>
                        ))}
                    </div>

                    <dl className="print-keep grid gap-4">
                        {about.facts.map((fact, index) => (
                            <div
                                key={fact.label}
                                className={`reveal reveal-right ${REVEAL_DELAY_CLASSES[index % REVEAL_DELAY_CLASSES.length]} flex flex-col-reverse border-l-4 border-accent bg-muted p-5`}
                            >
                                <dt className="text-sm text-text-sub">{fact.label}</dt>
                                <dd className="font-display text-3xl font-bold text-heading">
                                    <CountUp value={fact.value} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
