import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiHeaderResponseType } from "@/types/common.type";

import { useToastStore } from "@/stores/useToastStore";
import { deleteInvitationFetch, getInvitationCodeCheckFetch, getInvitationCodeListOnManagerFetch, patchInvitationFetch, setInvitationCodeFetch } from "@/services/invitation.api";
import { deleteInvitationCodePayloadType, GetInvitationCodeCheckResponseType, GetInvitationCodeListOnManagerResponseType, patchInvitationCodePayloadType, setInvitationCodePayloadType } from "@/types/invitation.type";

/**
 * 카테고리 - 목록 불러오기 (매니저용)
 */
export const useGetInvitationCodeCheckQuery = (code: string) => {
    const MUTATION_KEY = "invitation";

    const { data, isLoading, isError, isFetching, isPending, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetInvitationCodeCheckQuery"],
        queryFn: () => getInvitationCodeCheckFetch(code),
        staleTime: 0,
        enabled: false
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetInvitationCodeCheckResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, isPending, refetch };
};

/**
 * 카테고리 - 목록 불러오기 (매니저용)
 */
export const useGetInvitationCodeListOnManagerQuery = () => {
    const MUTATION_KEY = "invitation";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useGetInvitationCodeListOnManagerQuery"],
        queryFn: () => getInvitationCodeListOnManagerFetch(),
        staleTime: 0,
    });
    
    const header: ApiHeaderResponseType = data?.header;
    const body: GetInvitationCodeListOnManagerResponseType = data?.body;

    return { data: body, header, isLoading, isError, isFetching, refetch };
};

/**
 * 포스트 - 글 생성하기
 */
export const useSetInvitationCodeQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "invitation";
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
        mutationKey: [MUTATION_KEY, "useSetInvitationCodeQuery"],
        mutationFn: (payload: setInvitationCodePayloadType) => setInvitationCodeFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "초대코드를 생성했어요", time: 2 })
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
export const usePatchInvitationCodeQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "invitation";
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
        mutationKey: [MUTATION_KEY, "usePatchInvitationCodeQuery"],
        mutationFn: (payload: patchInvitationCodePayloadType) => patchInvitationFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "초대코드를 수정했어요", time: 2 })
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
export const useDeleteInvitationCodeQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "invitation";
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
        mutationKey: [MUTATION_KEY, "useDeleteInvitationCodeQuery"],
        mutationFn: (payload: deleteInvitationCodePayloadType) => deleteInvitationFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "초대코드를 삭제했어요", time: 2 })
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