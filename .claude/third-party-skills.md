# Skill của bên thứ ba

Các skill dưới đây được sao chép **nguyên văn** từ các repo công khai vào `.claude/skills/` (không sửa nội dung). Ghi chú xử lý xung đột với rule của dự án nằm ở `.claude/rules/third-party-skill-precedence.md`. Toàn văn license nằm trong `.claude/third-party-licenses/`.

Ngày sao chép: 2026-11-16. Chế độ hiển thị đặt trong `.claude/settings.json` (`skillOverrides`):

- **tự chọn (name-only)**: agent thấy tên skill và có thể dùng khi phù hợp, nhưng không thấy mô tả dài nên ít bị kích hoạt tràn lan.
- **thủ công**: ẩn khỏi agent, chỉ chạy khi bạn gõ `/tên-skill`.

| Skill | Mục đích (một dòng) | Chế độ | Nguồn, commit | License |
|---|---|---|---|---|
| `supabase-postgres-best-practices` | Tối ưu truy vấn, index, khóa, kết nối và thiết kế bảng Postgres | tự chọn | supabase/agent-skills `c9be0e9` | MIT |
| `redis-security` | Cứng hóa Redis: xác thực, ACL, TLS, giới hạn mạng, tắt lệnh nguy hiểm | tự chọn | redis/agent-skills `74708da` | MIT |
| `elasticsearch-index-design` | Thiết kế mapping Elasticsearch đúng kiểu trường, multi-field, tránh bùng nổ mapping | thủ công | elastic/agent-skills `09d879d` | Apache-2.0 |
| `elasticsearch-reindex` | Reindex Elasticsearch an toàn, nhanh: local/remote, slicing, throttle, theo dõi task | thủ công | elastic/agent-skills `09d879d` | Apache-2.0 |
| `supply-chain-risk-auditor` | Quét rủi ro chuỗi cung ứng của dependency: lỗ hổng, gói bị bỏ rơi, script cài đặt | thủ công | trailofbits/skills `149d7b2` (chỉ SKILL.md và scripts, bỏ test, agents, assets) | CC-BY-SA-4.0 |
| `owasp-security` | Checklist rà soát bảo mật theo OWASP Top 10:2025, ASVS 5.0, LLM/Agentic | thủ công | agamm/claude-code-owasp `1ae29cb` | MIT |
| `docker-development` | Viết và rà soát Dockerfile, compose: layer, cache, kích thước, bảo mật, healthcheck | tự chọn | alirezarezvani/claude-skills `08cd8a9` | MIT |
| `performance-optimization` | Tối ưu hiệu năng theo quy trình đo trước, sửa, đo lại; mạnh ở backend, truy vấn, cache | tự chọn | addyosmani/agent-skills `39b723c` | MIT |
| `observability-and-instrumentation` | Thêm log, metrics, trace, cảnh báo để thấy được hành vi production | thủ công | addyosmani/agent-skills `39b723c` | MIT |
| `deprecation-and-migration` | Gỡ bỏ có kế hoạch và migration không downtime (expand/contract) | tự chọn | addyosmani/agent-skills `39b723c` | MIT |
| `api-and-interface-design` | Nguyên tắc thiết kế API và ranh giới module ổn định, tương thích ngược | tự chọn | addyosmani/agent-skills `39b723c` | MIT |
| `postmortem-writing` | Viết báo cáo sự cố không đổ lỗi: dòng thời gian, nguyên nhân gốc, hành động | tự chọn | wshobson/agents `9c61ab2` | MIT |
| `wcag-audit-patterns` | Kiểm tra accessibility theo WCAG 2.2 và hướng dẫn sửa | tự chọn | wshobson/agents `9c61ab2` | MIT |
| `tech-debt` | Liệt kê, phân loại và xếp ưu tiên nợ kỹ thuật (chỉ báo cáo, không tự refactor) | thủ công | anthropics/knowledge-work-plugins `e91a134` | Apache-2.0 |
| `test-data-management` | Dữ liệu test: factory, fixture, seed, ẩn danh hóa | tự chọn | petrkindlmann/qa-skills `9b075da` | MIT |

## Đã cân nhắc nhưng không cài

Lý do dựa trên báo cáo duyệt nội dung ngày 2026-11-16 (đọc có chọn lọc, không phải mọi dòng):

- `postgresql-table-design`, `database-migration`: trùng `planning-design`; `database-migration` có mẫu `DROP TABLE users` và mẫu SQL dùng kiểu và cách đặt tên trái `naming-data.md`.
- `redis-core`: dạy cách đặt khóa trái `naming-data.md`; `redis-observability`: nội dung chung chung.
- `elasticsearch-query-optimization`, `database-testing`: phụ thuộc công cụ không có, mẫu `DROP DATABASE` nội suy chuỗi.
- `sharp-edges`, `secrets-management`: không khớp stack (Vault, đám mây).
- `ci-cd-and-automation`, `shipping-and-launch`, `git-workflow-and-versioning`: giả định GitHub Actions và e2e; `git-workflow-and-versioning` khuyên `git reset --hard` và push, mâu thuẫn mục Git trong `CLAUDE.md`.
- `performance-rca`, `k6`, `k6-perf-test-website`, `k6-trend-analysis`: bắt buộc Grafana Cloud/`gcx`/k6 mà dự án chưa có.
- `incident-runbook-templates`, `slo-implementation`, `dependency-upgrade`, `contract-testing`: giả định Kubernetes/Prometheus/PagerDuty; `dependency-upgrade` có codemod tải từ nhánh `master` và `--force`.
- `changelog-automation`: dùng `changelog-manager` của dự án.
- Skill e2e (Playwright, Cypress, visual): theo `testing-policy`, chỉ khi bạn yêu cầu rõ.
- `getsentry/security-review`: trùng tên lệnh built-in `/security-review`.
