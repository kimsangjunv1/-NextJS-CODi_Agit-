"use client"

import { ReactNode, useEffect, useState } from "react";

import { useLayoutStore } from '@/stores/useLayoutStore';

const PathCheckComponent = ({ children }: { children: ReactNode }) => {
    const [ isNowOnMobile, setIsNowOnMobile ] = useState<boolean>();
    
    const { setIsMobile } = useLayoutStore();
    const setMobileEnvironment = ( e?: boolean ) => setIsNowOnMobile( e );

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

    return children
}

export default PathCheckComponent