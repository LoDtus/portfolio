import { PROFILE } from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

// Dòng bản quyền ở chân trang ("© 2026 Long Nguyen · Next.js · Tailwind CSS"); năm lấy lúc build.
// Chân trang và bản markdown khi sao chép dùng chung hàm này để luôn khớp nhau.
export function formatCopyright(footer: PortfolioContent["footer"]): string {
    return `© ${new Date().getFullYear()} ${PROFILE.name} · ${footer.builtWith}`;
}
