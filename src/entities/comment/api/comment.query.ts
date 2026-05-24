import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getCommentLatestListFetch, getCommentListFetch, getCommentManagerListFetch, deleteCommentManagerFetch, setCommentFetch } from "@/entities/comment/api/comment.api";

import {
    GetCommentDetailResponseType,
    GetCommentLatestListResponseType,
    GetCommentManagerListResponseType,
    deleteCommentManagerPayloadType,
} from "@/entities/comment/model/comment.type";

import { useToastStore } from "@/shared/stores/useToastStore";

/**
 * 댓글 - 게시물별 상세 목록
 */
export const useGetCommentDetailQuery = (commentIdx?: number) => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCommentDetailResponseType>({
        queryKey: [MUTATION_KEY, "useGetCommentDetailQuery", commentIdx],
        queryFn: () => getCommentListFetch(commentIdx!),
        staleTime: 0,
        enabled: !!commentIdx,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 댓글 - 최신 목록
 */
export const useGetCommentLatestListQuery = () => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCommentLatestListResponseType>({
        queryKey: [MUTATION_KEY, "useGetCommentLatestListQuery"],
        queryFn: () => getCommentLatestListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 댓글 - 생성
 */
export const useSetCommentQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "comment";
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
        mutationKey: [MUTATION_KEY, "useSetCommentQuery"],
        mutationFn: (payload: any) => setCommentFetch(payload),
        onSuccess: () => {
            setToast({ msg: "댓글을 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useGetCommentManagerListQuery = () => {
    const MUTATION_KEY = "comment";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetCommentManagerListResponseType>({
        queryKey: [MUTATION_KEY, "useGetCommentManagerListQuery"],
        queryFn: () => getCommentManagerListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

export const useDeleteCommentManagerQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "comment";
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
        mutationKey: [MUTATION_KEY, "useDeleteCommentManagerQuery"],
        mutationFn: (payload: deleteCommentManagerPayloadType) => deleteCommentManagerFetch(payload),
        onSuccess: () => {
            setToast({ msg: "댓글을 삭제했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
