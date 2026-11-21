import LocaleSwitcher from "@/features/portfolio/components/locale-switcher";
import SiteNav from "@/features/portfolio/components/site-nav";
import TopContactBar from "@/features/portfolio/components/top-contact-bar";
import { PROFILE } from "@/features/portfolio/constants/profile.constants";
import {
    MAIN_CONTENT_ID,
    NAV_SECTION_IDS,
} from "@/features/portfolio/constants/sections.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";

// Bố cục đầu trang theo thanglong.edu.vn: thanh tiện ích mỏng (liên hệ nhanh bên trái, ngôn ngữ bên phải chỉ desktop) + thanh điều hướng trắng.
// Tên trên thanh điều hướng luôn là PROFILE.name; tiêu đề hero có thể là tên đầy đủ theo ngôn ngữ.
export default function SiteHeader({
    locale,
    content,
}: {
    locale: Locale;
    content: PortfolioContent;
}) {
    const items = NAV_SECTION_IDS.map((id) => ({
        id,
        label: content.nav[id],
    }));

    return (
        <>
            <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
                {content.ui.skipToContent}
            </a>

            <div className="no-print bg-band text-white">
                <div className="site-container flex h-11 items-center justify-between">
                    <TopContactBar content={content} />
                    {/* Small screens: language lives at the bottom of the menu drawer (see SiteNav). */}
                    <div className="hidden lg:block">
                        <LocaleSwitcher
                            locale={locale}
                            label={content.ui.languageLabel}
                            variant="band"
                            onNavigate={null}
                        />
                    </div>
                </div>
            </div>

            <SiteNav
                locale={locale}
                brand={PROFILE.name}
                items={items}
                contact={{ id: "contact", label: content.ui.contactCta }}
                labels={{
                    nav: content.ui.navLabel,
                    openMenu: content.ui.menuOpen,
                    closeMenu: content.ui.menuClose,
                    language: content.ui.languageLabel,
                }}
            />
        </>
    );
}
