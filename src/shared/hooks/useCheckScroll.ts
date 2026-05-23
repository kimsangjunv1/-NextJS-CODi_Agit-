import { useState, useEffect, useRef } from "react";

function useCheckScroll(initialValue: boolean) {
    const [ isShow, setIsShow ] = useState(initialValue);
    const [ scrollTop, setScrollTop ] = useState<number>(0);

    const lastScroll = useRef(0); // useRef로 lastScroll을 관리 (상태 업데이트를 트리거하지 않음)

    const checkTop = () => {
        const scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
        const percent = scrollTop > 0 ? (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0;

        setScrollTop(Math.round(percent * 10) / 10);
        
        // 스크롤이 이전 스크롤 위치보다 아래로 내려갔으면 true, 그렇지 않으면 false
        const isScrollingDown = scrollTop >= lastScroll.current;

        // 스크롤 방향에 따라 isShow 상태를 업데이트
        if ( isScrollingDown ) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }

        lastScroll.current = scrollTop;  // 마지막 스크롤 위치를 업데이트
    };

    useEffect(() => {
        window.addEventListener("scroll", checkTop);

        // 컴포넌트가 unmount 될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener("scroll", checkTop);
        };
    }, [ initialValue ]); // initialValue가 변경될 때마다 리스너를 재설정

    return { isShow, scrollTop, lastScroll };
}

export default useCheckScroll;
