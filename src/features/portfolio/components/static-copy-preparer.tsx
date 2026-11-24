"use client";

import { useEffect } from "react";
import {
    PREPARE_STATIC_COPY_EVENT,
    STATIC_COPY_CLASS,
} from "@/features/portfolio/constants/static-copy.constants";

// Ảnh nhỏ (tổng khoảng 0,6 MB) nên tải trước khi trang đã yên: người in trang không kịp chờ ảnh tải lười.
const IMAGE_PRELOAD_DELAY_MS = 2000;

function isSaveShortcut(event: KeyboardEvent): boolean {
    return (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === "s";
}

// Chuẩn bị trang cho bản in (Ctrl+P) và bản lưu (Ctrl+S) để chúng không thiếu nội dung:
// - ảnh tải lười (lazy) chưa cuộn tới sẽ không có trong bản in/bản lưu nên ép tải (sau khi trang yên, và lần nữa ngay lúc in/lưu);
// - các con số đang đếm về giá trị cuối (qua sự kiện PREPARE_STATIC_COPY_EVENT);
// - Ctrl+S lưu lại DOM hiện tại, nên thêm lớp STATIC_COPY_CLASS để phần chưa cuộn tới không còn bị ẩn.
// Không chặn phím tắt của trình duyệt; không render gì cả.
export default function StaticCopyPreparer() {
    useEffect(() => {
        const loadImagesNow = () => {
            document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((image) => {
                image.loading = "eager";
            });
        };
        const prepare = () => {
            loadImagesNow();
            window.dispatchEvent(new Event(PREPARE_STATIC_COPY_EVENT));
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (!isSaveShortcut(event)) return;
            document.documentElement.classList.add(STATIC_COPY_CLASS);
            prepare();
        };

        const preloadTimer = window.setTimeout(loadImagesNow, IMAGE_PRELOAD_DELAY_MS);
        window.addEventListener("beforeprint", prepare);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.clearTimeout(preloadTimer);
            window.removeEventListener("beforeprint", prepare);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return null;
}
