"use client"

import React, { Fragment, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'motion/react';

import { useLayoutStore } from '@/stores/useLayoutStore'
import { useServiceStore } from '@/stores/useServiceStore';

import UI from '../common/UIComponent';
import IconComponent from '../common/IconComponent';
import TextShimmer from '../common/TextShimmerComponent';

import useNavigate from '@/hooks/common/useNavigate';
import { headerMenuList } from '@/constants/lists/configServiceList';

const MobileMenu = () => {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useLayoutStore();
    const { data: session } = useSession();
    const { pushToUrl, currentPathName } = useNavigate();
    const { reset } = useServiceStore();

     const logout = () => {
        signOut({ callbackUrl: "/login" });
        reset();
    }

    useEffect(() => {
        if ( isMobileMenuOpen ) {
            setIsMobileMenuOpen( false )
        }
    }, [ currentPathName ])

    return (
        <Fragment>
            {/* 모바일 메뉴 */}
            <AnimatePresence mode="wait">
                { isMobileMenuOpen ? (
                    <motion.article
                        className="mobile flex flex-col justify-center items-center gap-[1.6rem] fixed top-0 left-0 w-full h-full bg-[#ffffff] z-10000"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        <UI.Button
                            className="hamburger absolute top-[3.2rem] right-[3.2rem] z-[10000]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {/* <div
                                className={`w-[2.4rem] h-[0.3rem] bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                    isMobileMenuOpen ? "top-[calc(50%-0rem)] rotate-[225deg]" : "top-[calc(50%-0.8rem)] rotate-0"
                                }`}
                            />
                            <div
                                className={`w-[2.4rem] h-[0.3rem] bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                    isMobileMenuOpen ? "top-[calc(50%+0rem)] rotate-[135deg]" : "top-[calc(50%+0.8rem)] rotate-0"
                                }`}
                            /> */}
                            <IconComponent type='graphic-arrow-up' alt='나가기' className='rotate-270' width={42} height={42} />
                        </UI.Button>
                        {/* 목록 */}
                        <section className="mobile-inner max-w-[var(--size-tablet)] px-[2.4rem] py-[2.4rem] w-full h-full flex flex-col items-start justify-between">
                            <section className="flex flex-col items-start">
                                <div className="w-full overflow-hidden mb-[2.4rem]" >
                                    <p className="text-[5.2rem] font-bold leading-[1.5]">Hej!</p>
                                    <p className="text-[2.4rem] font-semibold leading-[1.5]">아래에서 메뉴를 선택해주세요.</p>
                                </div>

                                { headerMenuList.map((e, i) => 
                                    <div key={`${e}-${i}-${ isMobileMenuOpen }`} className="h-[4.8rem] overflow-hidden" >
                                        <motion.div
                                            initial={{ y: "4.8rem" }}
                                            animate={{ y: "0rem" }}
                                            transition={{
                                                delay: 0.1 * (i + 1),
                                                type: "spring",
                                                mass: 0.1,
                                                stiffness: 100,
                                                damping: 10,
                                            }}
                                        >
                                            <Item href={ e.route } title={ e.title } />
                                        </motion.div>
                                    </div>
                                )}

                                <div key={`static-1-${ isMobileMenuOpen }`} className="w-full h-auto overflow-hidden" >
                                    <motion.div
                                        className="w-full bg-[var(--color-gray-200)] my-[1.6rem] h-[0.1rem]"
                                        initial={{ y: "4.8rem" }}
                                        animate={{ y: "0rem" }}
                                        transition={{
                                            delay: 0.1 * (headerMenuList.length + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                    />
                                </div>

                                <div key={`static-2-${ isMobileMenuOpen }`} className="h-[4.8rem] overflow-hidden" >
                                    <motion.div
                                        initial={{ y: "4.8rem" }}
                                        animate={{ y: "0rem" }}
                                        transition={{
                                            delay: 0.1 * (headerMenuList.length + 2),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                    >
                                        { session ? (
                                            <UI.Button
                                                onClick={() => logout()}
                                                className="flex justify-center text-center gap-[0.4rem] w-full items-center text-[2.4rem] font-semibold whitespace-nowrap py-[1.2rem] text-[var(--color-red-500)]"
                                            >
                                                로그아웃
                                            </UI.Button>
                                        ) : (
                                            <UI.Button
                                                onClick={() => pushToUrl("/login")}
                                                className="flex justify-center text-center gap-[0.4rem] w-full items-center text-[2.4rem] font-semibold whitespace-nowrap py-[1.2rem] text-[var(--color-gray-1000)]"
                                            >
                                                로그인
                                            </UI.Button>
                                        )}
                                    </motion.div>
                                </div>
                            </section>

                            <section className="flex flex-col gap-[1.6rem] items-start">
                                <UI.Button
                                    className="flex items-center gap-[0.8rem] shadow-[var(--shadow-normal)] p-[0.8rem] rounded-[1.2rem] transition-colors bg-transparent hover:bg-[var(--color-gray-200)]"
                                    onClick={() => pushToUrl("https://github.com/kimsangjunv1")}
                                >
                                    <IconComponent
                                        type="graphic-logo-github"
                                        alt="깃허브"
                                    />
                                    <p className="font-semibold">@kimsangjunv1</p>
                                </UI.Button>

                                { session ? (
                                    <Fragment>
                                        <p>어드민 이동 예정</p>
                                        <div className="flex gap-[1.6rem]">
                                            <UI.Button
                                                className="flex items-center gap-[0.8rem] shadow-[var(--shadow-normal)] p-[0.8rem] rounded-[1.2rem] transition-colors bg-transparent hover:bg-[var(--color-gray-200)]"
                                                onClick={() => {
                                                    pushToUrl(`/post/create`)
                                                }}
                                            >
                                                새로운 아티클 생성하기
                                            </UI.Button>

                                            <UI.Button
                                                className="flex items-center gap-[0.8rem] shadow-[var(--shadow-normal)] p-[0.8rem] rounded-[1.2rem] transition-colors bg-transparent hover:bg-[var(--color-gray-200)]"
                                                onClick={() => {
                                                    pushToUrl(`/manager`)
                                                }}
                                            >
                                                관리자 페이지 이동
                                            </UI.Button>
                                        </div>
                                    </Fragment>
                                ) : "" }
                                

                                <IconComponent type="graphic-logo-horizontal" alt="로고" height={132} width={152} />
                                
                                <TextShimmer
                                    as="p"
                                    duration={3}
                                    style={{
                                        color: "#000000",
                                        fontSize: "1.4rem",
                                    }}
                                    color={{
                                        start: "#000000",
                                        end: "#ededed"
                                    }}
                                    className="h-[2.1rem] leading-[1.7]"
                                >
                                    © kimsangjunv1. All rights reserved.
                                </TextShimmer>
                            </section>
                        </section>
                        {/* 목록 END */}


                        {/* 글로우 */}
                        <motion.div
                            key={`glow-${ isMobileMenuOpen }`}
                            className="absolute inset-0 z-10 pointer-events-none blur-[10px]"
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 10, opacity: -10 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                repeat: 0,       // 무한 반복
                                // repeatType: "loop",
                            }}
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-blue-500) 20%, rgba(255,255,255,0) 70%)",
                                // background: "radial-gradient(circle, rgba(173,216,230,0) 0%, rgba(255,182,193,0.9) 25%, var(--color-brand-300) 50%, rgba(255,255,255,0.9) 75%, rgba(173,216,230,0) 100%)",
                                borderRadius: "50%",
                                transformOrigin: "center"
                            }}
                            // onAnimationComplete={() => setInitGlow( true )}
                        />
                        {/* 글로우 END */}
                    </motion.article>
                ) : "" }
            </AnimatePresence>
            {/* 모바일 메뉴 END */}
        </Fragment>
    )
}

const Item = ({ title, href }: { title: string, href: string }) => {
    const { pushToUrl } = useNavigate();
    return (
        <UI.Button
            type="button"
            className="flex justify-center text-center gap-[0.4rem] w-full items-center text-[2.4rem] font-semibold whitespace-nowrap py-[1.2rem]"
            onClick={() => pushToUrl(href)}
        >
            { title }
        </UI.Button>
    )
}

export default MobileMenu