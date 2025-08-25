import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PropsType {
    msg: string;
    time?: number;
    icon?: string;
    iconClassName?: string;
}

interface DetailType {
    id: string;
    createDate: string;
    icon: string;
    iconClassName: string;
    msg: string;
    time: number;
}

interface ToastStore {
    toastList: DetailType[];

    time: number;
    isRunning: boolean;
    startTime: number | null; // 시작 시점 (timestamp)
    duration: number;         // 시작 시 설정한 총 시간 (초)

    setToast: (item: PropsType, callback?: () => void) => void;

    startTimer: (id:string, seconds: number, callback?: () => void) => void;
    stopTimer: () => void;
    resetTimer: () => void;
    resetToastList: () => void;
    restartTimer: (seconds: number) => void;
    setCallback: (cb: () => void) => void;
    setStartTime: ( e: number | null ) => void;
}

let intervalRef: NodeJS.Timeout | null = null;
let savedCallback: (() => void) | null = null;
const intervalRefMap: Record<string, NodeJS.Timeout> = {};

export const useToastStore = create<ToastStore>()(
    persist(
        (set, get) => ({
            toastList: [],
            
            time: 0,
            isRunning: false,
            startTime: null,
            duration: 0,

            startTimer: (id, seconds, callback) => {
                if ( intervalRefMap[id] ) {
                    console.log(`이미 타이머 실행 중: ${id}`);
                    return;
                }
            
                // console.log(`타이머 시작 (id: ${id}, duration: ${seconds}s)`);
                set({ isRunning: true });
            
                const startTimestamp = Date.now();
                const savedCallback = callback || null;
            
                intervalRefMap[id] = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
                    const remaining = seconds - elapsed;
            
                    // console.log(`진행 중 - 남은 시간: ${remaining}s (id: ${id})`);
            
                    if (remaining <= 0) {
                        // console.log(`타이머 종료 - ID: ${id}`);

                        get().stopTimer();
                        set({ time: 0 });

                        clearInterval(intervalRefMap[id]);
                        delete intervalRefMap[id];
            
                        set((state) => {
                            const newList = state.toastList.filter((e) => e.id !== id);
                            // console.log(`리스트에서 제거 전:`, state.toastList);
                            // console.log(`리스트에서 제거 후:`, newList);
                            return { toastList: newList };
                        });
            
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

            resetToastList: () => {
                set(() => {
                    return { toastList: [] };
                });
            },

            restartTimer: ( seconds ) => {
                if (intervalRef) return;

                const startTimestamp = Date.now();

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
                    } else {
                        set({ time: remaining });
                    }
                }, 1000);
            },

            setToast: ({ msg, time = 3, icon, iconClassName }, callback) => {
                const generateRandomId = () => {
                    return msg.split('').map(char => char.charCodeAt(0)).join('').slice(0, 10);
                }
                
                const ID = generateRandomId();
                
                if ( intervalRefMap[ID] ) {
                    return;
                } else {
                    const newItem: DetailType = {
                        icon: icon ?? "",
                        iconClassName: iconClassName ?? "",
                        id: ID,
                        createDate: new Date().toISOString(),
                        msg,
                        time,
                    };
    
                    set((state) => ({
                        toastList: [...state.toastList, newItem],
                    }));
    
                    get().startTimer(ID, time, callback);
                }
            },

            setCallback: (cb) => {
                savedCallback = cb;
            },

            setStartTime: ( args: number | null ) => set(() => ({ startTime: args })),
        }),
        {
            name: "kqr-toast-session",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
