---
description: >-
  Quy ước viết file component React: một file một component, nghiệp vụ tách ra service/api, quy tắc
  export. Chỉ áp dụng khi dự án dùng React.
paths:
  - "**/*.tsx"
  - "**/*.jsx"
---

# React: quy ước file component

Chỉ áp dụng khi `package.json` của dự án có `react`. Dự án không dùng React (hoặc dùng Solid, Preact...) thì bỏ qua rule này.

**Precedence:** khi sửa file có sẵn, kiểu export và cách tổ chức đang dùng trong file đó thắng rule này. Rule áp cho file mới và chỗ chưa có quy ước.

## Một file một component
- File chứa component chỉ xử lý việc của component. Không khai báo hàm nghiệp vụ, helper, util cùng cấp với component (dấu hiệu: tên hàm không viết hoa chữ cái đầu).
- Ngoại lệ: hàm chỉ dựng hoặc trả về trực tiếp component thuộc chính file đó (render helper) được khai báo cùng file.
- Ngoại lệ của Next.js: `page.tsx`, `layout.tsx`, `route.ts` được export thêm `metadata`, `generateMetadata`, `generateStaticParams` và các export cấu hình mà framework yêu cầu.
- Nghiệp vụ nằm ở file service; nếu cần gọi API thì tách thêm file api. Component chỉ gọi các hàm đó, không tự cài đặt nghiệp vụ.

## Export
- Ưu tiên mỗi file `export default` đúng một component, tên component trùng tên file.
- Các component có điểm chung (dùng chung nhiều import, cùng được export trong một điều kiện, cùng props) có thể đặt chung một file. Khi đó chọn named hoặc default export theo cái hợp hơn.
- File đã dùng named export thì **toàn bộ** file dùng named export, trừ khi có một thành phần nổi bật hơn về logic/nghiệp vụ (ví dụ `export default store`).
- Ngoại lệ của Next.js: file đặc biệt (`page`, `layout`, `loading`, `error`, `not-found`, `template`, `default`) bắt buộc `export default`, tên component không cần trùng tên file.
