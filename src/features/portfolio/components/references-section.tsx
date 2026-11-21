import ReferenceCard from "@/features/portfolio/components/reference-card";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { REFERENCES } from "@/features/portfolio/constants/profile.constants";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

export default function ReferencesSection({ content }: { content: PortfolioContent }) {
    const { references } = content;

    return (
        <section
            id="references"
            aria-labelledby="references-title"
            className="border-y border-border-main bg-surface py-20 lg:py-24"
        >
            <div className="site-container">
                <SectionHeading
                    id="references-title"
                    title={references.title}
                    description={references.description}
                    tone="light"
                />

                <ul className="grid gap-6 md:grid-cols-2">
                    {REFERENCES.map((facts, index) => (
                        <li
                            key={facts.id}
                            className={`reveal ${REVEAL_DELAY_CLASSES[index % 2]}`}
                        >
                            <ReferenceCard
                                facts={facts}
                                text={references.items[facts.id]}
                                labels={{
                                    email: references.emailLabel,
                                    phone: references.phoneLabel,
                                    pending: references.pendingNote,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
