import SectionHeading from "@/features/portfolio/components/section-heading";
import TechBadge from "@/features/portfolio/components/tech-badge";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import {
    SKILL_GROUP_ORDER,
    SKILL_ITEMS,
} from "@/features/portfolio/constants/profile.constants";
import type {
    PortfolioContent,
    SkillGroupId,
} from "@/features/portfolio/types/portfolio.types";

// Thẻ kỹ năng trên nền indigo, theo kiểu thẻ "chương trình đào tạo" của thanglong.edu.vn.
// Nhóm không có mục nào thì không render.
export default function SkillsSection({ content }: { content: PortfolioContent }) {
    const { skills } = content;
    // Kỹ năng mềm có chữ theo ngôn ngữ nên lấy từ nội dung; các nhóm còn lại dùng danh sách chung.
    const getItems = (group: SkillGroupId): readonly string[] =>
        group === "soft" ? skills.softSkills : SKILL_ITEMS[group];
    const groups = SKILL_GROUP_ORDER.filter(
        (group) => getItems(group).length > 0,
    );

    return (
        <section
            id="skills"
            aria-labelledby="skills-title"
            className="bg-band py-20 text-white lg:py-24"
        >
            <div className="site-container">
                <SectionHeading
                    id="skills-title"
                    title={skills.title}
                    description={skills.description}
                    tone="dark"
                />

                <ul className="grid grid-cols-2 gap-3 sm:gap-6">
                    {groups.map((group, index) => (
                        <li
                            key={group}
                            className={`reveal min-w-0 [&:last-child:nth-child(odd)]:col-span-2 ${REVEAL_DELAY_CLASSES[index % 2]}`}
                        >
                            <article className="card-lift spotlight spotlight-on-dark h-full border border-white/20 bg-white/5 p-4 sm:p-6 lg:p-8">
                                <p className="font-display text-[length:clamp(0.6875rem,3vw,0.875rem)] font-bold tracking-widest text-brand-mint">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h3 className="mb-4 mt-2 break-words font-display text-[length:clamp(1rem,5vw,1.5rem)] font-bold leading-tight sm:mb-5">
                                    {skills.groups[group]}
                                </h3>
                                <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {getItems(group).map((item, itemIndex) => (
                                        <li
                                            key={item}
                                            className={`reveal reveal-pop ${REVEAL_DELAY_CLASSES[itemIndex % REVEAL_DELAY_CLASSES.length]} max-w-full`}
                                        >
                                            <TechBadge name={item} tone="onDark" />
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
