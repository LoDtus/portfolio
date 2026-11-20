import GeometricMosaic from "@/features/portfolio/components/geometric-mosaic";
import ProjectLinks from "@/features/portfolio/components/project-links";
import type { ProjectConfig } from "@/features/portfolio/constants/profile.constants";
import type {
    PortfolioContent,
    ProjectText,
} from "@/features/portfolio/types/portfolio.types";

// Thẻ project: hình khối riêng (không cần ảnh chụp), tên, thời gian, mô tả, số thành viên và vai trò, công nghệ, liên kết.
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
        <article className="card-lift flex h-full flex-col border border-border-main bg-surface">
            <div className="relative aspect-[2/1] overflow-hidden bg-bg-main">
                <GeometricMosaic
                    variant={config.mosaic}
                    rows={2}
                    className="absolute inset-0 h-full w-full"
                />
            </div>

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

                <dl className="space-y-3 text-sm">
                    <div>
                        <dt className="font-bold text-heading">{ui.roleLabel}</dt>
                        <dd className="text-text-sub">{text.role}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-bold text-heading">{ui.stackLabel}</dt>
                        <dd>
                            <ul className="flex flex-wrap gap-2">
                                {config.tech.map((item) => (
                                    <li
                                        key={item}
                                        className="border border-border-main px-2.5 py-1 font-semibold text-text-main"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>

                <div className="mt-auto pt-2">
                    <ProjectLinks
                        projectName={text.name}
                        links={config.links}
                        labels={ui.linkLabels}
                    />
                </div>
            </div>
        </article>
    );
}
