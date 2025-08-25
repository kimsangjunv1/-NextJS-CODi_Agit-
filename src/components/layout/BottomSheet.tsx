"use client"

import ReactDOM from "react-dom";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

import IconComponent from "@/components/common/IconComponent";
import ButtonComponent from "@/components/common/ButtonComponent";
import DimmedComponent from "@/components/common/DimmedComponent";
import Skeleton from "@/components/layout/Skeleton";

import useNavigate from "@/hooks/common/useNavigate";

// import { useSnackBarStore } from "@/stores/useSnackBarStore";
import { useBottomSheetStore } from "@/stores/useBottomSheetStore";

import { util } from "@/utils/util";

import styles from "@/scss/components/_common.module.scss";

interface BottomSheetBodyProps {
    className?: string;
    children?: ReactNode;
    description?: string;
}

interface BottomSheetFooterProps {
    className: string;
    confirm?: {
        title: string;
        onClick: () => void;
        loading: null | boolean;
    }
    cancel: {
        title: string;
        onClick: (e: MouseEvent) => void;
    }
}

interface BottomSheetGuideProps {
    className: string;
    guide?: {
        title: string;
        onClick: () => void;
    }
}

interface HeaderPropsType {
    title: string;
    subTitle: string;
    drag: {
        isDrag: boolean;
        setIsDrag: (props: boolean) => void;
    };
    refresh: {
        title: string;
        onClick: () => void;
    };
    className?: string;
}

// 모달 글로벌
const BottomSheet = () => {
    const { currentPathName } = useNavigate();

    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ isDrag, setIsDrag ] = useState<boolean>( true );
    const [ isExpand, setIsExpand ] = useState<boolean>( false );
    const [ containerHeight, setContainerHeight ] = useState<number>( 0 );
    const [ isDocumentVisible, setIsDocumentVisible ] = useState<boolean>( false );
    
    const { initBottomSheet, bottomSheet, setBottomSheet } = useBottomSheetStore();

    const containerRef = useRef<HTMLDivElement>(null);
    
    const resetBottomSheetState = () => setBottomSheet(initBottomSheet);

    // 바텀시트의 헤더부분에서 드래그 이벤트가 발생하였을 경우, 이벤트 속도를 감지해서 닫힐지 여부를 판단하는 로직
    // 현재 가중치가 100보다 높아질경우 닫음 처리, 100이하가 될 경우 열림 처리
    // 포인터를 놨을때 강도가 -20 보다 클때 || 강도가 20보다 클때 || 강도가 0이상이고 위치가 45보다 클때

    // point  현재 터치/마우스 위치
    // delta  이전 이벤트와의 거리 차이
    // offset 팬이 시작된 위치에서의 총 이동 거리
    // velocity 현재 이동 속도

    const closeBottomSheetState = () => {
        if ( bottomSheet ) {
            setBottomSheet({ ...bottomSheet, isOpen: false });
            setIsLoaded( false );
        }
    }

    const onDragEnd = ( event: PointerEvent | TouchEvent, { point, delta, offset, velocity }: PanInfo ): void => {
        const IS_DRAG_STATUS_TO_UP = offset.y < 0;

        if ( IS_DRAG_STATUS_TO_UP ) {
            setIsExpand( true );
        } else {
            if ( isExpand ) {
                setIsExpand( false );
            } else {
                closeBottomSheetState();
            }
        }
    };

    useEffect(() => {
        setBottomSheet(initBottomSheet);
    }, [ currentPathName ]);

    useEffect(() => {
        if ( bottomSheet.isOpen && containerRef.current && isLoaded ) {
            const height = containerRef.current.offsetHeight;
            
            setContainerHeight( height/10 )
        }
    }, [ bottomSheet.isOpen, isLoaded ]);
    
    useEffect(() => {
        setIsDocumentVisible( true );
    }, []);

    if ( !isDocumentVisible ) {
        return null;
    }

    return ReactDOM.createPortal(
        <AnimatePresence
            mode="wait"
            onExitComplete={() => {
                resetBottomSheetState();
            }}
        >
            { bottomSheet.isOpen &&
                <Fragment>
                    <motion.section
                        // layout // 자동 크기 변경 애니메이션
                        ref={containerRef}
                        key="floating-menu"
                        role="dialog"
                        className={`bottom-sheet ${ styles.bottomSheetInner }`}
                        drag={ isDrag ? "y" : false }
                        dragElastic={ 0.3 }
                        // dragElastic={ 0.03 }
                        dragMomentum={ false }
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                        }}
                        onDragEnd={ onDragEnd }
                        transition={{
                            damping: 40,
                            stiffness: 400,
                            type: 'spring',
                            duration: 0.1,
                            ease: [0, 0.9, 0.95, 1],
                        }}
                        exit={{ bottom: `-${ containerHeight }rem` }}
                        animate={{ bottom: "0rem", scale: 1 }}
                        initial={{ bottom: "-30.0rem", scale: 0.95 }}
                        onUpdate={ latest => {
                            const TARGET: any = latest;

                            setIsLoaded( TARGET?.bottom === "0rem" );
                        }}
                    >
                        <Header
                            title={ bottomSheet.title }
                            subTitle={ bottomSheet.subTitle ?? "" }
                            refresh={{
                                title: bottomSheet.refresh?.text || "닫기",
                                onClick: bottomSheet.refresh?.onClick || (() => resetBottomSheetState())
                            }}
                            drag = {{
                                isDrag: isDrag,
                                setIsDrag: (e) => setIsDrag(e),
                            }}
                            className="w-full"
                        />
                        <Body className="w-full"/>
                        <Footer
                            className="flex w-full"
                            confirm={{
                                title: bottomSheet.confirm?.text || "확인",
                                onClick: bottomSheet.confirm?.onClick || (() => {}),
                                loading: bottomSheet.confirm?.loading || null
                            }}
                            cancel={{
                                title: bottomSheet.cancel?.text || "닫기",
                                onClick: bottomSheet.cancel?.onClick || (() => resetBottomSheetState())
                            }}
                        />
                        { bottomSheet.guide?.text ?
                            <Guide
                                className=""
                                guide={{
                                    title: bottomSheet.guide?.text,
                                    onClick: bottomSheet.guide?.onClick || (() => resetBottomSheetState())
                                }}
                            /> : null
                        }
                    </motion.section>
                    
                    <DimmedComponent isVisible={ bottomSheet.isOpen } />
                </Fragment>
            }
        </AnimatePresence>
        ,document.body
    )
};

// 모달 헤더
const Header = ({ title, subTitle, refresh, drag, className }: HeaderPropsType) => {
    const headerRef = useRef(null);

    const [ currentTime, setCurrentTime ] = useState( util.string.getCurrentTime() );
    
    // const { setPersistDetailShutdownState } = useSnackBarStore();
    const { bottomSheet, initBottomSheet, setBottomSheet } = useBottomSheetStore();

    const resetBottomSheetState = () => setBottomSheet(initBottomSheet);

    const closeBottomSheetState = () => {
        if ( bottomSheet ) {
            setBottomSheet({ ...bottomSheet, isOpen: false });

            // setPersistDetailShutdownState(true);
            // resetBottomSheetState();
        }
    }

    const refreshContent = () => {
        const NOW = util.string.getCurrentTime();

        setCurrentTime( NOW )
        refresh.onClick()
    }

    useEffect(() => {
        const IS_OPEN = bottomSheet.isOpen;
        const IS_SET_ONCLICK = refresh.title !== " ";
        
        if ( IS_OPEN && IS_SET_ONCLICK ) {
            refreshContent()
        }
    }, [])

    return (
        <motion.header
            ref={ headerRef }
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
                duration: 0.5,
                ease: [0, 0.9, 0.95, 1],
                delay: 0.4
            }}
            className={`${ className } py-[1.6rem]`}
        >
            <motion.section
                className={`${ styles.modalheader }`}
                onMouseEnter={() => drag.setIsDrag( true )}
            >
                <h2>{ title }</h2>
                
                <button
                    type="button"
                    className={ styles.handleCloseBar }
                    onClick={() => closeBottomSheetState()}
                >
                    <IconComponent type="cross" className="w-[2.4rem]" alt="닫기" />
                </button>
            </motion.section>

            { subTitle &&
                <section className="mt-[0.8rem]">
                    <p className="text-[1.8rem]">{ subTitle }</p>
                </section>
            }
            
            { refresh.title !== " " && 
                <section className="flex justify-start items-center gap-[0.4rem]">
                    <p className="text-[1.2rem] text-[#8A8B99]">마지막 업데이트: </p>

                    <Skeleton
                        type="text"
                        target={ false }
                        minHeight="min-h-[1.2rem]"
                        minWidth="min-w-[7.8rem]"
                        className="w-[auto!important] h-[1.2rem]"
                    >
                        <p className="text-[1.2rem] text-[#8A8B99]">{ currentTime }</p>
                    </Skeleton>

                    <button
                        type="button"
                        className={ styles.handleCloseBar }
                        onClick={() => refreshContent()}
                        data-testid="current-remaining-refresh"
                    >
                        <IconComponent type="refresh" className="w-[1.4rem] opacity-75" alt="새로고침" />
                    </button>
                </section>
            }
        </motion.header>
    );
};

// 모달 바디
const Body = ({ children, description, className }: BottomSheetBodyProps) => {
    const { bottomSheet } = useBottomSheetStore();

    return (
        <motion.section
            className={`${ styles.modalBody } ${ className ? className : "" }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
                duration: 0.5,
                ease: [0, 0.9, 0.95, 1],
                delay: 0.45
            }}
        >
            { children }
            { description && <p>{ description }</p> }
            { bottomSheet.content }
        </motion.section>
    );
};

// 모달 푸터
const Footer = ({ className, confirm, cancel }: BottomSheetFooterProps) => {
    // 전역상태 : 모달
    const { bottomSheet, setBottomSheet } = useBottomSheetStore();

    // 함수 : 모달 세팅 해제
    // const resetBottomSheetState = () => {
    //     setBottomSheet(initBottomSheet);
    // }

    const closeBottomSheetState = () => {
        setBottomSheet({ ...bottomSheet, isOpen: false })
    }

    return (
        <Fragment>
            { cancel?.title !== " " || confirm?.title !== " " ? (
                <motion.section
                    className={`${ styles.modalFooter } ${ className }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 0.9, 0.95, 1],
                        delay: 0.5
                    }}
                >
                    { cancel?.title !== " " && (
                        <ButtonComponent
                            content={ cancel.title }
                            className={`text-[1.7rem] flex-1 text-[var(--color-gray-700)] ${ confirm?.title !== " " ? "bg-[var(--color-gray-100)]" : "bg-[var(--color-brand-500)] text-white" }`}
                            colorBackground='bg-[var(--color-brand-500)]'
                            colorText={ confirm?.title === " " ? "text-white" : "" }
                            size="lg"
                            onClick={ (e: any) => cancel.onClick(e) }
                        />
                    )}

                    { confirm?.title !== " " && (
                        <ButtonComponent
                            content={ confirm?.title ? confirm?.title : "" }
                            className="text-[1.7rem] flex-1"
                            colorBackground='bg-[#F50F5A]'
                            colorText='text-white'
                            size="lg"
                            onClick={() => {
                                confirm?.onClick();
                                
                                if ( !bottomSheet.isNeedNext ) {
                                    closeBottomSheetState();
                                }
                            }}
                            loading={ confirm?.loading ?? false }
                        />  
                    )}
                </motion.section>
            ) : ""}
        </Fragment>
    );
};

// 모달 가이드
const Guide = ({ className, guide }: BottomSheetGuideProps) => {
    return (
        <motion.section
            className={`${ styles.modalGuide } ${ className }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
                duration: 0.5,
                ease: [0, 0.9, 0.95, 1],
                delay: 0.6
            }}
        >
            <p className="text-center text-[1.4rem] text-[var(--color-gray-600)] mt-[1.2rem]">
                <i className="text-[var(--color-gray-600)] text-[1.2rem]">
                    { guide?.title }
                </i>
            </p>
        </motion.section>
    )
}

export default BottomSheet;
