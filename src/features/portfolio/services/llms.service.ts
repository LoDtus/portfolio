import {
    CONTACT_CHANNELS,
    CV_FILES,
    EDUCATION,
    PROFILE,
    PROJECTS,
    REFERENCES,
    SEO,
    SKILL_GROUP_ORDER,
    SKILL_ITEMS,
} from "@/features/portfolio/constants/profile.constants";
import { getPortfolioContent } from "@/features/portfolio/services/content.service";
import type {
    ExperienceProject,
    PortfolioContent,
    ProjectLink,
    SkillGroupId,
} from "@/features/portfolio/types/portfolio.types";
import {
    sortExperienceEntries,
    stripBrandPrefix,
} from "@/features/portfolio/utils/experience.utils";
import { defaultLocale, locales } from "@/shared/constants/i18n.constants";

function formatLinks(
    links: readonly ProjectLink[],
    labels: PortfolioContent["ui"]["linkLabels"],
): string {
    return links.map((link) => `[${labels[link.kind]}](${link.url})`).join(", ");
}

function formatProject(
    name: string,
    parts: readonly (string | null)[],
): string {
    const details = parts.filter((part): part is string => part !== null && part !== "");
    return details.length === 0 ? `- ${name}` : `- ${name}: ${details.join(" · ")}`;
}

// Nơi chỉ liệt kê (`isDiscoverable: false`): bỏ tên sản phẩm (phần trước " - ") và liên kết, chỉ giữ chủ đề và công việc.
function formatExperienceProject(
    project: ExperienceProject,
    labels: PortfolioContent["ui"]["linkLabels"],
    isDiscoverable: boolean,
): string {
    const links = isDiscoverable ? formatLinks(project.links, labels) : "";
    const name = isDiscoverable
        ? project.name
        : (project.searchName ?? stripBrandPrefix(project.name));
    return formatProject(name, [
        project.summary,
        ...project.highlights,
        links === "" ? null : links,
        project.stack.length === 0 ? null : `Stack: ${project.stack.join(", ")}`,
    ]);
}

function formatSkills(content: PortfolioContent): string[] {
    return SKILL_GROUP_ORDER.flatMap((group: SkillGroupId) => {
        const items = group === "soft" ? content.skills.softSkills : SKILL_ITEMS[group];
        return items.length === 0
            ? []
            : [`- ${content.skills.groups[group]}: ${items.join(", ")}`];
    });
}

// Bản tóm tắt dạng markdown cho AI/LLM đọc nhanh (đề xuất llms.txt): ai, làm gì, ở đâu, kỹ năng, kinh nghiệm,
// dự án, cách liên hệ, kèm liên kết thật. Chỉ dùng dữ kiện đã có trên trang. Viết bằng ngôn ngữ mặc định (vi),
// kèm tóm tắt tiếng Anh ngắn ở đầu cho các hệ thống đọc tiếng Anh.
export async function buildLlmsTxt(siteUrl: string): Promise<string> {
    const main = getPortfolioContent(defaultLocale);
    const english = getPortfolioContent("en");

    const pages = locales.map((locale) => {
        const content = getPortfolioContent(locale);
        return `- [${content.meta.title}](${siteUrl}/${locale}) (${locale}): ${content.meta.description}`;
    });

    // Nơi chỉ liệt kê: không nêu tên nơi làm, chỉ giữ vai trò, thời gian và chủ đề công việc.
    const experience = sortExperienceEntries(main.experience.entries).flatMap((entry) => {
        const heading = [entry.isDiscoverable ? entry.company : null, entry.role, entry.period]
            .filter((part): part is string => part !== null)
            .join(" · ");
        const site = entry.isDiscoverable && entry.companyUrl !== null ? ` (${entry.companyUrl})` : "";
        return [
            `### ${heading}${site}`,
            ...entry.projects.map((project) =>
                formatExperienceProject(project, main.ui.linkLabels, entry.isDiscoverable),
            ),
            "",
        ];
    });

    const projects = PROJECTS.map((config) => {
        const text = main.projects.items[config.slug];
        const links = formatLinks(config.links, main.ui.linkLabels);
        return formatProject(text.name, [
            text.period,
            text.summary,
            `${main.ui.roleLabel}: ${text.role}`,
            ...text.facts.map((fact) => `${fact.label}: ${fact.value}`),
            links === "" ? null : links,
            `Stack: ${config.tech.join(", ")}`,
        ]);
    });

    const references = REFERENCES.map((facts) => {
        const text = main.references.items[facts.id];
        const links = facts.links.map((item) => `[${item.label}](${item.url})`).join(", ");
        return formatProject(facts.name, [text.role, links === "" ? null : links]);
    });

    const cvLinks = locales.map(
        (locale) =>
            `- [${main.contact.cv.files[locale].label}](${siteUrl}${CV_FILES[locale].href})`,
    );

    const contacts = CONTACT_CHANNELS.map(
        (channel) =>
            `- ${main.contact.channels[channel.id].label}: [${channel.value}](${channel.href})`,
    );

    return [
        `# ${PROFILE.name}`,
        "",
        `> ${main.meta.description}`,
        "",
        `${english.meta.description}`,
        "",
        "## Portfolio",
        ...pages,
        "",
        `## ${main.nav.skills}`,
        ...formatSkills(main),
        `- Lĩnh vực / Domain: ${[...new Set([...SEO.domainTopics.vi, ...SEO.domainTopics.en])].join(", ")}`,
        "",
        `## ${main.nav.education}`,
        `- [${EDUCATION.schoolName}](${EDUCATION.schoolUrl}): ${main.education.major}, ${EDUCATION.startYear} – ${EDUCATION.endYear}, GPA ${EDUCATION.gpa}/${EDUCATION.gpaScale}`,
        "",
        `## ${main.nav.experience}`,
        ...experience,

        `## ${main.projects.title}`,
        ...projects,
        `- [${main.projects.moreLabel}](${PROFILE.githubRepositoriesUrl})`,
        "",
        `## ${main.nav.references}`,
        ...references,
        "",
        `## ${main.nav.contact}`,
        ...contacts,
        "",
        `### ${main.contact.cv.title}`,
        ...cvLinks,
        "",
    ].join("\n");
}
