"use client"

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useEffect, useRef, useState } from "react";

import useNavigate from "@/hooks/common/useNavigate";
import { useLayoutStore } from '@/stores/useLayoutStore';

const PathCheckComponent = ({ children }: { children: ReactNode }) => {
    const [ isNowOnMobile, setIsNowOnMobile ] = useState<boolean>();
    
    const { currentPathName } = useNavigate();
    const { isRouteChange, setIsMobile, setIsRouteChange } = useLayoutStore();

    const pathname = usePathname();
    const prevPathName = useRef( currentPathName );
    const setMobileEnvironment = ( e?: boolean ) => setIsNowOnMobile( e );

    useEffect(() => {
        if ( isRouteChange === 1 ) {
            if ( prevPathName.current !== currentPathName ) {
                prevPathName.current = currentPathName;
            }
    
            // 페이지 경로가 바뀔 때마다 전환 완료 처리
            const timeout = setTimeout(() => { setIsRouteChange(0) }, 500); // 렌더 직후 살짝 기다렸다가
            // const timeout = setTimeout(() => { setIsRouteChange(0) }, 600); // 렌더 직후 살짝 기다렸다가
    
            return () => clearTimeout( timeout ); // 클린업
        }
	}, [ currentPathName, isRouteChange ]);


    useEffect(() => {
         window.addEventListener("resize", () => {
            const MATCHES = window.matchMedia("(max-width: 960px)").matches
            setMobileEnvironment(MATCHES);
        });

        return () => {
            window.removeEventListener("resize", () => {
                setMobileEnvironment();
            });
        };
    }, []);

    useEffect(() => {
        setIsMobile( isNowOnMobile ?? false );
    }, [ isNowOnMobile ])

    return (
        <AnimatePresence>
            {/* 기본 화면 */}
            { isRouteChange === 0 && (
                <motion.div
                    key={`base-${isRouteChange}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                    // className="fixed z-30 top-0 left-0 h-[100dvh] w-[100dvw]"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PathCheckComponent