"use client";

import ReactDOM from "react-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

interface BottomSheetProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    function?: {
        title: string;
        onClick: () => void;
        loading?: boolean;
    }[];
}

const BottomSheet = ({ title, isOpen, onClose, children, function: actions = [] }: BottomSheetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [ containerHeight, setContainerHeight ] = useState<number>(0);

    const onDragEnd = (_: PointerEvent | TouchEvent, { offset }: PanInfo): void => {
        if (offset.y > 50) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const height = containerRef.current.offsetHeight;
            setContainerHeight(height / 10);
        }
    }, [ isOpen ]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            { isOpen && (
                <Fragment>
                    {/* Dimmed */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={ onClose }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* BottomSheet */}
                    <motion.section
                        ref={ containerRef }
                        role="dialog"
                        className="fixed bottom-0 left-0 right-0 z-50 px-[1.6rem] pt-[3.2rem] pb-[calc(1.6rem*2)] bg-white shadow-lg rounded-t-2xl flex flex-col gap-[2.0rem]"
                        drag="y"
                        dragElastic={ 0.3 }
                        dragMomentum={ false }
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={ onDragEnd }
                        initial={{ bottom: `-${ containerHeight }rem`, opacity: 0 }}
                        animate={{ bottom: "0rem", opacity: 1 }}
                        exit={{ bottom: `-${ containerHeight }rem`, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between">
                            <h2 className="text-[2.2rem] font-bold">{ title }</h2>
                            <button onClick={ onClose } className="text-gray-500 hover:text-gray-800">
                                ✕
                            </button>
                        </header>

                        {/* Body */}
                        <section>{ children }</section>

                        {/* Footer */}
                        { actions.length > 0 && (
                            <footer className="flex gap-2">
                                { actions.map(( action, i ) => (
                                    <button
                                        key={ i }
                                        onClick={ action.onClick }
                                        disabled={ action.loading }
                                        className={`h-[var(--input-height)] w-full bg-[var(--color-blue-1000)] text-white px-[2.0rem] py-[0.8rem] rounded-[0.8rem]`}
                                    >
                                        { action.loading ? "처리중..." : action.title }
                                    </button>
                                )) }
                            </footer>
                        ) }
                    </motion.section>
                </Fragment>
            ) }
        </AnimatePresence>,
        document.body
    );
};

export function BottomSheetContainer({ children }: { children: ReactNode }) {
    return <div className="flex flex-col gap-6">{ children }</div>;
}

export function BottomSheetItem({ label, children }: { label: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">{ label }</p>
            <div className="flex items-center gap-2">{ children }</div>
        </section>
    );
}

BottomSheet.Container = BottomSheetContainer;
BottomSheet.Item = BottomSheetItem;

export default BottomSheet;