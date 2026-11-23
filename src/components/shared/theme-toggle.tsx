"use client";
import "@/shared/styles/toggle-theme.css";
import { useTheme } from "next-themes";
import { useRef, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const circleRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Dùng cho việc hoãn lại icon toggle tạm thời khi đang chạy animation
    const [pendingTheme, setPendingTheme] = useState<"dark" | "light" | null>(
        null,
    );

    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );

    // Xác định UI hiển thị: Nếu đang trong animation toggle thì lấy pendingTheme, ngược lại lấy theme thực tế
    const activeTheme = pendingTheme ?? resolvedTheme ?? "light";
    const isDark = activeTheme === "dark";

    if (!isMounted) {
        return (
            <div
                className="size-[38px] rounded-lg border border-border-main bg-bg-main animate-pulse"
                aria-hidden="true"
            />
        );
    }

    const handleToggle = () => {
        const circle = circleRef.current;
        const nextIsDark = !isDark;
        const nextTheme = nextIsDark ? "dark" : "light";

        // 1. Cập nhật UI icon Sun <-> Moon ngay lập tức
        setPendingTheme(nextTheme);

        // 2. Chạy animation vòng tròn
        if (circle) {
            circle.classList.remove("animate-dark", "animate-light");
            void circle.offsetWidth; // Force reflow

            if (nextIsDark) {
                circle.classList.add("animate-dark");
            } else {
                circle.classList.add("animate-light");
            }
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // 3. Đợi 400ms (khi vòng tròn phủ kín) mới đổi theme hệ thống & xóa pending state
        timeoutRef.current = setTimeout(() => {
            setTheme(nextTheme);
            setPendingTheme(null);
        }, 400);
    };

    return (
        <div className={`p-1 relative ${isDark ? "theme--night" : ""}`}>
            <input
                className="theme-input hidden"
                type="checkbox"
                checked={isDark}
                readOnly
            />
            <div
                ref={circleRef}
                className="theme-circle rounded-full pointer-events-none"
                style={{ width: "270vw", height: "270vw" }}
            />
            <label
                className="theme-toggle theme-toggle-js cursor-pointer transition-all duration-200 active:scale-98"
                aria-label={
                    isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                title={
                    isDark
                        ? "Chuyển sang Chế độ Sáng"
                        : "Chuyển sang Chế độ Tối"
                }
                onClick={handleToggle}
            >
                <span className="moon" />
                <span className="sun" />

                <small className="sun__ray" />
                <small className="sun__ray" />
                <small className="sun__ray" />
                <small className="sun__ray" />
                <small className="sun__ray" />
                <small className="sun__ray" />
            </label>
        </div>
    );
}
