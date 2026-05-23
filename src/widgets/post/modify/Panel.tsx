"use client";

import { PostModifyPageProvider } from "@/widgets/post/modify/model/PostModifyContext";

import * as PostModifyLayer from "@/widgets/post/modify/ui";

type PostModifyPanelProps = {
    id: string;
};

export default function Panel({ id }: PostModifyPanelProps) {
    return (
        <PostModifyPageProvider postId={id}>
            <PostModifyLayer.PostEditor id={id} />
        </PostModifyPageProvider>
    );
}
