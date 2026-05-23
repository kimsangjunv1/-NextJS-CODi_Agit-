import { ComponentProps } from "react";

import { ManagerPanel } from "@/widgets/manager";
import PageFrame from "@/widgets/layout/PageFrame";

type ManagerViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function ManagerView({
    frame = { id: "manager", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: ManagerViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <ManagerPanel />
        </PageFrame>
    );
}
