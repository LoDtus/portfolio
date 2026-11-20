---
name: changelog-manager
description: >-
  Cập nhật CHANGELOG.md theo luật hợp nhất của dự án: gom theo tính năng, chỉ ghi trạng thái cuối, không
  lặp dòng. Dùng bất cứ khi nào sửa hoặc thêm vào CHANGELOG.md, hoặc khi chốt một tính năng hay sửa lỗi
  cần ghi changelog. Không dùng cho tài liệu khác.
---

# Changelog Manager

**Bắt buộc đọc `references/changelog-manager.md` trước khi sửa `CHANGELOG.md`.** Đó là bản đầy đủ của bạn (nguyên văn): gom theo tính năng, chỉ ghi trạng thái cuối, và có chiến lược commit/changelog theo version ở cuối tệp.

- Lỗi phát sinh trong lúc phát triển một tính năng: gộp vào dòng của tính năng đó, không thêm dòng "fix" riêng.
- Không lặp một thay đổi ở nhiều dòng; nếu đã có dòng của tính năng thì cập nhật dòng đó.
- Khi người dùng nhờ viết commit message: theo chiến lược ở cuối `references/changelog-manager.md` (Conventional Commits), và theo mục Git trong `CLAUDE.md` (agent được tự `git commit` sau khi đổi mã; `git push` chỉ khi được yêu cầu).
