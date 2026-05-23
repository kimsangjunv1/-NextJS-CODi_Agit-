'use client';

import { createContext, ReactNode, useContext } from 'react';

type PostDetailContextValue = {
    postId: string;
};

const PostDetailContext = createContext<PostDetailContextValue | null>(null);

export function PostDetailPageProvider({ postId, children }: { postId: string; children: ReactNode }) {
    return <PostDetailContext.Provider value={{ postId }}>{children}</PostDetailContext.Provider>;
}

export function usePostDetailProvider() {
    const context = useContext(PostDetailContext);
    if (!context) {
        throw new Error('usePostDetailProvider must be used within PostDetailPageProvider');
    }
    return context;
}
