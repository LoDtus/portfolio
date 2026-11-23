"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactChannelBody, {
    CHANNEL_CARD_CLASS,
} from "@/features/portfolio/components/contact-channel-body";
import type { ContactChannelFacts } from "@/features/portfolio/types/portfolio.types";
import { trackEvent } from "@/shared/utils/analytics.util";
import { copyTextToClipboard } from "@/shared/utils/clipboard.util";

type CopyStatus = "idle" | "copied" | "failed";

// Sau ngần này thì thẻ trở về trạng thái ban đầu.
const STATUS_RESET_MS = 2000;

// Thẻ kênh liên hệ chỉ sao chép (không điều hướng): điện thoại, Gmail, địa chỉ.
// Kết quả hiện ngay trên thẻ (dòng nhãn đổi chữ, biểu tượng đổi) và được đọc cho người dùng trình đọc màn hình qua vùng `status`.
export default function ContactCopyCard({
    channel,
    copyText,
    label,
    hint,
    copiedLabel,
    failedLabel,
}: {
    channel: ContactChannelFacts;
    copyText: string;
    label: string;
    hint: string;
    copiedLabel: string;
    failedLabel: string;
}) {
    const [status, setStatus] = useState<CopyStatus>("idle");
    const resetTimerRef = useRef(0);

    useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

    const handleClick = async () => {
        trackEvent("copy_contact", { channel: channel.id });
        const isCopied = await copyTextToClipboard(copyText);
        setStatus(isCopied ? "copied" : "failed");
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = window.setTimeout(() => setStatus("idle"), STATUS_RESET_MS);
    };

    const statusText =
        status === "copied" ? copiedLabel : status === "failed" ? failedLabel : null;
    const StatusIcon = status === "copied" ? Check : status === "failed" ? X : Copy;

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                title={hint}
                aria-label={`${label}: ${channel.value}. ${hint}`}
                className={`${CHANNEL_CARD_CLASS} cursor-pointer`}
            >
                <ContactChannelBody
                    channel={channel}
                    label={statusText ?? label}
                    trailing={
                        <StatusIcon
                            aria-hidden="true"
                            className={`size-5 shrink-0 transition-colors ${
                                status === "idle"
                                    ? "text-white/60 group-hover:text-white"
                                    : "text-brand-mint"
                            }`}
                        />
                    }
                />
            </button>
            <span role="status" aria-live="polite" className="sr-only">
                {statusText ?? ""}
            </span>
        </>
    );
}
