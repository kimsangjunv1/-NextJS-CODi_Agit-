import type { Metadata } from "next";
import ReactLenis from "lenis/react";
        
import QueryProvider from "@/provider/QueryProvider";

import Toast from "@/components/layout/Toast";
import Modal from "@/components/layout/Modal";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Marquee from "@/components/layout/Marquee";
import PageProgress from "@/components/common/PageProgress";
import AuthCheckComponent from "@/components/common/AuthCheckComponent";
import PathCheckComponent from "@/components/common/PathCheckComponent";

import "@/scss/global.css";
import "@/scss/index.scss";
import ClientPageProgress from "@/components/common/ClinentComponent";
import TransitionOverlay from "@/components/common/TransitionOverlay";


export const metadata: Metadata = {
    title: "agit.",
    description: "agit. 페이지에 오신걸 환영합니다.",
};

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode, modal?: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <QueryProvider>
                    <AuthCheckComponent>
                        <PageProgress />
                        <ReactLenis
                            root
                            options={{
                                // duration: 0.2,
                                lerp: 0.2,
                            }}
                        />
                        <Header />
                        <PathCheckComponent>
                            <TransitionOverlay>
                                { children }
                            </TransitionOverlay>
                        </PathCheckComponent>
                        {/* <Notice /> */}
                        <Footer />

                        <Modal />
                        <Toast />
                        <Marquee />
                        {/* <Cursor /> */}
                    </AuthCheckComponent>
                </QueryProvider>
            </body>
        </html>
    );
}
