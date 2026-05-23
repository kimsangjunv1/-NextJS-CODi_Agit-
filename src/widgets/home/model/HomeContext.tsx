'use client';

import { createContext, ReactNode, useContext } from 'react';

const HomeContext = createContext<null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
    return <HomeContext.Provider value={null}>{children}</HomeContext.Provider>;
}

export function useHomeProvider() {
    return useContext(HomeContext);
}
