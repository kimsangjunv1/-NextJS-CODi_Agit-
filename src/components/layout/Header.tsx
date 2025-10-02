"use client"

import { useParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import UI from '@/components/common/UIComponent'
import IconComponent from "@/components/common/IconComponent"
import TextShimmer from "@/components/common/TextShimmerComponent"

import useNavigate from "@/hooks/common/useNavigate"
import { useLayoutStore } from "@/stores/useLayoutStore"
import { useGetPostDetailQuery } from "@/hooks/api/post.query"
import { signOut, useSession } from "next-auth/react"
import { headerMenuList } from "@/constants/lists/configServiceList"
import { useServiceStore } from "@/stores/useServiceStore"

const Header = () => {
    const params = useParams();

    const [ showMenu, setShowMenu ] = useState(false);
    
    const { reset } = useServiceStore();
    const { isMobile } = useLayoutStore();
    const { currentPathName, pushToUrl } = useNavigate();
    const { mainViewMode, setMainViewMode, categoryFilter, setCategoryFilter  } = useLayoutStore();
    const { data: getPostListData, refetch: getPostListFetch } = useGetPostDetailQuery(parseInt( (params?.id) as string ));

    useEffect(() => {
        if ( showMenu ) {
            setShowMenu( false )
        }
    }, [ currentPathName ])

    const IS_ROUTE_HOME = currentPathName === "/";
    const IS_ROUTE_POST = currentPathName.includes("post") && !currentPathName.includes("modify") && !currentPathName.includes("create");
    const IS_ROUTE_POST_EDIT = currentPathName.includes("post") && currentPathName.includes("modify");
    const IS_ROUTE_POST_CREATE = currentPathName.includes("post") && currentPathName.includes("create");
    const IS_ROUTE_POST_LAB = currentPathName.includes("lab")

     const logout = () => {
        signOut({ callbackUrl: "/login" });
        reset();
    }

    return (
        <header>
            <div className="header-inner">
                <section className="menu flex gap-[4.8rem]">
                    <button
                        type="button"
                        onClick={() => pushToUrl("/") }
                    >
                        <IconComponent
                            type={`graphic-logo-horizontal`}
                            alt={ "코디 아지트" }
                            width={138}
                            height={42}
                        />
                    </button>

                    <section className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex items-center justify-center gap-[1.6rem]">
                        <AnimatePresence mode="popLayout">
                            { IS_ROUTE_HOME &&
                                <UI.Button
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            left: 0,
                                            // behavior: "smooth"
                                        });
                                        setMainViewMode( 1 )
                                    }}
                                    className="text-black text-[1.8rem] font-bold"
                                >
                                    <TextShimmer
                                        as="h2"
                                        duration={3}
                                        style={{
                                            color: "#000000",
                                            fontSize: "2.4rem",
                                        }}
                                        color={{
                                            start: "#000000",
                                            end: "#9393a0"
                                        }}
                                        className="font-extrabold text-[2.4rem]"
                                    >
                                        최신글
                                    </TextShimmer>
                                </UI.Button>
                            }

                            { IS_ROUTE_HOME ? <div key={"hr"} className="h-[1.6rem] w-[0.1rem] bg-[var(--color-gray-400)]" /> : "" }

                            { IS_ROUTE_HOME && mainViewMode === 1 &&
                                <motion.section
                                    key={"slider"}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        // delay: 0.05 * (i + 1),
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10,
                                    }}
                                    className="flex gap-[1.6rem] flex-1 justify-center"
                                >
                                    
                                    {/* <UI.Button
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                // behavior: "smooth"
                                            });
                                            setMainViewMode( 1 )
                                        }}
                                        className="text-black text-[1.8rem] font-bold"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            color={{
                                                start: "#000000",
                                                end: "#9393a0"
                                            }}
                                            className="font-extrabold text-[2.4rem]"
                                        >
                                            갓 구운 글
                                        </TextShimmer>
                                    </UI.Button> */}
                    
                                    {/* <div className='h-[1.2rem] w-[0.1rem] bg-[#ffffff50]' /> */}
                    
                                    <UI.Button
                                        onClick={() => setMainViewMode( 2 )}
                                        className="font-extrabold text-[2.4rem] text-[#00000050]"
                                    >
                                        리스트
                                    </UI.Button>
                                </motion.section>
                            }

                            { IS_ROUTE_HOME && mainViewMode === 2 &&
                                <motion.section
                                    key={"list"}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        // delay: 0.05 * (i + 1),
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10,
                                    }}
                                    className="flex gap-[2.0em] flex-1 justify-center"
                                >
                                    {[ "전체", "개발", "디자인", "3D" ].map((e, i) =>
                                        <motion.section
                                            key={`${e}-${i}`}
                                            initial={{ opacity: 0, transform: "scale(0.8)" }}
                                            animate={{ opacity: 1, transform: "scale(1)" }}
                                            exit={{ opacity: 0, transform: "scale(0.8)" }}
                                            transition={{
                                                delay: 0.05 * (i + 1),
                                                type: "spring",
                                                mass: 0.1,
                                                stiffness: 100,
                                                damping: 10,
                                            }}
                                            onClick={() => setCategoryFilter( i === 0 ? 999 : i )}
                                            // onClick={() => setCategoryFilter( i === 0 ? 999 : i )}
                                            className={`flex gap-[1.6rem] ${ categoryFilter === i ? "text-black" : categoryFilter === 999 && i === 0 ? "text-black" : "text-[#00000050]" }`}
                                        >
                                            <UI.Button
                                                key={i}
                                                className={"font-extrabold text-[2.4rem]"}
                                            >
                                                { e }
                                            </UI.Button>
                                        </motion.section>
                                    )}
                                </motion.section>
                            }

                            { IS_ROUTE_POST &&
                                <section className="flex flex-col gap-[0.8rem]">
                                    <motion.section
                                        key={"post_title"}
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            // delay: 0.05 * (i + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "var(--color-brand-500)",
                                                fontSize: "2.4rem",
                                            }}
                                            className="font-extrabold"
                                        >
                                            {`${ getPostListData?.result?.title }`}
                                        </TextShimmer>
                                    </motion.section>
                                </section>
                            }

                            { IS_ROUTE_POST_EDIT &&
                                <section className="flex flex-col gap-[0.8rem]">
                                    <motion.section
                                        key={"post_title"}
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            // delay: 0.05 * (i + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            color={{
                                                start: "#000000",
                                                end: "#9393a0"
                                            }}
                                            className="font-extrabold"
                                        >
                                            {`${ getPostListData?.result?.title } | 수정중`}
                                        </TextShimmer>
                                    </motion.section>
                                </section>
                            }

                            { IS_ROUTE_POST_CREATE &&
                                <section className="flex flex-col gap-[0.8rem]">
                                    <motion.section
                                        key={"post_title"}
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            // delay: 0.05 * (i + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            color={{
                                                start: "#000000",
                                                end: "#9393a0"
                                            }}
                                            className="font-extrabold"
                                        >
                                            {`생성 중`}
                                        </TextShimmer>
                                    </motion.section>
                                </section>
                            }

                            { IS_ROUTE_POST_LAB &&
                                <section className="flex flex-col gap-[0.8rem]">
                                    <motion.section
                                        key={"post_title"}
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            // delay: 0.05 * (i + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            color={{
                                                start: "#000000",
                                                end: "#9393a0"
                                            }}
                                            className="font-extrabold"
                                        >
                                            {`LAB`}
                                        </TextShimmer>
                                    </motion.section>
                                </section>
                            }
                        </AnimatePresence>
                    </section>
                </section>
            </div>

            {/* 모바일 메뉴 */}
            <AnimatePresence mode="wait">
                { showMenu ? (
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
                        {/* 목록 */}
                        <section className="mobile-inner max-w-[var(--size-tablet)] px-[2.4rem] py-[2.4rem] w-full h-full flex flex-col items-start justify-between">
                            <section className="flex flex-col items-start">
                                <div className="w-full overflow-hidden mb-[2.4rem]" >
                                    <p className="text-[7.2rem] font-bold leading-[1.5]">Hej!</p>
                                    <p className="text-[2.4rem] font-semibold leading-[1.5]">아래에서 메뉴를 선택해주세요.</p>
                                </div>

                                { headerMenuList.map((e, i) => 
                                    <div key={`${e}-${i}-${ showMenu }`} className="h-[4.8rem] overflow-hidden" >
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

                                <div key={`static-1-${ showMenu }`} className="w-full h-auto overflow-hidden" >
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

                                <div key={`static-2-${ showMenu }`} className="h-[4.8rem] overflow-hidden" >
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
                                        <UI.Button
                                            onClick={() => logout()}
                                            className="flex justify-center text-center gap-[0.4rem] w-full items-center text-[2.4rem] font-semibold whitespace-nowrap py-[1.2rem] text-[var(--color-red-500)]"
                                        >
                                            로그아웃
                                        </UI.Button>
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
                                
                                <UI.Button
                                    className="flex items-center gap-[0.8rem] shadow-[var(--shadow-normal)] p-[0.8rem] rounded-[1.2rem] transition-colors bg-transparent hover:bg-[var(--color-gray-200)]"
                                    onClick={() => {
                                        pushToUrl(`/post/create`)
                                    }}
                                >
                                    새로운 아티클 생성하기 (임시)
                                </UI.Button>

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
                            key={`glow-${ showMenu }`}
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
            
            {/* 모바일 버튼 */}
            <button
                className="hamburger w-[1.6rem] h-[1.6rem] px-[4.0rem] py-[2.0rem] absolute top-[50%] right-0 transform translate-x-[0] translate-y-[-50%] text-[2.4rem] z-[10000]"
                onClick={() => setShowMenu(!showMenu)}
            >
                <div
                    className={`w-[2.4rem] h-[0.3rem] bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        showMenu ? "top-[calc(50%-0rem)] rotate-[225deg]" : "top-[calc(50%-0.8rem)] rotate-0"
                    }`}
                />
                <div
                    className={`w-[2.4rem] h-[0.3rem] bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        showMenu ? "top-[calc(50%+0rem)] rotate-[135deg]" : "top-[calc(50%+0.8rem)] rotate-0"
                    }`}
                />
            </button>
            {/* 모바일 버튼 END */}
        </header>
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

export default Header