---
name: feature-lifecycle
disable-model-invocation: true
argument-hint: "[mã-tính-năng hoặc mô tả yêu cầu]"
description: >-
  Quy trình khép kín cho một tính năng, thay đổi hoặc sửa lỗi lớn: làm rõ phạm vi, thiết kế, hiện thực,
  kiểm tra chất lượng, tối ưu, bàn giao. Chỉ chạy khi người dùng gọi /feature-lifecycle.
---

# Feature Lifecycle (quy trình chính)

Điều phối theo đúng thứ tự, ghi kết quả từng bước vào `workspace/features/<mã-tính-năng>/` (ví dụ `003-auth`). Skill này chỉ **điều phối**: nội dung từng bước nằm ở skill/lệnh được gọi. Nguồn gốc: `references/pipeline.md` (bản của bạn, giữ nguyên, còn tên tệp cũ; bản này là bản dùng) và `references/note.txt`.

Luôn áp dụng các rule trong `.claude/rules/` (global, security, naming, error-tracing, task-completion).

## Nguyên tắc ưu tiên

1. **Công cụ bên ngoài đã cài đứng trước** ("Chính"); skill của dự án ("Bổ sung") chỉ dùng khi bước đó không có công cụ ngoài hoặc cần khuôn đầu ra riêng.
2. Công cụ nào chưa cài thì bỏ qua, không tự cài. Skill ngoài không được sửa.
3. **Superpowers** đã cài đủ. Làm rõ yêu cầu và lập kế hoạch: mặc định `idea-discovery` và `planning-design`; `brainstorming`, `writing-plans` chỉ khi người dùng yêu cầu. Các skill còn lại (review, worktree, chạy song song, thực thi kế hoạch, hoàn tất nhánh) Claude tự gọi khi đúng tình huống.

## Bước 0: phân loại (bắt buộc, làm trước tiên)

| Cỡ | Dấu hiệu | Làm gì |
|---|---|---|
| **Nhỏ** | sửa 1–3 file, lỗi đã rõ nguyên nhân, đổi chữ/CSS/cấu hình | **Dừng skill này.** Làm thẳng theo rule. Chỉ cập nhật changelog nếu có |
| **Vừa** | một tính năng gọn, 1 module, không đổi schema hay hợp đồng API | Giai đoạn 1 (rút gọn: vài câu xác nhận) → 3 → 4 → 6 |
| **Lớn** | nhiều module, đổi schema/API, tích hợp mới, chạm dữ liệu nhạy cảm | Đủ 6 giai đoạn |
| **Lỗi** | yêu cầu sửa bug | Nhánh sửa lỗi (cuối file) |

Nói cỡ đã chọn trong một dòng rồi làm tiếp, không xin xác nhận (theo `task-completion`).

## Trạng thái

Tạo/cập nhật `workspace/features/<mã>/status.md` sau mỗi giai đoạn (phiên sau đọc lại để làm tiếp):

```md
# Trạng thái: <tên tính năng>
Cỡ: nhỏ|vừa|lớn   Giai đoạn hiện tại: <số>
- [x] 1 Phạm vi   → <slug>-idea.md
- [ ] 2 Thiết kế  → ...
Quyết định mở / chặn: ...
```

## Các giai đoạn

### 1. Phạm vi
- **Chính:** `grill-me` (nếu đã cài) để bị phản biện từng nhánh quyết định.
- **Bổ sung:** `idea-discovery` (khuôn `<slug>-idea.md`); `technical-feasibility` nếu có điều kiện kích hoạt; cỡ Lớn: áp dụng rule `prior-art` (tham khảo 2–4 repo nổi bật, một lượt).
- **Cổng ra:** file idea đã xác nhận; README của tính năng được tạo/cập nhật. Có mâu thuẫn hoặc chưa chọn được phương án thì **dừng và hỏi**.

### 2. Thiết kế (chỉ cỡ lớn)
- **Chính:** `impeccable` hoặc `design-taste-frontend` cho giao diện; `vercel-composition-patterns` cho cấu trúc component.
- **Bổ sung:** `planning-design` (sơ đồ, DB, API, threat model, README tính năng).
- **Cổng ra:** các tệp thiết kế nằm trong thư mục tính năng và được link từ README.

### 3. Hiện thực
- **Chính:** `vercel-react-best-practices` (React/Next); `impeccable` cho UI.
- **Bổ sung:** theo mẫu có sẵn của module lân cận trước, không áp khuôn từ nơi khác; cú pháp thư viện theo phiên bản trong manifest, không dùng hàm deprecated. Test theo `testing-policy`. Lỗi và log theo rule `error-tracing`. Thêm seed/công cụ dev thì đăng ký theo rule `dev-reset`.
- **Cổng ra:** build/lint/test liên quan chạy được; mỗi lần đổi mã đề xuất sẵn một commit message (xem CLAUDE.md), chỉ commit khi người dùng yêu cầu.

### 4. Kiểm tra chất lượng
- **Chính:** lệnh `/code-review` và `/security-review` có sẵn; `differential-review` (nếu đã cài) cho phần diff có rủi ro bảo mật.
- **Bổ sung** (chỉ phần các công cụ trên không phủ): kiến trúc đối chiếu rule `global` (tầng, coupling), dependency đối chiếu rule `security` mục 8, thiết kế test đối chiếu `testing-policy`.
- **Cổng ra:** phát hiện đã xử lý hoặc ghi rõ chấp nhận. Chỉ **một** lượt sửa rồi kiểm lại phần đã đổi (theo `task-completion`).

### 5. Tối ưu (chỉ khi cỡ lớn hoặc QA nêu rủi ro hiệu năng)
- **Chính:** `vercel-react-best-practices`; lệnh `optimize` và `polish` của `impeccable` cho giao diện.
- **Bổ sung** (backend/dữ liệu): đo trước, tối ưu sau, dùng cơ chế sẵn có (EXPLAIN, profiler, APM) trước khi thêm công cụ đo mới. Refactor chỉ khi test hiện có chạy xanh và không đổi hành vi; hành vi đổi thì quay về giai đoạn 2. Ghi đo gì, trước và sau ra sao, rủi ro còn lại.

### 6. Bàn giao
- **Chính:** `seo-audit`, `ai-seo` nếu tính năng có trang công khai.
- **Bổ sung:** `changelog-manager` cho `CHANGELOG.md`; cập nhật tài liệu/README liên quan.
- **Cổng ra:** nếu tính năng ở trạng thái **Chốt (Accepted)**, đồng bộ thông tin quan trọng từ thư mục tính năng lên `workspace/docs/`.

## Đường quay lại (khép vòng)

| Gặp | Quay về | Việc phải làm |
|---|---|---|
| Phạm vi đổi hoặc phát hiện mâu thuẫn | 1 | cập nhật idea + README, ghi vào `status.md`, rồi làm lại các bước bị ảnh hưởng |
| Hiện thực lộ ra lỗi thiết kế | 2 | sửa tệp thiết kế trước, không vá riêng trong mã |
| QA có phát hiện | 3 | một lượt sửa, kiểm lại 4 chỉ phần đã đổi |
| Kết quả tối ưu đổi hành vi hoặc hợp đồng | 2 hoặc 3 | cập nhật thiết kế/README, chạy lại 4 |
| Gặp bài học đáng giữ (lỗi lặp, quyết định kiến trúc) | sau 6 | thêm vào rule hoặc skill của dự án để lần sau không lặp lại |

## Nhánh sửa lỗi

1. **Chính:** `systematic-debugging` để điều tra nguyên nhân gốc.
2. **Bổ sung (tuỳ chọn, chặt hơn):** `/debug-fix-protocol` khi lỗi khó, có nguy cơ lan rộng.
3. **Hồi quy:** tạo regression test theo `testing-policy` mục 2.
4. **Bàn giao:** `changelog-manager` (gộp vào dòng của tính năng nếu lỗi phát sinh trong lúc phát triển).
