import ContactChannelIcon from "@/features/portfolio/components/contact-channel-icon";
import type { ContactChannelFacts } from "@/features/portfolio/types/portfolio.types";

// Một kênh liên hệ trên nền xanh đậm: logo (giữ nguyên màu thương hiệu, không có ô nền), nhãn và giá trị.
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

export default function ContactChannelCard({
    channel,
    label,
}: {
    channel: ContactChannelFacts;
    label: string;
}) {
    const externalProps = channel.isExternal
        ? { target: "_blank", rel: "me noopener noreferrer" }
        : {};

    return (
        <a
            href={channel.href}
            {...externalProps}
            className="group spotlight spotlight-on-dark flex h-full items-center gap-4 border border-white/20 bg-white/5 p-4 hover:border-white hover:bg-white/10"
        >
            <span
                aria-hidden="true"
                className="inline-flex size-11 shrink-0 items-center justify-center text-white transition-transform duration-200 group-hover:scale-110"
            >
                <ContactChannelIcon channel={channel} className="size-8" />
            </span>
            <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-widest text-brand-mint">
                    {label}
                </span>
                <span className="block break-words font-semibold text-white">
                    {renderValue(channel.value)}
                </span>
            </span>
        </a>
    );
}
