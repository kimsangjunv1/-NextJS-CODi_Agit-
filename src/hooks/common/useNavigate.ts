// useNavigate.ts
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useDirtyStore } from "@/stores/useDirtyStore";
import { useModalStore } from "@/stores/useModalStore";
import { useLayoutStore } from "@/stores/useLayoutStore";

const useNavigate = ( fallbackUrl = "/new-home" ) => {
    const router = useRouter();
    const pathName = usePathname();

    const { setModal } = useModalStore();
    const { isDirty, resetDirty } = useDirtyStore();
    const { setIsRouteChange, setIsRouteChangeType } = useLayoutStore();

    const DEFENCE_ROUTE = ["/", "/new-home", "/check", "/password", "/exit/receipt", "/exit/payment"];
    
    const setPreventModal = ({ onClick }: { onClick: () => void }) => setModal({
        type: "CHECK",
        title: "저장하지 않고 나가시겠어요?",
        description: "변경 사항이 모두 사라져요.",
        // description: msg,
        cancel: { text: "취소" },
        confirm: {
            text: "나가기",
            onClick: () => {
                onClick();
                resetDirty();
            }
        },
        isOpen: true
    });

    const pushToUrl = (url: string, delay?: number) => {
        const MOVE = () => {
            setIsRouteChange(1);
            setIsRouteChangeType(1);

            setTimeout(() => router.push(url), 300);
        }

        if (isDirty) {
            setPreventModal({
                onClick: () => MOVE()
            });
        } else {
            MOVE();
        }
    };

    const replaceToUrl = (url: string, animation: boolean = true) => {
        const MOVE = () => {
            setIsRouteChange(animation ? 1 : 0);
            setIsRouteChangeType(animation ? 1 : 0);

            router.replace(url);
        }

        if (isDirty) {
            setPreventModal({
                onClick: () => MOVE()
            });
        } else {
            MOVE()
        }
    };

    const backToUrl = () => {
        const MOVE = () => {
            setIsRouteChange(99);
            setIsRouteChangeType(2);

            setTimeout(() => router.back(), 500);
        }

        if ( isDirty ) {
            setPreventModal({
                onClick: () => MOVE()
            });
        } else {
            MOVE();
        }
    };

    // 브라우저 새로고침 / 탭 닫기 경고
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if ( isDirty ) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [ isDirty ]);

    return { pushToUrl, replaceToUrl, backToUrl, currentPathName: pathName, isLandingPage: DEFENCE_ROUTE.includes(pathName) };
};

export default useNavigate;