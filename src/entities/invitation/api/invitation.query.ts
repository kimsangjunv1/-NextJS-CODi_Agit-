import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useToastStore } from "@/shared/stores/useToastStore";
import { deleteInvitationFetch, getInvitationCodeCheckFetch, getInvitationCodeListOnManagerFetch, patchInvitationFetch, setInvitationCodeFetch } from "@/entities/invitation/api/invitation.api";
import {
    deleteInvitationCodePayloadType,
    GetInvitationCodeCheckResponseType,
    GetInvitationCodeListOnManagerResponseType,
    patchInvitationCodePayloadType,
    setInvitationCodePayloadType,
} from "@/entities/invitation/model/invitation.type";

/**
 * 초대코드 - 유효성 검사
 */
export const useGetInvitationCodeCheckQuery = (code: string) => {
    const MUTATION_KEY = "invitation";

    const { data, isLoading, isError, isFetching, isPending, refetch } = useQuery<GetInvitationCodeCheckResponseType>({
        queryKey: [MUTATION_KEY, "useGetInvitationCodeCheckQuery", code],
        queryFn: () => getInvitationCodeCheckFetch(code),
        staleTime: 0,
        enabled: false,
    });

    return { data, isLoading, isError, isFetching, isPending, refetch };
};

/**
 * 초대코드 - 목록 (매니저)
 */
export const useGetInvitationCodeListOnManagerQuery = () => {
    const MUTATION_KEY = "invitation";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetInvitationCodeListOnManagerResponseType>({
        queryKey: [MUTATION_KEY, "useGetInvitationCodeListOnManagerQuery"],
        queryFn: () => getInvitationCodeListOnManagerFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 초대코드 - 생성
 */
export const useSetInvitationCodeQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "invitation";
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
        mutationKey: [MUTATION_KEY, "useSetInvitationCodeQuery"],
        mutationFn: (payload: setInvitationCodePayloadType) => setInvitationCodeFetch(payload),
        onSuccess: () => {
            setToast({ msg: "초대코드를 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

/**
 * 초대코드 - 수정
 */
export const usePatchInvitationCodeQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "invitation";
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
        mutationKey: [MUTATION_KEY, "usePatchInvitationCodeQuery"],
        mutationFn: (payload: patchInvitationCodePayloadType) => patchInvitationFetch(payload),
        onSuccess: () => {
            setToast({ msg: "초대코드를 수정했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

/**
 * 초대코드 - 삭제
 */
export const useDeleteInvitationCodeQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "invitation";
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
        mutationKey: [MUTATION_KEY, "useDeleteInvitationCodeQuery"],
        mutationFn: (payload: deleteInvitationCodePayloadType) => deleteInvitationFetch(payload),
        onSuccess: () => {
            setToast({ msg: "초대코드를 삭제했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
