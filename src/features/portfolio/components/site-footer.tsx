import BrandLink from "@/features/portfolio/components/brand-link";
import BrandMark from "@/features/portfolio/components/brand-mark";
import ContactChannelIcon from "@/features/portfolio/components/contact-channel-icon";
import SectionLink from "@/features/portfolio/components/section-link";
import {
    CONTACT_CHANNELS,
    PROFILE,
} from "@/features/portfolio/constants/profile.constants";
import { NAV_SECTION_IDS } from "@/features/portfolio/constants/sections.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";

// Chân trang indigo đậm theo thanglong.edu.vn; dòng ghi nguồn logo/ảnh nằm gọn ở đây (không chú thích dưới ảnh).
// Kênh liên hệ hiện thành hàng biểu tượng ở chân trang (bỏ điện thoại và địa chỉ, đã có ở mục Liên hệ).
const FOOTER_CHANNELS = CONTACT_CHANNELS.filter(
    (channel) => channel.id !== "phone" && channel.id !== "address",
);

export default function SiteFooter({
    locale,
    content,
}: {
    locale: Locale;
    content: PortfolioContent;
}) {
    const year = new Date().getFullYear();

    return (
        <footer className="no-print bg-band-deep text-white/80">
            <div className="site-container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
                <BrandLink
                    locale={locale}
                    className="flex items-center gap-3 font-display text-lg font-bold text-white"
                    onNavigate={null}
                >
                    <BrandMark className="size-7" />
                    {PROFILE.name}
                </BrandLink>

                <nav aria-label={content.ui.navLabel}>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                        {NAV_SECTION_IDS.map((id) => (
                            <li key={id}>
                                <SectionLink
                                    locale={locale}
                                    sectionId={id}
                                    isActive={false}
                                    className="link-draw hover:text-white"
                                    onNavigate={null}
                                >
                                    {content.nav[id]}
                                </SectionLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ul className="flex flex-wrap gap-2">
                    {FOOTER_CHANNELS.map((channel) => (
                        <li key={channel.id}>
                            <a
                                href={channel.href}
                                {...(channel.isExternal
                                    ? { target: "_blank", rel: "me noopener noreferrer" }
                                    : {})}
                                aria-label={content.contact.channels[channel.id].label}
                                className="inline-flex size-10 items-center justify-center bg-white text-brand-forest hover:bg-brand-mint"
                            >
                                <ContactChannelIcon channel={channel} className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-white/10">
                <div className="site-container flex flex-col gap-2 py-6 text-[13px] leading-5 text-white/70 md:flex-row md:items-center md:justify-between">
                    <p>{content.footer.credit}</p>
                    <p>
                        © {year} {PROFILE.name}. {content.footer.builtWith}
                    </p>
                </div>
            </div>
        </footer>
    );
}
