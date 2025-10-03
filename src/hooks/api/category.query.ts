import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { GetPostListResponseType } from "@/types/post.type";
import { ApiHeaderResponseType } from "@/types/common.type";

import { useToastStore } from "@/stores/useToastStore";
import { deleteCategoryFetch, getCategoryListFetch, getCategoryListOnManagerFetch, patchCategoryFetch, setCategoryFetch } from "@/services/category.api";
import { deleteCategoryPayloadType, GetCategoryListOnManagerResponseType, GetCategoryListResponseType, patchCategoryPayloadType, setCategoryPayloadType } from "@/types/category.type";

/**
 * 카테고리 - 목록 불러오기
 */
export const useGetCategoryListQuery = () => {
    const MUTATION_KEY = "category";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetCategoryListQuery"],
        queryFn: () => getCategoryListFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetCategoryListResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 카테고리 - 목록 불러오기 (매니저용)
 */
export const useGetCategoryListOnManagerQuery = () => {
    const MUTATION_KEY = "category";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetCategoryListQuery"],
        queryFn: () => getCategoryListOnManagerFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetCategoryListOnManagerResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 생성하기
 */
export const useSetCategoryQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "category";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,        // 뮤테이션 실행 함수
        mutateAsync,   // 비동기 뮤테이션 실행 함수 (Promise 반환)
        error,         // 에러 정보
        isError,       // 에러 여부 (true/false)
        isSuccess,     // 성공 여부 (true/false)
        isIdle,        // 초기 상태 여부 (true/false)
        isPending,     // 로딩 여부 (true/false) (v5에서 추가됨)
        isPaused,      // 네트워크 등으로 인해 멈춘 상태 여부 (true/false)
        reset          // 상태 초기화 함수
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useSetCategoryQuery"],
        mutationFn: (payload: setCategoryPayloadType) => setCategoryFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "카테고리를 생성했어요", time: 2 })
            queryClient.invalidateQueries({ queryKey: [ MUTATION_KEY ] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    const header = data?.header;
    const body = data?.body;
    
    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data: body, error, reset }
};

/**
 * 포스트 - 글 수정하기
 */
export const usePatchCategoryQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "category";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,        // 뮤테이션 실행 함수
        mutateAsync,   // 비동기 뮤테이션 실행 함수 (Promise 반환)
        error,         // 에러 정보
        isError,       // 에러 여부 (true/false)
        isSuccess,     // 성공 여부 (true/false)
        isIdle,        // 초기 상태 여부 (true/false)
        isPending,     // 로딩 여부 (true/false) (v5에서 추가됨)
        isPaused,      // 네트워크 등으로 인해 멈춘 상태 여부 (true/false)
        reset          // 상태 초기화 함수
    } = useMutation({
        mutationKey: [MUTATION_KEY, "usePatchCategoryQuery"],
        mutationFn: (payload: patchCategoryPayloadType) => patchCategoryFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "카테고리를 수정했어요", time: 2 })
            queryClient.invalidateQueries({ queryKey: [ MUTATION_KEY ] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    const header = data?.header;
    const body = data?.body;
    
    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data: body, error, reset }
};

/**
 * 포스트 - 글 삭제하기
 */
export const useDeleteCategoryQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "category";
    const queryClient = useQueryClient();

    const {
        data,
        mutate,        // 뮤테이션 실행 함수
        mutateAsync,   // 비동기 뮤테이션 실행 함수 (Promise 반환)
        error,         // 에러 정보
        isError,       // 에러 여부 (true/false)
        isSuccess,     // 성공 여부 (true/false)
        isIdle,        // 초기 상태 여부 (true/false)
        isPending,     // 로딩 여부 (true/false) (v5에서 추가됨)
        isPaused,      // 네트워크 등으로 인해 멈춘 상태 여부 (true/false)
        reset          // 상태 초기화 함수
    } = useMutation({
        mutationKey: [MUTATION_KEY, "useDeleteCategoryQuery"],
        mutationFn: (payload: deleteCategoryPayloadType) => deleteCategoryFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "카테고리를 삭제했어요", time: 2 })
            queryClient.invalidateQueries({ queryKey: [ MUTATION_KEY ] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    const header = data?.header;
    const body = data?.body;
    
    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data: body, error, reset }
};