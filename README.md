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

## Triển khai lên Cloudflare (CI/CD)

Trang là bản xuất tĩnh (`output: "export"`), được phục vụ bằng **Cloudflare Workers Static Assets** tại `https://portfolio.longvi.org`.
Không cần khai báo cổng: Cloudflare phục vụ qua HTTPS 443 (cổng 21000 trong `.env` chỉ dùng khi chạy dev trên máy).
Cấu hình nằm ở `wrangler.jsonc` (thư mục `out/`, trang 404, tên miền).

### Quy trình tự động (`.github/workflows/ci-cd.yml`)

| Sự kiện | Việc chạy |
|---|---|
| Pull request vào `main` | `npm ci` → lint → build → type-check → `npm audit` (gói chạy thật, mức high) → kiểm tra đầu ra. Không deploy. |
| Push vào `main` | Như trên, rồi deploy đúng bản đã build lên Cloudflare (môi trường `production`). |
| Chạy tay (Actions → ci-cd → Run workflow) | Như push vào `main` nếu chọn nhánh `main`. |

Dependabot (`.github/dependabot.yml`) mở PR cập nhật gói và action mỗi tuần.

### Google Analytics

- Measurement ID (`G-NV754NB5GV`, tài khoản "Portfolio Long Nguyen", tài sản `portfolio.longvi.org`) nằm trong `NEXT_PUBLIC_GA_ID` của `ci-cd.yml`. Không phải bí mật. Biến trống (ví dụ khi chạy dev) thì không tải Analytics.
- Chạy `npm run deploy:cloudflare` trên máy thì phải đặt `NEXT_PUBLIC_GA_ID` (và `NEXT_PUBLIC_APP_URL`) trong `.env` trước khi build.
- `gtag.js` tải ngay khi người xem vào trang, không có banner đồng ý cookie (theo yêu cầu của chủ trang).
- Sự kiện tự đo: lượt xem trang, cuộn, bấm link ra ngoài, tải file (CV PDF). Sự kiện tùy chỉnh: `change_language`, `copy_contact`.
- Domain của Google được cho phép riêng trong CSP (`public/_headers`); thêm dịch vụ ngoài khác phải sửa cả CSP lẫn `scripts/check-build-output.mjs`.

### Thiết lập một lần

1. **Tạo API token:** Cloudflare Dashboard → My Profile → API Tokens → Create Token → mẫu **Edit Cloudflare Workers**
   (chọn đúng tài khoản và zone `longvi.org`). Sao chép token.
2. **Lấy Account ID:** Workers & Pages → bên phải trang tổng quan.
3. **Thêm vào GitHub:** repo → Settings → Secrets and variables → Actions → New repository secret:
   `CLOUDFLARE_API_TOKEN` và `CLOUDFLARE_ACCOUNT_ID`.
4. **(Khuyến nghị)** Settings → Environments → `production` → bật *Required reviewers* nếu muốn duyệt tay trước khi lên web,
   và Settings → Branches → bảo vệ `main` (yêu cầu job `Lint, type-check, build` xanh trước khi merge).
5. **Tên miền:** `wrangler.jsonc` dùng *route trên zone* (`portfolio.longvi.org/*`, zone `longvi.org`): Worker nhận request tại mạng Cloudflare
   trước máy chủ gốc, nên bản ghi DNS sẵn có của subdomain (đang proxy) được giữ nguyên, không cần sửa. Nếu muốn dọn, xóa bản ghi/tunnel cũ
   rồi đổi sang `{ "pattern": "portfolio.longvi.org", "custom_domain": true }` (Cloudflare tự tạo bản ghi và chứng chỉ).

Chưa thêm secret thì job deploy chỉ in cảnh báo và bỏ qua (kiểm tra vẫn chạy); lần đầu có thể deploy tay bằng `npm run deploy:cloudflare`.

### Deploy thủ công từ máy

```bash
npx wrangler@4.165.0 login        # lần đầu
npm run deploy:cloudflare         # build rồi deploy (đặt NEXT_PUBLIC_APP_URL=https://portfolio.longvi.org khi build)
```

`NEXT_PUBLIC_APP_URL` được nhúng vào HTML lúc build (canonical, sitemap, og:url): không kèm cổng, không có dấu `/` cuối.
Workflow đã đặt sẵn giá trị này; đổi tên miền thì sửa ở `.github/workflows/ci-cd.yml` và `wrangler.jsonc`.

### Những gì Cloudflare dùng sẵn trong repo

- `public/_headers`: cache bất biến cho `/_next/static/*`, cache cho logo/ảnh, và các header bảo mật cơ bản. Được chép vào `out/_headers`.
- `out/404.html`: dùng làm trang 404.
- URL sạch: `/vi` được phục vụ từ `vi.html`; `/vi/` chuyển về `/vi` (`html_handling: drop-trailing-slash`).

### Lưu ý

- Static export không có server: không dùng được API route, ISR, middleware. Toàn bộ nội dung đã được render sẵn lúc build.
- Chưa có CSP vì Next.js static export chèn script inline cho hydration; muốn thêm CSP nghiêm ngặt cần băm (hash) các script đó.
- `Dockerfile` và `nginx.conf` chỉ dùng khi tự host; Cloudflare không dùng tới.

## Cấu trúc chính

```
src/app/(root)/        "/" và /error/*
src/app/[locale]/      trang theo ngôn ngữ (vi, en)
src/features/portfolio/ nội dung, section, dịch vụ SEO
src/components/shared/ khung html, cuộn mượt, nút đổi giao diện
public/_headers        header/cache cho Cloudflare
workspace/features/    tài liệu thiết kế (idea, design, status)
```
