"use client";

import { ComponentProps, ReactNode } from "react";

import Main from "@/widgets/layout/Main";

type PageFrameProps = {
    children: ReactNode;
    id?: string;
    className?: ComponentProps<typeof Main>["className"];
};

export default function PageFrame({ children, id, className }: PageFrameProps) {
    return (
        <Main id={id} className={className}>
            {children}
        </Main>
    );
}
