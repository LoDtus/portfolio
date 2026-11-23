import { ArrowUpRight } from "lucide-react";
import type {
    ProjectLink,
    ProjectLinkKind,
} from "@/features/portfolio/types/portfolio.types";

// Hàng liên kết của một dự án (trang web, GitHub, Google Play, App Store, YouTube).
// Mỗi liên kết có aria-label gồm tên dự án để người đọc màn hình phân biệt được các nút cùng tên.
export default function ProjectLinks({
    projectName,
    links,
    labels,
    isDiscoverable = true,
}: {
    projectName: string;
    links: readonly ProjectLink[];
    labels: Record<ProjectLinkKind, string>;
    // false: không truyền uy tín tìm kiếm sang trang đích (rel nofollow), dùng cho nơi chỉ liệt kê.
    isDiscoverable?: boolean;
}) {
    if (links.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-2">
            {links.map((link) => (
                <li key={link.url}>
                    <a
                        href={link.url}
                        target="_blank"
                        rel={isDiscoverable ? "noopener noreferrer" : "nofollow noopener noreferrer"}
                        aria-label={`${projectName}: ${labels[link.kind]}`}
                        className="inline-flex items-center gap-1 border border-border-main bg-surface px-3 py-1 text-sm font-semibold text-heading hover:border-band hover:bg-band hover:text-white"
                    >
                        {labels[link.kind]}
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                </li>
            ))}
        </ul>
    );
}
