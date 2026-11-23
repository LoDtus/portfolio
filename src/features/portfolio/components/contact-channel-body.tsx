import type { ReactNode } from "react";
import ContactChannelIcon from "@/features/portfolio/components/contact-channel-icon";
import type { ContactChannelFacts } from "@/features/portfolio/types/portfolio.types";

// Khung chung của thẻ kênh liên hệ trên nền xanh đậm: dùng cho cả thẻ liên kết và thẻ sao chép để hai loại giống hệt nhau.
export const CHANNEL_CARD_CLASS =
    "group spotlight spotlight-on-dark transition-all duration-200 active:scale-98 flex h-full w-full items-center gap-4 border border-white/20 bg-white/5 p-4 text-left hover:border-white hover:bg-white/10";

// Cho phép xuống dòng ngay trước "@" của email, để địa chỉ dài không bị cắt giữa chữ.
function renderValue(value: string) {
    const at = value.indexOf("@");
    if (at === -1) return value;
    return (
        <>
            {value.slice(0, at)}
            <wbr />
            {value.slice(at)}
        </>
    );
}

// Nội dung một thẻ kênh liên hệ: logo (giữ nguyên màu thương hiệu, không có ô nền), nhãn và giá trị; `trailing` là phần cuối thẻ (nếu có).
export default function ContactChannelBody({
    channel,
    label,
    trailing,
}: {
    channel: ContactChannelFacts;
    // Dòng nhỏ phía trên giá trị: thường là tên kênh.
    label: string;
    trailing: ReactNode;
}) {
    return (
        <>
            <span
                aria-hidden="true"
                className="inline-flex size-11 shrink-0 items-center justify-center text-white transition-transform duration-200 group-hover:scale-110"
            >
                <ContactChannelIcon channel={channel} className="size-8" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-widest text-brand-mint">
                    {label}
                </span>
                <span className="block break-words font-semibold text-white">
                    {renderValue(channel.value)}
                </span>
            </span>
            {trailing}
        </>
    );
}
