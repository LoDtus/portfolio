import ReduxProvider from "@/shared/providers/redux.provider";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

export default function AppProvider({
    children
}: {
    children: ReactNode
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
        >
            <ReduxProvider>
                { children }
            </ReduxProvider>
        </ThemeProvider>    
    )
}