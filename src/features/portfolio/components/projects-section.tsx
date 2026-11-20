import ProjectCard from "@/features/portfolio/components/project-card";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import { PROJECTS } from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

export default function ProjectsSection({ content }: { content: PortfolioContent }) {
    const { projects } = content;

    return (
        <section
            id="projects"
            aria-labelledby="projects-title"
            className="py-20 lg:py-24"
        >
            <div className="site-container">
                <SectionHeading
                    id="projects-title"
                    title={projects.title}
                    description={projects.description}
                    tone="light"
                />

                <ul className="grid gap-6 md:grid-cols-2">
                    {PROJECTS.map((config, index) => (
                        <li
                            key={config.slug}
                            className={`reveal ${REVEAL_DELAY_CLASSES[index % 2]}`}
                        >
                            <ProjectCard
                                config={config}
                                text={projects.items[config.slug]}
                                ui={content.ui}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
