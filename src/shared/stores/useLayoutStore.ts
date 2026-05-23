import { create } from "zustand";

interface LayoutStoreType {
    isMobile: boolean;
    isSearchOpen: boolean;
    isSidebarOpen: boolean;
    isRouteChangeType: 0 | 1 | 2 | 99;
    isRouteChange: 0 | 1 | 2 | 99;
    isNeedBackdrop: boolean;
    isNeedNavigation: boolean,
    isMobileMenuOpen: boolean;
    isFloatingMenuOpen: boolean;
    isAccountSidebarOpen: boolean;
    isMiniMapCapture: boolean;
    statusViewMode:number;

    mainViewMode: number;
    categoryFilter: number;

    setIsMobile: (args: boolean) => void;
    setIsSearchOpen: (args: boolean) => void;
    setIsSidebarOpen: (args: boolean) => void;
    setIsRouteChangeType: (args: 0 | 1 | 2 | 99) => void;
    setIsRouteChange: (args: 0 | 1 | 2 | 99) => void;
    setIsNeedBackdrop: (args: boolean) => void;
    setIsNeedNavigation: (args: boolean) => void;
    setIsMobileMenuOpen: (args: boolean) => void;
    setIsFloatingMenuOpen: (args: boolean) => void;
    setIsAccountSidebarOpen: (args: boolean) => void;
    setIsMiniMapCapture: (args: boolean) => void;
    setStatusViewMode: (args: number) => void;

    setMainViewMode: (args: number) => void;
    setCategoryFilter: (args: number) => void;
}

export const useLayoutStore = create<LayoutStoreType>()(
    (set, get) => ({
        isMobile: false,
        isSearchOpen: false,
        isSidebarOpen: false,
        isRouteChangeType: 2,
        isRouteChange: 0,
        isNeedBackdrop: false,
        isNeedNavigation: false,
        isMobileMenuOpen: false,
        isFloatingMenuOpen: false,
        isAccountSidebarOpen: false,
        isMiniMapCapture: false,
        statusViewMode: 0,

        mainViewMode: 1,
        categoryFilter: 999,

        setStatusViewMode: (args: number) => {
            set(() => ({
                statusViewMode: args
            }))
        },
        setIsSearchOpen: (args: boolean) => {
            set(() => ({
                isSearchOpen: args
            }))
        },
        setIsSidebarOpen: (args: boolean) => {
            set(() => ({
                isSidebarOpen: args
            }))
        },
        setIsAccountSidebarOpen: (args: boolean) => {
            set(() => ({
                isAccountSidebarOpen: args
            }))
        },
        setIsRouteChangeType: (args: 0 | 1 | 2 | 99) => {
            set(() => ({
                isRouteChangeType: args
            }))
        },
        setIsRouteChange: (args: 0 | 1 | 2 | 99) => {
            set(() => ({
                isRouteChange: args
            }))
        },
        setIsNeedBackdrop: (args: boolean) => {
            set(() => ({
                isAccountSidebarOpen: args
            }))
        },
        setIsNeedNavigation: (args: boolean) => {
            set(() => ({
                isNeedNavigation: args
            }))
        },
        setIsFloatingMenuOpen: (args: boolean) => {
            set(() => ({
                isFloatingMenuOpen: args
            }))
        },
        setIsMobile: (args: boolean) => {
            set(() => ({
                isMobile: args
            }))
        },
        setIsMiniMapCapture: (args: boolean) => {
            set(() => ({
                isMiniMapCapture: args
            }))
        },
        setIsMobileMenuOpen: (args: boolean) => {
            set(() => ({
                isMobileMenuOpen: args
            }))
        },
        setMainViewMode: (args: number) => {
            set(() => ({
                mainViewMode: args
            }))
        },
        setCategoryFilter: (args: number) => {
            set(() => ({
                categoryFilter: args
            }))
        }
    })
)