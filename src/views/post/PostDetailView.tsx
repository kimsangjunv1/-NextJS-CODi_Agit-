import { ComponentProps } from "react";

import { PostDetailPanel } from "@/widgets/post";
import PageFrame from "@/widgets/layout/PageFrame";

type PostDetailViewProps = {
    id: string;
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function PostDetailView({
    id,
    frame = { id: "post-detail", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: PostDetailViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <PostDetailPanel id={id} />
        </PageFrame>
    );
}
