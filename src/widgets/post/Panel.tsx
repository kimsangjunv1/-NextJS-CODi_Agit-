"use client";

import { PostDetailPageProvider } from "@/widgets/post/model/PostDetailContext";

import * as PostLayer from "@/widgets/post/ui";

type PostDetailPanelProps = {
    id: string;
};

export default function Panel({ id }: PostDetailPanelProps) {
    return (
        <PostDetailPageProvider postId={id}>
            <PostLayer.PostDetail id={id} />
        </PostDetailPageProvider>
    );
}
