'use client';

import { createContext, ReactNode, useContext } from 'react';

const LabContext = createContext<null>(null);

export function LabPageProvider({ children }: { children: ReactNode }) {
    return <LabContext.Provider value={null}>{children}</LabContext.Provider>;
}

export function useLabProvider() {
    return useContext(LabContext);
}
