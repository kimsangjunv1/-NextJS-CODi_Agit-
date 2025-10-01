import { clientFetch } from "@/services/client";

/**
 * 카테고리 - 목록 조회
 */
export const getCategoryListFetch = (idx?: number) => {
    const url = idx ? `/api/v1/get/category/${idx}` : `/api/v1/get/category`;
    return clientFetch( url, { method: "GET" } );
};

/**
 * 카테고리 - 생성
 */
export const setCategoryFetch = (data: any) =>
    clientFetch("/api/v1/set/category/create", { method: "POST", body: data });