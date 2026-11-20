import { Lexend, Manrope } from "next/font/google";

// Font nội dung: Manrope, font phụ trợ chính thức của Thang Long University
// (brand.thanglong.edu.vn/typography), miễn phí trên Google Fonts.
const MANROPE = Manrope({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-manrope",
});

// Font tiêu đề: Lexend (OFL, hỗ trợ tiếng Việt), thay cho "Thang Long Sans" của trường
// vì đó là font riêng, không phải font công khai nên không được sao chép.
const LEXEND = Lexend({
    subsets: ["latin", "vietnamese"],
    weight: ["500", "600", "700", "800"],
    display: "swap",
    variable: "--font-lexend",
});

const FONTS = {
    MANROPE,
    LEXEND,
};

export default FONTS;
