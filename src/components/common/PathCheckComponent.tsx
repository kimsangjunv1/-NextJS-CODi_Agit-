"use client"

import { AnimatePresence, motion } from 'motion/react'
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

import { useServiceStore } from "@/stores/useServiceStore";
import { usePathname } from "next/navigation";
import useNavigate from "@/hooks/common/useNavigate";
import { menuList } from "@/constants/lists/configServiceList";
import { useLayoutStore } from '@/stores/useLayoutStore';

const PathCheckComponent = ({ children }: { children: ReactNode }) => {
    const [ isNowOnMobile, setIsNowOnMobile ] = useState<boolean>();
    
    const { currentPathName } = useNavigate();
    const { isRouteChange, setIsMobile, setIsRouteChange } = useLayoutStore();

    const pathname = usePathname();
    const prevPathName = useRef( currentPathName );
    const setMobileEnvironment = ( e?: boolean ) => setIsNowOnMobile( e );
    const FIND_ITEM = menuList.home.find((e) => e.route === currentPathName);

    useEffect(() => {
        if ( isRouteChange === 1 ) {
            console.log("currentPathName", currentPathName)
            
            if ( prevPathName.current !== currentPathName ) {
                prevPathName.current = currentPathName;
            }
    
            // 페이지 경로가 바뀔 때마다 전환 완료 처리
            const timeout = setTimeout(() => { setIsRouteChange(0) }, 600); // 렌더 직후 살짝 기다렸다가
    
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
        <Fragment>
            { children }
        </Fragment>
        // <AnimatePresence mode='wait'>
        //     { isRouteChange === 0 &&
        //         <motion.section
        //             key={ pathname }
        //             initial={{ opacity: 0, transform: "scale(0.99)" }}
        //             animate={{ opacity: 1, transform: "scale(1)" }}
        //             exit={{ opacity: 0, transform: "scale(0.99)" }}
        //             transition={{
        //                 delay: 0,
        //                 type: "spring",
        //                 mass: 0.1,
        //                 stiffness: 100,
        //                 damping: 10,
        //             }}
        //         >
        //             { children }
        //         </motion.section>
        //     }
        // </AnimatePresence>
    )
}

export default PathCheckComponent