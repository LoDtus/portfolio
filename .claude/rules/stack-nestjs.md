---
description: >-
  Quy ước tổ chức backend NestJS theo module/feature, thứ dùng chung đưa vào shared; trách nhiệm từng
  tầng, ranh giới giữa các module. Chỉ áp dụng khi dự án dùng NestJS.
paths:
  - "**/*.controller.ts"
  - "**/*.service.ts"
  - "**/*.module.ts"
  - "**/*.gateway.ts"
  - "**/*.guard.ts"
  - "**/*.interceptor.ts"
  - "**/*.filter.ts"
  - "**/*.pipe.ts"
  - "**/*.dto.ts"
  - "**/*.entity.ts"
---

# NestJS: module/feature, dùng chung vào shared

Chỉ áp dụng khi `package.json` của dự án có `@nestjs/*`. Dự án không dùng NestJS thì bỏ qua rule này.

**Precedence:** khi sửa code có sẵn, cấu trúc và kiểu đặt tên đang dùng trong dự án thắng rule này. Rule áp cho module mới và chỗ chưa có quy ước. Chi tiết riêng của dự án nằm trong rule `stack-nestjs-<dự-án>.md` nếu có.

## Tổ chức
- Mỗi tính năng là một module tự chứa trong `src/modules/<feature>/`: controller, service, module, dto, entity của riêng nó. Giữ phẳng, tối đa 1–3 cấp lồng; khi có từ 2 file cùng loại thì gom vào thư mục theo loại (`dto/`, `entities/`).
- Thứ dùng chung thì ra ngoài `modules/`, theo loại:
  - `shared/`: hạ tầng và tiện ích không mang nghiệp vụ (cấu hình, kết nối DB, DTO chung, hằng số, hàm thuần).
  - `common/`: thứ cắt ngang toàn app của Nest (guard, interceptor, filter, decorator).
  - `integrations/`: dịch vụ bên ngoài (search, cache, mail, storage, thanh toán). Module gọi qua service của integration, không gọi SDK trực tiếp.
- Chỉ một module dùng thì để trong module. Khi module thứ hai cần thì chuyển lên shared (hoặc common/integrations). Không tạo shared "phòng hờ".
- `shared`, `common`, `integrations` không chứa nghiệp vụ của domain và không import từ `modules/`.

## Trách nhiệm từng tầng
- Controller: nhận request, gọi service, trả kết quả. Không có nghiệp vụ, không gọi DB.
- Service: nơi duy nhất chứa nghiệp vụ. Repository: chỉ truy cập dữ liệu, không nghiệp vụ.
- DTO chỉ để validate đầu vào/đầu ra. Entity chỉ định nghĩa lược đồ.

## Giữa các module
- Dùng chức năng của module khác qua provider mà module đó `exports` (hoặc qua event). Không với vào helper hoặc file nội bộ của nó.
- Không phụ thuộc vòng. Cần chung nhiều thứ giữa hai module thì rút phần chung lên shared.

## Lỗi và cấu hình
- Service ném exception chuẩn của Nest (hoặc exception riêng của dự án). Một exception filter toàn cục là nơi ghi log và trả phản hồi an toàn (theo rule `error-tracing` và `security`); không `try/catch` chỉ để log rồi ném lại.
- Đọc biến môi trường qua `ConfigModule` có validate ở một chỗ; không rải `process.env`.
- Cú pháp thư viện theo phiên bản trong `package.json`, không dùng API deprecated, không tự thêm thư viện mới.
