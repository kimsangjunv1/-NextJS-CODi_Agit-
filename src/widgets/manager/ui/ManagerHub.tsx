"use client";

import { motion } from "motion/react";

import useNavigate from "@/shared/hooks/useNavigate";

import { MANAGER_MENUS, ManagerMenuItem } from "./managerMenus";

const ManagerHub = () => {
    return (
        <article className="flex-1 flex flex-col gap-[2.4rem] w-full">
            <header className="flex flex-col gap-[0.8rem]">
                <h2 className="text-[2.4rem] font-bold">관리자</h2>
                <p className="text-[1.4rem] text-[var(--color-gray-600)]">
                    운영에 필요한 메뉴를 선택해주세요.
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem] w-full">
                {MANAGER_MENUS.map((menu, index) => (
                    <MenuCard key={menu.url} menu={menu} index={index} />
                ))}
            </section>
        </article>
    );
};

const MenuCard = ({ menu, index }: { menu: ManagerMenuItem; index: number }) => {
    const { replaceToUrl } = useNavigate();

    return (
        <motion.button
            type="button"
            onClick={() => replaceToUrl(menu.url)}
            className="relative text-left bg-white p-[2.0rem] rounded-[1.6rem] flex flex-col gap-[1.2rem] w-full shadow-[var(--shadow-normal)] border border-transparent transition-colors hover:border-[var(--color-brand-200)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 120,
                damping: 18,
            }}
        >
            <div className="flex items-center justify-between gap-[0.8rem]">
                <h3 className="text-[1.8rem] font-bold">{menu.title}</h3>
                <span className="text-[1.2rem] px-[0.8rem] py-[0.2rem] rounded-full font-medium bg-[var(--color-brand-100)] text-[var(--color-brand-600)]">
                    바로가기
                </span>
            </div>
            <p className="text-[1.4rem] text-[var(--color-gray-600)] leading-snug">{menu.description}</p>
        </motion.button>
    );
};

export default ManagerHub;
