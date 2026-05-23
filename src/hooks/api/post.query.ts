import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useToastStore } from "@/stores/useToastStore";
import { getPostLatestListFetch, getPostListFetch, patchPostFetch, setPostFetch, setPostViewIncrementFetch } from "@/services/post.api";

import { GetPostDetailResponseType, GetPostLatestListResponseType, GetPostListResponseType, PatchPostResponseType, SetIncrementPostViewType, SetPostResponseType } from "@/types/post.type";
import useNavigate from "../common/useNavigate";

/**
 * 포스트 - 글 목록 불러오기
 */
export const useGetPostListQuery = () => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostListResponseType>({
        queryKey: [MUTATION_KEY, "useGetPostListQuery"],
        queryFn: () => getPostListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 최신 글 목록 불러오기
 */
export const useGetPostLatestListQuery = (initialData?: GetPostLatestListResponseType) => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostLatestListResponseType>({
        queryKey: [MUTATION_KEY, "useGetPostLatestListQuery"],
        queryFn: () => getPostLatestListFetch(),
        staleTime: 0,
        initialData,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 상세 불러오기
 */
export const useGetPostDetailQuery = (postIdx?: number) => {
    const MUTATION_KEY = "post";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetPostDetailResponseType>({
        queryKey: [MUTATION_KEY, "useGetPostDetailQuery", postIdx],
        queryFn: () => getPostListFetch(postIdx),
        staleTime: 0,
        enabled: !!postIdx,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 생성
 */
export const useSetPostQuery = () => {
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
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
        mutationKey: [MUTATION_KEY, "useSetProdGroupSimpleQuery"],
        mutationFn: (payload: any) => setPostFetch(payload),
        onSuccess: (data) => {
            const RESULT = data?.result?.statusCode;

            if (RESULT) {
                setToast({ msg: "게시물을 생성했어요", time: 2 });
                replaceToUrl(`/post/${data.result.postIdx}`);
            } else {
                setToast({ msg: "글 등록에 문제가 발생했습니다.", time: 2 });
            }

            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "서버 통신 중 오류가 발생했습니다.", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

/**
 * 포스트 - 글 수정
 */
export const usePatchPostQuery = () => {
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
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
        mutationKey: [MUTATION_KEY, "usePatchPostQuery"],
        mutationFn: (payload: { data: any; idx: number }) => patchPostFetch(payload),
        onSuccess: (data) => {
            const RESULT = data?.result?.statusCode;

            if (RESULT) {
                setToast({ msg: "게시물을 수정했어요.", time: 2 });
                replaceToUrl(`/post/${data.result.postIdx}`);
            } else {
                setToast({ msg: "글 등록에 문제가 발생했습니다.", time: 2 });
            }
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useSetIncrementViewQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "post";
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
        mutationKey: [MUTATION_KEY, "useSetIncrementViewQuery"],
        mutationFn: (payload: { postId: number; userId?: string }) => setPostViewIncrementFetch(payload),
        onSuccess: () => {
            setToast({ msg: "조회수를 수정했어요.", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
