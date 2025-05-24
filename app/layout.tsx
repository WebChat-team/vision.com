// imports ================================================== //
import { StoreProvider } from "@/app/providers/storeProvider";
import Container from "@/shared/ui/Container";
import Header from "@/widgets/Header";
import "@app/styles/index.css";
import { ReactNode } from "react";

// main ===================================================== //
const metadata = {
    title: "Видение",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {

    return (
        <html lang="ru" suppressHydrationWarning>
            <body>
                <StoreProvider>
                    <Header />
                    <Container>
                        {children}
                    </Container>
                </StoreProvider>
            </body>
        </html>
    );
};

// exports ================================================== //
export { metadata };
export default RootLayout;
