import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import GithubIcon from "@/features/portfolio/components/github-icon";
import type { ContactChannelFacts } from "@/features/portfolio/types/portfolio.types";

// Biểu tượng của một kênh liên hệ: logo có sẵn trong public/logo, hoặc biểu tượng vẽ sẵn (GitHub, điện thoại, địa chỉ).
// Trang trí: tên kênh luôn nằm cạnh nên không cần alt.
export default function ContactChannelIcon({
    channel,
    className,
}: {
    channel: ContactChannelFacts;
    className: string;
}) {
    if (channel.icon === "github") return <GithubIcon className={className} />;
    if (channel.icon === "phone") {
        return <Phone aria-hidden="true" className={className} />;
    }
    if (channel.icon === "address") {
        return <MapPin aria-hidden="true" className={className} />;
    }
    if (channel.logo === null) return null;

    return (
        <Image
            src={channel.logo}
            alt=""
            width={48}
            height={48}
            className={className}
        />
    );
}
