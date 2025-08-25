"use client"

// hooks/useNavigate.ts
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutStore } from "@/stores/useLayoutStore";

const useNavigate = ( fallbackUrl = "/new-home" ) => {
    const router = useRouter();
    const pathName = usePathname();

    const { setIsRouteChange, setIsRouteChangeType } = useLayoutStore();

    const DEFENCE_ROUTE =
        pathName === "/"
        || pathName === "/new-home"
        || pathName === "/check"
        || pathName === "/password"
        || pathName === "/exit/receipt"
        || pathName === "/exit/payment";
    
    const [ currentPathName, setCurrentPathName ] = useState("");
    const [ isLandingPage, setIsLandingpage ] = useState( DEFENCE_ROUTE );
    
    // isRouteChange
    // 0: 아무것도 이동 안함
    // 1: 앞으로 이동
    // 99: 뒤로 이동

    // isRouteChangeType
    // 0: 대기
    // 1: 앞으로
    // 2: 뒤로

    // 설명: 뒤로가기 지원 O
    const pushToUrl = ( url: string, delay?: number ) => {
        setIsRouteChange(1);
        setIsRouteChangeType(1);

        // if ( delay ) {
        //     setTimeout(() => router.push( url ) , delay )
        // } else {
        //     router.push( url );
        // }
        
        setTimeout(() => router.push( url ) , 100 )

    };

    // 설명: 뒤로가기 지원 X
    const replaceToUrl = ( url: string, animation: boolean = true ) => {
        console.log("들어옴", animation)

        setIsRouteChange( animation ? 1 : 0 );
        setIsRouteChangeType( animation ? 1 : 0 );

        setTimeout(() => router.push( url ) , 1000 )
        // router.replace( url );
    };

    const backToUrl = () => {
        setIsRouteChange(99);
        setIsRouteChangeType(2);

        // 이전 로직
        // setTimeout(() => {
        //     if ( paymentCurrentType === 99 ) {
        //         if ( typeof window !== "undefined" && window.history.length > 2 ) {
        //             router.back();
        //         } else {
        //             router.replace( fallbackUrl )
        //         }
        //     } else {
        //         router.replace( fallbackUrl )
        //     }
        // }, 500)

        // 최신 로직
        setTimeout(() => {
            router.back();
        }, 500)
    };

    useEffect(() => {
        setCurrentPathName( pathName );
        setIsLandingpage( DEFENCE_ROUTE );
    }, [ pathName ])

    return { pushToUrl, replaceToUrl, backToUrl, currentPathName, isLandingPage };
};

export default useNavigate;
