"use client"

import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useModalStore } from "@/stores/useModalStore";
import { useBottomSheetStore } from "@/stores/useBottomSheetStore";

const DimmedComponent = ({ isVisible }: { isVisible: boolean }) => {
    const { modal, setModal } = useModalStore();
    const { bottomSheet, initBottomSheet, setBottomSheet } = useBottomSheetStore();

    const closeBottomSheetState = () => {
        if ( bottomSheet ) {
            setBottomSheet({ ...bottomSheet, isOpen: false });

            // setPersistDetailShutdownState(true);
            // setBottomSheet(initBottomSheet);
        }
    }

    const closeModalState = () => {
        if ( modal ) {
            setModal({ ...modal, isOpen: false });
        }
    }

    return (
        <Fragment>
            <AnimatePresence>
                { modal.isOpen || bottomSheet.isOpen ? (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-[#ededed8b] backdrop-blur-sm z-[999]"
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}

                        onClick={() => {
                            if ( bottomSheet.isOpen ) {
                                closeBottomSheetState();
                            }

                            if ( modal.isOpen ) {
                                closeModalState();
                            }
                        }}
                    />
                ) : ""}
            </AnimatePresence>
        </Fragment>
    );
};

export default DimmedComponent;