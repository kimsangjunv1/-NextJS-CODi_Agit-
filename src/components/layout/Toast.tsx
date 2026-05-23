"use client"

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useToastStore } from "@/stores/useToastStore";
import IconComponent from "@/components/common/IconComponent";

// 클릭 기능, 시간 세팅, 아이콘 사용 여부
const Toast = () => {
    const { toastList, resetToastList } = useToastStore();
    
    const getIconOptionName = ( value: string ) => {
        switch (value) {
            case "warning":
                return "colored-warning";

            case "info":
                return "colored-information";

            case "success":
                return "colored-success";

            case "error":
                return "colored-error";
        
            default:
                return "";
        }
    }

    useEffect(() => resetToastList(), [])
    
    return (
        <section className="toast">
            <AnimatePresence>
                {toastList.map((e, i) =>
                    <motion.section
                        key={e.id + i}
                        className="toast-item"
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: "-5.2rem", scale: 0.9, filter: "blur(10px)" }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                staggerChildren: 0.15,
                            }
                        }}
                        exit={{ opacity: 0, y: "-5.2rem", scale: 0.9, filter: "blur(10px)" }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 500,
                            damping: 10,
                        }}
                    >
                        {e.icon ? (
                            <IconComponent
                                type={getIconOptionName(e.icon)}
                                alt={e.icon}
                                className={e.iconClassName}
                            />
                        ) : null}
                        <p>{e.msg}</p>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Toast