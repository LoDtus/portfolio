import {
    CONTACT_CHANNELS,
    EDUCATION,
    PROFILE,
    PROJECTS,
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
import { sortExperienceEntries } from "@/features/portfolio/utils/experience.utils";
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

function formatExperienceProject(
    project: ExperienceProject,
    labels: PortfolioContent["ui"]["linkLabels"],
): string {
    const links = formatLinks(project.links, labels);
    return formatProject(project.name, [
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

    const experience = sortExperienceEntries(main.experience.entries).flatMap((entry) => {
        const heading = [entry.company, entry.role, entry.period]
            .filter((part): part is string => part !== null)
            .join(" · ");
        const site = entry.companyUrl === null ? "" : ` (${entry.companyUrl})`;
        return [
            `### ${heading}${site}`,
            ...entry.projects.map((project) =>
                formatExperienceProject(project, main.ui.linkLabels),
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
            ...text.highlights,
            `${main.ui.roleLabel}: ${text.role}`,
            links === "" ? null : links,
            `Stack: ${config.tech.join(", ")}`,
        ]);
    });

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
        "",
        `## ${main.nav.education}`,
        `- [${EDUCATION.schoolName}](${EDUCATION.schoolUrl}): ${main.education.major}, ${EDUCATION.startYear} – ${EDUCATION.endYear}, GPA ${EDUCATION.gpa}/${EDUCATION.gpaScale}`,
        "",
        `## ${main.nav.experience}`,
        ...experience,
        `## ${main.nav.projects}`,
        ...projects,
        "",
        `## ${main.nav.contact}`,
        ...contacts,
        "",
    ].join("\n");
}
