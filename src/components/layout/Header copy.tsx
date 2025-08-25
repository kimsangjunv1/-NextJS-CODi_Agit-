"use client"

import { Fragment, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import useNavigate from "@/hooks/common/useNavigate"
import { useLayoutStore } from "@/stores/useLayoutStore"
import IconComponent from "@/components/common/IconComponent"
import { menuList } from "@/constants/lists/configServiceList"
import TextShimmer from "../common/TextShimmerComponent"
import UI from "../common/InputComponent"

const Header = () => {
    const [ noticeStatus, setNoticeStatus ] = useState( true );
    const [ showMenu, setShowMenu ] = useState(false);
    const { currentPathName } = useNavigate();
    const { mainViewMode, setMainViewMode } = useLayoutStore();

    useEffect(() => {
        setShowMenu( !showMenu )
    }, [ currentPathName ])

    return (
        <Fragment>
            {/* { noticeStatus && 
                <div className="notice bg-[var(--color-blue-500)] py-[0.8rem] relative">
                    <p className="font-bold text-center text-white">현재 보고계신 화면은 DEV 서버 입니다, 모든 스타일, 기능은 확정이 아닌 개발 대기&진행 중 입니다.</p>
                    <button type="button" className="absolute top-[50%] right-0 transform translate-y-[-50%] translate-x-[-50%] text-white border border-white px-[0.4rem] py-[0.2rem] rounded-[0.4rem] text-[1.2rem] font-bold" onClick={() => setNoticeStatus( !noticeStatus )}>닫기</button>
                </div>
            } */}
            
            <header className="h-[var(--header-height)] fixed top-0 left-[50%] transform translate-x-[-50%] z-[100]">
                <div className="header-inner m-auto max-w-[var(--pc)] px-[2.0rem] w-full h-full flex items-center justify-between flex-1 relative">
                    <section className="menu flex gap-[4.8rem]">
                        <IconComponent type={`graphic-logo-horizontal`} alt={ "코디 아지트" } width={138} height={42} />

                        <section className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full flex justify-center">
                            <AnimatePresence mode="popLayout">
                                { mainViewMode === 1 &&
                                    <motion.section
                                        key={"slider"}
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
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        <TextShimmer
                                            as="h2"
                                            duration={3}
                                            style={{
                                                color: "#000000",
                                                fontSize: "2.4rem",
                                            }}
                                            className="font-extrabold"
                                        >
                                            최근 업로드한 컨텐츠
                                        </TextShimmer>
                                    </motion.section>
                                }

                                { mainViewMode === 2 &&
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
                                        className="flex gap-[1.6rem] flex-1 justify-center"
                                    >
                                        {[ "전체", "디자인", "개발" ].map((e, i) =>
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
                                            className="flex gap-[1.6rem]"
                                        >
                                            <UI.Button
                                                key={i}
                                                className={"font-extrabold text-[2.4rem]"}
                                            >
                                                { e }
                                            </UI.Button>
                                        </motion.section>
                                            // <div key={i} className="font-extrabold">
                                            // </div>
                                        )}
                                    </motion.section>
                                }
                            </AnimatePresence>
                        </section>
                    </section>


                </div>
            </header>

            <button
                className="hamburger w-[1.6rem] h-[1.6rem] px-[4.0rem] py-[2.0rem] absolute top-[50%] right-0 transform translate-x-[0] translate-y-[-50%] text-[2.4rem] z-[10000]"
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
                { showMenu ? (
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