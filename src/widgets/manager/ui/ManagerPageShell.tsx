"use client";

import { ReactNode } from "react";

type ManagerPageShellProps = {
    title: string;
    description?: string;
    children: ReactNode;
    action?: ReactNode;
};

const ManagerPageShell = ({ title, description, children, action }: ManagerPageShellProps) => {
    return (
        <article className="flex-1 flex flex-col gap-[2.0rem] w-full">
            <header className="flex flex-col gap-[1.2rem] w-full">
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
