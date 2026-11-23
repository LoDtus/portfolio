import type { ProjectConfig } from "@/features/portfolio/constants/profile.constants";
import type {
    PortfolioContent,
    ProjectLink,
} from "@/features/portfolio/types/portfolio.types";

// Bỏ các liên kết có địa chỉ nằm trong danh sách không còn truy cập được.
export function removeUnavailableLinks(
    links: readonly ProjectLink[],
    unavailableUrls: ReadonlySet<string>,
): readonly ProjectLink[] {
    return links.filter((link) => !unavailableUrls.has(link.url));
}

// Dự án cá nhân, chỉ giữ liên kết còn truy cập được.
export function withAvailableProjectLinks(
    projects: readonly ProjectConfig[],
    unavailableUrls: ReadonlySet<string>,
): readonly ProjectConfig[] {
    return projects.map((project) => ({
        ...project,
        links: removeUnavailableLinks(project.links, unavailableUrls),
    }));
}

// Nội dung trang, chỉ giữ liên kết còn truy cập được ở các dự án trong mục Kinh nghiệm.
export function withAvailableExperienceLinks(
    content: PortfolioContent,
    unavailableUrls: ReadonlySet<string>,
): PortfolioContent {
    if (unavailableUrls.size === 0) return content;
    return {
        ...content,
        experience: {
            ...content.experience,
            entries: content.experience.entries.map((entry) => ({
                ...entry,
                projects: entry.projects.map((project) => ({
                    ...project,
                    links: removeUnavailableLinks(project.links, unavailableUrls),
                })),
            })),
        },
    };
}
