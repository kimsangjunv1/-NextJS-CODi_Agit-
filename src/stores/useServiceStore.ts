import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

interface ServiceStoreType {
    persistSelectedEditorMenu: number;

    setPersistSelectedEditorMenu: ( args: number ) => void;
}

export const useServiceStore = create<ServiceStoreType>()(
    persist(
        ( set ) => ({
            persistSelectedEditorMenu: 999,

            setPersistSelectedEditorMenu: ( args: number ) => set(() => ({ persistSelectedEditorMenu: args })), 
        }),
        {
            name: "kqr-service-session",
            storage: createJSONStorage(() => sessionStorage),
            version: 1.0
        }
    )
)