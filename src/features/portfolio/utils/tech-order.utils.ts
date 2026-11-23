import { TECH_PRIORITY } from "@/features/portfolio/constants/tech-priority.constants";

const RANK_BY_NAME: ReadonlyMap<string, number> = new Map(
    TECH_PRIORITY.map((name, index) => [name, index]),
);

// Sắp xếp danh sách công nghệ theo TECH_PRIORITY (cao đến thấp). Tên chưa có trong danh sách ưu tiên là lỗi dữ liệu nên ném lỗi sớm (lúc build)
// thay vì xếp bừa; tên trùng bị bỏ để một công nghệ không hiện hai lần.
export function sortTechByPriority(names: readonly string[]): readonly string[] {
    const unique = [...new Set(names)];
    const ranked = unique.map((name) => {
        const rank = RANK_BY_NAME.get(name);
        if (rank === undefined) {
            throw new Error(`Technology "${name}" is missing from TECH_PRIORITY`);
        }
        return { name, rank };
    });
    return ranked.sort((a, b) => a.rank - b.rank).map((item) => item.name);
}
