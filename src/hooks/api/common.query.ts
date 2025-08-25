import { useMutation } from "@tanstack/react-query";
import { setUserLoginFetch } from "@/services/common.api";
import { SetUserLoginType } from "@/types/common.type";

/**
 * 점주 로그인
 */
export const useSetUserLogin = () => {
    return useMutation({
        mutationKey: ["setUserLogin"],
        mutationFn: (payload: SetUserLoginType) => setUserLoginFetch(payload),
        onSuccess: (data) => console.log("useSetUserLogin success", data),
        onError: (err) => console.error("useSetUserLogin error", err),
    });
};