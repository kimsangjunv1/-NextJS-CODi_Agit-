"use client";

import { PostCreatePageProvider } from "@/widgets/post/create/model/PostCreateContext";

import * as PostCreateLayer from "@/widgets/post/create/ui";

export default function Panel() {
    return (
        <PostCreatePageProvider>
            <PostCreateLayer.PostEditor />
        </PostCreatePageProvider>
    );
}
