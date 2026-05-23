import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

interface Position {
    latitude: number;
    longitude: number;
    time: string;
    err: number;
}

interface DistanceStoreType {
    persistAgreeState: number;
    persistCurrentDistance: number;
    persistStartPosition: Position;
    persistLastPosition: Position;

    setPersistAgreeState: ( args: number ) => void;
    setPersistCurrentDistance: ( args: number ) => void;
    setPersistStartPosition: ( props: Partial<Position> ) => void;
    setPersistLastPosition: ( props: Partial<Position> ) => void;
}

export const useDistanceStore = create<DistanceStoreType>()(
    persist(
        ( set ) => ({
            persistAgreeState: 999,
            persistCurrentDistance: 0,
            persistStartPosition: {
                latitude: 0,
                longitude: 0,
                time: "",
                err: 0,
            },
            persistLastPosition: {
                latitude: 0,
                longitude: 0,
                time: "",
                err: 0,
            },

            setPersistAgreeState: ( args: number ) => set(() => ({ persistAgreeState: args })),
            setPersistCurrentDistance: ( args: number ) => set(() => ({ persistCurrentDistance: args })),
            setPersistStartPosition: (args) => set((state) => ({
                persistStartPosition: {
                  ...state.persistStartPosition,
                  ...args,
                },
            })),
            setPersistLastPosition: (args) => set((state) => ({
                persistLastPosition: {
                  ...state.persistLastPosition,
                  ...args,
                },
            })),
            
        }),
        {
            name: "kqr-distance-session",
            storage: createJSONStorage(() => sessionStorage),
            version: 1.0
        }
    )
)