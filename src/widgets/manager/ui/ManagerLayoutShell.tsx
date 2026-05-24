"use client";

import { ReactNode } from "react";

import ManagerSubNav from "./ManagerSubNav";

type ManagerLayoutShellProps = {
    children: ReactNode;
};

const ManagerLayoutShell = ({ children }: ManagerLayoutShellProps) => {
    return (
        <div className="px-[2.0rem] flex-1 flex flex-col gap-[2.0rem] w-full max-w-[var(--size-tablet)] mx-auto pb-[4.0rem]">
            <ManagerSubNav />
            {children}
        </div>
    );
};

export default ManagerLayoutShell;
