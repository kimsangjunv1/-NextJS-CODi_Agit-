"use client"


import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const PullToRefresh = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();


    const [pulling, setPulling] = useState(false);
    const [offset, setOffset] = useState(0);
    const startY = useRef(0);

    // 터치 시작
    const handleTouchStart = (e: any) => {
        startY.current = e.touches[0].clientY;
    };

    // 터치 이동
    const handleTouchMove = (e: any) => {
        const currentY = e.touches[0].clientY;
        const diff = (currentY - startY.current)/10;

        if (diff > 0 && window.scrollY <= 0) {
            e.preventDefault(); // 스크롤 방지
            setOffset(diff > 100 ? 100 : diff); // 최대 100px 제한
            setPulling(true);
        }
    };

    // 터치 끝날 때
    const handleTouchEnd = () => {
        if (offset > 30) {
            // onRefresh?.(); // 새로고침 실행
            router.refresh()
        }
        setOffset(0);
        setPulling(false);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden"
        >
            <div
                className="fixed top-0 left-0 right-0 flex items-center justify-center text-sm text-gray-600"
                style={{ transform: `translateY(${offset}px)`, transition: pulling ? "none" : "transform 0.3s ease-out" }}
            >
                {pulling ? `↓ 당겨서 새로고침 ${offset}` : ""}
            </div>
            {children}
        </div>
    );
}

export default PullToRefresh;