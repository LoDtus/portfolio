// Lớp trễ cho hiệu ứng xuất hiện khi cuộn (xem `.reveal-d*` trong globals.css).
// Các phần tử cùng hàng nhận độ trễ tăng dần để hiện lần lượt thay vì cùng lúc.
export const REVEAL_DELAY_CLASSES = [
    "reveal-d0",
    "reveal-d1",
    "reveal-d2",
    "reveal-d3",
] as const;

// Chiều cao thanh nav dính trên cùng (h-16 = 4rem): phần tử nằm hẳn sau nav chưa tính là đã hiện ra.
const NAV_HEIGHT_PX = 64;

// Hai vùng quan sát của RevealObserver (rootMargin của IntersectionObserver), cố ý lệch nhau (hysteresis):
// - HIỆN khi phần tử vào vùng nhìn thấy: dưới nav và trên 92% chiều cao màn hình (đỉnh phần tử lên cách mép dưới 8%).
// - ẨN (đặt lại) chỉ khi phần tử đã cách màn hình hơn 100px, lớn hơn mọi độ dịch của hiệu ứng vào, nên người xem
//   không bao giờ thấy lúc nó biến mất và phần tử không bật tắt liên tục ở mép.
export const REVEAL_SHOW_ROOT_MARGIN = `-${NAV_HEIGHT_PX}px 0px -8% 0px`;
export const REVEAL_HIDE_MARGIN_PX = 100;
export const REVEAL_HIDE_ROOT_MARGIN = `${REVEAL_HIDE_MARGIN_PX}px 0px ${REVEAL_HIDE_MARGIN_PX}px 0px`;
