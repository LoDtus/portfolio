import type { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import SmoothScroll from "@/components/shared/smooth-scroll";
import AppProvider from "@/shared/providers/app.provider";
import FONTS from "@/shared/constants/font.constants";
import type { Locale } from "@/shared/constants/i18n.constants";

// Khung <html>/<body> dùng chung cho mọi root layout, để `lang` đúng theo ngôn ngữ của từng trang.
export default function DocumentShell({
    lang,
    children,
}: {
    lang: Locale;
    children: ReactNode;
}) {
    return (
        <html
            lang={lang}
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={`${FONTS.MANROPE.variable} ${FONTS.LEXEND.variable} antialiased`}
        >
            <body className="min-h-dvh font-sans">
                <NextTopLoader
                    color="#b5472a"
                    height={2}
                    showSpinner={false}
                    speed={200}
                    crawlSpeed={100}
                />
                <SmoothScroll />
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
