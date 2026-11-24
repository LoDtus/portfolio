export interface TextPart {
    text: string;
    isHighlight: boolean;
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Tách `text` thành các đoạn, đánh dấu những đoạn trùng nguyên văn với một trong `phrases`.
// Cụm không xuất hiện trong `text` bị bỏ qua (không lỗi), nên đổi chữ mà quên đổi cụm nhấn chỉ làm mất phần nhấn.
export function splitByPhrases(
    text: string,
    phrases: readonly string[],
): TextPart[] {
    const usable = phrases.filter((phrase) => phrase.length > 0);
    if (usable.length === 0) return [{ text, isHighlight: false }];

    // Cụm dài trước để cụm ngắn nằm trong cụm dài không cắt đôi nó.
    const pattern = [...usable]
        .sort((a, b) => b.length - a.length)
        .map(escapeRegExp)
        .join("|");
    // split với nhóm bắt: vị trí lẻ là đoạn trùng cụm.
    return text
        .split(new RegExp(`(${pattern})`))
        .map((part, index) => ({ text: part, isHighlight: index % 2 === 1 }))
        .filter((part) => part.text.length > 0);
}
