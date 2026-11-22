// Slide ảnh dùng chung cho mọi nơi có slide (Kinh nghiệm, Học vấn, Người tham chiếu).
// Thời gian một ảnh đứng yên trước khi chuyển sang ảnh kế (ms).
// Swiper chờ trượt xong rồi mới đếm khoảng này (không dùng `waitForTransition: false` vì khi đó Swiper tiếp tục chạy ngay cả lúc đang rê chuột, mất tính năng tạm dừng).
export const GALLERY_AUTOPLAY_DELAY_MS = 3000;
// Thời gian một lần trượt ảnh (ms).
export const GALLERY_SLIDE_SPEED_MS = 700;
// Chu kỳ giữa hai lần tự chuyển ảnh (ms), tính từ lúc bắt đầu trượt tới lúc bắt đầu trượt kế tiếp: ảnh đứng yên rồi trượt.
export const GALLERY_AUTOPLAY_PERIOD_MS = GALLERY_AUTOPLAY_DELAY_MS + GALLERY_SLIDE_SPEED_MS;
// Chỉ tự chạy khi bộ ảnh nhìn thấy được ít nhất phần này, để không tốn tài nguyên khi đã cuộn qua.
export const GALLERY_VISIBLE_THRESHOLD = 0.25;
