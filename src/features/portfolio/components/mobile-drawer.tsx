"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

// Navigation drawer is only meant for small screens; it closes itself when the viewport reaches `lg`.
const DESKTOP_QUERY = "(min-width: 1024px)";

// Menu trượt từ trái, dựng trên <dialog> native: tự có focus trap, nút Esc, và vô hiệu phần còn lại của trang.
// `children` là danh sách điều hướng (cuộn được), `footer` luôn nằm cuối ngăn kéo.
export default function MobileDrawer({
    id,
    isOpen,
    onClose,
    label,
    closeLabel,
    footer,
    children,
}: {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    label: string;
    closeLabel: string;
    footer: ReactNode;
    children: ReactNode;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Keep the native dialog in sync with the React state.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog === null) return;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    // While open: freeze the page behind the drawer and close if the viewport grows to desktop size.
    useEffect(() => {
        if (!isOpen) return undefined;

        const root = document.documentElement;
        const previousOverflow = root.style.overflow;
        root.style.overflow = "hidden";

        const media = window.matchMedia(DESKTOP_QUERY);
        const handleChange = (event: MediaQueryListEvent) => {
            if (event.matches) onClose();
        };
        media.addEventListener("change", handleChange);

        return () => {
            root.style.overflow = previousOverflow;
            media.removeEventListener("change", handleChange);
        };
    }, [isOpen, onClose]);

    // The dialog fills the viewport, so a click that lands on the dialog itself is a click on the scrim.
    const handleScrimClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            id={id}
            aria-label={label}
            data-lenis-prevent
            // Esc and dialog.close() both end up here, so React state never drifts from the DOM.
            onClose={onClose}
            onClick={handleScrimClick}
            className="drawer m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-text-main backdrop:bg-black/50 lg:hidden"
        >
            <div className="drawer-panel mr-auto flex h-full w-[min(88%,22rem)] flex-col bg-surface shadow-[12px_0_32px_-12px_rgb(0_0_0/0.35)]">
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-main px-5">
                    <p className="font-display text-lg font-bold text-heading">{label}</p>
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center border border-border-main text-heading"
                        aria-label={closeLabel}
                        onClick={onClose}
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2">
                    {children}
                </div>

                <div className="shrink-0 border-t border-border-main bg-surface-muted px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
                    {footer}
                </div>
            </div>
        </dialog>
    );
}
