import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { setManager, deleteManager, getManagerList } from "@/services/settings.api";
import { getPostLatestListFetch, getPostListFetch, patchPostFetch, setPostFetch, setPostViewIncrementFetch } from "@/services/post.api";

import { useToastStore } from "@/stores/useToastStore";

import { ApiHeaderResponseType } from "@/types/common.type";
import { GetPostDetailResponseType, GetPostLatestListResponseType, GetPostListResponseType, SetIncrementPostViewType } from "@/types/post.type";
import { SetManagerType, DeleteManagerType, GetManagerListType } from "@/types/settings.type";

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetPostListQuery = () => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetPostListQuery"],
        queryFn: () => getPostListFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetPostListResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetPostLatestListQuery = () => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetPostLatestListQuery"],
        queryFn: () => getPostLatestListFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetPostLatestListResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetPostDetailQuery = ( postIdx?: number ) => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetPostDetailQuery", postIdx],
        // queryKey: [MUTATION_KEY, "useGetPostDetailQuery", postIdx],
        queryFn: () => getPostListFetch( postIdx ),
        staleTime: 0,
        enabled: !!postIdx
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetPostDetailResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 생성
 */
export const useSetPostQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
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
        mutationKey: [MUTATION_KEY, "useSetProdGroupSimpleQuery"],
        mutationFn: (payload: any) => setPostFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "게시물을 생성했어요", time: 2 })
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
export const usePatchPostQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
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
        mutationKey: [MUTATION_KEY, "usePatchPostQuery"],
        mutationFn: (payload: { data: any, idx: number }) => patchPostFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "게시물을 수정했어요", time: 2 })
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

export const useSetIncrementViewQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
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
        mutationKey: [MUTATION_KEY, "useSetIncrementViewQuery"],
        mutationFn: (payload: { postId: number; userId?: string }) => setPostViewIncrementFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "조회수 수정했어요", time: 2 })
            queryClient.invalidateQueries({ queryKey: [ MUTATION_KEY ] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    const header = data?.header;
    const body: SetIncrementPostViewType = data?.body;
    
    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data: body, error, reset }
};