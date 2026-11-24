import { getTechUrl } from "@/features/portfolio/constants/tech-links.constants";

export type TechBadgeTone = "onDark" | "muted" | "outline";

// Khung và hiệu ứng khi rê chuột/focus của từng loại thẻ. Chỉ đổi màu viền, nền và nhấc lên 2px (transform),
// không đổi kích thước nên các thẻ xung quanh không bị đẩy đi.
const TONE_CLASSES: Record<TechBadgeTone, { box: string; link: string }> = {
    onDark: {
        box: "border border-white/30 px-2 py-1 text-[length:clamp(0.6875rem,3.1vw,0.875rem)] font-semibold leading-snug sm:px-3 sm:py-1.5",
        link: "hover:border-brand-peach hover:bg-white/10 hover:text-white focus-visible:border-brand-peach",
    },
    muted: {
        box: "border border-border-main bg-muted px-2 py-0.5 text-xs font-semibold text-text-main",
        link: "hover:border-accent hover:bg-accent/10 hover:text-heading focus-visible:border-accent",
    },
    outline: {
        box: "border border-border-main px-2.5 py-1 text-sm font-semibold text-text-main",
        link: "hover:border-accent hover:bg-accent/10 hover:text-heading focus-visible:border-accent",
    },
};

const LINK_MOTION =
    "tech-badge inline-block max-w-full break-words hover:-translate-y-0.5 hover:shadow-[0_6px_14px_-8px_rgb(0_0_0/0.45)]";

// Một thẻ công nghệ. Có địa chỉ trong TECH_LINKS thì là liên kết sang trang chủ (tab mới); không thì chỉ là chữ.
// `href` ghi đè địa chỉ tra trong TECH_LINKS (dùng cho thẻ liên kết không phải công nghệ, như LinkedIn của người tham chiếu).
export default function TechBadge({
    name,
    tone,
    href,
}: {
    name: string;
    tone: TechBadgeTone;
    href?: string;
}) {
    const url = href ?? getTechUrl(name);
    const classes = TONE_CLASSES[tone];

    if (url === null) {
        return (
            <span className={`inline-block max-w-full break-words ${classes.box}`}>
                {name}
            </span>
        );
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_MOTION} ${classes.box} ${classes.link}`}
        >
            {name}
        </a>
    );
}
