"use client";

import { Menu } from "lucide-react";
import { useCallback, useState } from "react";
import ThemeToggle from "@/components/shared/theme-toggle";
import BrandLink from "@/features/portfolio/components/brand-link";
import BrandMark from "@/features/portfolio/components/brand-mark";
import LocaleSwitcher from "@/features/portfolio/components/locale-switcher";
import MobileDrawer from "@/features/portfolio/components/mobile-drawer";
import SectionLink from "@/features/portfolio/components/section-link";
import { SPY_SECTION_IDS } from "@/features/portfolio/constants/sections.constants";
import { useScrollSpy } from "@/features/portfolio/hooks/use-scroll-spy";
import { useSectionHashSync } from "@/features/portfolio/hooks/use-section-hash-sync";
import type { SectionId } from "@/features/portfolio/types/portfolio.types";
import type { Locale } from "@/shared/constants/i18n.constants";

interface NavItem {
    id: SectionId;
    label: string;
}

interface SiteNavProps {
    locale: Locale;
    brand: string;
    items: readonly NavItem[];
    contact: NavItem;
    labels: {
        nav: string;
        openMenu: string;
        closeMenu: string;
        switchLanguage: string;
    };
}

const MOBILE_MENU_ID = "mobile-menu";

export default function SiteNav({
    locale,
    brand,
    items,
    contact,
    labels,
}: SiteNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const activeId = useScrollSpy(SPY_SECTION_IDS);
    useSectionHashSync(activeId);

    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    return (
        <header className="no-print sticky top-0 z-40 border-b border-border-main bg-surface shadow-[0_8px_20px_-10px_rgb(0_0_0/0.3)]">
            <div className="site-container flex h-16 items-center justify-between gap-6">
                <BrandLink
                    locale={locale}
                    className="flex items-center gap-3 font-display text-lg font-bold text-heading"
                    onNavigate={closeMenu}
                >
                    <BrandMark className="size-7" />
                    {brand}
                </BrandLink>

                <nav aria-label={labels.nav} className="hidden lg:block">
                    <ul className="flex items-center gap-5 xl:gap-8">
                        {items.map(({ id, label }) => (
                            <li key={id}>
                                <SectionLink
                                    locale={locale}
                                    sectionId={id}
                                    isActive={activeId === id}
                                    className="link-draw font-semibold text-heading"
                                    onNavigate={null}
                                >
                                    {label}
                                </SectionLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:block">
                        <ThemeToggle />
                    </div>
                    <SectionLink
                        locale={locale}
                        sectionId={contact.id}
                        isActive={activeId === contact.id}
                        className="btn btn-primary hidden lg:inline-flex"
                        onNavigate={null}
                    >
                        {contact.label}
                    </SectionLink>
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center border border-border-main text-heading transition-all duration-200 active:scale-98 lg:hidden"
                        aria-haspopup="dialog"
                        aria-expanded={isMenuOpen}
                        aria-controls={MOBILE_MENU_ID}
                        aria-label={labels.openMenu}
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>

            <MobileDrawer
                id={MOBILE_MENU_ID}
                isOpen={isMenuOpen}
                onClose={closeMenu}
                label={labels.nav}
                closeLabel={labels.closeMenu}
                footer={
                    <div className="flex items-center justify-between gap-4">
                        <ThemeToggle />
                        <LocaleSwitcher
                            locale={locale}
                            switchLabel={labels.switchLanguage}
                            variant="drawer"
                            onNavigate={closeMenu}
                        />
                    </div>
                }
            >
                <nav aria-label={labels.nav}>
                    <ul className="flex flex-col">
                        {items.map(({ id, label }) => (
                            <li key={id}>
                                <SectionLink
                                    locale={locale}
                                    sectionId={id}
                                    isActive={activeId === id}
                                    className="block border-b border-border-main py-3.5 font-semibold text-heading aria-[current=location]:text-primary"
                                    onNavigate={closeMenu}
                                >
                                    {label}
                                </SectionLink>
                            </li>
                        ))}
                    </ul>
                    <SectionLink
                        locale={locale}
                        sectionId={contact.id}
                        isActive={activeId === contact.id}
                        className="btn btn-primary my-5 w-full"
                        onNavigate={closeMenu}
                    >
                        {contact.label}
                    </SectionLink>
                </nav>
            </MobileDrawer>
        </header>
    );
}
