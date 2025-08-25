import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    getMemberSearchByHpFetch,
    getMemberDetailsFetch,
    setRewardStoreConfigFetch,
    setProdGroupRewardAllFetch,
    setEventFetch,
    patchEventFetch,
    getEventFetch,
    setStoreConfigFetch,
    setRewardStoreConfigEachFetch,
    getRewardStoreConfigFetch,
    getVacsHistViewFetch
} from "@/services/account.api";

import {
    GetEvents,
    GetMemberDetailsType,
    GetMemberSearchByHpType,
    PatchEvents,
    SetEvent,
    SetProdGroupRewardAllType,
    SetRewardStoreConfigType,
    SetStoreConfig
} from "@/types/account.type";

/**
 * 회원 - 회원 조회 - 검색
 */
export const useGetMemberSearchByHp = (payload: GetMemberSearchByHpType) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getMemberSearchByHp", payload],
        queryFn: () => getMemberSearchByHpFetch(payload),
        staleTime: 0,
    });

    console.log("useGetMemberSearchByHp", data);
    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 회원 - 회원 조회 - 리스트
 */
export const useGetMemberDetails = (payload: GetMemberDetailsType) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getMemberDetails", payload],
        queryFn: () => getMemberDetailsFetch(payload),
        staleTime: 0,
    });

    console.log("useGetMemberDetails", data);
    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 회원 - 포인트 - 나머지 설정 값
 */
export const useSetRewardStoreConfig = () => {
    return useMutation({
        mutationKey: ["setRewardStoreConfig"],
        mutationFn: (payload: SetRewardStoreConfigType) => setRewardStoreConfigFetch(payload),
        onSuccess: (data) => console.log("useSetRewardStoreConfig success", data),
        onError: (err) => console.error("useSetRewardStoreConfig error", err),
    });
};

/**
 * 회원 - 포인트 - 포인트 기본 적립률
 */
export const useSetProdGroupRewardAll = () => {
    return useMutation({
        mutationKey: ["setProdGroupRewardAll"],
        mutationFn: (payload: SetProdGroupRewardAllType) => setProdGroupRewardAllFetch(payload),
        onSuccess: (data) => console.log("useSetProdGroupRewardAll success", data),
        onError: (err) => console.error("useSetProdGroupRewardAll error", err),
    });
};

/**
 * 회원 - 이벤트 - 이벤트 생성/수정
 */
export const useSetEvent = () => {
    return useMutation({
        mutationKey: ["setEvent"],
        mutationFn: (payload: SetEvent) => setEventFetch(payload),
        onSuccess: (data) => console.log("useSetEvent success", data),
        onError: (err) => console.error("useSetEvent error", err),
    });
};

/**
 * 회원 - 이벤트 - 이벤트 진행 여부 수정/삭제
 */
export const usePatchEvent = () => {
    return useMutation({
        mutationKey: ["patchEvent"],
        mutationFn: (payload: PatchEvents) => patchEventFetch(payload),
        onSuccess: (data) => console.log("usePatchEvent success", data),
        onError: (err) => console.error("usePatchEvent error", err),
    });
};

/**
 * 회원 - 이벤트 - 이벤트 목록 조회
 */
export const useGetEvent = (payload: GetEvents) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getEvent", payload],
        queryFn: () => getEventFetch(payload),
        staleTime: 0,
    });

    console.log("useGetEvent", data);
    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 회원 - 이벤트 - 이벤트 생성/수정 (설정 관련)
 */
export const useSetStoreConfig = () => {
    return useMutation({
        mutationKey: ["setStoreConfig"],
        mutationFn: (payload: SetStoreConfig) => setStoreConfigFetch(payload),
        onSuccess: (data) => console.log("useSetStoreConfig success", data),
        onError: (err) => console.error("useSetStoreConfig error", err),
    });
};

/**
 * 회원 - 알림톡 - 기본설정 - 알림톡 설정 값 저장
 */
export const useSetRewardStoreConfigEach = () => {
    return useMutation({
        mutationKey: ["setRewardStoreConfigEach"],
        mutationFn: (payload: SetStoreConfig) => setRewardStoreConfigEachFetch(payload),
        onSuccess: (data) => console.log("useSetRewardStoreConfigEach success", data),
        onError: (err) => console.error("useSetRewardStoreConfigEach error", err),
    });
};

/**
 * 회원 - 알림톡 - 기본설정 - 알림톡 설정 값 조회
 */
export const useGetRewardStoreConfig = (payload: SetStoreConfig) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getRewardStoreConfig", payload],
        queryFn: () => getRewardStoreConfigFetch(payload),
        staleTime: 0,
    });

    console.log("useGetRewardStoreConfig", data);
    return { data, isLoading, isError, isFetching, refetch };
};

/**
 * 회원 - 알림톡 - 계좌 및 충전내역 조회
 */
export const useGetVacsHistView = (payload: SetStoreConfig) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getVacsHistView", payload],
        queryFn: () => getVacsHistViewFetch(payload),
        staleTime: 0,
    });

    console.log("useGetVacsHistView", data);
    return { data, isLoading, isError, isFetching, refetch };
};