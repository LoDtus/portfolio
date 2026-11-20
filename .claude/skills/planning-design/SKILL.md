---
name: planning-design
description: >-
  Thiết kế một tính năng lớn hoặc vừa sau khi đã chốt phạm vi: sơ đồ luồng và tuần tự (Mermaid), schema
  và ERD, review mô hình dữ liệu, hợp đồng API (OpenAPI/AsyncAPI), threat model (STRIDE), rồi tổng hợp
  README của tính năng trong workspace/features. Dùng khi cần thiết kế DB, API hoặc luồng xử lý. Không
  dùng cho sửa nhỏ hoặc khi tính năng chỉ tái dùng mẫu đã có.
---

# Planning & Design

Đầu vào: file `<slug>-idea.md` của tính năng (từ `idea-discovery`). Đầu ra nằm trong `workspace/features/<mã>/`. Chỉ làm các bước **cần thiết** cho tính năng này, không tạo tệp rỗng cho đủ quy trình.

Skill này chốt **thứ tự, nơi đặt đầu ra và khuôn**; cách vẽ sơ đồ, thiết kế schema, viết OpenAPI hay STRIDE thì làm theo hiểu biết chuẩn, không cần tài liệu thêm. Bảng gốc của bạn: `references/note.txt`. Khuôn README: `references/README.template.md`.

| # | Bước | Đầu vào | Đầu ra |
|---|---|---|---|
| 0 | Giải câu hỏi kỹ thuật còn treo (tùy chọn) | idea | cập nhật idea, `research.md` (skill `technical-feasibility`) |
| 1 | Mô hình hệ thống: user flow, sequence, state | idea | `diagrams/flow-*.mmd`, `diagrams/sequence-*.mmd` |
| 2 | Schema và ERD (ERD sinh từ DBML để không lệch nguồn) | idea, bước 1 nếu cần | `postgresql.dbml` (hoặc file schema theo DB của dự án), `diagrams/erd-*.mmd` |
| 3 | Review mô hình dữ liệu: chuẩn hoá, index, kiểu dữ liệu, N+1. Sửa trực tiếp đầu ra bước 2 | bước 2 | cập nhật file schema |
| 4 | Hợp đồng API, tạo có điều kiện | idea, bước 2 | `interfaces/rest-api.yml` và/hoặc `event-api.yml`, `socket-api.yml` |
| 5 | Threat model theo cờ Data Sensitivity trong idea | idea, bước 2–4 | mục Rủi ro của README, hoặc `threat-model.md` nếu nhạy cảm cao |
| 6 | Tổng hợp README tính năng | idea + toàn bộ đầu ra | `README.md` theo `references/README.template.md` (mỗi mục có chủ sở hữu và người được vá) |

## Cách làm

1. Đọc idea và các tệp thiết kế đã có trong thư mục tính năng trước khi tạo mới.
2. Tên bảng/cột/khóa theo rule `naming` và `naming-data`; quyền và dữ liệu nhạy cảm theo rule `security`.
3. Giao diện: dùng `impeccable` hoặc `design-taste-frontend`; cấu trúc component: `vercel-composition-patterns`.
4. Xong mỗi bước, link đầu ra từ README và cập nhật `status.md` nếu đang chạy trong `feature-lifecycle`.
