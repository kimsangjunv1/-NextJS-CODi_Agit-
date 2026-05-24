import { ComponentProps } from "react";

import { UserManagerPanel } from "@/widgets/manager/user";
import PageFrame from "@/widgets/layout/PageFrame";

type UserManagerViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function UserManagerView({
    frame = { id: "manager-user", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: UserManagerViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <UserManagerPanel />
        </PageFrame>
    );
}
