import Image from "next/image";
import ExperienceGallery from "@/features/portfolio/components/experience-gallery";
import ExperienceProjects from "@/features/portfolio/components/experience-projects";
import type {
    ExperienceEntry,
    ProjectLinkKind,
} from "@/features/portfolio/types/portfolio.types";

// Thẻ của một nơi làm việc: logo, tên, thời gian, vai trò, mô tả, bộ ảnh rồi các dự án.
// Phần nào chưa có dữ liệu thì bỏ qua hoặc hiện ghi chú "đang cập nhật" thay vì bịa nội dung.
export default function ExperienceEntryCard({
    entry,
    labels,
    autoplayOffsetMs,
}: {
    entry: ExperienceEntry;
    // Độ lệch pha tự chuyển ảnh của bộ ảnh (xem getAutoplayOffsets); null nếu không tự chạy.
    autoplayOffsetMs: number | null;
    labels: {
        pendingNote: string;
        projects: string;
        stack: string;
        links: Record<ProjectLinkKind, string>;
        gallery: { prev: string; next: string; bullet: string };
    };
}) {
    return (
        <article className="card-lift border border-border-main bg-muted p-5 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {/* Logo đặt thẳng trên nền thẻ. Chỉ giao diện tối mới cần nền trắng, vì logo màu xanh đậm sẽ chìm trên nền tối. */}
                <span className="inline-flex h-12 items-center dark:bg-white dark:px-3">
                    <Image
                        src={entry.logo}
                        alt=""
                        width={entry.logoWidth}
                        height={entry.logoHeight}
                        className="h-10 w-auto max-w-44 object-contain dark:h-8"
                    />
                </span>
                <h3 className="font-display text-2xl font-bold text-heading">
                    {entry.companyUrl === null ? (
                        entry.company
                    ) : (
                        <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-draw"
                        >
                            {entry.company}
                        </a>
                    )}
                </h3>
                {entry.period === null ? null : (
                    <span className="bg-band px-4 py-1 text-sm font-bold text-white">
                        {entry.period}
                    </span>
                )}
            </div>

            {entry.role === null ? (
                <p className="mt-4 italic text-text-sub">{labels.pendingNote}</p>
            ) : (
                <p className="mt-4 font-semibold text-accent-ink">{entry.role}</p>
            )}

            {entry.summary === null ? null : (
                <p className="mt-3 leading-7 text-text-main">{entry.summary}</p>
            )}

            {entry.highlights.length === 0 ? null : (
                <ul className="mt-4 space-y-2 text-text-main">
                    {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                            <span
                                aria-hidden="true"
                                className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent"
                            />
                            {highlight}
                        </li>
                    ))}
                </ul>
            )}

            <ExperienceGallery
                photos={entry.photos}
                labels={labels.gallery}
                autoplayOffsetMs={autoplayOffsetMs}
            />

            <ExperienceProjects
                projects={entry.projects}
                labels={{
                    heading: labels.projects,
                    stack: labels.stack,
                    links: labels.links,
                }}
            />
        </article>
    );
}
