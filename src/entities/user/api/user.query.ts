import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserManagerListFetch, setUserFetch } from "@/entities/user/api/user.api";
import { GetUserManagerListResponseType, setUserPayloadType } from "@/entities/user/model/user.type";
import { useToastStore } from "@/shared/stores/useToastStore";

/**
 * 사용자 - 회원가입
 */
export const useSetUserQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "user";
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
        mutationKey: [MUTATION_KEY, "useSetUserQuery"],
        mutationFn: (payload: setUserPayloadType) => setUserFetch(payload),
        onSuccess: () => {
            setToast({ msg: "계정을 생성했어요", time: 2 });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: any) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2 });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useGetUserManagerListQuery = () => {
    const MUTATION_KEY = "user";

    const { data, isLoading, isError, isFetching, refetch } = useQuery<GetUserManagerListResponseType>({
        queryKey: [MUTATION_KEY, "useGetUserManagerListQuery"],
        queryFn: () => getUserManagerListFetch(),
        staleTime: 0,
    });

    return { data, isLoading, isError, isFetching, refetch };
};
