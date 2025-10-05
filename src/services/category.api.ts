import { clientFetch } from "@/services/client";
import { deleteCategoryPayloadType, setCategoryPayloadType } from "@/types/category.type";

/**
 * 카테고리 - 목록 조회
 */
export const getCategoryListFetch = (idx?: number) => {
    const url = idx ? `/api/v1/get/category/${idx}` : `/api/v1/get/category`;
    return clientFetch( url, { method: "GET" } );
};

/**
 * 카테고리 - 목록 조회
 */
export const getCategoryListOnManagerFetch = () => {
    const url = `/api/v1/get/category/manager`;
    return clientFetch( url, { method: "GET" } );
};

/**
 * 카테고리 - 생성
 */
export const setCategoryFetch = (data: setCategoryPayloadType) =>
    clientFetch("/api/v1/set/category/create", { method: "POST", body: data });

/**
 * 카테고리 - 수정
 */
export const patchCategoryFetch = (data: any) =>
    clientFetch("/api/v1/patch/category", { method: "PATCH", body: data });

/**
 * 카테고리 - 삭제
 */
export const deleteCategoryFetch = (data: deleteCategoryPayloadType) =>
    clientFetch("/api/v1/delete/category", { method: "DELETE", body: data });