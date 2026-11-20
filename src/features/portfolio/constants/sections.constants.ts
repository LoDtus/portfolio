import type { SectionId } from "@/features/portfolio/types/portfolio.types";

// Thứ tự hiển thị của các mục trên thanh điều hướng.
export const NAV_SECTION_IDS: readonly SectionId[] = [
    "about",
    "skills",
    "education",
    "experience",
    "projects",
];

// Mọi mục mà scroll-spy theo dõi (gồm cả mục liên hệ, được đặt thành nút nổi bật trên nav).
export const SPY_SECTION_IDS: readonly SectionId[] = [
    ...NAV_SECTION_IDS,
    "contact",
];

export const MAIN_CONTENT_ID = "main-content";
