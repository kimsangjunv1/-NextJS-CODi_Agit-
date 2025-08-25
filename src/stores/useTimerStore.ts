import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TimerStore {
    time: number;
    isRunning: boolean;
    startTime: number | null; // 시작 시점 (timestamp)
    duration: number;         // 시작 시 설정한 총 시간 (초)

    startTimer: (seconds: number, callback?: () => void) => void;
    stopTimer: () => void;
    resetTimer: () => void;
    setCallback: (cb: () => void) => void;
    setStartTime: ( e: number | null ) => void;
}

let intervalRef: NodeJS.Timeout | null = null;
let savedCallback: (() => void) | null = null;

export const useTimerStore = create<TimerStore>()(
    persist(
        (set, get) => ({
            time: 0,
            isRunning: false,
            startTime: null,
            duration: 0,

            startTimer: (seconds, callback) => {
                if (intervalRef) return;

                const startTimestamp = Date.now();
                savedCallback = callback || null;

                set({
                    time: seconds,
                    isRunning: true,
                    duration: seconds,
                    // startTime: startTimestamp
                });

                intervalRef = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                    const remaining = seconds - elapsed;

                    if (remaining <= 0) {
                        get().stopTimer();
                        set({ time: 0 });
                        savedCallback?.();
                    } else {
                        set({ time: remaining });
                    }
                }, 1000);
            },

            stopTimer: () => {
                if (intervalRef) {
                    clearInterval(intervalRef);
                    intervalRef = null;
                }
                set({ isRunning: false });
            },

            resetTimer: () => {
                get().stopTimer();
                set({ time: 0, startTime: null, duration: 0 });
            },

            setCallback: (cb) => {
                savedCallback = cb;
            },

            setStartTime: ( args: number | null ) => set(() => ({ startTime: args })),
        }),
        {
            name: "kqr-timer-session",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
