import Image from "next/image";
import ProjectLinks from "@/features/portfolio/components/project-links";
import TechBadge from "@/features/portfolio/components/tech-badge";
import type { ProjectConfig } from "@/features/portfolio/constants/profile.constants";
import type {
    PortfolioContent,
    ProjectText,
} from "@/features/portfolio/types/portfolio.types";

// Thẻ project: ảnh đại diện (nếu có), thời gian, tên, liên kết (ngay dưới tên), thẻ vai trò, mô tả, công nghệ.
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
                    {/* Số thành viên và vai trò: cùng một giá trị ở mọi dự án cá nhân nên hiển thị dạng thẻ, không phải một đầu mục. */}
                    <p>
                        <span className="inline-block bg-band px-3 py-1 text-xs font-bold text-white">
                            <span className="sr-only">{ui.roleLabel}: </span>
                            {text.role}
                        </span>
                    </p>
                    {text.summary === null ? null : (
                        <p className="leading-7 text-text-main">{text.summary}</p>
                    )}
                    {text.highlights.length === 0 ? null : (
                        <ul className="space-y-2 leading-7 text-text-main">
                            {text.highlights.map((highlight) => (
                                <li key={highlight} className="flex gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="mt-3 size-1.5 shrink-0 rotate-45 bg-accent"
                                    />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    )}
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
