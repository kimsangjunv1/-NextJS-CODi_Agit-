"use client";

import useNavigate from "@/shared/hooks/useNavigate";

import { MANAGER_MENUS } from "./managerMenus";

const ManagerSubNav = () => {
    const { currentPathName, replaceToUrl } = useNavigate();

    const isHub = currentPathName === "/manager";

    return (
        <nav
            className="flex gap-[0.8rem] overflow-x-auto pb-[0.4rem] -mx-[0.4rem] px-[0.4rem] scrollbar-none"
            aria-label="관리자 메뉴"
        >
            <button
                type="button"
                onClick={() => replaceToUrl("/manager")}
                className={`shrink-0 text-[1.3rem] px-[1.2rem] py-[0.6rem] rounded-full font-medium transition-colors ${
                    isHub
                        ? "bg-[var(--color-brand-500)] text-white"
                        : "bg-white text-[var(--color-gray-700)] shadow-[var(--shadow-normal)]"
                }`}
            >
                홈
            </button>
            {MANAGER_MENUS.map((menu) => {
                const isActive = currentPathName === menu.url || currentPathName.startsWith(`${menu.url}/`);

                return (
                    <button
                        key={menu.url}
                        type="button"
                        onClick={() => replaceToUrl(menu.url)}
                        className={`shrink-0 text-[1.3rem] px-[1.2rem] py-[0.6rem] rounded-full font-medium transition-colors ${
                            isActive
                                ? "bg-[var(--color-brand-500)] text-white"
                                : "bg-white text-[var(--color-gray-700)] shadow-[var(--shadow-normal)]"
                        }`}
                    >
                        {menu.title}
                    </button>
                );
            })}
        </nav>
    );
};

export default ManagerSubNav;
