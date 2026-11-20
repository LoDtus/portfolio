---
description: >-
  Quy ước tổ chức web Next.js theo feature, thứ dùng chung đưa vào shared; route người dùng và admin,
  layout dùng lại, server/client component, metadata. Chỉ áp dụng khi dự án dùng Next.js.
paths:
  - "**/app/**/*.ts"
  - "**/app/**/*.tsx"
  - "**/pages/**/*.tsx"
  - "**/features/**/*.tsx"
  - "**/shared/**/*.tsx"
  - "**/next.config.*"
  - "**/middleware.ts"
  - "**/proxy.ts"
---

# Next.js: feature-based, dùng chung vào shared

Chỉ áp dụng khi `package.json` của app web có `next` (trong monorepo: chỉ app web, không áp cho backend). Dự án không dùng Next.js thì bỏ qua rule này. Quy ước viết file component nằm ở rule `stack-react`.

**Precedence:** khi sửa code có sẵn, cấu trúc và kiểu đang dùng trong dự án thắng rule này. Rule áp cho feature mới và chỗ chưa có quy ước. Chi tiết riêng của dự án nằm trong rule `stack-nextjs-<dự-án>.md` nếu có.

## Tổ chức
- `app/` chỉ lo routing, layout và các `page` mỏng ghép các thành phần của feature. Không đặt nghiệp vụ hay UI dài trong `page.tsx`.
- Mỗi tính năng là một feature tự chứa trong `features/<feature>/`: component, hook, service, api, interface/types, constants, locales, test của riêng nó.
- Thứ dùng chung thì vào `shared/`: component UI chung, hook, service, tiện ích, hằng số, types, provider, locales.
- Chỉ một feature dùng thì để trong feature. Khi feature thứ hai cần thì chuyển lên `shared/`. Không tạo shared "phòng hờ". `shared/` không import từ `features/`.
- Feature dùng feature khác chỉ qua phần export công khai của nó, một chiều, không vòng. Cần chung nhiều thì rút phần chung lên `shared/`.

## Route và giao diện
- Tách router và lớp gọi API của người dùng thường với admin (segment hoặc route group riêng, client/service riêng).
- Nhiều route cùng khung giao diện thì tạo `layout.tsx` (route group) thay vì lặp lại.
- Các tab, route đồng cấp dùng giao diện đồng bộ với nhau.

## Server và client
- Ưu tiên server component. Chỉ thêm `'use client'` ở component nhỏ nhất thật sự cần state, effect, event handler hoặc API của trình duyệt; tránh đặt ở `layout`/`page` nếu làm khác được.
- Lấy dữ liệu ở server component hoặc qua service của feature; component không tự cài đặt nghiệp vụ hay gọi `fetch` rải rác.
- Biến môi trường cho trình duyệt phải có tiền tố `NEXT_PUBLIC_`; secret không bao giờ vào code client.

## SEO và phiên bản
- Mỗi trang công khai có metadata (`metadata` hoặc `generateMetadata`): title, description, canonical. Trang admin/riêng tư đặt noindex.
- API của Next đổi giữa các bản lớn (ví dụ `params`/`searchParams`/`cookies()`/`headers()` bất đồng bộ từ Next 15; `middleware` đổi tên thành `proxy` ở Next 16). Dùng đúng theo bản trong `package.json`; không chắc thì đọc tài liệu đúng phiên bản.
