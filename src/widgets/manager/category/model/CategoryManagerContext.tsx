'use client';

import { createContext, ReactNode, useContext } from 'react';

const CategoryManagerContext = createContext<null>(null);

export function CategoryManagerPageProvider({ children }: { children: ReactNode }) {
    return <CategoryManagerContext.Provider value={null}>{children}</CategoryManagerContext.Provider>;
}

export function useCategoryManagerProvider() {
    return useContext(CategoryManagerContext);
}
