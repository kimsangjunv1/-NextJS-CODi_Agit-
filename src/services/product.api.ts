import { clientFetch } from "@/services/client";

import {
    GetMenuGroupProdListType,
    GetProdGroupListPagingType,
    GetProdKindType,
    SetMenuGroupListType,
    SetMenuGroupProdListType,
    // SetMenuGroupProdListType,
    SetProductType
} from "@/types/product.type";

/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 분류 추가
 */
export const setMenuGroupListFetch = (data: SetMenuGroupListType) =>
    clientFetch("/api/v1/set/MenuGroupList", { method: "POST", body: data });


/**
 * 상품 - 상품관리 - 상품 분류 관리 - 메인 상품 리스트 조회
 */
export const getProdGroupListPagingFetch = (data: GetProdGroupListPagingType) =>
    clientFetch("/api/v1/get/ProdGroupListPaging", { method: "POST", body: data });


/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 그룹의 상품 목록 수정
 */
export const setProductFetch = (data: SetProductType) =>
    clientFetch("/api/v2/set/Product", { method: "POST", body: data });


/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 그룹 목록 조회
 */
export const getProdKindTypeFetch = (data: GetProdKindType) =>
    clientFetch("/api/v1/get/ProdKindType", { method: "POST", body: data });


/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 그룹 편집
 */
export const setMenuGroupProdListFetch = (data: SetMenuGroupProdListType) =>
    clientFetch("/api/v1/set/MenuGroupProdList", { method: "POST", body: data });




/**
 * 상품 - 상품관리 - 키오스크 노출 상품 - 키오스크 노출 상품 목록 조회
 */
export const getMenuGroupProdListFetch = (data: GetMenuGroupProdListType) =>
    clientFetch("/api/v2/get/MenuGroupProdList", { method: "POST", body: data });