---
description: >-
  Công cụ dev có thể xóa hoặc dựng lại dữ liệu (reset database, wipe, seed lại, flush cache) chỉ dành
  cho máy dev; tuyệt đối không xuất hiện ở production (luôn áp dụng).
---

# Công cụ dev phá hủy dữ liệu (reset, wipe, reseed)

Áp dụng cho mọi công cụ, route, script hay lệnh có thể xóa hoặc dựng lại dữ liệu để phục vụ phát triển: trang `/reset`, `make reset-db`, `db:drop`, `migrate:fresh`, seed ghi đè, flush Redis/cache, xóa bucket. Dự án không có thứ nào như vậy thì bỏ qua rule này. Dự án có thì nó là **ràng buộc sống còn**.

Chi tiết riêng của dự án (tên file, lệnh kiểm tra) nằm trong rule `dev-reset-<dự-án>.md` nếu có.

## Quy tắc BẮT BUỘC (cho mọi agent: Claude, Codex, Cursor)

- **Không bao giờ** bật cờ hay đặt token của công cụ này (`*_RESET_ENABLED`, token xác nhận...) trong cấu hình ngoài môi trường dev: `.env.production`, `.env.staging`, compose/manifest production, Jenkinsfile/CI, Kubernetes. `.env.example` chỉ chứa giá trị tắt (`false`, token rỗng).
- **Không** nới các điều kiện bảo vệ (môi trường phải là development, database host cục bộ, token đủ dài, kiểm tra origin/IP...). Thay đổi chúng phải kèm test và được người dùng đồng ý rõ ràng.
- **Không** để mã production import hay phụ thuộc vào mã công cụ dev. Công cụ chỉ được nạp có điều kiện (nạp động, hoặc đăng ký route khi policy đúng), và bước build production phải **xóa mã nguồn công cụ trước khi build** rồi kiểm tra bản build không còn dấu vết. Không gỡ các bước đó.
- **Không** biến thao tác xóa thành `GET`: bắt buộc `POST` (hoặc tương đương không an toàn với prefetch), có nonce/CSRF, cùng origin, token chỉ server biết.
- **Không** chạy công cụ này thay người dùng trên database dev của họ nếu họ chưa yêu cầu: dữ liệu dev có thể là dữ liệu họ đang dùng. Khi thử nghiệm, dùng database và cache tạm.
- Thêm thứ cần seed hoặc dựng lại (service seed, bảng, bucket mới) thì đăng ký vào danh sách/thứ tự mà công cụ dùng; không để công cụ bỏ sót.
- Trước khi phát hành, chạy kiểm tra "không có công cụ dev trong bản production" của dự án (script/Makefile target). Chưa có thì đề xuất thêm.

## Nhiều lớp bảo vệ (đừng gỡ lớp nào)

1. **Cấu hình:** chỉ môi trường dev bật; production để tắt hoặc xóa.
2. **Backend:** không đăng ký route nếu policy sai; khởi động thất bại nếu production mà cờ/token được đặt.
3. **Guard từng yêu cầu:** policy, token (so sánh hằng thời gian), IP riêng/loopback (cả `X-Forwarded-For`), không có `Origin` lạ.
4. **Frontend:** 404 nếu không phải dev, host không phải localhost/IP nội bộ (chống DNS rebinding), cùng origin, nonce.
5. **Build:** xóa mã công cụ khỏi image production; build production dừng nếu cờ bật.
6. **CI:** script kiểm tra chặn phát hành khi còn dấu vết công cụ dev.

Làm công cụ mới kiểu này thì đủ các lớp trên; thiếu lớp nào thì nói rõ vì sao.
