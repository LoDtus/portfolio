const MONTH_PATTERN = /^(\d{4})-(\d{2})$/;
const MONTHS_PER_YEAR = 12;
// Phần lẻ từ ngưỡng này (đơn vị năm) trở lên thì ghi "n.5+", dưới ngưỡng thì ghi "n+".
const HALF_YEAR_FROM = 0.3;

export interface MonthSpan {
    // "YYYY-MM"; null nghĩa là chưa có mốc bắt đầu nên không tính vào tổng.
    startedAt: string | null;
    // "YYYY-MM"; null nghĩa là đang làm đến hiện tại (lấy tháng hiện tại làm mốc kết thúc).
    endedAt: string | null;
}

// "2026-06" -> số tháng tính từ năm 0 (năm * 12 + tháng - 1). Sai định dạng là lỗi dữ liệu nên ném lỗi sớm (lúc build).
function toMonthIndex(value: string): number {
    const match = MONTH_PATTERN.exec(value);
    if (match === null) {
        throw new Error(`Month must be formatted as YYYY-MM, got "${value}"`);
    }
    const month = Number(match[2]);
    if (month < 1 || month > MONTHS_PER_YEAR) {
        throw new Error(`Month must be between 01 and 12, got "${value}"`);
    }
    return Number(match[1]) * MONTHS_PER_YEAR + (month - 1);
}

// Tháng hiện tại dạng "YYYY-MM": mốc kết thúc của mọi mục đang làm (`endedAt` null).
export function getCurrentMonth(now: Date = new Date()): string {
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${now.getFullYear()}-${month}`;
}

// Tổng số tháng đã làm việc, tính cả tháng bắt đầu và tháng kết thúc ("2026-06" đến "2026-11" là 6 tháng).
// Các khoảng chồng lên nhau hoặc liền kề được gộp để một tháng không bị tính hai lần.
export function countWorkedMonths(
    spans: readonly MonthSpan[],
    now: Date = new Date(),
): number {
    const currentMonth = getCurrentMonth(now);
    const ranges = spans
        .flatMap((span): [number, number][] => {
            if (span.startedAt === null) return [];
            const start = toMonthIndex(span.startedAt);
            const end = toMonthIndex(span.endedAt ?? currentMonth);
            if (end < start) {
                throw new Error(
                    `Work period ends before it starts: ${span.startedAt} to ${span.endedAt}`,
                );
            }
            return [[start, end]];
        })
        .sort((a, b) => a[0] - b[0]);

    let total = 0;
    let current: [number, number] | null = null;
    for (const range of ranges) {
        if (current !== null && range[0] <= current[1] + 1) {
            current[1] = Math.max(current[1], range[1]);
        } else {
            if (current !== null) total += current[1] - current[0] + 1;
            current = [range[0], range[1]];
        }
    }
    if (current !== null) total += current[1] - current[0] + 1;
    return total;
}

// Quy ước ghi số năm kinh nghiệm: tròn n năm thì "n"; trên n năm nhưng chưa tới n + 0.3 thì "n+";
// từ n + 0.3 đến dưới n + 1 thì "n.5+". Ví dụ 17 tháng (1.42 năm) -> "1.5+", 14 tháng (1.17 năm) -> "1+".
export function formatExperienceYears(totalMonths: number): string {
    const whole = Math.floor(totalMonths / MONTHS_PER_YEAR);
    const remainder = totalMonths % MONTHS_PER_YEAR;
    if (remainder === 0) return String(whole);
    return remainder / MONTHS_PER_YEAR < HALF_YEAR_FROM ? `${whole}+` : `${whole}.5+`;
}
