# 001 Portfolio redesign: idea

Cỡ: **Lớn** (đổi toàn bộ giao diện, cấu trúc route, mọi section, thêm SEO/AI-readable). Người dùng đã nói rõ "tái cấu trúc hoàn toàn", nên được phép đổi diện mạo (CLAUDE.md).

## Vấn đề

Portfolio hiện là khung (About, Skills, Projects chỉ có "abc", Experience là Lorem ipsum), bố cục tab/snap-scroll lồng trong container riêng. HR lướt nhanh và AI quét cần: nội dung chữ thật trong HTML, một trang cuộn, nhận diện rõ, không phụ thuộc ảnh cá nhân.

## Phạm vi (deliverables)

1. Design tokens + font theo Thang Long University (light mặc định, có dark).
2. Kiến trúc: một trang cuộn render phía server, chỉ nav/locale/theme là client; `<html lang>` đúng theo locale.
3. Section giữ nguyên đầu mục: About, Skills, Education, Experience, Projects (+ Contact, Footer).
4. Mô hình nội dung có kiểu (vi/en cùng cấu trúc), section rỗng tự ẩn.
5. Trang chi tiết project render từ markdown (kèm sơ đồ mermaid).
6. SEO/AI: metadata + canonical + hreflang, JSON-LD `Person`, sitemap/robots theo URL thật, `llms.txt`.
7. Tải logo liên quan (Thăng Long bản trắng, FPT Software).
8. Kiểm tra build/type/lint trong bản sao tạm; ảnh chụp light/dark/mobile.

## Ràng buộc và quyết định

- **Không dùng ảnh cá nhân**: hero dùng khối hình học (ngôn ngữ thị giác của brand.thanglong.edu.vn), education dùng ảnh tốt nghiệp của trường, logo trường và nơi làm việc.
- **BUV (buv.edu.vn)** chặn truy cập tự động (Cloudflare 403). Không vượt chặn; tham chiếu chính là thanglong.edu.vn + brand.thanglong.edu.vn.
- **Font**: Thang Long Sans là font riêng của trường (không phải font công khai) nên không tải/chép. Dùng **Manrope** (font phụ trợ chính thức, OFL) cho nội dung và **Lexend** (OFL, hỗ trợ tiếng Việt) làm font hiển thị thay thế.
- **Màu** (brand.thanglong.edu.vn/colorsystem): Scarlet `#F32409`, Indigo `#000066`, Mid Blue (header brand site) `#0623A3`, Palatinate `#1D53E6`, Sea Serpent `#3AC2D8`, Crystal `#A0DDDF`, Cultured White `#F5F5F7`. Brand cấm chữ đỏ trên nền đen; chữ/nút đỏ cỡ thường dùng biến thể đậm hơn `#C91F08` để đạt tương phản AA (Scarlet nguyên bản trên trắng chỉ 4.15:1).
- **Logo**: dùng nguyên bản, không biến dạng, đủ vùng an toàn, đúng kích thước tối thiểu (60px số).
- **URL**: bỏ trùng lặp nội dung giữa `/vi`, `/vi/education`...; các route cũ vẫn tồn tại, cuộn tới đúng section, canonical về `/{locale}`; điều hướng dùng hash (`#education`).
- **Dữ liệu chưa có** (người dùng bổ sung sau): vị trí/thời gian/thành tích tại FPT Software, email, LinkedIn, CV PDF, ảnh cá nhân. UI hiển thị trạng thái "đang cập nhật" thay vì bịa.
- Không thêm dependency trừ `mermaid` (render sơ đồ trong tài liệu project, tải lười ở client).

## Tham khảo repo nổi bật (một lượt, theo rule `prior-art`)

Chỉ đọc README/metadata, không chạy mã.

| Repo | Trạng thái | Học được | Cố ý không theo |
|---|---|---|---|
| [jsonresume/resume-schema](https://github.com/jsonresume/resume-schema) (MIT, 2.4k★, đã chuyển vào jsonresume.org) | chuẩn dữ liệu CV phổ biến | từ vựng `basics / work / education / projects / skills`; dữ liệu tách khỏi UI, máy parse được | không thêm package schema; chỉ lấy hình dạng dữ liệu |
| [amruthpillai/reactive-resume](https://github.com/amruthpillai/reactive-resume) (MIT, 46k★, active) | trình dựng CV mã nguồn mở | mô hình section chuẩn (experience, education, skills, projects); section rỗng thì ẩn | không dựng editor/xuất PDF |
| [amannn/next-intl](https://github.com/amannn/next-intl) (MIT, 4.4k★, active) | i18n cho Next.js App Router | mẫu `[locale]` + `generateStaticParams` + `<html lang>` đặt theo locale; message có kiểu | không thêm thư viện: chỉ 2 locale, từ điển có kiểu (`PortfolioContent`) đủ dùng, tránh dependency |
| [leerob/leerob.io](https://github.com/leerob/leerob.io) (7.5k★, active, **không có license**) | site cá nhân Next.js | sitemap/robots/metadata + JSON-LD cho trang cá nhân | không chép mã (không license) |

## Điều kiện hoàn thành

`type-check`, `lint`, `build` (static export) chạy xanh trong bản sao; mọi route vi/en sinh ra; ảnh chụp light/dark/mobile không có khối trống.

## Cập nhật: đổi sang bảng màu xanh lá (2026-11-20)

Quyết định của người dùng: không dùng đỏ + indigo của Thang Long University để tránh bị nhầm là trang của trường. Cấu trúc, bố cục và kiểu khối hình học giữ nguyên, chỉ đổi màu.

| Token | Light | Dark |
|---|---|---|
| nền / bề mặt | `#F3F1E7` kem vintage / `#FBFAF4` | `#0E1A13` / `#15261B` |
| tiêu đề, band (đậm) | `#14412B` rừng | tiêu đề `#EDF5E8`, band `#14412B` |
| nhấn (vạch, hình khối) | `#4C9A5F` lá | `#4C9A5F` |
| chữ nhấn / nút (AA) | `#2E6B3E` / `#1F6B45` | `#8FD3A0` / `#1F6B45` |
| hình khối vintage | ô liu `#8E9B4A`, sage `#A3B18A`; nhạt: mint `#CFE3C8`, mist `#E4E8D4` | giữ nguyên |

Mọi cặp chữ/nền đạt WCAG AA (thấp nhất 5.64:1). Logo Thang Long chỉ còn ở mục Học vấn, đặt nguyên bản trên nền trắng đúng cẩm nang thương hiệu (bản logo trắng đã bỏ).

## Cập nhật: thêm terracotta và chữ đen

- Màu nhấn thứ hai: terracotta `#B5472A` (nút, vạch tiêu đề, mốc timeline, 2 ô hình khối, chữ nhấn). Trên nền xanh đậm dùng bản peach `#F2A488` vì terracotta chỉ đạt 2.1:1. Dark mode: vạch `#D9684A`, chữ nhấn `#F2A488`.
- Chữ chuyển sang đen: tiêu đề/nav `#111611`, nội dung `#1C211C`, chữ phụ `#565B50` (dark mode giữ chữ sáng). Xanh lá còn lại cho nền (band, nút nhạt), hình khối và liên kết trong tài liệu.
- Tỉ lệ: ~60% kem, ~30% xanh lá, ~10% terracotta.

## Cập nhật: nền trắng

Bỏ hẳn nền kem/be. `--bg-main` và `--surface` đều là `#FFFFFF`; thẻ trên nền trắng (số liệu ở About, thẻ Experience) dùng `--surface-muted: #F4F7F3` (dark mode `#1A2F22`); viền `#DDE4DA`; nền khối hình học là trắng, ô "mist" đổi sang `#E6EFE4`.

## Cập nhật: hiệu ứng cuộn, cuộn mượt, deploy Cloudflare (2026-11-20)

### Tham khảo thư viện hiệu ứng (số liệu từ npm registry và GitHub, 2026-11-20)

| Thư viện | Trạng thái | Kết luận |
|---|---|---|
| [Lenis](https://github.com/darkroomengineering/lenis) 1.3.27 | MIT, 17k★, cập nhật 19/11/2026 | **Dùng** cho cuộn mượt: cuộn native (không biến đổi nội dung) nên tương thích `sticky` và scroll-driven animations; đọc `scroll-padding-top` của `<html>`; ~7 KB gzip gồm adapter React |
| CSS scroll-driven animations (`animation-timeline: view()`) | Baseline từ 10/2026: Chrome/Edge 115, Safari 26, Firefox 159 ([web.dev](https://web.dev/blog/web-platform-10-2026)) | **Dùng** cho hiệu ứng vào/ra: chạy trên compositor, 0 KB JS, hai chiều tự nhiên; trình duyệt cũ chỉ hiện nội dung bình thường |
| [Motion](https://github.com/motiondivision/motion) 14.14 | MIT, 35k★, active | Không cần: hiệu ứng chạy phần lớn trên main thread/JS, thêm bundle cho việc CSS làm được |
| [GSAP](https://gsap.com) 3.15 + ScrollTrigger | license "no charge" riêng (không phải OSI), 31k★ | Không cần: mạnh nhưng nặng và scrub bằng JS |
| [AOS](https://github.com/michalsnik/aos) 2.3.4 | MIT, bản phát hành cuối 2022, commit cuối 03/2024 | Bỏ: gần như ngừng, chỉ có hiệu ứng "vào", không có "ra" |
| locomotive-scroll 5 | MIT, dựng trên Lenis | Bỏ: thêm một lớp phía trên Lenis |

### Quyết định thiết kế
- Mọi hiệu ứng chỉ animate `opacity` + `transform` (compositor). `.reveal` = vào khi phần tử lên từ đáy màn hình, ra khi trượt dưới thanh nav (inset 4.5rem của `view()`); hero ra theo `scroll(root)`.
- `prefers-reduced-motion: reduce` → không gắn Lenis, không hiệu ứng, cuộn native hoàn toàn.
- Cuộn mượt: `lerp 0.14` (con lăn dừng êm trong ~0.6s), `syncTouch` tắt (cảm ứng giữ quán tính native). Cuộn tới mục: `duration` theo quãng đường, 0.5s–1.1s.
- Đích cuộn tới mục tính tuyệt đối từ vị trí cuộn thực tế + `scroll-padding-top`, không dựa trạng thái nội bộ của Lenis (xem `getScrollTopFor`).
- Quy tắc: phần tử `.reveal` không được nằm trong tổ tiên có `overflow: hidden/auto` (sẽ thành scroll container và timeline không chạy); dùng `overflow: clip` nếu cần cắt.

### Deploy Cloudflare (static export)
Cloudflare vẫn hỗ trợ Pages cho Next.js static export (preset "Next.js (Static HTML Export)", build `npx next build`, thư mục `out`), dù khuyên dùng Workers cho site cần server. Đã thêm `public/_headers`, `.node-version` (22), script `preview` và `deploy:cloudflare`, README hướng dẫn. Đã kiểm bằng `wrangler pages dev`: `/vi` phục vụ từ `vi.html`, `/vi.html` → 308 `/vi`, header bảo mật + cache bất biến cho `/_next/static/*`, 404 dùng `404.html`.

## Cập nhật: ưu tiên hiệu ứng "vào", hạn chế hiệu ứng "ra" (2026-11-20)

Mục tiêu của người dùng: thấy nhiều hiệu ứng xuất hiện, ít thấy hiệu ứng biến mất; ưu tiên chuyển động.

| | Trước | Sau |
|---|---|---|
| Vào | `entry 0% → 55%` (sát mép dưới màn hình, khó thấy) | ẩn tới khi vào được **50%**, chạy trong **280px** cuộn (giữa màn hình) |
| Ra | `exit 0% → 85%` | chỉ bắt đầu khi đã trượt qua **80%**, gần như đã khuất sau nav |
| Hero ra | `scroll(root)` 0–420px | cùng quy tắc `exit 80% → 100%` |

Ba biến điều chỉnh nằm ở `:root` trong `globals.css`: `--reveal-start`, `--reveal-span`, `--reveal-out-start`.

Chuyển động phong phú hơn: biên độ lớn hơn (trượt 64px / ngang 80px), thêm kiểu `reveal-pop` (phóng + xoay nhẹ), so le giữa các phần tử cùng hàng bằng quãng cuộn cố định (px, không dùng % vì % tính theo kích thước phần tử nên phần tử nhỏ gần như không so le), và các chi tiết nhỏ cũng chuyển động: chip kỹ năng, ô số liệu học vấn, đoạn văn About, vạch tiêu đề (mọc từ trên xuống), mốc hình thoi timeline, khối hình học ở Liên hệ.

Kiểm tra: không có phần tử nào bị kẹt nửa mờ khi cuộn tới cuối trang (nội dung gần cuối trang vẫn kịp chạy hết 50% + 280px); đã thêm bài học mới bên dưới.

### Bài học: `overflow-x: clip` phải đặt ở `<main>`, không đặt ở `<body>`
Giá trị `overflow` của `<body>` bị chuyển lên viewport nên không cắt được phần tử đang trượt ngang (đo được tràn 9px trên mobile). Đặt trên `<main>` (không tạo scroll container nên timeline `view()` và `position: sticky` vẫn chạy) cho kết quả 0px ở 390/768/1024/1440px.

## Cập nhật: menu drawer mobile và lưới Kỹ năng 2 cột
- Dưới `lg`: nút 3 gạch mở drawer (`<dialog>` native, trượt từ trái, `mobile-drawer.tsx`); ngôn ngữ trên thanh band và nút đổi theme trên header ẩn, chuyển xuống cuối drawer (một hàng: toggle theme và nút VI/EN, justify-between, không nhãn). `html{scrollbar-gutter:stable}` để khóa cuộn không làm trang giật ngang. Từ `lg` trở lên giữ nguyên.
- Drawer: focus trap + Esc + vô hiệu phần còn lại do `<dialog>` lo; khóa cuộn bằng `overflow:hidden` trên `<html>` (không dùng `lenis.stop()` vì `lenis.scrollTo` bị bỏ qua khi đang stop); tự đóng khi viewport lên desktop; bấm backdrop để đóng.
- Animation trượt dùng transform nhưng không giữ `fill-mode`, để vòng tròn đổi theme (`position: fixed`) không bị kẹt trong containing block của panel.
- Kỹ năng: luôn lưới 2 cột (`grid-cols-2`), cỡ chữ `clamp()` cho số thứ tự, tiêu đề nhóm và chip; chip `break-words`. Đo ở 320–1280px, không tràn ngang, không chip chồng nhau.

## Cập nhật: mục Kinh nghiệm có ảnh, mô tả, dự án
- Thứ tự (người dùng chốt): Udata (gần nhất) → IRDOP → Lifetex. Đã bỏ FPT Software (xóa logo, constant, dòng ghi công ở footer).
- Mỗi mốc timeline là một thẻ: logo (không nền ở giao diện sáng; chế độ tối dùng nền trắng vì logo xanh đậm bị chìm), tên + thời gian, vai trò, mô tả, điểm nổi bật, slide ảnh (Swiper), danh sách dự án (tên + link, mô tả, stack).
- Slide ảnh: `experience-gallery.tsx` (client, Swiper 14, đã có sẵn trong package.json). Mobile một ảnh/lần, từ 768px hai ảnh/lần; nút vuông, chấm hình thoi, bàn phím, nhãn a11y theo ngôn ngữ. Ô `.reveal` nằm ngoài `.swiper` (overflow hidden).
- Ảnh phục vụ web là bản `.webp` ≤1400px cạnh ảnh gốc `.jpg`; ảnh gốc vẫn nằm trong `public/` và bị deploy theo (nên chuyển ra ngoài `public/` nếu muốn nhẹ hơn).
- Dữ liệu chưa có (người dùng bổ sung sau): vai trò, thời gian, mô tả, dự án của từng nơi; website công ty (`companyUrl: null` nên tên hiển thị dạng chữ thường); `startedAt`.
- Thêm một nơi làm việc: khai báo `ExperienceCompany` trong `profile.constants.ts`, thêm vào `experience.entries` của content-vi/en với `attachPhotoAlts(...)` (số alt phải bằng số ảnh, sai thì build lỗi).

## Cập nhật: slide lặp vòng, tự chuyển ảnh xen kẽ
- Slide `loop` + autoplay chu kỳ 3s (`experience.constants.ts`). Swiper chờ trượt xong rồi mới đếm nên `delay = 3000 − 700ms trượt`; KHÔNG dùng `waitForTransition: false` vì khi đó `pause()` gọi `resume()` ngay, mất tính năng dừng khi rê chuột.
- Xen kẽ: `getAutoplayOffsets()` chia đều độ lệch pha cho các công ty có ≥2 ảnh (2 công ty: 0ms và 1500ms). Mỗi bộ chỉ bắt đầu chạy sau độ lệch này khi nó vào khung nhìn (IntersectionObserver, ngưỡng 25%), dừng khi cuộn đi.
- Dừng khi rê chuột; tắt hẳn khi người dùng bật giảm chuyển động. Công ty chỉ có 1 ảnh không có slide.
- Khi chỉ có 2 ảnh thì desktop hiện 1 ảnh/lần (lặp vòng cần số ảnh > số ảnh hiện cùng lúc).
- Đo (dev server, 1440 và 390px): Udata đổi ảnh ở 1.85s, 4.85s, 7.85s; IRDOP ở 3.35s, 6.35s, 9.4s. Không lúc nào cùng đổi.

## Cập nhật 2026-11-20: dữ liệu thật, liên hệ, hash theo cuộn, ảnh nhẹ, SEO

- Logo cạnh tên là `public/logo/longvi.svg` (`brand-mark.tsx`); icon tab: `src/app/icon.svg`, `icon.png` 192, `apple-icon.png` 180.
- Header chỉ ghi "Portfolio"; dòng trên tiêu đề hero là "Portfolio · Lập trình viên Fullstack".
- Kỹ năng: 6 nhóm (Ngôn ngữ, Frontend, Backend, Triển khai, Các công cụ khác, Kỹ năng mềm). Danh sách chung ở `SKILL_ITEMS`; kỹ năng mềm có chữ theo ngôn ngữ nên ở `skills.softSkills`.
- Kinh nghiệm: Udata, IRDOP, Lifetex theo dữ liệu người dùng cung cấp. Dữ kiện không đổi theo ngôn ngữ (liên kết, stack, mốc thời gian) nằm ở `profile.constants.ts`; chữ (tên dự án, ý chính, vai trò) ở `content-vi/en`, ghép bằng `attachProjectTexts`.
- Dự án: Location Insight, Vinfastreev, Affiliate Product Catalog, City Incidents Management System (thay hai dự án cũ). Mỗi dự án có thời gian, liên kết (website, GitHub), số thành viên và vai trò, stack.
- Liên hệ: `CONTACT_CHANNELS` (Zalo, điện thoại, Gmail, GitHub, Facebook, LinkedIn, địa chỉ) dùng logo sẵn có trong `public/logo`; hiện ở mục Liên hệ và hàng biểu tượng ở chân trang.
- Hash theo cuộn: `useScrollSpy` (tính theo vị trí, có luật đáy trang) + `useSectionHashSync` (replaceState, giữ `history.state` của Next, đầu trang thì xóa hash, chỉ ghi sau lần cuộn đầu để không phá liên kết `/vi#projects`) + `lockSectionHash` (không ghi hash trung gian khi đang cuộn do bấm điều hướng).
- Sửa CLS: slide Swiper trước khi khởi tạo có chiều rộng khớp lúc sau (`.photo-swiper:not(.swiper-initialized)`), trang không còn co ~615px khi JS chạy; liên kết `#projects` hạ cánh đúng chỗ.
- Ảnh: ảnh kinh nghiệm cắt sẵn 16:10, 960px, AVIF (40–67 KB/ảnh); ảnh học vấn 1200px AVIF; logo đổi sang WebP và thu nhỏ; `public` từ ~3,7 MB còn ~0,57 MB. Ảnh gốc ở `workspace/assets-source/` (không deploy). Ảnh chia sẻ mạng xã hội: `public/og/og-image.jpg` (1200x630).
- SEO: title/description theo ngôn ngữ, canonical + hreflang (gồm x-default), Open Graph + Twitter (kèm ảnh), robots meta (max-image-preview), JSON-LD `@graph` (WebSite, ProfilePage, Person, ItemList dự án), sitemap có hreflang tự tham chiếu + ảnh + `lastmod` theo `SEO.contentUpdatedAt`, robots.txt, manifest, themeColor, `llms.txt` đầy đủ (kỹ năng, kinh nghiệm, dự án, liên hệ), `_headers` (HSTS, cache), trang lỗi `noindex`.
- Trang chi tiết dự án (`/[locale]/projects/[slug]`) đã cất vào `workspace/archive/project-detail-pages/` vì `output: "export"` không cho route động có `generateStaticParams()` rỗng; README trong đó nói cách khôi phục.

## Cập nhật: ảnh chân dung ở hero
- Hero dùng `public/images/me/me-001.avif` (800x897, nền trong suốt, có sẵn vòng tròn terracotta, đầu nhô ra khỏi vòng) đặt đè lên khối hình học (`hero-section.tsx`, dữ kiện ở `PROFILE.portrait`). Ảnh dùng `priority` vì là phần tử lớn trên màn hình đầu.
- `hero.photoAlt` có bản vi/en. JSON-LD `Person.image` trỏ tới ảnh này. Ảnh gốc PNG ở `workspace/assets-source/images/me/` (không đưa lên git).
