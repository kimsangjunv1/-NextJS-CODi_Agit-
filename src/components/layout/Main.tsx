"use client"

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation';

import useNavigate from '@/hooks/common/useNavigate';
import { menuList } from '@/constants/lists/configServiceList';

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
    const { currentPathName } = useNavigate();

    const containerClass = className?.container || "";
    const innerClass = className?.inner || "";

    const FIND_ITEM = menuList.home.find((e) => e.route === currentPathName);

    const PAGE_TITLE = FIND_ITEM?.title;
    const PAGE_DESC = FIND_ITEM?.desc

    return (
        <main id={ id } className={`${ containerClass } w-full`}>
        {/* <main id={ id } className={`${ containerClass } w-full pt-[var(--header-height)]`}> */}
            <div className={`main-inner ${ innerClass } m-auto w-full flex flex-col items-start justify-between flex-1`} key={ usePathname() } >
                { children }
            </div>
        </main>
    );
};

export default Main;
