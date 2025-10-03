"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Loading() {
    useEffect(() => {
        NProgress.start();

        return () => {
        NProgress.done();
        };
    }, []);

    return <div style={{ padding: "2rem" }}>로딩중...</div>;
}