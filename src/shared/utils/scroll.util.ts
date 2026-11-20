const MIN_DURATION_SECONDS = 0.5;
const MAX_DURATION_SECONDS = 1.1;
const PIXELS_PER_SECOND = 2500;

// Thời gian cuộn tới một mục theo quãng đường: gần thì nhanh, xa thì lâu hơn nhưng không quá 1.1s,
// để chuyển mục luôn cảm thấy mượt mà không bị chậm.
export function getScrollDuration(distancePx: number): number {
    const seconds = Math.abs(distancePx) / PIXELS_PER_SECOND;
    return Math.min(MAX_DURATION_SECONDS, Math.max(MIN_DURATION_SECONDS, seconds));
}

// Vị trí cuộn (px từ đầu trang) để đặt `target` ngay dưới thanh nav sticky.
// Tính từ vị trí cuộn thực tế của trình duyệt và `scroll-padding-top` của <html> (cùng giá trị CSS dùng cho cuộn native),
// nên không phụ thuộc trạng thái nội bộ của thư viện cuộn mượt.
export function getScrollTopFor(target: Element): number {
    const paddingTop = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
    );
    const offset = Number.isNaN(paddingTop) ? 0 : paddingTop;

    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
}
