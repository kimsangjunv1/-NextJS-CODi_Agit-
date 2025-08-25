"use client"

import { Fragment } from "react";
import { motion } from "framer-motion";

import useNavigate from "@/hooks/common/useNavigate";
import { useTimerStore } from "@/stores/useTimerStore";

const Notice = () => {
    const { currentPathName } = useNavigate();
    const { time, isRunning } = useTimerStore();
    
    return (
        <Fragment>
            { isRunning && currentPathName !== "/waiting-room" ? 
                <Fragment>
                    { currentPathName !== "/new-home" ? (
                        <motion.article
                            className="fixed top-[var(--nav-height)] z-[100] flex justify-center px-[2.0rem] w-full"
                            transition={{
                                duration: 0.25,
                                damping: 20,
                                stiffness: 400,
                                type: 'spring',
                            }}
                            whileTap={{ scale: 0.95 }}
                            
                            exit={{ y: -50, filter: "blur(10px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            initial={{ y: -50, filter: "blur(10px)" }}
                        >
                            <ContentComponent time={ time } />
                        </motion.article>
                    ): (
                        <motion.article
                            className="fixed top-[2.0rem] z-[100] flex justify-center px-[2.0rem] w-full"
                            transition={{
                                duration: 0.25,
                                damping: 20,
                                stiffness: 400,
                                type: 'spring',
                            }}
                            whileTap={{ scale: 0.95 }}
                            
                            exit={{ y: -50, filter: "blur(10px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            initial={{ y: -50, filter: "blur(10px)" }}
                        >
                            <ContentComponent time={ time } />
                        </motion.article>
                    )}
                </Fragment>
             : ""}
        </Fragment>
    )
}

const ContentComponent = ({ time }: { time: number }) => {
    const { pushToUrl } = useNavigate();
    return (
        <button
            type="button"
            onClick={() => {
                pushToUrl("/waiting-room", 500)
            }}
            className="flex justify-center max-w-[calc(var(--tablet)-(2.0rem*2))] w-full"
        >
            <div className="z-[10] flex items-center gap-[0.6rem] container-inner w-full max-w-[var(--tablet)] bg-white border border-[#DEE1EA] rounded-[0.8rem] px-[2.0rem] py-[1.2rem]">
                <h5 className="w-[8.4rem] text-[#0876F6] text-[1.2rem] font-semibold">
                    남은시간 00:{ time }
                </h5>

                <p className="text-[1.2rem]">이전 이용자의 곡 저장을 마무리 중이에요.</p>
            </div>
            <div className="bg-gradient-to-b from-[#f4f5f9] to-[#f4f5f900] absolute top-[-2.4rem] left-0 w-full h-[calc(1.6rem*4)]" />
        </button>
    )
}

export default Notice