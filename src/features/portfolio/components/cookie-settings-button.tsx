"use client";

import { OPEN_ANALYTICS_CONSENT_EVENT } from "@/features/portfolio/components/analytics-consent";

// Nút ở chân trang để người xem đổi lại lựa chọn cookie đã chọn trước đó.
export default function CookieSettingsButton({ label }: { label: string }) {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_ANALYTICS_CONSENT_EVENT))}
            className="link-draw cursor-pointer text-left hover:text-white"
        >
            {label}
        </button>
    );
}
