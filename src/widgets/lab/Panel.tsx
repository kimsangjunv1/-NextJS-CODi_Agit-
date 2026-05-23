"use client";

import { LabPageProvider } from "@/widgets/lab/model/LabContext";

import * as LabLayer from "@/widgets/lab/ui";

export default function Panel() {
    return (
        <LabPageProvider>
            <LabLayer.LabGuide />
        </LabPageProvider>
    );
}
