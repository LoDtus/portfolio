# Trạng thái: 001 Portfolio redesign

Cỡ: lớn   Giai đoạn hiện tại: 6 (bàn giao, chờ người dùng bổ sung nội dung)

- [x] 1 Phạm vi   → idea.md (gồm kết quả tham khảo repo theo rule `prior-art`)
- [x] 2 Thiết kế  → design.md
- [x] 3 Hiện thực → src/features/portfolio, src/app/(root), src/app/[locale]
- [x] 4 Kiểm tra  → `tsc --noEmit` sạch; `eslint src` 0 lỗi (2 cảnh báo có sẵn ở store.ts); `next build` (static export) xanh, 21 trang;
      ảnh chụp light/dark/mobile; không tràn ngang; luồng route cũ, trang chi tiết, đổi ngôn ngữ đã chạy thử
- [ ] 5 Tối ưu    → bỏ qua (chưa có rủi ro hiệu năng; chưa đo Lighthouse)
- [x] 6 Bàn giao  → danh sách việc người dùng cần bổ sung bên dưới

## Cần người dùng bổ sung / xác nhận
- Udata, IRDOP, Lifetex: vị trí, thời gian, mô tả, dự án (link + stack) (`content-vi/en.constants.ts` → `experience.entries`; điền `startedAt` trong `profile.constants.ts` nếu muốn tự xếp theo ngày)
- Tên hiển thị "Long Nguyen" (lấy từ title bị comment trong layout cũ) và GitHub `LoDtus` (suy ra từ ghi chú bản quyền) trong `profile.constants.ts`
- CV PDF, ảnh cá nhân `public/images/me/me-001.avif` (đã tối ưu nhưng chưa dùng trong hero)
- `public/markdown/affiliate-product-catalog.md` đang rỗng nên chưa có project tương ứng
- `NEXT_PUBLIC_APP_URL` thật cho sitemap/canonical (hiện fallback https://longvi.org)

## Residual (không xử lý trong lượt này)
- Dependency không còn dùng: swiper, react-player, axios, country-flag-icons, github-markdown-css, redux (store.ts)
- `src/shared/locales/*.json` rỗng, không còn dùng
- Chưa chạy Lighthouse/axe; chưa thử trên Safari/Firefox thật
- Bảng màu đã đổi sang xanh lá (xem idea.md)
- Hiệu ứng cuộn + cuộn mượt + chuẩn bị Cloudflare: xong, đã kiểm (xem idea.md)

## Cập nhật 2026-11-20 (cần người dùng rà soát)
- Mô tả còn trống: Location Insight, ba dự án tại Udata (Uboard ESG, UleadGen, Ugate); mô tả chung của từng công ty; stack của UleadGen. Website của Udata và Lifetex (`companyUrl`).
- Mốc thời gian: Udata 06/2026 – 12/2026 (kết thúc ở tương lai), Lifetex 03/2024 – 06/2026 chồng lên IRDOP 10/2025 – 04/2026 và Udata; kiểm tra lại cho đúng.
- "quản lý văn" ở Life Office đang viết là "quản lý văn phòng" (bản gốc bị cụt chữ).
- Link IRDOP https://irdop.org/ đặt làm website công ty (hệ thống ERP nội bộ không có link công khai).
- Chuẩn hóa tên: Next.js, React, Node.js, FastAPI, FastMCP, Tailwind CSS, Elasticsearch, CapCut; Facebook dùng www.facebook.com.
- `NEXT_PUBLIC_APP_URL` thật cho canonical/sitemap (hiện fallback https://longvi.org); khi sửa nội dung nhớ đổi `SEO.contentUpdatedAt`.
- Đã build tĩnh (`next build`) xanh, 21 trang. Chưa chạy Lighthouse, Rich Results Test, Search Console.
