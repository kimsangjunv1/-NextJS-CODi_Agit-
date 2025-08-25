import { clientFetch } from "@/services/client";

import { DeleteManagerType, GetManagerListType, SetManagerType } from "@/types/settings.type";

/**
 * 설정 - 매장/계정관리 - 관리자 계성 생성/수정
 */
export const setManager = (data: SetManagerType) =>
    clientFetch("/api/v1/set/Manager", { method: "POST", body: data });

/**
 * 설정 - 매장/계정관리 - 재고 관리자 삭제
 */
export const deleteManager = (data: DeleteManagerType) =>
    clientFetch("/api/v1/delete/Manager", { method: "POST", body: data });

/**
 * 설정 - 매장/계정관리 - 관리자 목록 조회
 */
export const getManagerList = (data: GetManagerListType) =>
    clientFetch("/api/v1/get/ManagerList", { method: "POST", body: data });