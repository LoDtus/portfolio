// Sao chép chuỗi vào clipboard; trả về true nếu thành công.
// Ưu tiên Clipboard API (cần ngữ cảnh an toàn: HTTPS hoặc localhost); không dùng được hoặc bị từ chối thì thử cách chọn văn bản rồi `execCommand("copy")`.
export async function copyTextToClipboard(text: string): Promise<boolean> {
    if (typeof navigator !== "undefined" && navigator.clipboard !== undefined) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error("Clipboard API failed, falling back to execCommand", error);
        }
    }
    return copyWithSelection(text);
}

function copyWithSelection(text: string): boolean {
    if (typeof document === "undefined") return false;
    const previousFocus = document.activeElement;
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.setAttribute("aria-hidden", "true");
    // Đưa ra ngoài màn hình, cỡ chữ 16px để iOS không phóng to trang khi chọn.
    field.style.cssText = "position:fixed;top:0;left:-9999px;font-size:16px;opacity:0;";
    document.body.appendChild(field);
    try {
        field.select();
        field.setSelectionRange(0, text.length);
        return document.execCommand("copy");
    } catch (error) {
        console.error("execCommand copy failed", error);
        return false;
    } finally {
        field.remove();
        if (previousFocus instanceof HTMLElement) previousFocus.focus();
    }
}
