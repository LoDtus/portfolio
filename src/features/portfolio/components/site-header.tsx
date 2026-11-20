import LocaleSwitcher from "@/features/portfolio/components/locale-switcher";
import SiteNav from "@/features/portfolio/components/site-nav";
import {
    MAIN_CONTENT_ID,
    NAV_SECTION_IDS,
} from "@/features/portfolio/constants/sections.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";

// Bố cục đầu trang theo thanglong.edu.vn: thanh tiện ích mỏng (ngôn ngữ, chỉ desktop) + thanh điều hướng trắng.
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
                    <p className="text-sm font-medium text-white/80">
                        {content.ui.tagline}
                    </p>
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
                brand={content.hero.name}
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
