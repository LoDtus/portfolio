import type {
    ExperienceEntry,
    ExperiencePhoto,
    ExperiencePhotoSource,
    ExperienceProject,
    ExperienceProjectFacts,
    ExperienceProjectText,
} from "@/features/portfolio/types/portfolio.types";

// Ghép chữ mô tả (alt) theo ngôn ngữ vào danh sách ảnh gốc, theo đúng thứ tự.
// Thiếu hoặc thừa alt đều là lỗi dữ liệu nên ném lỗi sớm (lúc build) thay vì hiển thị ảnh không có mô tả.
export function attachPhotoAlts(
    photos: readonly ExperiencePhotoSource[],
    alts: readonly string[],
): readonly ExperiencePhoto[] {
    if (photos.length !== alts.length) {
        throw new Error(
            `Experience photos and alt texts must match one-to-one: ${photos.length} photos, ${alts.length} alts`,
        );
    }
    return photos.map((photo, index) => ({ ...photo, alt: alts[index] ?? "" }));
}

// Ghép chữ mô tả theo ngôn ngữ (tên, mô tả, ý chính) vào dữ kiện dự án, theo `id`.
// Thiếu hoặc thừa chữ mô tả đều là lỗi dữ liệu nên ném lỗi sớm (lúc build).
export function attachProjectTexts(
    facts: readonly ExperienceProjectFacts[],
    texts: Readonly<Record<string, ExperienceProjectText>>,
): readonly ExperienceProject[] {
    const extraIds = Object.keys(texts).filter(
        (id) => !facts.some((fact) => fact.id === id),
    );
    if (extraIds.length > 0) {
        throw new Error(`Experience project texts without matching facts: ${extraIds.join(", ")}`);
    }
    return facts.map((fact) => {
        const text = texts[fact.id];
        if (text === undefined) {
            throw new Error(`Missing experience project text for "${fact.id}"`);
        }
        return { ...fact, ...text };
    });
}

// Sắp xếp từ gần nhất đến xa nhất theo `startedAt` ("YYYY-MM", so sánh chuỗi là đủ).
// Chỉ sắp xếp khi mọi mục đều có `startedAt`; thiếu dù một mục thì giữ thứ tự khai báo để không xếp sai.
export function sortExperienceEntries(
    entries: readonly ExperienceEntry[],
): readonly ExperienceEntry[] {
    if (entries.some((entry) => entry.startedAt === null)) return entries;
    return [...entries].sort((a, b) => (b.startedAt ?? "").localeCompare(a.startedAt ?? ""));
}

// Độ lệch pha (ms) cho từng bộ ảnh tự chuyển, để các công ty đổi ảnh xen kẽ nhau chứ không cùng lúc.
// Chỉ chia đều cho các mục thực sự có slide (từ 2 ảnh); mục còn lại trả null (không tự chạy).
// Ví dụ chu kỳ 3000ms và 2 bộ ảnh: 0ms và 1500ms.
export function getAutoplayOffsets(
    entries: readonly ExperienceEntry[],
    periodMs: number,
): readonly (number | null)[] {
    const playing = entries.filter((entry) => entry.photos.length > 1).length;
    let rank = 0;
    return entries.map((entry) => {
        if (entry.photos.length <= 1) return null;
        const offset = Math.round((rank * periodMs) / playing);
        rank += 1;
        return offset;
    });
}

const BRAND_SEPARATOR = " - ";

// "Uboard ESG - Hệ thống kiểm kê khí thải carbon cho nhà máy" -> "Hệ thống kiểm kê khí thải carbon cho nhà máy".
// Dùng cho nơi chỉ liệt kê: giữ chủ đề của dự án, bỏ tên sản phẩm gắn với nơi làm. Không có dấu phân cách thì giữ nguyên.
export function stripBrandPrefix(name: string): string {
    const index = name.indexOf(BRAND_SEPARATOR);
    return index === -1 ? name : name.slice(index + BRAND_SEPARATOR.length);
}
