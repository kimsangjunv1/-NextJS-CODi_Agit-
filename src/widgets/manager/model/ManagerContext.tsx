'use client';

import { createContext, ReactNode, useContext } from 'react';

const ManagerContext = createContext<null>(null);

export function ManagerPageProvider({ children }: { children: ReactNode }) {
    return <ManagerContext.Provider value={null}>{children}</ManagerContext.Provider>;
}

export function useManagerProvider() {
    return useContext(ManagerContext);
}
