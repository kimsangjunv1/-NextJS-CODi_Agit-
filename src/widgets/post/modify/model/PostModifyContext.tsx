'use client';

import { createContext, ReactNode, useContext } from 'react';

type PostModifyContextValue = {
    postId: string;
};

const PostModifyContext = createContext<PostModifyContextValue | null>(null);

export function PostModifyPageProvider({ postId, children }: { postId: string; children: ReactNode }) {
    return <PostModifyContext.Provider value={{ postId }}>{children}</PostModifyContext.Provider>;
}

export function usePostModifyProvider() {
    const context = useContext(PostModifyContext);
    if (!context) {
        throw new Error('usePostModifyProvider must be used within PostModifyPageProvider');
    }
    return context;
}
