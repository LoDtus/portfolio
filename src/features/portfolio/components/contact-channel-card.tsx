import ContactChannelBody, {
    CHANNEL_CARD_CLASS,
} from "@/features/portfolio/components/contact-channel-body";
import type { ContactChannelFacts } from "@/features/portfolio/types/portfolio.types";

// Thẻ kênh liên hệ dạng liên kết (Zalo, Facebook, LinkedIn, GitHub) mở sang trang khác.
// Kênh cần sao chép (điện thoại, Gmail, địa chỉ) dùng ContactCopyCard.
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
        <a href={channel.href} {...externalProps} className={CHANNEL_CARD_CLASS}>
            <ContactChannelBody channel={channel} label={label} trailing={null} />
        </a>
    );
}
