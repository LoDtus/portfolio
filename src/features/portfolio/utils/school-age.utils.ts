// Số năm hoạt động của trường, làm tròn theo cách người ta nói: không bịa con số chính xác khi chỉ cần ước lượng.
// Phần lẻ so với chục gần nhất: dưới 5 năm thì "hơn" (42 -> hơn 40), từ 5 năm trở lên thì "gần" (45, 48 -> gần 50);
// tròn chục thì giữ nguyên (40 -> 40). Tính theo năm truyền vào, không cố định.
export type SchoolAgeQualifier = "over" | "nearly" | "exact";

export interface SchoolAge {
    qualifier: SchoolAgeQualifier;
    years: number;
}

const DECADE = 10;
const ROUND_UP_FROM = 5;

export function describeSchoolAge(
    foundedYear: number,
    currentYear: number,
): SchoolAge {
    const elapsed = Math.max(0, currentYear - foundedYear);
    // Dưới một chục thì nói đúng số năm (làm tròn về 0 hay 10 đều sai nghĩa).
    if (elapsed < DECADE) return { qualifier: "exact", years: elapsed };

    const remainder = elapsed % DECADE;
    const lowerDecade = elapsed - remainder;
    if (remainder === 0) return { qualifier: "exact", years: elapsed };
    if (remainder < ROUND_UP_FROM) {
        return { qualifier: "over", years: lowerDecade };
    }
    return { qualifier: "nearly", years: lowerDecade + DECADE };
}
