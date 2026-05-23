'use client';

import { createContext, ReactNode, useContext } from 'react';

const SignupContext = createContext<null>(null);

export function SignupPageProvider({ children }: { children: ReactNode }) {
    return <SignupContext.Provider value={null}>{children}</SignupContext.Provider>;
}

export function useSignupProvider() {
    return useContext(SignupContext);
}
