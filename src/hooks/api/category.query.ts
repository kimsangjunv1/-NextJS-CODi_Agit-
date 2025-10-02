import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { GetPostListResponseType } from "@/types/post.type";
import { ApiHeaderResponseType } from "@/types/common.type";

import { useToastStore } from "@/stores/useToastStore";
import { getCategoryListFetch, setCategoryFetch } from "@/services/category.api";

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetCategoryListQuery = () => {
    const MUTATION_KEY = "category";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetCategoryListQuery"],
        queryFn: () => getCategoryListFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetPostListResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 목록 불러오기
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
        mutationFn: (payload: any) => setCategoryFetch(payload),
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