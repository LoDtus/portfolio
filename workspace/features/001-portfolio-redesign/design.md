# 001 Portfolio redesign: thiết kế

## Ngôn ngữ thị giác (rút từ thanglong.edu.vn + brand.thanglong.edu.vn)

| Yếu tố | Cách áp dụng |
|---|---|
| Thanh tiện ích indigo mỏng phía trên (ngôn ngữ) + thanh nav trắng sticky | `site-header`: tiện ích (VI/EN) + nav sticky có nút đỏ "Liên hệ" |
| Tiêu đề section: vạch đỏ đứng + chữ indigo đậm, mô tả nằm cột phải | `section-heading` |
| Khối số liệu: ảnh trái, panel indigo phải, số lớn có đơn vị nhỏ | `education-section` |
| Thẻ chương trình trên nền indigo, nhãn nhỏ + tiêu đề + "Xem thêm" đỏ | `skills-section` |
| Nút đỏ vuông (không bo), padding 12×32, chữ đậm | `.btn-primary` |
| ~~Khối hình học~~ đã bỏ (quá giống trang của trường); hero dùng ảnh chân dung, thẻ project chờ ảnh đại diện | `hero-section`, `project-card` |
| Nền trắng ngà `#F5F5F7`, chữ đen/indigo | token `--bg-main` |

Bản vẽ khối hình học là tự dựng, lấy cảm hứng từ ngôn ngữ hình học của brand, không dùng tài nguyên đồ họa của trường.

## Kiến trúc

```
app/
  (root)/            layout (html lang=vi) cho "/" và /error/*
  [locale]/          layout (html lang={locale}), page, education|experience|projects (route cũ), projects/[slug]
  sitemap.ts, robots.ts, llms.txt/route.ts
features/portfolio/
  components/        server: *-section, section-heading, ...
                     client: site-nav, locale-switcher, initial-section-scroller, mermaid-diagram
  constants/         sections, profile (dữ kiện không phụ thuộc ngôn ngữ), content-vi, content-en
  hooks/             use-scroll-spy
  services/          content, structured-data, metadata, project-markdown
  types/             portfolio.types
shared/              theme, i18n, site-url, provider (giữ nguyên)
```

- Một trang cuộn theo window (bỏ container cuộn lồng + snap + căn lại thủ công), `scroll-padding-top` cho nav sticky, `prefers-reduced-motion` được tôn trọng.
- Toàn bộ chữ nằm trong HTML tĩnh (server component, `output: "export"`). Client chỉ cho nav (scroll-spy, menu mobile), đổi ngôn ngữ, ThemeToggle, sơ đồ mermaid.
- Scroll-spy chỉ tô sáng mục nav, không ghi lại URL khi cuộn (tránh xung đột với router của Next). Hash chỉ đổi khi người dùng bấm điều hướng.

## Mô hình nội dung

`PortfolioContent` (vi/en cùng kiểu, trình biên dịch bắt thiếu khóa) + `profile.constants.ts` cho dữ kiện bất biến (năm học, GPA, link, công nghệ, logo). Section/nhóm kỹ năng rỗng không render.

## Chức năng bổ sung

Skip link, `aria-current`, focus ring, menu mobile (Esc đóng), metadata + canonical + hreflang, JSON-LD `Person` (đã chống chèn `</script>`), sitemap/robots theo URL cấu hình (`NEXT_PUBLIC_APP_URL`, có kiểm tra hợp lệ), `llms.txt`, trang chi tiết project từ markdown (ảnh/liên kết tương đối bị bỏ nếu không tồn tại), mermaid tải lười.

## Cập nhật màu (xanh lá)

Bảng màu hiện hành nằm ở `src/app/globals.css` (token `--bg-main`, `--heading`, `--band`, `--accent*`, `--color-brand-forest|pine|leaf|olive|sage|mint`). Các phần tham chiếu "Thang Long" ở bảng trên chỉ còn đúng về **bố cục** (thanh tiện ích, tiêu đề section, khối số liệu, nút vuông), không còn đúng về **màu**.
