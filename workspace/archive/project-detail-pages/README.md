# Trang chi tiết dự án (đã cất)

Cất ngày 2026-11-20. Danh sách dự án mới (Location Insight, Vinfastreev, Affiliate Product Catalog,
City Incidents Management System) chưa có tài liệu markdown nào, mà `output: "export"` không cho phép
route động `/[locale]/projects/[slug]` có `generateStaticParams()` rỗng (build báo lỗi), nên phần này được bỏ khỏi `src/`.

Nội dung (đuôi `.txt` thêm vào để TypeScript không kiểm tra; bỏ đuôi khi khôi phục):
- `src/app/projects-slug/page.tsx`: route `/[locale]/projects/[slug]`
- `src/features/portfolio/components/markdown-view.tsx`, `mermaid-diagram.tsx`: hiển thị markdown và sơ đồ Mermaid
- `src/features/portfolio/services/project-markdown.service.ts`: đọc `public/markdown/*.md` lúc build
- `public/markdown/`: `fallback-pages.md` (có nội dung), `affiliate-product-catalog.md` (rỗng)

Khôi phục khi một dự án có tài liệu: chép lại các tệp về đúng chỗ (route về `src/app/[locale]/projects/[slug]/page.tsx`),
thêm `markdownFile` vào `ProjectConfig`, `getProjectsWithDetail()` vào `sitemap.ts` và `llms.service.ts`,
`buildProjectMetadata()` vào `metadata.service.ts`, và nút "Chi tiết" vào `project-card.tsx`.
Các gói `react-markdown`, `remark-gfm`, `rehype-raw`, `mermaid`, `github-markdown-css` vẫn còn trong package.json.
