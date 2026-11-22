import ReferenceCard from "@/features/portfolio/components/reference-card";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { REFERENCES } from "@/features/portfolio/constants/profile.constants";
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

                <ul className="space-y-6">
                    {REFERENCES.map((facts) => (
                        <li
                            key={facts.id}
                            className="reveal"
                        >
                            <ReferenceCard
                                facts={facts}
                                text={references.items[facts.id]}
                                labels={{
                                    contact: references.contactLabel,
                                    email: references.emailLabel,
                                    phone: references.phoneLabel,
                                    links: references.linksLabel,
                                    gallery: content.experience.gallery,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
