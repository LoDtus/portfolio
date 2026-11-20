---
description: Tạo tiêu đề và mô tả pull request từ các thay đổi hiện tại
argument-hint: "[nhánh-gốc]"
---

Đọc `git diff` và `git log` của nhánh hiện tại so với `$ARGUMENTS` (mặc định nhánh chính). Viết bằng tiếng Việt:

1. **Title**: một dòng, theo Conventional Commits.
2. **Mô tả các thay đổi**: gom theo chức năng, không liệt kê từng file.
3. **Cách test đầy đủ**: các bước chạy lại được. Nếu kiểm bằng Postman thì ghi rõ method, URL, header, cách xác thực (authentication), param, body và các yêu cầu khác nếu có.

Không chạy `git commit` hay `git push`. Chỉ in kết quả.
