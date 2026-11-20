# Tham khảo repo nổi bật trước khi làm tính năng lớn

Mục tiêu: tránh tự phát minh lại thiết kế mà cộng đồng đã giải tốt. Chỉ để lấy ý tưởng, không phải để sao chép.

## Khi nào áp dụng (cả hai điều kiện)

- Tính năng cỡ **Lớn** theo `feature-lifecycle` Bước 0 (nhiều module, đổi schema/API, tích hợp mới, dữ liệu nhạy cảm), và
- bài toán có lời giải phổ biến ngoài kia (tìm kiếm/không gian địa lý, chấm điểm xếp hạng, xác thực, hàng đợi, đồng bộ...).

Cỡ Nhỏ và Vừa: bỏ qua rule này, không ghi gì. Đã có quyết định trong `workspace/features/*/research.md` thì dùng lại, không tra ngoài.

## Cách làm (một lượt, giới hạn)

- Chạy sau khi chốt phạm vi (idea) và trước khi thiết kế; có thể gộp vào bước `technical-feasibility`.
- Chọn 2–4 repo. Số sao chỉ để lọc đầu vào; còn xét commit gần đây (không archive, không bỏ quá 2 năm), license, và độ giống với bài toán của ta.
- Chỉ đọc README, cấu trúc thư mục, tài liệu thiết kế, schema. Không clone để chạy, không chạy mã tải từ mạng.
- Ghi kết quả vào Decision Record hoặc `<slug>-idea.md`: link repo, điều học được, điều cố ý không theo và lý do.

## Không làm

- Không thêm repo làm dependency hay chép mã chỉ vì nó nổi tiếng (xem `global.md` mục dependency; chép mã phải kiểm license trước).
- Không để việc tra cứu kéo dài hơn một lượt hay chặn tiến độ.
- Quy ước đặt tên, bảo mật, envelope lỗi của dự án luôn thắng mẫu trong repo ngoài.
