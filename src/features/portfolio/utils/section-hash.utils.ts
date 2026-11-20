// Giữ hash trên thanh địa chỉ khớp với mục đang xem, mà không đụng tới router của Next:
// chỉ gọi history.replaceState (giữ nguyên `history.state` của Next) nên không tạo thêm mục lịch sử và không tải lại.

// Khóa ghi hash trong lúc đang cuộn do bấm điều hướng: khi đó cuộn đi qua các mục trung gian,
// nếu ghi theo từng mục thì hash nhấp nháy qua mọi mục; để nguyên hash của mục đích đã được ghi lúc bấm.
let lockedUntilMs = 0;

export function lockSectionHash(durationMs: number): void {
    lockedUntilMs = performance.now() + durationMs;
}

function isLocked(): boolean {
    return performance.now() < lockedUntilMs;
}

// Ghi hash của mục (hoặc xóa hash khi `sectionId` là null). Bỏ qua khi đang khóa hoặc hash đã đúng.
export function replaceSectionHash(sectionId: string | null): void {
    if (isLocked()) return;

    const nextHash = sectionId === null ? "" : `#${sectionId}`;
    if (window.location.hash === nextHash) return;

    window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}${nextHash}`,
    );
}
