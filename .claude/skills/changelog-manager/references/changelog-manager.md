# Skill: Smart Changelog & Commit Manager

## Core Rules for Changelog Updates

Khi cập nhật hoặc đề xuất viết vào `CHANGELOG.md` (thường là dưới mục `## [Unreleased]`), Agent bắt buộc phải tuân thủ **Quy tắc Hợp nhất (No-Duplicate Rule)**:

1. **Gom nhóm theo Feature (Feature-grouping):**
    - Trước khi viết, hãy quét các dòng hiện có trong mục `Added`, `Changed`, `Fixed`.
    - Nếu đã có dòng mô tả về Feature đang làm (ví dụ: "Tích hợp module chấm điểm..."), **không được thêm dòng mới**. Hãy cập nhật trực tiếp dòng đó để phản ánh trạng thái hoàn thiện nhất của tính năng.

2. **Ví dụ trực quan về cách xử lý của Agent:**

    _❌ SAI (Lặp đi lặp lại sau mỗi lượt dev nhỏ):_
    - Added: Thêm API chấm điểm cho Mock Test.
    - Fixed: Sửa lỗi crash API chấm điểm khi truyền thiếu param.
    - Changed: Tối ưu lại truy vấn DB của API chấm điểm.

    _✔️ ĐÚNG (Hợp nhất thành một dòng tổng quát, chuyên nghiệp):_
    - Added: Tích hợp API chấm điểm Mock Test tự động (đã tối ưu truy vấn DB và xử lý lỗi edge-case).

3. **Chỉ ghi nhận trạng thái cuối cùng (End-state):**
    - Changelog chỉ ghi nhận những gì **thực sự chạy được** và **mang lại giá trị cho sản phẩm**. Các bước sửa lỗi vặt (hotfix, typo) phát sinh ngay trong quá trình dev tính năng đó thì gộp thẳng vào mô tả của tính năng, không tách riêng thành các dòng `Fixed` lặt vặt.


Chiến lược:
Tạo CHANGELOG init dựa vào ý tưởng ban đầu (specs), mô tả đang có nhưng chưa làm
Code theo ý tưởng đó, mỗi lần code → commit
Sau 1 version, dựa vào commit và hiện trạng code đang có → cập nhật CHANGELOG