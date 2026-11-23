import {
    CONTACT_CHANNELS,
    CV_FILES,
    EDUCATION,
    PROFILE,
    PROJECTS,
    REFERENCES,
    SKILL_GROUP_ORDER,
    SKILL_ITEMS,
} from "@/features/portfolio/constants/profile.constants";
import { getTechUrl } from "@/features/portfolio/constants/tech-links.constants";
import type {
    ExperienceProject,
    PortfolioContent,
    ProjectLink,
    SkillGroupId,
} from "@/features/portfolio/types/portfolio.types";
import { formatCopyright } from "@/features/portfolio/utils/copyright.utils";
import { sortExperienceEntries } from "@/features/portfolio/utils/experience.utils";
import { locales } from "@/shared/constants/i18n.constants";

type LinkLabels = PortfolioContent["ui"]["linkLabels"];

function link(label: string, url: string): string {
    return `[${label}](${url})`;
}

function formatLinks(links: readonly ProjectLink[], labels: LinkLabels): string {
    return links.map((item) => link(labels[item.kind], item.url)).join(", ");
}

// Tên công nghệ kèm liên kết trang chủ nếu có (giống thẻ trên trang).
function formatTech(name: string): string {
    const url = getTechUrl(name);
    return url === null ? name : link(name, url);
}

function bullets(items: readonly string[]): string[] {
    return items.map((item) => `- ${item}`);
}

function formatExperienceProject(
    project: ExperienceProject,
    labels: PortfolioContent["ui"],
): string[] {
    const links = formatLinks(project.links, labels.linkLabels);
    return [
        `#### ${project.name}`,
        ...(links === "" ? [] : ["", links]),
        ...(project.summary === null ? [] : ["", project.summary]),
        ...(project.stack.length === 0
            ? []
            : ["", `${labels.stackLabel}: ${project.stack.map(formatTech).join(", ")}`]),
        ...(project.highlights.length === 0 ? [] : ["", ...bullets(project.highlights)]),
        "",
    ];
}

function formatSkills(content: PortfolioContent): string[] {
    return SKILL_GROUP_ORDER.flatMap((group: SkillGroupId) => {
        const items = group === "soft" ? content.skills.softSkills : SKILL_ITEMS[group];
        if (items.length === 0) return [];
        const rendered = group === "soft" ? items : items.map(formatTech);
        return [`### ${content.skills.groups[group]}`, "", rendered.join(", "), ""];
    });
}

function formatExperience(content: PortfolioContent): string[] {
    return sortExperienceEntries(content.experience.entries).flatMap((entry) => {
        const company =
            entry.companyUrl === null ? entry.company : link(entry.company, entry.companyUrl);
        const meta = [entry.role, entry.period].filter((part): part is string => part !== null);
        return [
            `### ${company}`,
            ...(meta.length === 0 ? [] : ["", meta.join(" · ")]),
            ...(entry.summary === null ? [] : ["", entry.summary]),
            ...(entry.highlights.length === 0 ? [] : ["", ...bullets(entry.highlights)]),
            "",
            ...entry.projects.flatMap((project) => formatExperienceProject(project, content.ui)),
        ];
    });
}

function formatProjects(content: PortfolioContent): string[] {
    return PROJECTS.flatMap((config) => {
        const text = content.projects.items[config.slug];
        const links = formatLinks(config.links, content.ui.linkLabels);
        return [
            `### ${text.name}`,
            ...(text.period === null ? [] : ["", text.period]),
            ...(links === "" ? [] : ["", links]),
            ...(text.summary === null ? [] : ["", text.summary]),
            "",
            ...bullets([
                { label: content.ui.roleLabel, value: text.role },
                ...text.facts,
            ].map((fact) => `${fact.label}: ${fact.value}`)),
            "",
            `${content.ui.stackLabel}: ${config.tech.map(formatTech).join(", ")}`,
            "",
        ];
    });
}

function formatReferences(content: PortfolioContent): string[] {
    const { references } = content;
    return REFERENCES.flatMap((facts) => {
        const text = references.items[facts.id];
        return [
            `### ${facts.name}`,
            ...(text.role === null ? [] : ["", text.role]),
            ...(facts.organization === null ? [] : ["", facts.organization]),
            ...(text.summary === null ? [] : ["", text.summary]),
            ...(text.highlights.length === 0 ? [] : ["", ...bullets(text.highlights)]),
            "",
            ...(facts.email === null && facts.phoneE164 === null && facts.links.length === 0
                ? []
                : [`#### ${references.contactLabel}`, ""]),
            ...(facts.email === null
                ? []
                : [`- ${references.emailLabel}: ${link(facts.email, `mailto:${facts.email}`)}`]),
            ...(facts.phoneE164 === null
                ? []
                : [
                      `- ${references.phoneLabel}: ${link(facts.phoneDisplay ?? facts.phoneE164, `tel:${facts.phoneE164}`)}`,
                  ]),
            ...(facts.links.length === 0
                ? []
                : [
                      `- ${references.linksLabel}: ${facts.links.map((item) => link(item.label, item.url)).join(", ")}`,
                  ]),
            "",
        ];
    });
}

// Các bản CV dạng liên kết tuyệt đối (dán đi đâu cũng mở được), bản cùng ngôn ngữ với trang đứng đầu.
function formatCvLinks(content: PortfolioContent, siteUrl: string): string[] {
    const ordered = [content.locale, ...locales.filter((item) => item !== content.locale)];
    return ordered.map(
        (locale) =>
            `- ${link(content.contact.cv.files[locale].label, `${siteUrl}${CV_FILES[locale].href}`)}`,
    );
}

// Toàn bộ nội dung trang dạng markdown thuần (không ảnh, không biểu tượng), theo ngôn ngữ của `content` và đúng thứ tự các mục trên trang.
// Dùng cho thao tác "chọn tất cả rồi sao chép" (xem CopyAsMarkdown). Dựng từ cùng dữ liệu với giao diện nên không lệch khi sửa nội dung;
// mục mới thêm vào trang PHẢI được thêm vào đây (xem .claude/rules/page-markdown.md).
// `programUrl` là địa chỉ nút "Xem ngành học" đã kiểm tra lúc build; `siteUrl` là gốc của trang (để liên kết CV là địa chỉ đầy đủ).
export function buildPageMarkdown(
    content: PortfolioContent,
    programUrl: string,
    siteUrl: string,
): string {
    const { hero, about, skills, education, experience, projects, references, contact, footer } = content;
    const educationLines = [
        `- ${education.school}: ${link(education.major, programUrl)}`,
        `- ${education.periodLabel}: ${EDUCATION.startYear} – ${EDUCATION.endYear}`,
        `- ${education.gpaLabel}: ${EDUCATION.gpa} / ${EDUCATION.gpaScale}`,
    ];
    const channels = CONTACT_CHANNELS.map(
        (channel) =>
            `- ${contact.channels[channel.id].label}: ${link(channel.value, channel.href)}`,
    );

    return [
        `# ${hero.name}`,
        "",
        `**${hero.role}**`,
        "",
        hero.intro,
        "",
        `## ${about.title}`,
        "",
        ...about.paragraphs.flatMap((paragraph) => [paragraph, ""]),
        ...bullets(about.facts.map((fact) => `${fact.label}: ${fact.value}`)),
        "",
        `## ${skills.title}`,
        "",
        ...formatSkills(content),
        `## ${education.title}`,
        "",
        ...educationLines,
        "",
        education.summary,
        "",
        `## ${experience.title}`,
        "",
        ...formatExperience(content),
        `## ${projects.title}`,
        "",
        ...formatProjects(content),
        `- ${link(projects.moreLabel, PROFILE.githubRepositoriesUrl)}`,
        "",
        `## ${references.title}`,
        "",
        ...formatReferences(content),
        `## ${contact.title}`,
        "",
        ...channels,
        "",
        `### ${contact.cv.title}`,
        "",
        ...formatCvLinks(content, siteUrl),
        "",
        "---",
        "",
        footer.credit,
        "",
        formatCopyright(footer),
        "",
    ].join("\n");
}
