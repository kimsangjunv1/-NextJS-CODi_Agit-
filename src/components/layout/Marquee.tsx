"use client";

import useNavigate from "@/hooks/common/useNavigate";
import { AnimatePresence, motion } from "framer-motion";

const Marquee = ({ title }: { title: string }) => {
    const { currentPathName } = useNavigate();
    
    const items = Array(10).fill(0).map((_, i) => (
        <div key={i} className="flex gap-[0.8rem] px-4">
        <p className="whitespace-nowrap text-[#FFFFFF50]">2025.10.10</p>
        <p className="font-bold text-white whitespace-nowrap">나나_29</p>
        <p className="whitespace-nowrap text-[#DD4F1B]">너무 재밌어요!</p>
        </div>
    ));
    const IS_ROUTE_POST = currentPathName.includes("post");

    return (
        // <AnimatePresence
        //     mode="wait"
        // >
            <div
                className="fixed bottom-0 left-0 w-full overflow-hidden bg-[#000000ed] py-[1.2rem]"
                // initial={{ opacity: 0, scale: 0.9 }}
                // exit={{ opacity: 0, scale: 0.9 }}
                // animate={{ opacity: 0, scale: 0.9 }}
            >
                <motion.div
                    className="flex gap-[3.2rem] flex-nowrap"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20, // 속도 조절
                    }}
                >
                {/* 같은 내용 두 번 렌더링 (loop 효과) */}
                {items}
                {items}
                </motion.div>
            </div>
        // </AnimatePresence>
    );
};

export default Marquee;