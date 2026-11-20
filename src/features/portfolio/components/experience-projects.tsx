import ProjectLinks from "@/features/portfolio/components/project-links";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import type {
    ExperienceProject,
    ProjectLinkKind,
} from "@/features/portfolio/types/portfolio.types";

// Các dự án đã làm tại một nơi: thẻ nhỏ gồm tên, liên kết, mô tả, ý chính và danh sách công nghệ.
// Phần nào chưa có dữ liệu (mô tả null, không có link, không có stack) thì bỏ hẳn, không bịa nội dung.
export default function ExperienceProjects({
    projects,
    labels,
}: {
    projects: readonly ExperienceProject[];
    labels: {
        heading: string;
        stack: string;
        links: Record<ProjectLinkKind, string>;
    };
}) {
    if (projects.length === 0) return null;

    return (
        <div className="mt-8">
            <h4 className="reveal flex items-center gap-3 font-display text-sm font-bold uppercase tracking-widest text-heading">
                <span aria-hidden="true" className="h-4 w-1 bg-accent" />
                {labels.heading}
            </h4>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {projects.map((project, index) => (
                    <li
                        key={project.id}
                        className={`reveal ${REVEAL_DELAY_CLASSES[index % 2]}`}
                    >
                        <article className="card-lift flex h-full flex-col gap-4 border border-border-main bg-surface p-5">
                            <h5 className="font-display text-lg font-bold text-heading">
                                {project.name}
                            </h5>
                            {project.summary === null ? null : (
                                <p className="leading-7 text-text-main">
                                    {project.summary}
                                </p>
                            )}
                            {project.highlights.length === 0 ? null : (
                                <ul className="space-y-2 text-sm leading-6 text-text-main">
                                    {project.highlights.map((highlight) => (
                                        <li key={highlight} className="flex gap-3">
                                            <span
                                                aria-hidden="true"
                                                className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent"
                                            />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <ProjectLinks
                                projectName={project.name}
                                links={project.links}
                                labels={labels.links}
                            />
                            {project.stack.length === 0 ? null : (
                                <ul
                                    aria-label={labels.stack}
                                    className="mt-auto flex flex-wrap gap-1.5"
                                >
                                    {project.stack.map((item) => (
                                        <li
                                            key={item}
                                            className="border border-border-main bg-muted px-2 py-0.5 text-xs font-semibold text-text-main"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}
