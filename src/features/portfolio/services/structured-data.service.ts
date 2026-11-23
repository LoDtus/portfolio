import {
    CONTACT_CHANNELS,
    EDUCATION,
    PROFILE,
    PROJECTS,
    REFERENCES,
    SAME_AS_URLS,
    SEO,
    SKILL_GROUP_ORDER,
    SKILL_ITEMS,
} from "@/features/portfolio/constants/profile.constants";
import type {
    NeutralSkillGroupId,
    PortfolioContent,
    ReferenceFacts,
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

// Trường đã học: tên tiếng Anh, tên tiếng Việt và các cách gọi phổ biến, kèm địa điểm và năm thành lập,
// cùng trang Wikipedia, để công cụ tìm kiếm nối đúng thực thể khi người dùng tìm theo "Đại học Thăng Long".
function buildSchoolNode(): JsonLdNode {
    return {
        "@type": "CollegeOrUniversity",
        name: EDUCATION.schoolName,
        alternateName: EDUCATION.schoolAlternateNames,
        url: EDUCATION.schoolUrl,
        sameAs: [EDUCATION.schoolWikipediaUrl],
        foundingDate: String(EDUCATION.foundedYear),
        address: {
            "@type": "PostalAddress",
            addressLocality: EDUCATION.schoolLocality,
            addressCountry: PROFILE.address.country,
        },
    };
}

// Người tham chiếu là một Person riêng (không gộp vào chủ trang), nối với chủ trang bằng `colleague`.
// Chỉ đưa dữ kiện đã hiển thị trên trang; cố ý không đưa email và số điện thoại của họ vào dữ liệu có cấu trúc.
function buildReferenceNode(
    facts: ReferenceFacts,
    content: PortfolioContent,
    siteUrl: string,
): JsonLdNode {
    const text = content.references.items[facts.id];
    const { seo } = facts;
    const [photo] = facts.photos;
    // Phần giới thiệu hiển thị trên trang: đoạn văn (nếu có) rồi các ý chính, nối thành một mô tả.
    const description = [text.summary, ...text.highlights]
        .filter((part): part is string => part !== null)
        .join(" ");
    const parent =
        seo.parentOrganization === null
            ? {}
            : {
                  parentOrganization: {
                      "@type": "Organization",
                      name: seo.parentOrganization,
                  },
              };

    return {
        "@type": "Person",
        "@id": `${siteUrl}/#reference-${facts.id}`,
        name: facts.name,
        alternateName: seo.alternateNames,
        ...(text.role === null ? {} : { jobTitle: text.role }),
        ...(description === "" ? {} : { description }),
        ...(photo === undefined ? {} : { image: `${siteUrl}${photo.src}` }),
        sameAs: facts.links.map((link) => link.url),
        ...(seo.worksFor.length === 0
            ? {}
            : {
                  worksFor: seo.worksFor.map((org) => ({
                      "@type": "Organization",
                      name: org.name,
                      ...(org.url === null ? {} : { url: org.url }),
                      ...parent,
                  })),
              }),
        ...(seo.alumniOf === null
            ? {}
            : { alumniOf: { "@type": "EducationalOrganization", name: seo.alumniOf } }),
        knowsAbout: seo.knowsAbout,
    };
}

// Tên công ty, tổ chức, sự kiện được nhắc trong phần giới thiệu người tham chiếu: trang "nhắc tới" các tên này.
function collectReferenceMentions(): readonly JsonLdNode[] {
    const names = REFERENCES.flatMap(({ seo }) => [
        ...seo.worksFor.map((org) => org.name),
        ...(seo.parentOrganization === null ? [] : [seo.parentOrganization]),
        ...seo.mentions,
    ]);
    return [...new Set(names)].map((name) => ({ "@type": "Thing", name }));
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
    // Bỏ phần chú thích trong ngoặc ("Cloudflare ecosystem (Tunnel, Workers, Pages, R2)" -> "Cloudflare ecosystem") để tên gọn như người ta tìm kiếm.
    const knowsAbout = NEUTRAL_GROUPS.flatMap((group) => SKILL_ITEMS[group]).map(
        (name) => name.replace(/\s*\(.*\)$/, ""),
    );
    const topics = [...knowsAbout, ...SEO.domainTopics[content.locale]];
    const imageUrl = `${siteUrl}${SEO.ogImage.path}`;

    const person: JsonLdNode = {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        alternateName: SEO.alternateNames,
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
        alumniOf: buildSchoolNode(),
        colleague: REFERENCES.map((facts) => ({
            "@id": `${siteUrl}/#reference-${facts.id}`,
        })),
        knowsAbout: topics,
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
        mentions: collectReferenceMentions(),
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
        "@graph": [
            website,
            profilePage,
            person,
            ...REFERENCES.map((facts) => buildReferenceNode(facts, content, siteUrl)),
            projectList,
        ],
    };
}

// Chuỗi an toàn để nhúng trong <script type="application/ld+json">:
// thoát "<" để dữ liệu không thể đóng thẻ script (chống chèn mã).
export function serializeJsonLd(data: JsonLdNode): string {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}
