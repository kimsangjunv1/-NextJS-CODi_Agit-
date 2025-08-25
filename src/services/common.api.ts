import { clientFetch } from "@/services/client";

import { SetUserLoginType } from "@/types/common.type";

/**
 * 점주 로그인
 */
export const setUserLoginFetch = (data: SetUserLoginType) =>
    clientFetch("/api/v3/set/UserLogin", { method: "POST", body: data });