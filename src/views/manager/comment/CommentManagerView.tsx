import { ComponentProps } from "react";

import { CommentManagerPanel } from "@/widgets/manager/comment";
import PageFrame from "@/widgets/layout/PageFrame";

type CommentManagerViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function CommentManagerView({
    frame = { id: "manager-comment", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: CommentManagerViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <CommentManagerPanel />
        </PageFrame>
    );
}
