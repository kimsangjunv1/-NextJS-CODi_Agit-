'use client';

import { createContext, ReactNode, useContext } from 'react';

const InvitationManagerContext = createContext<null>(null);

export function InvitationManagerPageProvider({ children }: { children: ReactNode }) {
    return <InvitationManagerContext.Provider value={null}>{children}</InvitationManagerContext.Provider>;
}

export function useInvitationManagerProvider() {
    return useContext(InvitationManagerContext);
}
