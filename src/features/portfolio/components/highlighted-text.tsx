import { splitByPhrases } from "@/features/portfolio/utils/highlight.utils";

// Văn bản có vài cụm được tô nhấn bằng nét highlight (xem `.hl` trong globals.css). Cụm nào không có trong văn bản thì bỏ qua.
// Dùng <mark> để công nghệ hỗ trợ biết đây là phần nổi bật; chỉ nên dùng cho một hai cụm then chốt mỗi khối chữ.
export default function HighlightedText({
    text,
    phrases,
}: {
    text: string;
    phrases: readonly string[];
}) {
    return (
        <>
            {splitByPhrases(text, phrases).map((part, index) =>
                part.isHighlight ? (
                    <mark key={index} className="hl">
                        {part.text}
                    </mark>
                ) : (
                    part.text
                ),
            )}
        </>
    );
}
