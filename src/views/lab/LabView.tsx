import { ComponentProps } from "react";

import { LabPanel } from "@/widgets/lab";
import PageFrame from "@/widgets/layout/PageFrame";

type LabViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function LabView({
    frame = { id: "lab", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: LabViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <LabPanel />
        </PageFrame>
    );
}
