import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { patchPostFetch } from "@/services/post.api";
import { getCommentLatestListFetch, getCommentListFetch, setCommentFetch } from "@/services/comment.api";

import { ApiHeaderResponseType } from "@/types/common.type";
import { GetPostListResponseType } from "@/types/post.type";
import { GetCommentDetailResponseType, GetCommentLatestListResponseType } from "@/types/comment.type";

import { useToastStore } from "@/stores/useToastStore";

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetCommentListQuery = () => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetCommentListQuery"],
        queryFn: () => getCommentListFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetPostListResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetCommentDetailQuery = ( commentIdx?: number ) => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetCommentDetailQuery", commentIdx],
        queryFn: () => getCommentListFetch( commentIdx ),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetCommentDetailResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};
// getCommentLatestListFetch
/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetCommentLatestListQuery = () => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetCommentDetailQuery"],
        queryFn: () => getCommentLatestListFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetCommentLatestListResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 생성
 */
export const useSetCommentQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "comment";
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
        mutationKey: [MUTATION_KEY, "useSetCommentQuery"],
        mutationFn: (payload: any) => setCommentFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "댓글을 생성했어요", time: 2 })
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
 * 포스트 - 글 수정
 */
export const usePatchCommentQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "comment";
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
        mutationKey: [MUTATION_KEY, "usePatchCommentQuery"],
        mutationFn: (payload: { data: any, idx: number }) => patchPostFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "댓글을 수정했어요", time: 2 })
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