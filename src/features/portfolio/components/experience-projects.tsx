import ProjectLinks from "@/features/portfolio/components/project-links";
import TechBadge from "@/features/portfolio/components/tech-badge";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import type {
    ExperienceProject,
    ProjectLinkKind,
} from "@/features/portfolio/types/portfolio.types";

// Các dự án đã làm tại một nơi: thẻ nhỏ gồm tên, liên kết (ngay dưới tên), mô tả dự án là gì, công nghệ, rồi các ý về vai trò và kết quả.
// Phần nào chưa có dữ liệu (mô tả null, không có link, không có stack) thì bỏ hẳn, không bịa nội dung.
export default function ExperienceProjects({
    projects,
    labels,
    isDiscoverable,
}: {
    projects: readonly ExperienceProject[];
    isDiscoverable: boolean;
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
                        className={`reveal md:[&:last-child:nth-child(odd)]:col-span-2 ${REVEAL_DELAY_CLASSES[index % 2]}`}
                    >
                        <article className="card-lift spotlight flex h-full flex-col gap-4 border border-border-main bg-surface p-5">
                            <h5 className="font-display text-lg font-bold text-heading">
                                {project.name}
                            </h5>
                            <ProjectLinks
                                projectName={project.name}
                                links={project.links}
                                labels={labels.links}
                                isDiscoverable={isDiscoverable}
                            />
                            {project.summary === null ? null : (
                                <p className="leading-7 text-text-main">
                                    {project.summary}
                                </p>
                            )}
                            {project.stack.length === 0 ? null : (
                                <div className="text-sm">
                                    {/* Cùng tiêu đề "Công nghệ sử dụng" như thẻ ở mục Dự án cá nhân. */}
                                    <h6 className="mb-2 font-bold text-heading">{labels.stack}</h6>
                                    <ul className="flex flex-wrap gap-1.5">
                                        {project.stack.map((item) => (
                                            <li key={item}>
                                                <TechBadge name={item} tone="muted" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
}
