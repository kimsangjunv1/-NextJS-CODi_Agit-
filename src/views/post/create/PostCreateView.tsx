import { ComponentProps } from "react";

import { PostCreatePanel } from "@/widgets/post/create";
import PageFrame from "@/widgets/layout/PageFrame";

type PostCreateViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function PostCreateView({
    frame = {
        id: "post-create",
        className: { inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)]", container: "" },
    },
}: PostCreateViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <PostCreatePanel />
        </PageFrame>
    );
}
