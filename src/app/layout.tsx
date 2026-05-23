import type { Metadata } from "next";
import ReactLenis from "lenis/react";

import GlobalErrorBoundary from "@/app/providers/GlobalErrorBoundary";
import QueryProvider from "@/app/providers/QueryProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import GlobalErrorListener from "@/app/providers/GlobalErrorListener";
import PopupProvider from "@/app/providers/PopupProvider";

import Toast from "@/shared/ui/layout/Toast";
import PageProgress from "@/shared/ui/common/PageProgress";
import PathCheckComponent from "@/shared/ui/common/PathCheckComponent";
import ClientPageProgress from "@/shared/ui/common/ClinentComponent";
import TransitionOverlay from "@/shared/ui/common/TransitionOverlay";
import RootChromeView from "@/views/layout/RootChromeView";

import "@/shared/styles/scss/global.css";
import "@/shared/styles/scss/index.scss";

export const metadata: Metadata = {
    title: "agit.",
    description: "agit. 페이지에 오신걸 환영합니다.",
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{ children: React.ReactNode; modal?: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                            <GlobalErrorListener>
                                <PopupProvider>
                                    <PageProgress />
                                    <ReactLenis
                                        root
                                        options={{
                                            lerp: 0.2,
                                        }}
                                    />
                                    <RootChromeView>
                                        <PathCheckComponent>
                                            <TransitionOverlay>
                                                {children}
                                                {modal}
                                            </TransitionOverlay>
                                        </PathCheckComponent>
                                    </RootChromeView>
                                    <ClientPageProgress />
                                </PopupProvider>
                                <Toast />
                            </GlobalErrorListener>
                        </AuthProvider>
                    </QueryProvider>
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
