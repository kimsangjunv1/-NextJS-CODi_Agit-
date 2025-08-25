"use client"

import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, ReactNode, useEffect, useState } from 'react';

import { util } from "@/utils/util";
import { useModalStore } from "@/stores/useModalStore";
import { configAnimation } from "@/constants/config/animationSettings";


import ButtonComponent from "@/components/common/ButtonComponent";
import DimmedComponent from "@/components/common/DimmedComponent";

interface ModalBodyProps {
    className?: string;
    children?: ReactNode;
    description?: string;
}

interface ModalFooterProps {
    className: string;
    currentTime?: number;
    confirm?: {
        title: string;
        onClick: () => void;
        loading: null | boolean;
    }
    cancel: {
        title: string;
        onClick: () => void;
    }
}

interface ModalGuideProps {
    text?: string;
    currentTime?: number;
}

// 모달 글로벌
const Modal = () => {
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ isDocumentVisible, setIsDocumentVisible ] = useState(false);
    const [ intervalId, setIntervalId ] = useState<NodeJS.Timeout | null>(null);
    
    const { initModal, modal, setModal } = useModalStore();

    // 함수: 모달 닫음
    const closeModalState = () => {
        setModal({ ...modal, isOpen: false });
        setCurrentTime(modal.delay ? modal.delay / 1000 : 0);

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
        }
        
        return () => {
            window.removeEventListener("keydown", preventEnterKey)
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
                        className="fixed z-[100000] top-2 left-2 w-full h-full inset-0 flex items-center justify-center"
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.div
                            className="flex flex-col max-w-[var(--modal-width)] w-full bg-white rounded-[1.2rem] mx-[1.6rem] relative z-10 max-h-[calc(100dvh-(1.6rem*2))] overflow-y-auto shadow-custom"
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
                            <section className="flex flex-col gap-[0.4rem] p-[2.4rem]">
                                <Header title={ modal.title } />
                                <Body />
                            </section>
                            
                            <Footer
                                className="flex"
                                confirm={{
                                    title: modal.confirm?.text || "확인",
                                    onClick: modal.confirm?.onClick || (() => {}),
                                    loading: modal.confirm?.loading || null
                                }}
                                cancel={{
                                    title: modal.cancel?.text || "닫기",
                                    onClick: modal.cancel?.onClick || (() => closeModalState())
                                }}
                            />
                            { currentTime ? <Guide currentTime={ currentTime }/> : null }
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
        <section className={`modal-body flex flex-col gap-[1.2rem] max-h-[calc(100vh-(1.6rem*10))] overflow-y-auto ${ className ? className : "" }`}>
            { children }
            { modal.description && <p className="leading-[1.5] text-left text-[1.6rem] text-[#414141] font-normal cursor-default whitespace-pre-line">{ modal.description }</p> }
            { modal.content }
            { modal.focusDescription && <p className="px-[1.6rem] py-[0.8rem] cursor-default text-center bg-[var(--color-gray-50)] rounded-[1.2rem] whitespace-pre-line">{ modal.focusDescription }</p> }
        </section>
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
        setModal({ ...modal, isOpen: false })
    }

    return (
        <section className={`modal-footer px-[2.0rem] pb-[2.0rem] flex flex-wrap justify-end gap-[1.0rem] ${ className }`}>
            { cancel && cancel?.title !== " " && (
                <ButtonComponent
                    className={`text-[1.3rem] font-medium rounded-[0.6rem] w-[6.5rem]`}
                    content={ cancel.title }
                    size="md"
                    colorBackground='bg-[var(--color-gray-200)]'
                    colorText='text-[var(--color-gray-700)]'
                    onClick={ cancel.onClick }
                    test="cancel"
                />  
            )}

            { !isPrevent ? (
                <Fragment>
                    { confirm && confirm?.title !== " " && (
                        <ButtonComponent
                            content={ confirm.title }
                            className={`text-[1.3rem] font-medium whitespace-nowrap rounded-[0.6rem] w-[12.8rem]`}
                            colorBackground='bg-[var(--color-blue-500)]'
                            colorText='text-white'
                            size="md"
                            test="confirm"
                            loading={ confirm?.loading ?? true }
                            onClick={() => {
                                confirm.onClick();
                                setPreventAfterClick();
                                
                                if ( !modal.isNeedNext ) {
                                    closeModalState();
                                }
                            }}
                        />
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    { confirm && confirm?.title !== " " && (
                        <ButtonComponent
                            content={ confirm.title }
                            className={`text-[1.3rem] font-medium flex-1 whitespace-nowrap rounded-[0.6rem] pointer-events-none`}
                            colorBackground='bg-[var(--color-blue-500)]'
                            colorText='text-white'
                            size="md"
                            test="confirm"
                            onClick={() => {}}
                            loading={ false }
                        />
                    )}
                </Fragment>
            ) }
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
