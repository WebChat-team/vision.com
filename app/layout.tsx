// imports ================================================== //
import { StoreProvider } from "@/app/providers/storeProvider";
import Container from "@/shared/ui/Container";
import "@app/styles/index.css";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { getPreloadedState } from "@/app/store";
import AppearanceProvider from "@/app/providers/AppearanceProvider";

// main ===================================================== //
const metadata: Metadata = {
    title: "Видение",
    icons: {
        icon: "/icons/logo.svg"
    }
};

const montserrat = Montserrat({
    subsets: ['cyrillic'],
    display: 'swap',
});
const RootLayout = async ({ children }: { children: ReactNode }) => {

    const serverState = await getPreloadedState();

    return (
        <html lang="ru">
            <body className={montserrat.className}>
                <StoreProvider serverState={serverState}>
                    <AppearanceProvider>
                        {children}
                    </AppearanceProvider>
                </StoreProvider>
            </body>
        </html>
    );
};

// exports ================================================== //
export { metadata };
export default RootLayout;
