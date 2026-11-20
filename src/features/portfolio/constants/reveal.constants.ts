// Lớp trễ cho hiệu ứng xuất hiện khi cuộn (xem `.reveal-d*` trong globals.css).
// Các phần tử cùng hàng nhận độ trễ tăng dần để hiện lần lượt thay vì cùng lúc.
export const REVEAL_DELAY_CLASSES = [
    "reveal-d0",
    "reveal-d1",
    "reveal-d2",
    "reveal-d3",
] as const;
