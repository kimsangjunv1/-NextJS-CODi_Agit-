"use client";

import { ReactNode } from "react";

import useNavigate from "@/shared/hooks/useNavigate";
import UI from "@/shared/ui/common/UIComponent";

type ManagerPageShellProps = {
    title: string;
    description?: string;
    children: ReactNode;
    action?: ReactNode;
};

const ManagerPageShell = ({ title, description, children, action }: ManagerPageShellProps) => {
    const { replaceToUrl } = useNavigate();

    return (
        <article className="px-[2.0rem] flex-1 flex flex-col gap-[2.0rem] w-full max-w-[var(--size-tablet)] mx-auto pb-[4.0rem]">
            <header className="flex flex-col gap-[1.2rem] w-full">
                <UI.Button
                    className="w-fit text-[1.4rem] text-[var(--color-gray-600)] px-[1.2rem] py-[0.6rem] rounded-[0.8rem] bg-white shadow-[var(--shadow-normal)]"
                    onClick={() => replaceToUrl("/manager")}
                >
                    ← 관리자 홈
                </UI.Button>
                <div className="flex items-start justify-between gap-[1.6rem] w-full">
                    <div className="flex flex-col gap-[0.4rem]">
                        <h2 className="text-[2.0rem] font-bold">{title}</h2>
                        {description ? (
                            <p className="text-[1.4rem] text-[var(--color-gray-600)]">{description}</p>
                        ) : null}
                    </div>
                    {action}
                </div>
            </header>
            {children}
        </article>
    );
};

export default ManagerPageShell;
