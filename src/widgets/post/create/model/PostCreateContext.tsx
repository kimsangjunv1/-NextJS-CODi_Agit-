'use client';

import { createContext, ReactNode, useContext } from 'react';

const PostCreateContext = createContext<null>(null);

export function PostCreatePageProvider({ children }: { children: ReactNode }) {
    return <PostCreateContext.Provider value={null}>{children}</PostCreateContext.Provider>;
}

export function usePostCreateProvider() {
    return useContext(PostCreateContext);
}
