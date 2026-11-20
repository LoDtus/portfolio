---
description: Khi skill của bên thứ ba (sao chép nguyên văn, không sửa) mâu thuẫn với rule hoặc CLAUDE.md của dự án thì rule dự án thắng; ghi chú xử lý riêng cho từng skill ngoài.
---

# Skill bên ngoài và rule của dự án

Skill bên thứ ba được giữ nguyên văn, không sửa. Danh sách và nguồn nằm ở `.claude/third-party-skills.md`. Khi dùng chúng, theo phương pháp của skill nhưng **áp dụng quy ước của dự án**.

## Nguyên tắc chung

- Lời người dùng, `CLAUDE.md` và các rule trong `.claude/rules/` luôn thắng skill ngoài. Mâu thuẫn thì làm theo rule, nói ngắn trong báo cáo rằng đã bỏ phần nào của skill.
- Không chạy mã tải từ mạng mà skill gợi ý (`curl | sh`, codemod từ URL, `@latest`) và không cài công cụ hay thư viện mới chỉ vì skill nhắc (xem `global.md` mục dependency).
- Lệnh phá hủy hoặc ghi vào dịch vụ thật (xóa index, `DROP`, đổi cấu hình cluster, reset database) cần người dùng đồng ý rõ từng lần. Thử nghiệm chỉ trên database, cache, index tạm (xem `dev-reset.md`).
- Không `git push` và không `git reset --hard` dù skill đề xuất (xem mục Git trong `CLAUDE.md`).
- Không tạo hay đề xuất test e2e dù ví dụ trong skill có (xem `testing-policy`).
- Ví dụ trong skill dùng Prisma, Python, Java hay tên đặt khác thì chuyển sang stack và quy ước đặt tên đang dùng của dự án (`naming*.md`).
- Báo cáo và giải thích bằng tiếng Việt dù skill yêu cầu tiếng Anh.

## Ghi chú theo skill

- `supabase-postgres-best-practices`: tên index theo `naming-data.md` (`idx_<bảng>_<cột>`), không theo mẫu trong skill. Bỏ qua phần riêng của Supabase (RLS, `auth.uid()`, pooler). Chỉ dùng khi tối ưu truy vấn, index, khóa, kết nối hoặc rà soát schema; không cần cho việc sửa một cột nhỏ.
- `redis-security`: bổ sung điều skill thiếu: khai báo `ports:` trong Docker bỏ qua iptables/ufw, nên dùng mạng nội bộ và không publish cổng Redis (`env-docker.md`). Mật khẩu lấy từ biến môi trường, không ghi cứng.
- `elasticsearch-index-design`, `elasticsearch-reindex`: skill đòi CLI `elastic` và cấm gọi HTTP trực tiếp; dự án không có CLI này. Dùng skill như tài liệu tham khảo, chạy qua client `@elastic/elasticsearch` của dự án hoặc đưa lệnh cho người dùng chạy. Tên trường mapping theo camelCase, ứng dụng đọc ghi qua alias không hậu tố phiên bản (`naming-data.md`). Không `DELETE` index hay đổi cluster settings nếu chưa được đồng ý rõ.
- `performance-optimization`: dùng cho backend, truy vấn, cache. Ngưỡng Core Web Vitals và tối ưu React thuộc `seo-audit` và `vercel-react-best-practices`. Ví dụ Prisma đổi sang TypeORM. Luôn đo trước và sau, giữ bằng chứng.
- `docker-development`: `env-docker.md` thắng về cổng, biến môi trường và bố cục file `.env`. Chỉ lấy lời khuyên về layer, cache, bảo mật, healthcheck. Kiểm tra lại phiên bản image trong ví dụ (có mẫu đã cũ) và `HEALTHCHECK curl` không chạy trên alpine.
- `api-and-interface-design`: envelope lỗi và `trackId` trong `security.md` thắng mẫu lỗi của skill; không tự tạo hệ thống mã lỗi mới (`error-tracing.md`). Hợp đồng API của tính năng mới do `planning-design` quyết định.
- `observability-and-instrumentation`: `error-tracing.md` thắng: dùng logger sẵn có, không thêm thư viện log, metrics hay tracing, mã tương quan là `trackId`. Tài liệu lưu trong `workspace/docs/`, không tự tạo `docs/runbooks/`.
- `owasp-security`: chỉ là checklist bổ sung, không ghi đè `security.md` (độ dài mật khẩu, thời hạn JWT, băm mật khẩu theo `security.md`).
- `supply-chain-risk-auditor`: cần `uv`, Python 3.11 trở lên, nên có `gh`; script gọi API OSV, npm, deps.dev, GitHub chỉ với tên gói. Đường dẫn script là `.claude/skills/supply-chain-risk-auditor/scripts/`. Đọc `package-lock.json`.
- `postmortem-writing`: lưu trong `workspace/docs/` hoặc thư mục tính năng liên quan; dự án nhỏ bỏ bớt phần họp và phân cấp mức độ.
- `wcag-audit-patterns`: bỏ phần pháp lý Mỹ/EU; không biến ví dụ Playwright thành bộ test; không đổi diện mạo giao diện (xem `CLAUDE.md`).
- `test-data-management`: chỉ unit và integration, factory viết bằng mã thuần, bỏ phần Playwright/e2e, chỉ dùng database test tạm, không dùng database dev của người dùng.
- `deprecation-and-migration`: thao tác phá hủy (xóa cột, drop bảng) tách thành bước riêng và cần đồng ý.
- `tech-debt`: chỉ liệt kê và xếp ưu tiên, không tự refactor khi chưa được yêu cầu (`global.md`).
