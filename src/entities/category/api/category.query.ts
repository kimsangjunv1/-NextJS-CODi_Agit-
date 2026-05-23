import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useToastStore } from "@/shared/stores/useToastStore";
import { deleteCategoryFetch, getCategoryListFetch, getCategoryListOnManagerFetch, patchCategoryFetch, setCategoryFetch } from "@/entities/category/api/category.api";
import {
    deleteCategoryPayloadType,
    GetCategoryListOnManagerResponseType,
    GetCategoryListResponseType,
    patchCategoryPayloadType,
    setCategoryPayloadType,
} from "@/entities/category/model/category.type";

/**
 * 카테고리 - 목록 불러오기
 */
export const useGetCategoryListQuery = () => {
    const MUTATION_KEY = "category";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCategoryListResponseType>({
        queryKey: [MUTATION_KEY, "useGetCategoryListQuery"],
        queryFn: () => getCategoryListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 카테고리 - 목록 불러오기 (매니저용)
 */
export const useGetCategoryListOnManagerQuery = () => {
    const MUTATION_KEY = "category";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCategoryListOnManagerResponseType>({
        queryKey: [MUTATION_KEY, "useGetCategoryListOnManagerQuery"],
        queryFn: () => getCategoryListOnManagerFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 카테고리 - 생성
 */
export const useSetCategoryQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "category";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useSetCategoryQuery"],
        mutationFn: (payload: setCategoryPayloadType) => setCategoryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "카테고리를 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

/**
 * 카테고리 - 수정
 */
export const usePatchCategoryQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "category";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "usePatchCategoryQuery"],
        mutationFn: (payload: patchCategoryPayloadType) => patchCategoryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "카테고리를 수정했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

/**
 * 카테고리 - 삭제
 */
export const useDeleteCategoryQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "category";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,
        mutateAsync,
        error,
        isError,
        isSuccess,
        isIdle,
        isPending,
        isPaused,
        reset,
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useDeleteCategoryQuery"],
        mutationFn: (payload: deleteCategoryPayloadType) => deleteCategoryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "카테고리를 삭제했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
