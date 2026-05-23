"use client";

import { ManagerPageProvider } from "@/widgets/manager/model/ManagerContext";

import * as ManagerLayer from "@/widgets/manager/ui";

export default function Panel() {
    return (
        <ManagerPageProvider>
            <ManagerLayer.ManagerHub />
        </ManagerPageProvider>
    );
}
