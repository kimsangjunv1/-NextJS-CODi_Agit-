import { ComponentProps } from "react";

import { InvitationManagerPanel } from "@/widgets/manager/invitation";
import PageFrame from "@/widgets/layout/PageFrame";

type InvitationManagerViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function InvitationManagerView({
    frame = { id: "manager-invitation", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: InvitationManagerViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <InvitationManagerPanel />
        </PageFrame>
    );
}
