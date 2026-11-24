// Google Analytics 4 tự quản lý, không thêm thư viện. Tải ngay khi vào trang (xem AnalyticsLoader).
// Ghi chú CSP: domain của Google phải nằm trong public/_headers (script-src, connect-src, img-src).

const GA_SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

// Tải gtag.js và bắt đầu đo; gọi nhiều lần vẫn chỉ tải một lần. Tắt các tính năng quảng cáo vì trang không chạy quảng cáo.
export function loadAnalytics(measurementId: string): void {
    if (window.gtag !== undefined) return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
        // gtag.js chỉ nhận diện đối tượng `arguments` thật (không nhận mảng), nên phải đẩy đúng kiểu này vào dataLayer.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `${GA_SCRIPT_URL}?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
}

// Gửi một sự kiện tùy chỉnh; bỏ qua nếu Analytics chưa được tải (chưa có Measurement ID, ví dụ khi chạy dev).
export function trackEvent(name: string, params: Record<string, string>): void {
    window.gtag?.("event", name, params);
}
