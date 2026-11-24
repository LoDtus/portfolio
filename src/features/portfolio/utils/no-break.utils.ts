// Từ ghép tiếng Việt hay gặp trong phụ đề: các âm tiết của một từ ghép không được tách ra hai dòng ("kiến | thức").
// Thêm từ vào đây khi thấy một phụ đề mới bị cắt giữa từ; chỉ cần ghi dạng chữ thường.
const NO_BREAK_PHRASES = [
    "kiến thức",
    "kỹ năng",
    "công nghệ",
    "tích lũy",
    "quá trình",
    "học tập",
    "làm việc",
    "phát triển",
    "sản phẩm",
    "thực tế",
    "nền tảng",
    "chuyên ngành",
    "kinh nghiệm",
    "đóng góp",
    "tiêu biểu",
    "vai trò",
    "đảm nhận",
    "năng lực",
    "hợp tác",
    "cơ hội",
    "liên hệ",
    "tìm hiểu",
    "trao đổi",
    "giải pháp",
    "xây dựng",
    "triển khai",
    "tham gia",
    "chia sẻ",
    "đại học",
] as const;

const NO_BREAK_PATTERN = new RegExp(`(${NO_BREAK_PHRASES.join("|")})`, "gi");

// Thay dấu cách trong các từ ghép ở trên bằng dấu cách không ngắt dòng (U+00A0), để trình duyệt chỉ xuống dòng giữa các từ.
// Chỉ dùng cho chữ hiển thị (phụ đề); bản markdown khi sao chép dựng từ dữ liệu gốc nên không chứa ký tự này.
export function keepWordsTogether(text: string): string {
    return text.replace(NO_BREAK_PATTERN, (phrase) => phrase.replace(/ /g, " "));
}
