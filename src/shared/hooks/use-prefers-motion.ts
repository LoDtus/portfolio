import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
    return !window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Phía server (và lúc hydrate) coi như chưa bật chuyển động; client cập nhật ngay sau đó.
function getServerSnapshot(): boolean {
    return false;
}

// true khi người dùng KHÔNG yêu cầu giảm chuyển động trong hệ điều hành.
export function usePrefersMotion(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
