"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoadingBarComponent = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleStart = () => setProgress(0);
        const handleComplete = () => setProgress(100);

        // 경로가 변경되면 Progress Bar 시작
        router.prefetch(pathname);
        handleStart();

        const timer = setTimeout(() => {
            handleComplete();
        }, 500);

        return () => {
            clearTimeout(timer);
            setProgress(0); // 초기화
        };
    }, [pathname, router]);

    return (
        <div
            style={{
                width: `${progress}%`,
                height: "4px",
                backgroundColor: "blue",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                transition: "width 0.3s ease-in-out",
                opacity: progress ? 0 : 1
            }}
        />
    );
};

export default LoadingBarComponent;