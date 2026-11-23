import Image from "next/image";
import ProjectLinks from "@/features/portfolio/components/project-links";
import TechBadge from "@/features/portfolio/components/tech-badge";
import type { ProjectConfig } from "@/features/portfolio/constants/profile.constants";
import type {
    PortfolioContent,
    ProjectText,
} from "@/features/portfolio/types/portfolio.types";

// Thẻ project: ảnh đại diện (nếu có), thời gian, tên, liên kết (ngay dưới tên), mô tả, các ý chính (đầu tiên là số thành viên và vai trò), công nghệ.
// Phần nào chưa có dữ liệu (mô tả, thời gian) thì bỏ qua, không bịa nội dung.
export default function ProjectCard({
    config,
    text,
    ui,
}: {
    config: ProjectConfig;
    text: ProjectText;
    ui: PortfolioContent["ui"];
}) {
    return (
        <article className="card-lift spotlight flex h-full flex-col border border-border-main bg-surface">
            {config.thumbnail === null ? null : (
                <div className="relative aspect-[2/1] overflow-hidden bg-muted">
                    <Image
                        src={config.thumbnail.src}
                        alt={text.name}
                        width={config.thumbnail.width}
                        height={config.thumbnail.height}
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="size-full object-cover"
                    />
                </div>
            )}

            <div className="flex flex-1 flex-col gap-5 p-6 lg:p-8">
                <div className="space-y-3">
                    {text.period === null ? null : (
                        <p className="text-sm font-semibold text-accent-ink">
                            <span className="sr-only">{ui.periodLabel}: </span>
                            {text.period}
                        </p>
                    )}
                    <h3 className="font-display text-2xl font-bold text-heading">
                        {text.name}
                    </h3>
                    <ProjectLinks
                        projectName={text.name}
                        links={config.links}
                        labels={ui.linkLabels}
                    />
                    {text.summary === null ? null : (
                        <p className="leading-7 text-text-main">{text.summary}</p>
                    )}
                    {/* Các ý chính dạng bullet "nhãn: giá trị": số thành viên và vai trò đứng đầu, rồi tới số liệu thực tế (nếu có). */}
                    <ul className="space-y-2 leading-7 text-text-main">
                        {[{ label: ui.roleLabel, value: text.role }, ...text.facts].map((fact) => (
                            <li key={fact.label} className="flex gap-3">
                                <span
                                    aria-hidden="true"
                                    className="mt-3 size-1.5 shrink-0 rotate-45 bg-accent"
                                />
                                <span>
                                    <span className="font-bold text-heading">{fact.label}:</span>{" "}
                                    {fact.value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto text-sm">
                    <h4 className="mb-2 font-bold text-heading">{ui.stackLabel}</h4>
                    <ul className="flex flex-wrap gap-2">
                        {config.tech.map((item) => (
                            <li key={item}>
                                <TechBadge name={item} tone="outline" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );
}
