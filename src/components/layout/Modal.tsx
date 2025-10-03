"use client"

import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

import { util } from "@/utils/util";
import { useModalStore } from "@/stores/useModalStore";
import { configAnimation } from "@/constants/config/animationSettings";


import ButtonComponent from "@/components/common/ButtonComponent";
import DimmedComponent from "@/components/common/DimmedComponent";
import UI from "../common/UIComponent";

interface ModalBodyProps {
    className?: string;
    children?: ReactNode;
    description?: string;
}

interface ModalFooterProps {
    className?: string;
    currentTime?: number;
    confirm?: {
        title: string;
        onClick: () => void;
        loading: null | boolean;
        className: string;
    }
    cancel: {
        title: string;
        onClick: () => void;
        className: string;
    }
}

interface ModalGuideProps {
    text?: string;
    currentTime?: number;
}

// 모달 글로벌
const Modal = () => {
    const [ initGlow, setInitGlow ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ isDocumentVisible, setIsDocumentVisible ] = useState(false);
    const [ intervalId, setIntervalId ] = useState<NodeJS.Timeout | null>(null);
    
    const { initModal, modal, setModal } = useModalStore();

    const containerRef = useRef<HTMLElement>( null );

    // 함수: 모달 닫음
    const closeModalState = () => {
        setModal({ ...modal, isOpen: false });
        setCurrentTime(modal.delay ? modal.delay / 1000 : 0);
        setInitGlow(false);

        if (intervalId) {
            clearInterval(intervalId);  // 타이머 정리
        }
    };
    
    // 함수: 모달 상태 초기화
    const resetModalState = () => setModal(initModal);

    // 함수: 타이머 시작
    const startTimer = () => {
        // 이미 타이머가 실행 중인 경우, 기존 타이머를 정리
        if (intervalId) {
            clearInterval(intervalId);
        }

        const id = setInterval(() => {
            setCurrentTime((prev) => {
                const newTime = prev - 1;

                // 시간이 0 이하로 가면 타이머 종료 및 모달 닫기
                if (newTime <= 0) {
                    clearInterval(id);  // 타이머 종료
                    closeModalState();
                }

                return newTime; // 새로운 시간값 반환
            });
        }, 1000);

        // intervalId 상태 업데이트
        setIntervalId(id);
    };

    // 함수 : 키 별 세팅
    const preventEnterKey = (event:KeyboardEvent) => {
        switch (event.key) {
        case "Escape":
            return closeModalState();

        case "Enter":
            return event.preventDefault();
            
        default:
            break;
        }
    }

    const detectOutsideClick = (e: MouseEvent) => {
        // if ( containerRef.current && !containerRef.current.contains(e.target as Node) ) {
        //     closeModalState();
        // }
    };
    
    useEffect(() => {
        if ( modal ) {
            util.dom.setScrollDefence(modal.type ? true : false);
            setCurrentTime(modal.delay ? modal.delay / 1000 : 0)
            
            if ( modal.delay && modal.delay > 0) {
                startTimer();
            }
        }
        
    }, [ modal.type ]);
    
    useEffect(() => {
        if ( modal.isOpen ) {
            window.addEventListener("keydown", preventEnterKey);
            document.addEventListener("click", detectOutsideClick);
        }
        
        return () => {
            window.removeEventListener("keydown", preventEnterKey)
            document.removeEventListener("click", detectOutsideClick);
        }
    }, [ modal.isOpen ])

    useEffect(() => {
        setIsDocumentVisible( true );
    }, []);

    if ( !isDocumentVisible ) {
        return null;
    }

    return ReactDOM.createPortal(
        <AnimatePresence
            mode="wait"
            onExitComplete={() => resetModalState()}
        >
            { modal.isOpen &&
                <Fragment>
                    <section
                        ref={ containerRef }
                        className="fixed z-[100000] top-0 left-0 w-full h-full inset-0 flex items-center justify-center"
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.div
                            className={`relative flex flex-col w-full bg-white rounded-[3.2rem] mx-[1.6rem] z-10 max-h-[calc(100dvh-(1.6rem*3))] overflow-y-auto shadow-[var(--shadow-normal)] ${ modal.className?.container !== "" ? modal.className?.container : "max-w-[var(--modal-width)]" }`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                                delay: 0,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 200,
                                damping: 10,
                            }}
                        >
                            <section className="flex flex-col gap-[2.4rem] p-[2.4rem] max-h-[calc(100dvh-(1.6rem*7))]">
                                <Header title={ modal.title } />
                                <Body />
                            </section>
                            
                            <Footer
                                className="flex"
                                confirm={{
                                    title: modal.confirm?.text || "확인",
                                    onClick: modal.confirm?.onClick || (() => {}),
                                    loading: modal.confirm?.loading || null,
                                    className: modal.confirm?.className || "",
                                }}
                                cancel={{
                                    title: modal.cancel?.text || "닫기",
                                    onClick: modal.cancel?.onClick || (() => closeModalState()),
                                    className: modal.cancel?.className || "",
                                }}
                            />
                            
                            { currentTime ? <Guide currentTime={ currentTime }/> : null }
                            
                            { !initGlow ? (
                                <motion.div
                                    key={`glow-${ initGlow }-${ modal.isOpen }`}
                                    className="absolute inset-0 pointer-events-none blur-[10px]"
                                    initial={{ scale: 0, opacity: 0.4 }}
                                    animate={{ scale: 10, opacity: -10 }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeOut",
                                        repeat: 0,       // 무한 반복
                                        // repeatType: "loop",
                                    }}
                                    style={{
                                        background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-brand-500) 20%, rgba(255,255,255,0) 70%)",
                                        borderRadius: "50%",
                                        transformOrigin: "center"
                                    }}
                                    onAnimationComplete={() => setInitGlow( true )}
                                />
                            ) : "" }
                        </motion.div>
                    </section>

                    <DimmedComponent isVisible={ modal.isOpen } />
                </Fragment>
            }
        </AnimatePresence>
        ,document.body
    );
};

// 헤더
const Header = ({ title }: { title: string }) => {
    const { modal } = useModalStore();
    
    return (
        <section className="modal-header">
            {/* { modal.icon && <IconComponent type="lottie" situation="check" />} */}
            <h2 className="text-left font-bold text-[1.8rem] text-[var(--color-gray-800)] select-none pointer-events-none">{ title }</h2>
        </section>
    );
};

// 바디
const Body = ({ children, className }: ModalBodyProps) => {
    const { modal } = useModalStore();

    return (
        <Fragment>
            { modal.description !== "" || modal.content !== null ? (
                <section className={`modal-body flex flex-col gap-[1.2rem] max-h-[calc(100vh-(1.6rem*10))] overflow-y-auto ${ className ? className : "" }`}>
                    { children }
                    { modal.description && <p className="leading-[1.5] text-left text-[1.6rem] text-[#414141] font-normal cursor-default whitespace-pre-line">{ modal.description }</p> }
                    { modal.content }
                    { modal.focusDescription && <p className="px-[1.6rem] py-[0.8rem] cursor-default text-center bg-[var(--color-gray-50)] rounded-[1.2rem] whitespace-pre-line">{ modal.focusDescription }</p> }
                </section>
            ) : "" }
        </Fragment>
    );
};

// 푸터
const Footer = ({ className, confirm, cancel, currentTime }: ModalFooterProps) => {
    // 전역상태 : 모달
    const { modal, setModal } = useModalStore();
    const [ isPrevent, setIsPrevent ] = useState(false);

    const setPreventAfterClick = () => {
        setIsPrevent(true);

        setTimeout(() => {
            setIsPrevent(false);
        }, 2000)
    }
    
    const closeModalState = () => {
        console.log("닫음")
        setModal({ ...modal, isOpen: false })
    }

    return (
        <section className={`modal-footer px-[2.0rem] pb-[2.0rem] flex flex-wrap justify-between gap-[1.0rem] ${ className }`}>
            { cancel && cancel?.title !== " " && (
                // <ButtonComponent
                //     className={`text-[1.3rem] font-medium rounded-[0.6rem] w-[6.5rem]`}
                //     content={ cancel.title }
                //     size="md"
                //     colorBackground='bg-[var(--color-gray-200)]'
                //     colorText='text-[var(--color-gray-700)]'
                //     onClick={ cancel.onClick }
                //     test="cancel"
                // />
                <UI.Button
                    className={`${ cancel?.className ? cancel?.className : "bg-[var(--color-gray-200)]" } flex-1 font-regular text-[1.4rem] whitespace-nowrap rounded-[1.2rem] px-[2.0rem] h-[4.2rem]`}
                    onClick={ cancel.onClick }
                    rippleColor='#65778a'
                >
                    { cancel.title }
                </UI.Button>
            )}

            { confirm && confirm?.title !== " " && (
                <UI.Button
                    className={`${ confirm?.className ? confirm.className : "bg-[var(--color-brand-500)]" } flex-1 font-regular text-[1.4rem] whitespace-nowrap rounded-[1.2rem] px-[2.0rem] h-[4.2rem]`}
                    disabled={isPrevent} // 클릭 방지 시에는 비활성화
                    onClick={async () => {
                        const result = await confirm.onClick();
                        const IS_PASSED = result === undefined || result;

                        setPreventAfterClick();

                        if ( !modal.isNeedNext && IS_PASSED ) {
                            closeModalState();
                        }
                    }}
                >
                    { confirm.title }
                </UI.Button>
            )}
            { currentTime }
        </section>
    );
};

// 가이드
const Guide = ({ text, currentTime }: ModalGuideProps) => {
    return (
        <section className="flex justify-center pb-[1.6rem]">
            <p className=" text-[1.4rem] text-[var(--color-gray-600)]"><i className="bg-[var(--color-gray-100)] px-[0.4rem] py-[0.2rem] rounded-[0.4rem] text-[var(--color-gray-600)] text-[1.2rem]">{currentTime}초</i> 후 자동으로 닫혀요</p>
        </section>
    )
}

export default Modal;
