import { useQuery, useMutation } from "@tanstack/react-query";
import {
    setMenuGroupListFetch,
    getProdGroupListPagingFetch,
    setProductFetch,
    getProdKindTypeFetch,
    setMenuGroupProdListFetch,
    getMenuGroupProdListFetch
} from "@/services/product.api";

import {
    GetMenuGroupProdListType,
    GetProdGroupListPagingType,
    GetProdKindType,
    SetMenuGroupListType,
    SetMenuGroupProdListType,
    SetProductType
} from "@/types/product.type";

/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 분류 추가
 */
export const useSetMenuGroupList = () => {
    return useMutation({
        mutationKey: ["setMenuGroupList"],
        mutationFn: (payload: SetMenuGroupListType) => setMenuGroupListFetch(payload),
        onSuccess: (data) => console.log("useSetMenuGroupList success", data),
        onError: (err) => console.error("useSetMenuGroupList error", err),
    });
};

/**
 * 상품 - 상품관리 - 상품 분류 관리 - 메인 상품 리스트 조회
 */
export const useGetProdGroupListPaging = (payload: GetProdGroupListPagingType) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getProdGroupListPaging", payload],
        queryFn: () => getProdGroupListPagingFetch(payload),
        staleTime: 0,
    });

    console.log("useGetProdGroupListPaging", data);
    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 그룹의 상품 목록 수정
 */
export const useSetProduct = () => {
    return useMutation({
        mutationKey: ["setProduct"],
        mutationFn: (payload: SetProductType) => setProductFetch(payload),
        onSuccess: (data) => console.log("useSetProduct success", data),
        onError: (err) => console.error("useSetProduct error", err),
    });
};

/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 그룹 목록 조회
 */
export const useGetProdKindType = (payload: GetProdKindType) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getProdKindType", payload],
        queryFn: () => getProdKindTypeFetch(payload),
        staleTime: 0,
    });

    console.log("useGetProdKindType", data);
    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 상품 - 상품관리 - 상품 분류 관리 - 상품 그룹 편집
 */
export const useSetMenuGroupProdList = () => {
    return useMutation({
        mutationKey: ["setMenuGroupProdList"],
        mutationFn: (payload: SetMenuGroupProdListType) => setMenuGroupProdListFetch(payload),
        onSuccess: (data) => console.log("useSetMenuGroupProdList success", data),
        onError: (err) => console.error("useSetMenuGroupProdList error", err),
    });
};

/**
 * 상품 - 상품관리 - 키오스크 노출 상품 - 키오스크 노출 상품 목록 조회
 */
export const useGetMenuGroupProdList = (payload: GetMenuGroupProdListType) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getMenuGroupProdList", payload],
        queryFn: () => getMenuGroupProdListFetch(payload),
        staleTime: 0,
    });

    console.log("useGetMenuGroupProdList", data);
    return { data, isLoading, isError, isFetching, refetch };
};