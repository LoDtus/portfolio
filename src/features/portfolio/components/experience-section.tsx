import ExperienceEntryCard from "@/features/portfolio/components/experience-entry-card";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { GALLERY_AUTOPLAY_PERIOD_MS } from "@/features/portfolio/constants/experience.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import { getAutoplayOffsets, sortExperienceEntries } from "@/features/portfolio/utils/experience.utils";

// Timeline dọc với điểm mốc hình thoi đỏ (giữ mô-típ của timeline cũ), xếp từ gần nhất đến xa nhất.
// Mỗi mốc là một thẻ nơi làm việc (xem ExperienceEntryCard).
export default function ExperienceSection({ content }: { content: PortfolioContent }) {
    const { experience } = content;
    const entries = sortExperienceEntries(experience.entries);
    const autoplayOffsets = getAutoplayOffsets(entries, GALLERY_AUTOPLAY_PERIOD_MS);

    return (
        <section
            id="experience"
            aria-labelledby="experience-title"
            className="border-y border-border-main bg-surface py-20 lg:py-24"
        >
            <div className="site-container">
                <SectionHeading
                    id="experience-title"
                    title={experience.title}
                    description={experience.description}
                    tone="light"
                />

                <ol className="ml-2 space-y-8 border-l-2 border-border-main pl-6 sm:ml-4 sm:pl-8">
                    {entries.map((entry, index) => (
                        <li key={entry.id} className="reveal relative">
                            <span
                                aria-hidden="true"
                                className="reveal reveal-pop reveal-d1 absolute -left-[2.1rem] top-8 size-4 rotate-45 bg-accent sm:-left-[2.5rem]"
                            />
                            <ExperienceEntryCard
                                entry={entry}
                                autoplayOffsetMs={autoplayOffsets[index] ?? null}
                                labels={{
                                    pendingNote: experience.pendingNote,
                                    projects: experience.projectsLabel,
                                    stack: content.ui.stackLabel,
                                    links: content.ui.linkLabels,
                                    gallery: experience.gallery,
                                }}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
