"use client";

import { useEffect } from "react";

// Chọn tối thiểu ngần này phần chữ hiển thị của trang thì coi là "chọn tất cả" (Ctrl/Cmd+A, hoặc kéo chọn gần hết trang).
const SELECT_ALL_RATIO = 0.85;

// Khi người dùng chọn tất cả rồi sao chép, đặt vào clipboard bản markdown của trang (theo ngôn ngữ đang xem) thay vì chữ thô.
// Chọn một đoạn nhỏ thì giữ nguyên hành vi sao chép mặc định. Bản markdown dựng sẵn lúc build (xem buildPageMarkdown),
// nên không tốn công tính khi sao chép; chỉ ghi `text/plain`, còn dán vào trình soạn thảo giàu định dạng thì vẫn là chữ.
export default function CopyAsMarkdown({ markdown }: { markdown: string }) {
    useEffect(() => {
        const onCopy = (event: ClipboardEvent) => {
            const selection = document.getSelection();
            if (selection === null || selection.isCollapsed) return;
            // Đang chọn trong ô nhập liệu thì không can thiệp.
            const active = document.activeElement;
            if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;

            const pageLength = document.body.innerText.trim().length;
            const selectedLength = selection.toString().trim().length;
            if (pageLength === 0 || selectedLength < pageLength * SELECT_ALL_RATIO) return;

            event.clipboardData?.setData("text/plain", markdown);
            event.preventDefault();
        };

        document.addEventListener("copy", onCopy);
        return () => document.removeEventListener("copy", onCopy);
    }, [markdown]);

    return null;
}
