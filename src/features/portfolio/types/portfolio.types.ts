import type { Locale } from "@/shared/constants/i18n.constants";

export type SectionId =
    | "about"
    | "skills"
    | "education"
    | "experience"
    | "projects"
    | "references"
    | "contact";

export type SkillGroupId =
    | "languages"
    | "frontend"
    | "backend"
    | "database"
    | "deploy"
    | "tools"
    | "design"
    | "soft";

// Nhóm kỹ năng có danh sách không phụ thuộc ngôn ngữ (kỹ năng mềm có chữ theo từng ngôn ngữ nên nằm trong nội dung).
export type NeutralSkillGroupId = Exclude<SkillGroupId, "soft">;

export type ProjectSlug =
    | "location-insight"
    | "vinfastreev"
    | "affiliate-product-catalog"
    | "city-incidents-management-system";

export type ReferenceId = "nguyen-huy-toan" | "tran-tien-quan";

export type ContactChannelId =
    | "zalo"
    | "phone"
    | "email"
    | "github"
    | "facebook"
    | "linkedin"
    | "address";

// Loại liên kết của một dự án; chữ hiển thị theo ngôn ngữ nằm ở `ui.linkLabels`.
export type ProjectLinkKind =
    | "website"
    | "googlePlay"
    | "appStore"
    | "youtube"
    | "github";

export interface ProjectLink {
    kind: ProjectLinkKind;
    url: string;
}

export interface Fact {
    value: string;
    label: string;
}

export interface ExperiencePhoto {
    src: string;
    width: number;
    height: number;
    alt: string;
    // Vị trí cắt khi ảnh được lấp đầy khung (CSS object-position), ví dụ "50% 30%".
    position?: string;
}

// Dữ kiện của một dự án làm tại công ty, không phụ thuộc ngôn ngữ.
export interface ExperienceProjectFacts {
    id: string;
    links: readonly ProjectLink[];
    stack: readonly string[];
}

// Chữ mô tả theo ngôn ngữ của một dự án làm tại công ty.
export interface ExperienceProjectText {
    name: string;
    // null nghĩa là chưa có: giao diện bỏ phần đó thay vì bịa nội dung.
    summary: string | null;
    highlights: readonly string[];
}

export type ExperienceProject = ExperienceProjectFacts & ExperienceProjectText;

// Ảnh gốc (không có chữ mô tả); chữ mô tả `alt` theo ngôn ngữ được ghép thêm trong nội dung.
export type ExperiencePhotoSource = Omit<ExperiencePhoto, "alt">;

// Thông tin công ty không phụ thuộc ngôn ngữ.
export interface ExperienceCompany {
    id: string;
    company: string;
    // null nghĩa là chưa có địa chỉ: tên công ty hiển thị dạng chữ thường, không có liên kết.
    companyUrl: string | null;
    // false nghĩa là chỉ liệt kê trên trang, không làm SEO cho nơi này: bỏ khỏi llms.txt, dữ liệu có cấu trúc, từ khóa;
    // liên kết ra ngoài gắn nofollow, thẻ gắn data-nosnippet và ảnh gắn X-Robots-Tag noindex (xem public/_headers).
    isDiscoverable: boolean;
    logo: string;
    logoWidth: number;
    logoHeight: number;
    // Mốc thời gian dạng "YYYY-MM". `startedAt` còn dùng để sắp xếp từ gần nhất đến xa nhất (null thì giữ thứ tự khai báo);
    // `endedAt` null nghĩa là đang làm.
    startedAt: string | null;
    endedAt: string | null;
    photos: readonly ExperiencePhotoSource[];
    projects: readonly ExperienceProjectFacts[];
}

export interface ExperienceEntry
    extends Omit<ExperienceCompany, "photos" | "projects"> {
    // null nghĩa là chưa có thông tin: giao diện hiển thị ghi chú "đang cập nhật" thay vì bịa nội dung.
    role: string | null;
    period: string | null;
    summary: string | null;
    highlights: readonly string[];
    photos: readonly ExperiencePhoto[];
    projects: readonly ExperienceProject[];
}

export interface ProjectText {
    name: string;
    // null nghĩa là chưa có mô tả: thẻ dự án bỏ phần đó.
    summary: string | null;
    // Số liệu thực tế của dự án, hiển thị dạng bullet "nhãn: giá trị" sau dòng số thành viên và vai trò; rỗng nếu chưa có.
    facts: readonly Fact[];
    // Số thành viên và vai trò.
    role: string;
    // Thời gian thực hiện đã định dạng theo ngôn ngữ; null nếu chưa có.
    period: string | null;
}

// Liên kết ngoài của người tham chiếu (LinkedIn, trang cá nhân, TikTok...); `label` là chữ trên thẻ liên kết, không phụ thuộc ngôn ngữ.
export interface ReferenceLink {
    label: string;
    url: string;
}

// Người tham chiếu: dữ kiện không phụ thuộc ngôn ngữ. Trường null/rỗng nghĩa là chưa có, giao diện bỏ phần đó thay vì bịa nội dung.
// Dữ kiện giúp công cụ tìm kiếm hiểu người tham chiếu là ai (dùng cho dữ liệu có cấu trúc schema.org, không hiển thị trên trang).
// Mọi mục phải có thật trong phần giới thiệu hiển thị ở trang.
export interface ReferenceSeo {
    // Cách viết khác của tên (không dấu, kèm học hàm/học vị).
    alternateNames: readonly string[];
    // Nơi đang công tác; `url` null nếu chưa có địa chỉ chính thức.
    worksFor: readonly { name: string; url: string | null }[];
    // Tập đoàn mẹ của các nơi công tác ở trên; null nếu không có.
    parentOrganization: string | null;
    // Nơi đã học (ví dụ trường tốt nghiệp); null nếu không nêu.
    alumniOf: string | null;
    // Công ty/tổ chức khác được nhắc trong phần giới thiệu.
    mentions: readonly string[];
    knowsAbout: readonly string[];
}

export interface ReferenceFacts {
    id: ReferenceId;
    name: string;
    organization: string | null;
    seo: ReferenceSeo;
    // Ảnh (đặt trong public/image/reference-*): một ảnh thì hiện ảnh tĩnh, nhiều ảnh thì thành slide; rỗng thì hiện chữ cái đầu của tên.
    photos: readonly ExperiencePhotoSource[];
    email: string | null;
    // Số điện thoại dạng quốc tế (+84...) để dùng cho liên kết tel:; `phoneDisplay` là chữ hiển thị.
    phoneE164: string | null;
    phoneDisplay: string | null;
    links: readonly ReferenceLink[];
}

export interface ReferenceText {
    // Chức danh hiện tại; null nếu chưa có.
    role: string | null;
    // Giới thiệu ngắn; null nếu chưa có.
    summary: string | null;
    highlights: readonly string[];
    // Chữ mô tả cho từng ảnh trong `photos`, theo đúng thứ tự.
    photoAlts: readonly string[];
}

export interface ContactChannelText {
    label: string;
    // Giá trị hiển thị riêng cho ngôn ngữ này (ví dụ địa chỉ không dấu ở bản tiếng Anh); không có thì dùng `value` chung của kênh.
    value?: string;
}

// Kênh liên hệ không phụ thuộc ngôn ngữ. `icon` "logo" dùng ảnh trong `logo`; các giá trị khác là biểu tượng vẽ sẵn.
export interface ContactChannelFacts {
    id: ContactChannelId;
    // Chữ hiển thị (số điện thoại, email, tên tài khoản...).
    value: string;
    href: string;
    icon: "logo" | "github" | "phone" | "address";
    logo: string | null;
    // Liên kết mở sang trang khác (cần target/rel), không phải tel:/mailto:.
    isExternal: boolean;
    // Có giá trị thì thẻ ở mục Liên hệ là nút sao chép chuỗi này (không điều hướng); null thì là liên kết tới `href`.
    // `href` vẫn dùng cho nơi chỉ cần liên kết (chân trang, dữ liệu có cấu trúc, markdown).
    copyText: string | null;
}

export interface PortfolioContent {
    locale: Locale;
    meta: {
        title: string;
        description: string;
        jobTitle: string;
    };
    ui: {
        // Chứa tên ngôn ngữ đích, ví dụ "Chuyển sang English": nhãn của nút đổi ngôn ngữ.
        switchLanguage: string;
        topBarLabel: string;
        skipToContent: string;
        navLabel: string;
        menuOpen: string;
        menuClose: string;
        contactCta: string;
        languageLabel: string;
        stackLabel: string;
        roleLabel: string;
        periodLabel: string;
        linkLabels: Record<ProjectLinkKind, string>;
    };
    nav: Record<SectionId, string>;
    hero: {
        eyebrow: string;
        name: string;
        // Dòng lĩnh vực ngay dưới tên.
        role: string;
        // Đoạn giới thiệu định hướng ở hero.
        intro: string;
        primaryCta: string;
        secondaryCta: string;
        photoAlt: string;
        // Cụm chữ trong `intro` được tô nhấn (phải xuất hiện nguyên văn trong intro).
        introHighlight: string;
    };
    about: {
        title: string;
        description: string;
        paragraphs: readonly string[];
        // Các cụm chữ trong `paragraphs` được tô nhấn (phải xuất hiện nguyên văn).
        highlights: readonly string[];
        facts: readonly Fact[];
    };
    skills: {
        title: string;
        description: string;
        groups: Record<SkillGroupId, string>;
        // Kỹ năng mềm (và công cụ văn phòng) có chữ theo ngôn ngữ nên nằm ở đây, không ở SKILL_ITEMS.
        softSkills: readonly string[];
    };
    education: {
        title: string;
        description: string;
        school: string;
        major: string;
        majorLabel: string;
        periodLabel: string;
        gpaLabel: string;
        summary: string;
        photoAlts: readonly string[];
        viewProgram: string;
    };
    experience: {
        title: string;
        description: string;
        entries: readonly ExperienceEntry[];
        pendingNote: string;
        projectsLabel: string;
        gallery: {
            prev: string;
            next: string;
            // Chứa {{index}}: số thứ tự ảnh do Swiper điền vào.
            bullet: string;
        };
    };
    projects: {
        title: string;
        description: string;
        // Nút dẫn tới toàn bộ kho mã nguồn trên GitHub.
        moreLabel: string;
        items: Record<ProjectSlug, ProjectText>;
    };
    references: {
        title: string;
        description: string;
        // Tiêu đề đứng trước nhóm thông tin liên hệ (email, điện thoại, liên kết) của mỗi người.
        contactLabel: string;
        emailLabel: string;
        phoneLabel: string;
        linksLabel: string;
        items: Record<ReferenceId, ReferenceText>;
    };
    contact: {
        title: string;
        description: string;
        channelsLabel: string;
        channels: Record<ContactChannelId, ContactChannelText>;
        // Nút sao chép (điện thoại, Gmail, địa chỉ): gợi ý, kết quả thành công và thất bại.
        copyHint: string;
        copied: string;
        copyFailed: string;
        cv: {
            // Khối tải CV tách riêng khỏi danh sách kênh liên hệ.
            title: string;
            description: string;
            // Chữ của nút tải từng bản CV, theo ngôn ngữ của CV; `title` là mô tả đầy đủ (hiện khi rê chuột, đọc bởi trình đọc màn hình).
            files: Record<Locale, { label: string; title: string }>;
        };
    };
    footer: {
        credit: string;
        builtWith: string;
    };
}
