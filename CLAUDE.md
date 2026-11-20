# Hướng dẫn cho agent (Claude Code)

<!-- Giữ file này ngắn. Quy tắc luôn áp dụng nằm trong .claude/rules/, quy trình nằm trong .claude/skills/. -->

## Điểm đặc biệt của dự án
- (điền: các ràng buộc sống còn, ví dụ cấm gì ở production, nơi đặt biến môi trường)

## Khi nào dùng skill
- Việc nhỏ (sửa 1–3 file, đổi tên, sửa typo/CSS/copy, thêm log, chỉnh config, câu hỏi nhanh): làm thẳng, không gọi skill quy trình.
- Tính năng mới hoặc thay đổi nhiều file: dùng `/feature-lifecycle` (tự phân loại nhỏ/vừa/lớn).
- Deploy, review bảo mật, tài liệu marketing: chỉ khi tôi gọi bằng /lệnh.
- Giao diện có sẵn: giữ nguyên bản sắc (màu, font, token, thư viện component); chỉ sửa bố cục, phân cấp, trạng thái, UX. Chỉ đổi diện mạo khi tôi nói rõ "redesign/đổi giao diện". Cần đổi thì làm thay đổi nhỏ nhất và báo lại.
- Lời tôi nói trực tiếp và file này ưu tiên hơn mô tả của skill.
- Superpowers đã cài đủ nhưng không bắt buộc cho việc nhỏ. Làm rõ yêu cầu và lập kế hoạch: mặc định `idea-discovery` và `planning-design`; `brainstorming`, `writing-plans` chỉ khi tôi yêu cầu. Review, worktree, chạy song song, thực thi kế hoạch, hoàn tất nhánh: tự gọi skill tương ứng khi đúng tình huống.
- Thứ tự ưu tiên khi hai skill cùng làm một việc: skill bên ngoài đã cài trước, skill của dự án sau. Không sửa skill bên ngoài. Ngoại lệ do tôi chốt: changelog luôn dùng `changelog-manager` của dự án (không cài skill changelog khác); e2e chỉ khi tôi yêu cầu rõ (xem `testing-policy`).
- Mỗi khi đã quyết định dùng skill nào cho một yêu cầu hay câu hỏi, liệt kê chúng kèm mục đích một dòng trước khi làm, theo rule `skill-transparency`.

## Khi trả lời câu hỏi
- Nếu câu hỏi có thể liên quan đến code dự án: tìm trong repo trước, rồi mới dùng kiến thức bên ngoài.
- Với thông tin có thể đã đổi (phiên bản thư viện, API, giá, chính sách): tra tài liệu hoặc web, không trả lời theo trí nhớ.
- Luôn nói rõ câu trả lời đến từ đâu: code dự án (kèm đường dẫn file), tài liệu bên ngoài, hay suy đoán.

## Git
- Mỗi lần thay đổi mã xong, tự chạy `git commit` (tôi đã cho phép sẵn, không cần hỏi lại) với message theo Conventional Commits (ngắn gọn; thêm thân bài nếu cần). Báo lại message vừa commit.
- Chỉ `git add` đúng các file mình đã sửa trong tác vụ này. Không dùng `git add -A` hay `git add .`; không đưa vào commit các thay đổi có sẵn trong cây làm việc mà không thuộc tác vụ.
- Không commit khi kiểm tra của phần vừa sửa còn đỏ, hoặc khi có file chứa secret (`.env*` thật, key, token): báo rõ lý do thay vì commit.
- Không dùng `--no-verify`, `--amend`, `reset`, `rebase`, `force`. Hook lỗi thì sửa nguyên nhân rồi tạo commit mới.
- Câu hỏi, giải thích hoặc việc không đổi file thì không commit.
- `git push` chỉ khi tôi yêu cầu.

## Ngôn ngữ
- Giải thích và trò chuyện: tiếng Việt. Code và comment: tiếng Anh.
