import { EDUCATION } from "@/features/portfolio/constants/profile.constants";

const CHECK_TIMEOUT_MS = 8_000;
// Chỉ coi liên kết là "không còn" khi trang trả 404 hoặc 410. Lỗi mạng, hết giờ, 5xx hay chặn bot (403, 429)
// không nói lên trang đã mất, nên giữ liên kết ngành học.
const GONE_STATUSES: readonly number[] = [404, 410];

async function isGone(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
        });
        return GONE_STATUSES.includes(response.status);
    } catch {
        return false;
    }
}

let pendingResolution: Promise<string> | null = null;

// Địa chỉ cho nút "Xem ngành học": trang ngành học nếu còn, không thì trang chủ của trường.
// Chạy ở phía server khi build (xuất tĩnh), kết quả dùng chung cho cả hai ngôn ngữ; trang được build lại định kỳ (xem ci-cd.yml).
export function resolveProgramUrl(): Promise<string> {
    pendingResolution ??= isGone(EDUCATION.majorUrl).then((gone) =>
        gone ? EDUCATION.schoolUrl : EDUCATION.majorUrl,
    );
    return pendingResolution;
}
