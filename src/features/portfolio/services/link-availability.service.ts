import {
    EXPERIENCE_COMPANIES,
    PROJECTS,
    type ProjectConfig,
} from "@/features/portfolio/constants/profile.constants";
import { getPortfolioContent } from "@/features/portfolio/services/content.service";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import {
    withAvailableExperienceLinks,
    withAvailableProjectLinks,
} from "@/features/portfolio/utils/link-availability.utils";
import type { Locale } from "@/shared/constants/i18n.constants";

const CHECK_TIMEOUT_MS = 8_000;
const RETRY_DELAY_MS = 1_500;
// Trang còn tồn tại nhưng chặn bot hoặc đòi đăng nhập: vẫn coi là truy cập được.
const BLOCKED_BUT_ALIVE_STATUSES: readonly number[] = [401, 403, 429];
// Máy chủ không hỗ trợ HEAD: thử lại bằng GET.
const HEAD_UNSUPPORTED_STATUSES: readonly number[] = [405, 501];

type ProbeResult = "up" | "down" | "network-error";

function classifyStatus(status: number): ProbeResult {
    if (status < 400 || BLOCKED_BUT_ALIVE_STATUSES.includes(status)) return "up";
    return "down";
}

async function request(url: string, method: "HEAD" | "GET"): Promise<Response> {
    return fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
    });
}

async function probeOnce(url: string): Promise<ProbeResult> {
    try {
        const head = await request(url, "HEAD");
        if (!HEAD_UNSUPPORTED_STATUSES.includes(head.status)) return classifyStatus(head.status);
        const get = await request(url, "GET");
        return classifyStatus(get.status);
    } catch {
        // Lỗi DNS, kết nối, TLS hay hết giờ: phân loại riêng để phân biệt "trang chết" với "máy build không có mạng".
        return "network-error";
    }
}

// Thử thêm một lần nếu lần đầu thất bại, tránh xóa nút chỉ vì một trục trặc mạng thoáng qua.
async function probe(url: string): Promise<ProbeResult> {
    const first = await probeOnce(url);
    if (first === "up") return first;
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return probeOnce(url);
}

// Mọi địa chỉ "Website" trên trang (dự án ở mục Kinh nghiệm và dự án cá nhân), không trùng lặp.
function collectWebsiteUrls(): readonly string[] {
    const links = [
        ...EXPERIENCE_COMPANIES.flatMap((company) => company.projects.flatMap((project) => project.links)),
        ...PROJECTS.flatMap((project) => project.links),
    ];
    return [...new Set(links.filter((link) => link.kind === "website").map((link) => link.url))];
}

async function findUnavailableWebsiteUrls(): Promise<ReadonlySet<string>> {
    const urls = collectWebsiteUrls();
    const results = await Promise.all(urls.map(async (url) => ({ url, result: await probe(url) })));

    // Không trang nào kết nối được thì nhiều khả năng máy build không có mạng: giữ nguyên mọi nút thay vì xóa hết.
    if (results.length > 0 && results.every((item) => item.result === "network-error")) {
        console.warn("[link-availability] No website could be reached; keeping every Website link (offline build?).");
        return new Set();
    }

    const unavailable = results.filter((item) => item.result !== "up").map((item) => item.url);
    if (unavailable.length > 0) {
        console.warn(`[link-availability] Hiding unavailable Website links: ${unavailable.join(", ")}`);
    }
    return new Set(unavailable);
}

let pendingCheck: Promise<ReadonlySet<string>> | null = null;

// Danh sách địa chỉ "Website" không còn truy cập được. Kiểm tra một lần mỗi lượt build (xuất tĩnh), dùng chung cho mọi trang;
// trang được build lại định kỳ (xem ci-cd.yml) nên nút sẽ tự hiện lại khi website hoạt động trở lại.
// Chỉ kiểm tra liên kết loại "website": GitHub, Google Play, App Store, YouTube chặn bot nhiều nên kết quả không đáng tin.
export function getUnavailableWebsiteUrls(): Promise<ReadonlySet<string>> {
    pendingCheck ??= findUnavailableWebsiteUrls();
    return pendingCheck;
}

export interface LivePortfolio {
    content: PortfolioContent;
    projects: readonly ProjectConfig[];
}

// Nội dung trang và danh sách dự án cá nhân, đã bỏ các nút "Website" không còn truy cập được.
export async function getLivePortfolio(locale: Locale): Promise<LivePortfolio> {
    const unavailableUrls = await getUnavailableWebsiteUrls();
    return {
        content: withAvailableExperienceLinks(getPortfolioContent(locale), unavailableUrls),
        projects: withAvailableProjectLinks(PROJECTS, unavailableUrls),
    };
}
