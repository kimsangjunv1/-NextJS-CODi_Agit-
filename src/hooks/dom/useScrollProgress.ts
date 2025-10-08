import { useState, useEffect } from "react";

const useScrollProgress = () => {
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {
        const calcScrollValue = () => {
            const winScroll =
                document.body.scrollTop || document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollValue(scrolled);
        };

        // 초기값 세팅 + 스크롤 이벤트 등록
        calcScrollValue();
        window.addEventListener("scroll", calcScrollValue);

        return () => {
            window.removeEventListener("scroll", calcScrollValue);
        };
    }, []);

    return { scrollValue };
}

export default useScrollProgress