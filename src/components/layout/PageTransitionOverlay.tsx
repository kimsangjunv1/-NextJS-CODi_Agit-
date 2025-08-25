"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Fragment, ReactNode, useEffect, useRef } from 'react';

import { useLayoutStore } from '@/stores/useLayoutStore';

import useNavigate from '@/hooks/common/useNavigate';
import IconComponent from '@/components/common/IconComponent';
// import { usePathname } from 'next/navigation';

const PageTransitionOverlay = ({ children }: { children: ReactNode }) => {
    const { currentPathName } = useNavigate();
    const { isRouteChange, isRouteChangeType, setIsRouteChange } = useLayoutStore();
    
    // const pathname = usePathname();

    // if ( pathname === "/" ) {
    //     sessionStorage.removeItem("kqr-service-session");
    //     sessionStorage.removeItem("kqr-snack-bar-session");
    // }

    const prevPathName = useRef( currentPathName );

    useEffect(() => {
        if ( prevPathName.current !== currentPathName ) {
            prevPathName.current = currentPathName;
        }

		// 페이지 경로가 바뀔 때마다 전환 완료 처리
		const timeout = setTimeout(() => setIsRouteChange(0), 280); // 렌더 직후 살짝 기다렸다가

		return () => clearTimeout( timeout ); // 클린업
	}, [ currentPathName ]);

    return (
        <Fragment>
            { currentPathName !== "/check" && currentPathName !== "/password" && currentPathName !== "/appcard" && currentPathName !== "/result" && prevPathName.current !== "/appcard" ? (
                <AnimatePresence>
                    {/* 앞으로 가기: 전환에 사용되는 화면 */}
                    { isRouteChange === 1 && (
                        <motion.div
                            key={`route-${ isRouteChange }`}
                            // initial={{ translateX: "100dvw" }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                            className={`fixed top-0 left-0 z-40 h-[100dvh] w-[100dvw] bg-[var(--color-background-light)] shadow-[0_0_70px_0_#00000021] flex flex-col items-center`}
                            layout={ false }
                        >
                            <motion.nav
                                key={"navigation"}
                                id="nav"
                            >
                                <div className={`relative nav-inner `}>
                                    <button className="bg-transparent">
                                        <IconComponent type="arrow-left" alt="뒤로가기" />
                                    </button>

                                    <motion.h1
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                                        className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                                    >
                                        로딩 중
                                    </motion.h1>
                                </div>
                            </motion.nav>
                        </motion.div>
                    )}
                    {/* 전환에 사용되는 화면 END */}
        
                    {/* 사용자가 바라보던 화면 */}
                    { isRouteChange === 0 && (
                        <motion.div
                            key={`base-${isRouteChange}`}
                            // initial={{ translateX: 0 }}
                            // animate={{ translateX: 0 }}
                            // exit={{ translateX: isRouteChangeType === 1 ? "100dvw" : "-20dvw" }}
                            // transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                            className={`fixed z-30 top-0 left-0 h-[100dvh] w-[100dvw]`}
                        >
                            { children }
                        </motion.div>
                    )}
                    {/* 사용자가 바라보던 화면 END */}

                    {/* 뒤로가기: 전환에 사용되는 화면 */}
                    { isRouteChange === 99 && (
                        <motion.div
                            // layout={ false }
                            layout
                            key={`route-back-${ isRouteChange }`}
                            className={`fixed top-0 left-0 z-[-1] h-[100dvh] w-[100dvw] bg-[var(--color-background-light)] flex flex-col items-center`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                        >
                                <motion.nav
                                    key={"navigation"}
                                    id="nav"
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0, 0.9, 0.95, 1],
                                    }}
                                >
                                    로딩 중
                                </motion.nav>
                            {/* { currentPathName !== "/new-home" ? (
                            ): ""} */}
                        </motion.div>
                    )}
                    {/* 전환에 사용되는 화면 END */}
                </AnimatePresence>
            ) : <Fragment>{ children }</Fragment> }
        </Fragment>
    );
};

export default PageTransitionOverlay