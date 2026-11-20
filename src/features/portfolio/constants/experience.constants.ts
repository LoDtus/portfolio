// Slide ảnh trong mục Kinh nghiệm.
// Chu kỳ giữa hai lần tự chuyển ảnh (ms), tính từ lúc bắt đầu trượt tới lúc bắt đầu trượt kế tiếp.
export const GALLERY_AUTOPLAY_PERIOD_MS = 3000;
// Thời gian một lần trượt ảnh (ms).
export const GALLERY_SLIDE_SPEED_MS = 700;
// Thời gian chờ của Swiper giữa hai lần trượt. Swiper chờ trượt xong rồi mới đếm, nên trừ thời gian trượt để cả chu kỳ đúng 3 giây.
// (Không dùng `waitForTransition: false` vì khi đó Swiper tiếp tục chạy ngay cả lúc đang rê chuột, mất tính năng tạm dừng.)
export const GALLERY_AUTOPLAY_DELAY_MS = GALLERY_AUTOPLAY_PERIOD_MS - GALLERY_SLIDE_SPEED_MS;
// Chỉ tự chạy khi bộ ảnh nhìn thấy được ít nhất phần này, để không tốn tài nguyên khi đã cuộn qua.
export const GALLERY_VISIBLE_THRESHOLD = 0.25;
