import { ComponentProps } from "react";

import { PostModifyPanel } from "@/widgets/post/modify";
import PageFrame from "@/widgets/layout/PageFrame";

type PostModifyViewProps = {
    id: string;
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function PostModifyView({
    id,
    frame = {
        id: "post-modify",
        className: { inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)]", container: "" },
    },
}: PostModifyViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <PostModifyPanel id={id} />
        </PageFrame>
    );
}
