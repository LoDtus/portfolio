# Master Pipeline: Feature Lifecycle Execution

## Workflow Rules
Khi nhận một yêu cầu (Tạo mới, Cập nhật, Fix bug), AI PHẢI tuân thủ trình tự các bước dưới đây. Mỗi bước chỉ hoàn thành khi đã ghi/cập nhật kết quả vào `/workspace/features/<feature-id>/`.

---

### PHASE 1: Discovery & Scope (`00-idea-discovery`)
- **Action**: Đọc input (brief vội, bug report, hay tính năng mới).
- **Rule**: 
  - Nếu có điểm mâu thuẫn hoặc "chưa biết chọn phương án nào", **DỪNG LẠI HOÀN TOÀN** và hỏi người dùng.
  - Sau khi chốt: Ghi/Cập nhật file `/workspace/features/<feature-id>/README.md`.

---

### PHASE 2: Architecture & Design (`01-planning-design`)
- **Action**: Kích hoạt các skill thiết kế:
  - `database-design.md` -> Cập nhật DB schema/DBML trong folder feature.
  - `api-design.md` -> Cập nhật OpenApi/AsyncAPI spec.
  - `system-modeling.md` -> Vẽ Mermaid sequence/flow diagrams.
- **Rule**: Kiểm tra tính tương thích với `/docs/ARCHITECTURE.md` hiện có.

---

### PHASE 3: Development (`02-development-execution`)
- **Action**: 
  - Tạo/sửa code thực tế trong dự án (`backend`, `frontend`, `services`).
  - Viết seed data hoặc migration scripts nếu có thay đổi DB.

---

### PHASE 4: Quality Assurance (`04-quality-assurance`)
- **Action**:
  - Chạy `code-review.md` & `security-review.md` trên phần code vừa viết.
  - Kích hoạt `test-implementation.md` để viết Unit Test / Integration Test tương ứng.

---

### PHASE 5: Optimization & Refactoring (`05-performance-optimization`)
- **Action**: 
  - Đánh giá N+1 query, re-render phía frontend, hoặc leak memory nếu đây là tính năng phức tạp.
  - Chạy `refactor-code.md` để làm sạch code theo chuẩn dự án.

---

### PHASE 6: Operations & Delivery (`06-ops-documentation`)
- **Action**:
  - Cập nhật `CHANGELOG.md`.
  - Nếu tính năng này đạt trạng thái **Chốt (Accepted)** -> Tiến hành Sync (đồng bộ) thông tin quan trọng từ `/workspace/features/<feature-id>/` lên thư mục tài liệu chính thức `/docs/`.