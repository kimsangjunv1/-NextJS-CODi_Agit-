"use client"

import { useParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import UI from '@/components/common/UIComponent'
import IconComponent from "@/components/common/IconComponent"
import TextShimmer from "@/components/common/TextShimmerComponent"

import useNavigate from "@/hooks/common/useNavigate"
import { useLayoutStore } from "@/stores/useLayoutStore"
import { menuList } from "@/constants/lists/configServiceList"
import { useGetPostDetailQuery } from "@/hooks/api/post.query"

const Header = () => {
    const params = useParams();

    const [ showMenu, setShowMenu ] = useState(false);
    const { currentPathName, pushToUrl } = useNavigate();
    const { mainViewMode, setMainViewMode, categoryFilter, setCategoryFilter  } = useLayoutStore();
    const { data: getPostListData, refetch: getPostListFetch } = useGetPostDetailQuery(parseInt( (params?.id) as string ));

    useEffect(() => {
        setShowMenu( !showMenu )
    }, [ currentPathName ])

    // const IS_ROUTE_POST_EDIT = currentPathName.includes("modify");
    // const IS_ROUTE_POST = currentPathName.includes("post");

    const IS_ROUTE_HOME = currentPathName === "/";
    const IS_ROUTE_POST = currentPathName.includes("post") && !currentPathName.includes("modify") && !currentPathName.includes("create");
    const IS_ROUTE_POST_EDIT = currentPathName.includes("post") && currentPathName.includes("modify");
    const IS_ROUTE_POST_CREATE = currentPathName.includes("post") && currentPathName.includes("create");

    return (
        <Fragment>
            {/* { noticeStatus && 
                <div className="notice bg-[var(--color-blue-500)] py-[0.8rem] relative">
                    <p className="font-bold text-center text-white">현재 보고계신 화면은 DEV 서버 입니다, 모든 스타일, 기능은 확정이 아닌 개발 대기&진행 중 입니다.</p>
                    <button type="button" className="absolute top-[50%] right-0 transform translate-y-[-50%] translate-x-[-50%] text-white border border-white px-[0.4rem] py-[0.2rem] rounded-[0.4rem] text-[1.2rem] font-bold" onClick={() => setNoticeStatus( !noticeStatus )}>닫기</button>
                </div>
            } */}
            
            {/* <header className="h-[var(--header-height)] fixed top-0 left-[50%] transform translate-x-[-50%] z-[100]"> */}
            <header className="">
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
                            </AnimatePresence>
                        </section>
                    </section>


                </div>
            </header>

            <button
                className="hamburger w-[1.6rem] h-[1.6rem] px-[4.0rem] py-[2.0rem] fixed top-[3.6rem] right-0 transform translate-x-[0] translate-y-[-50%] text-[2.4rem] z-[10000000000]"
                onClick={() => setShowMenu(!showMenu)}
            >
                <div
                    className={`w-[1.6rem] h-[0.2rem] rounded-full bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        showMenu ? "top-[calc(50%-0rem)] rotate-[225deg]" : "top-[calc(50%-0.4rem)] rotate-0"
                    }`}
                />
                <div
                    className={`w-[1.6rem] h-[0.2rem] rounded-full bg-[var(--color-gray-1000)] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        showMenu ? "top-[calc(50%+0rem)] rotate-[135deg]" : "top-[calc(50%+0.4rem)] rotate-0"
                    }`}
                />
            </button>

            <AnimatePresence mode="wait">
                {/* { showMenu ? ( */}
                { false ? (
                    <motion.section
                        className="mobile flex flex-col justify-center items-center gap-[4.8rem] fixed top-0 left-0 w-full h-full bg-[#edededab] backdrop-blur-[10px] z-[1000]"
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
                        { menuList.home.map((e, i) => 
                            <motion.div
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
                            >
                                <Item href={ e.route } title={ e.title } icon={ e.icon }/>
                                {/* <Item href={ e.route } title={ e.title } icon={ e.icon } onClick={() => setShowMenu( !showMenu ) } /> */}
                            </motion.div>
                        )}
                    </motion.section>
                ) : "" }
            </AnimatePresence>
        </Fragment>
    )
}

const Item = ({ title, icon, href }: { title: string, icon: string, href: string }) => {
    const { pushToUrl } = useNavigate();
    return (
        <button type="button" className="flex gap-[0.4rem] items-center font-semibold" onClick={() => pushToUrl(href)}>
            <IconComponent type={`graphic-${ icon }`} alt={ title } />
            {/* <p className="text-[1.6rem] font-semibold whitespace-nowrap">{ title }</p> */}
        </button>
    )
}

export default Header