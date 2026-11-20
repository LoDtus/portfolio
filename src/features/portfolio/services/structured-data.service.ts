import {
    CONTACT_CHANNELS,
    EDUCATION,
    PROFILE,
    PROJECTS,
    SAME_AS_URLS,
    SEO,
    SKILL_GROUP_ORDER,
    SKILL_ITEMS,
} from "@/features/portfolio/constants/profile.constants";
import type {
    NeutralSkillGroupId,
    PortfolioContent,
} from "@/features/portfolio/types/portfolio.types";

type JsonLdNode = Record<string, unknown>;

const NEUTRAL_GROUPS = SKILL_GROUP_ORDER.filter(
    (group): group is NeutralSkillGroupId => group !== "soft",
);

// Ưu tiên liên kết trang web, rồi mới tới liên kết đầu tiên của dự án (ví dụ GitHub); null nếu chưa có liên kết nào.
function pickProjectUrl(links: readonly { kind: string; url: string }[]): string | null {
    const website = links.find((link) => link.kind === "website");
    return (website ?? links[0])?.url ?? null;
}

// JSON-LD (schema.org) dạng @graph gồm: WebSite, ProfilePage (trang hồ sơ của một người), Person và danh sách dự án.
// Dùng @id để các nút tham chiếu nhau. Chỉ đưa dữ kiện có thật trong trang (không bịa số liệu, đánh giá).
export function buildPersonJsonLd(
    content: PortfolioContent,
    siteUrl: string,
): JsonLdNode {
    const pageUrl = `${siteUrl}/${content.locale}`;
    const personId = `${siteUrl}/#person`;
    const websiteId = `${siteUrl}/#website`;
    const knowsAbout = NEUTRAL_GROUPS.flatMap((group) => SKILL_ITEMS[group]);
    const imageUrl = `${siteUrl}${SEO.ogImage.path}`;

    const person: JsonLdNode = {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        alternateName: SEO.alternateName,
        jobTitle: content.meta.jobTitle,
        description: content.meta.description,
        url: pageUrl,
        image: `${siteUrl}${PROFILE.portrait.src}`,
        email: `mailto:${PROFILE.email}`,
        telephone: PROFILE.phoneE164,
        address: {
            "@type": "PostalAddress",
            addressLocality: PROFILE.address.locality,
            addressRegion: PROFILE.address.region,
            addressCountry: PROFILE.address.country,
        },
        sameAs: SAME_AS_URLS,
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: EDUCATION.schoolName,
            url: EDUCATION.schoolUrl,
        },
        knowsAbout,
        knowsLanguage: SEO.knowsLanguage,
        contactPoint: CONTACT_CHANNELS.filter(
            (channel) => channel.id === "email" || channel.id === "phone",
        ).map((channel) => ({
            "@type": "ContactPoint",
            contactType: "professional",
            ...(channel.id === "email"
                ? { email: PROFILE.email }
                : { telephone: PROFILE.phoneE164 }),
        })),
    };

    const website: JsonLdNode = {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: PROFILE.name,
        inLanguage: content.locale,
        publisher: { "@id": personId },
    };

    const profilePage: JsonLdNode = {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: content.meta.title,
        description: content.meta.description,
        inLanguage: content.locale,
        dateModified: SEO.contentUpdatedAt,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: imageUrl,
    };

    const projectList: JsonLdNode = {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        name: content.projects.title,
        itemListElement: PROJECTS.map((config, index) => {
            const text = content.projects.items[config.slug];
            const url = pickProjectUrl(config.links);
            return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "CreativeWork",
                    name: text.name,
                    ...(text.summary === null ? {} : { description: text.summary }),
                    ...(url === null ? {} : { url }),
                    ...(config.startedAt === null ? {} : { dateCreated: config.startedAt }),
                    keywords: config.tech.join(", "),
                    inLanguage: content.locale,
                    creator: { "@id": personId },
                },
            };
        }),
    };

    return {
        "@context": "https://schema.org",
        "@graph": [website, profilePage, person, projectList],
    };
}

// Chuỗi an toàn để nhúng trong <script type="application/ld+json">:
// thoát "<" để dữ liệu không thể đóng thẻ script (chống chèn mã).
export function serializeJsonLd(data: JsonLdNode): string {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}
