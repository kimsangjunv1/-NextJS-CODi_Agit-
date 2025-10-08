"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import IconComponent from "@/components/common/IconComponent"
import TextShimmer from "@/components/common/TextShimmerComponent"

import useNavigate from "@/hooks/common/useNavigate"
import useScrollProgress from "@/hooks/dom/useScrollProgress"
import { useGetPostDetailQuery } from "@/hooks/api/post.query"

import { useLayoutStore } from "@/stores/useLayoutStore"
import UI from "../common/UIComponent"

const Navigation = () => {
    const params = useParams();

    const [ showMenu, setShowMenu ] = useState(false);
    
    const { scrollValue } = useScrollProgress();
    const { currentPathName, pushToUrl } = useNavigate();

    const { isMobileMenuOpen, setIsMobileMenuOpen } = useLayoutStore();

    const { data: getPostListData } = useGetPostDetailQuery(parseInt( (params?.id) as string ));

    const IS_ROUTE_POST = currentPathName.includes("post") && !currentPathName.includes("modify") && !currentPathName.includes("create");
    const IS_ROUTE_POST_EDIT = currentPathName.includes("post") && currentPathName.includes("modify");
    const IS_ROUTE_POST_CREATE = currentPathName.includes("post") && currentPathName.includes("create");

    useEffect(() => {
        if ( showMenu ) {
            setShowMenu( false )
        }
    }, [ currentPathName ])

    if ( !IS_ROUTE_POST ) return null;

    return (
        <nav className="fixed top-[calc(1.6rem*3)] left-[50%] px-[calc(1.6rem*2)] transform translate-x-[-50%] z-[1000] w-[calc(100dvw-(1.6rem*2))]">
            <div className="nav-inner">
                <section className="menu flex gap-[4.8rem]">
                    <UI.Button
                        type="button"
                        onClick={() => pushToUrl("/") }
                        className="bg-[#00000090] hover:bg-[var(--color-blue-500)] transition-colors p-[1.2rem] rounded-full flex gap-[0.8rem] items-center"
                    >
                        <IconComponent
                            type={`outlined-arrow-below`}
                            alt={ "나가기" }
                            width={32}
                            height={32}
                            className="rotate-90 invert-100"
                        />
                        <p className="text-white mr-[1.6rem] text-[1.6rem] font-semibold">이전으로</p>
                    </UI.Button>

                    <section className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-[1.6rem]">
                        <AnimatePresence mode="popLayout">
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
                                        <h2 className="text-[2.4rem] font-bold text-white">{ getPostListData?.result?.title }</h2>
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
                        </AnimatePresence>

                        <div className="w-[7.2rem] h-[0.8rem] p-[0.2rem] bg-[#ffffff40] backdrop-blur-sm rounded-full shadow-[var(--shadow-normal)]">
                            <motion.div
                                className="h-full shadow-[var(--shadow-normal)] rounded-full"
                                animate={{
                                    width: `${ scrollValue }%`,
                                    backgroundColor: scrollValue >= 99 ? "#000000" : "#ffffff"
                                    // backgroundColor: scrollValue >= 99 ? "var(--color-brand-500)" : "#ffffff"
                                }}
                                transition={{
                                            // delay: 0.05 * (i + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10,
                                        }}
                            />
                        </div>
                        
                        <div className="absolute top-0 left-0 w-full h-full bg-[#00000090] blur-lg z-[-1]" />
                    </section>
                </section>
            </div>
            
            {/* 모바일 버튼 */}
            <button
                className="hamburger w-[1.6rem] h-[1.6rem] px-[4.0rem] py-[2.0rem] absolute top-[50%] right-0 transform translate-x-[0] translate-y-[-50%] text-[2.4rem] z-[10000]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        </nav>
    )
}

export default Navigation