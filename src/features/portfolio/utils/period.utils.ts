const MONTH_PATTERN = /^(\d{4})-(\d{2})$/;

// "2026-06" -> "06/2026". Sai định dạng là lỗi dữ liệu nên ném lỗi sớm (lúc build).
function formatMonth(value: string): string {
    const match = MONTH_PATTERN.exec(value);
    if (match === null) {
        throw new Error(`Month must be formatted as YYYY-MM, got "${value}"`);
    }
    return `${match[2]}/${match[1]}`;
}

// Khoảng thời gian hiển thị: "06/2026 - 12/2026"; cùng một tháng thì chỉ một mốc; `endedAt` null (đã có `startedAt`) là đang diễn ra.
// Chưa có `startedAt` thì trả null để giao diện bỏ phần thời gian thay vì bịa.
export function formatMonthRange(
    startedAt: string | null,
    endedAt: string | null,
    presentLabel: string,
): string | null {
    if (startedAt === null) return null;
    const from = formatMonth(startedAt);
    if (endedAt === null) return `${from} - ${presentLabel}`;
    if (endedAt === startedAt) return from;
    return `${from} - ${formatMonth(endedAt)}`;
}
