"use client"

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const AuthComponent = ({ children, token }: { children: React.ReactNode, token: string }) => {
    const pathname = usePathname();  // 현재 URL 경로를 가져옴
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    
    const FIRST_ROUTE = pathname.split('/')[1];

    useEffect(() => {
        if ( FIRST_ROUTE !== "home" && FIRST_ROUTE !== "check" && !token ) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [ FIRST_ROUTE, token ])

    if ( isAuthenticated ) {
        return (
            <Fragment>
                { children }
            </Fragment>
        )
    } else {
        return <></>
    }
    
};

export default AuthComponent