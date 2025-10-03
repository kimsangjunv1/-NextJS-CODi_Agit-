import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setUserFetch } from "@/services/user.api";
import { setUserPayloadType } from "@/types/user.type";
import { useToastStore } from "@/stores/useToastStore";

/**
 * 포스트 - 글 생성하기
 */
export const useSetUserQuery = () => {
    const { setToast } = useToastStore();

    const MUTATION_KEY = "user";
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
        mutationKey: [MUTATION_KEY, "useSetUserQuery"],
        mutationFn: (payload: setUserPayloadType) => setUserFetch(payload),
        onSuccess: (data) => {
            setToast({ msg: "계정을 생성했어요", time: 2 })
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