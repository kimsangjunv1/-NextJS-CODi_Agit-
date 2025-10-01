"use client"

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// props 타입 정의
interface MainProps {
    children: ReactNode; // children은 ReactNode 타입
    id?: string;
    className?: {
        container: string;
        inner: string;
    };
}

const Main = ({ children, id = "main", className }: MainProps) => {
    const containerClass = className?.container || "";
    const innerClass = className?.inner || "";

    return (
        <main id={ id } className={`${ containerClass } w-full`}>
            <div className={`main-inner ${ innerClass } m-auto w-full flex flex-col items-start justify-between flex-1`} key={ usePathname() } >
                { children }
            </div>
        </main>
    );
};

export default Main;
