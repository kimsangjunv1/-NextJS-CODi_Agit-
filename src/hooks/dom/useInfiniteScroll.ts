import { useState, useEffect } from "react";

// target(element)와 count(몇개씩 추가 로드할것인지 갯수)를 받아 target이 보이면 기존 값에 10씩 더해서 반환해주는 훅
const useInfiniteScroll = () => {
    const [ count, setCount ] = useState(10);
    const [ maxCount, setMaxCount ] = useState(0);

    const [ isVisible, setIsVisible ] = useState(false);
    const [ target, setTarget ] = useState<Element | null>(null); // target 관리
    const [ currentCount, setCurrentCount ] = useState<number>( count )

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible( true );
                setCurrentCount( count + currentCount );

                observer.disconnect();
            }
        },
        { threshold: 0.1 }
    );

    const config = ( target: Element, count: number, maxCount:number ) => {
        setTarget( target )
        setCount( count )
        setMaxCount( maxCount )
    }

    const reset = () => {
        setCurrentCount(0)

        setTimeout(() => {
            setCurrentCount(10)
        }, 100)
    }

    useEffect(() => {
        if (!target) return;
        
        if ( !isVisible && maxCount > currentCount ) {
            observer.observe(target);
        } else {
            setIsVisible(false);
        }

        return () => observer.disconnect();
    }, [ target, isVisible, maxCount ]); // target이 변경될 때마다 실행

    return { isVisible, currentCount, config, reset };
};

export default useInfiniteScroll;