import type { Metadata } from "next";
import ReactLenis from "lenis/react";
        
import QueryProvider from "@/provider/QueryProvider";

import Toast from "@/components/layout/Toast";
import Modal from "@/components/layout/Modal";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Marquee from "@/components/layout/Marquee";
import PathCheckComponent from "@/components/common/PathCheckComponent";

import "@/scss/global.css";
import "@/scss/index.scss";

export const metadata: Metadata = {
    title: "agit.",
    description: "agit. 페이지에 오신걸 환영합니다.",
};

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode, modal?: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <QueryProvider>
                    <ReactLenis
                        root
                        options={{
                            // duration: 0.2,
                            lerp: 0.2,
                        }}
                    />
                    <Header />
                    <PathCheckComponent>
                        { children }
                        {/* { modal } */}
                    </PathCheckComponent>
                    {/* <Notice /> */}
                    <Footer />

                    <Modal />
                    <Toast />
                    <Marquee title={"THIS PAGE MADE BY REACT | GSAP | SCSS, TAKE A LOOK AROUND"} />
                    {/* <Cursor /> */}
                </QueryProvider>
            </body>
        </html>
    );
}
