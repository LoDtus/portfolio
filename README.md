# Portfolio

Trang portfolio song ngữ (vi/en), một trang cuộn, xuất **tĩnh** bằng Next.js (`output: "export"`).

## Chạy thử

```bash
npm ci
npm run dev        # http://localhost:<PORT trong .env>
npm run build      # sinh thư mục out/ (HTML, CSS, JS tĩnh)
npm run preview    # xem thử out/ như khi chạy trên hosting tĩnh (cần mạng lần đầu để tải `serve`)
```

`npm run lint` và `npm run type-check` nên xanh trước khi build.

### Chạy trong Docker (`make dev`) và thêm thư viện mới

Container `dev` giữ `node_modules` trong một volume riêng, tạo lúc build image. **Thêm hoặc đổi dependency trong `package.json` không tự cập nhật volume này**, và `docker compose up --build` cũng giữ nguyên volume cũ, nên Next sẽ báo `Module not found: Can't resolve '<gói mới>'`. Có hai cách xử lý:

```bash
# Cách sạch (khuyên dùng): tạo lại container cùng volume node_modules mới
docker compose --profile dev up -d --build --renew-anon-volumes

# Cách nhanh: cài vào container đang chạy
docker exec dev npm install
```

Container chạy bằng root, nên nếu `npm install` làm đổi `package-lock.json` thì file đó trên máy bạn sẽ thuộc root. Chạy `npm install` trên máy (ngoài Docker) trước để cập nhật lock bằng đúng user của bạn.

## Đưa lên Cloudflare Pages

Bản build tĩnh nằm ở `out/`. Có hai cách.

### Cách 1: kết nối Git (khuyên dùng, tự build khi push)

1. Đẩy mã lên GitHub/GitLab.
2. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
3. Cấu hình build:

   | Mục | Giá trị |
   |---|---|
   | Framework preset | Next.js (Static HTML Export) |
   | Build command | `npm run build` |
   | Build output directory | `out` |

4. Thêm biến môi trường (Settings → Variables and Secrets, **Production** và **Preview**). Phiên bản Node lấy từ `.node-version` (22), không cần đặt thêm:

   | Biến | Giá trị | Ghi chú |
   |---|---|---|
   | `NEXT_PUBLIC_APP_URL` | `https://ten-mien-cua-ban` | **Bắt buộc**: dùng cho canonical, hreflang, sitemap, robots và JSON-LD. Thiếu thì dùng giá trị mặc định `https://longvi.org`. |

5. **Save and Deploy**. Gắn tên miền riêng ở tab **Custom domains**.

### Cách 2: tải thẳng thư mục out/ lên (không cần Git)

```bash
npm run build
npx wrangler login                      # lần đầu
npx wrangler pages deploy out --project-name portfolio
# hoặc: npm run deploy:cloudflare
```

Nhớ đặt `NEXT_PUBLIC_APP_URL` **trước khi build** (build tĩnh nhúng giá trị này vào HTML):

```bash
NEXT_PUBLIC_APP_URL=https://ten-mien-cua-ban npm run build
```

### Những gì Cloudflare dùng sẵn trong repo

- `public/_headers`: cache bất biến cho `/_next/static/*`, cache 7 ngày cho logo/ảnh, và các header bảo mật cơ bản. Được chép vào `out/_headers`.
- `out/404.html`: Cloudflare Pages tự dùng làm trang 404.
- URL sạch: `/vi` được phục vụ từ `vi.html`, nên không cần cấu hình thêm (đã đặt `trailingSlash: false`).

### Lưu ý

- Static export không có server: không dùng được API route, ISR, middleware. Toàn bộ nội dung đã được render sẵn lúc build.
- Cloudflare hiện hướng dẫn site Next.js cần server sang Workers; với site tĩnh như thế này, Pages vẫn là đường đi được tài liệu chính thức hỗ trợ.
- Chưa có CSP vì Next.js static export chèn script inline cho hydration; muốn thêm CSP nghiêm ngặt cần băm (hash) các script đó.

## Cấu trúc chính

```
src/app/(root)/        "/" và /error/*
src/app/[locale]/      trang theo ngôn ngữ (vi, en) + chi tiết project
src/features/portfolio/ nội dung, section, dịch vụ SEO
src/components/shared/ khung html, cuộn mượt, nút đổi giao diện
public/_headers        header/cache cho Cloudflare
workspace/features/    tài liệu thiết kế (idea, design, status)
```
