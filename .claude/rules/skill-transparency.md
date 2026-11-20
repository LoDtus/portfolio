---
description: Mỗi khi đã quyết định dùng skill nào cho một yêu cầu hay câu hỏi, liệt kê các skill đó kèm mục đích một dòng để người dùng kiểm soát. Áp dụng cho mọi dự án và mọi stack.
---

# Minh bạch việc dùng skill

Mục tiêu: người dùng luôn biết agent đang dùng skill nào và để làm gì, để can thiệp kịp thời.

## Khi nào phải liệt kê

- Ngay sau khi đã quyết định dùng một hoặc nhiều skill cho yêu cầu hay câu hỏi, và **trước khi** gọi skill hoặc đọc `SKILL.md` của nó.
- Tính cả skill người dùng gọi bằng `/lệnh`, skill tự chọn theo mô tả, và skill con mà một skill điều phối dự kiến gọi.
- Không tính: rule trong `.claude/rules/` (tự nạp), lệnh built-in của Claude Code, tool thường (Read, Edit, Bash...).
- Việc nhỏ làm thẳng, không dùng skill nào: không cần ghi gì.

## Định dạng

```
Skills sẽ dùng:
- `ten-skill`: mục đích một dòng
- `ten-skill-khac`: mục đích một dòng
```

- Mỗi skill một dòng, tiếng Việt, tối đa khoảng 20 từ.
- Nêu skill giúp gì **cho yêu cầu này**, không chép nguyên mô tả của skill.
- Lấy nội dung từ `description` trong frontmatter. Nếu skill chỉ hiện tên (không có mô tả trong ngữ cảnh), chỉ đọc khoảng 15 dòng đầu của `SKILL.md` để lấy mô tả; không đọc cả file chỉ để viết dòng này.
- Thứ tự theo thứ tự dự kiến dùng.

## Khi kế hoạch đổi giữa chừng

- Cần thêm skill: ghi một dòng `Thêm skill: ...` (tên và mục đích) ngay trước khi dùng.
- Bỏ một skill đã nêu: nói ngắn lý do.
- Skill bị bỏ qua vì `CLAUDE.md` hoặc rule quy định (ví dụ chỉ chạy khi người dùng gọi): không liệt kê, trừ khi người dùng hỏi.

## Không làm

- Không dùng skill nào mà chưa liệt kê.
- Không liệt kê skill chưa thật sự dùng.
- Không bịa mục đích. Không chắc thì đọc `description` của skill.
- Chỉ thông báo, không dừng chờ duyệt (trừ khi người dùng đã yêu cầu duyệt trước). Người dùng thấy dòng này và có thể ngắt nếu không đồng ý.
