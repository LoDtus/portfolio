"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/shared/constants/i18n.constants";
import { getStoredLocale } from "@/shared/utils/locale.util";

// Only mounted at "/". The page is Vietnamese (defaultLocale) by default; the language is never switched automatically
// from the browser language. The only redirect happens when the visitor has previously CLICKED the language button
// (choice stored by setStoredLocale) and picked another language. Crawlers have no stored choice, so they always get "/" as is.
// Full page load (not router.replace) so <html lang>, metadata and JSON-LD match the target language.
export default function LocaleRedirector() {
    useEffect(() => {
        const stored = getStoredLocale();
        if (stored !== null && stored !== defaultLocale) {
            window.location.replace(`/${stored}${window.location.hash}`);
        }
    }, []);

    return null;
}
