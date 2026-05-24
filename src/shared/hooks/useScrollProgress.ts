import { useEffect, useState } from "react";

const getScrollPercent = () => {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (height <= 0) return 0;

    const scrolled = (winScroll / height) * 100;
    if (!Number.isFinite(scrolled)) return 0;

    return Math.min(100, Math.max(0, scrolled));
};

const useScrollProgress = () => {
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {
        let rafId = 0;

        const calcScrollValue = () => {
            const safe = getScrollPercent();
            setScrollValue((prev) => (Math.abs(prev - safe) < 0.5 ? prev : safe));
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(calcScrollValue);
        };

        calcScrollValue();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return { scrollValue };
};

/** 스크롤 %가 threshold를 넘었는지 — 경계에서만 state 갱신 (리렌더 최소화) */
export const useScrollPastThreshold = (thresholdPercent: number) => {
    const [past, setPast] = useState(false);

    useEffect(() => {
        let rafId = 0;

        const update = () => {
            const next = getScrollPercent() >= thresholdPercent;
            setPast((prev) => (prev === next ? prev : next));
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
        };
    }, [thresholdPercent]);

    return past;
};

export default useScrollProgress;
