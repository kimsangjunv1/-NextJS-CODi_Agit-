'use client';

import { createContext, ReactNode, useContext } from 'react';

const LoginContext = createContext<null>(null);

export function LoginPageProvider({ children }: { children: ReactNode }) {
    return <LoginContext.Provider value={null}>{children}</LoginContext.Provider>;
}

export function useLoginProvider() {
    return useContext(LoginContext);
}
