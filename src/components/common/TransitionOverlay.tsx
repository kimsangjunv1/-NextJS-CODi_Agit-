"use client"

import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useEffect, useRef } from "react";

import useNavigate from "@/hooks/common/useNavigate";
import { useLayoutStore } from '@/stores/useLayoutStore';

const TransitionOverlay = ({ children }: { children: ReactNode }) => {
    const { currentPathName } = useNavigate();
    const { isRouteChange, setIsRouteChange } = useLayoutStore();

    const prevPathName = useRef( currentPathName );

    useEffect(() => {
        if ( isRouteChange === 1 ) {
            if ( prevPathName.current !== currentPathName ) {
                prevPathName.current = currentPathName;
            }
    
            // 페이지 경로가 바뀔 때마다 전환 완료 처리
            const timeout = setTimeout(() => { setIsRouteChange(0) }, 500); // 렌더 직후 살짝 기다렸다가
    
            return () => clearTimeout( timeout ); // 클린업
        }
	}, [ currentPathName, isRouteChange ]);

    return (
        <AnimatePresence mode='wait'>
            { isRouteChange === 0 && (
                <motion.div
                    key={`base-${isRouteChange}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                >
                    { children }
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TransitionOverlay