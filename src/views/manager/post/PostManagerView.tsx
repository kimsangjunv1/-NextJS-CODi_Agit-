import { ComponentProps } from "react";

import { PostManagerPanel } from "@/widgets/manager/post";
import PageFrame from "@/widgets/layout/PageFrame";

type PostManagerViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function PostManagerView({
    frame = { id: "manager-post", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: PostManagerViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <PostManagerPanel />
        </PageFrame>
    );
}
