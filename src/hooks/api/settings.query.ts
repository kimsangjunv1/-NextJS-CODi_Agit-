import { useQuery, useMutation } from "@tanstack/react-query";
import { setManager, deleteManager, getManagerList } from "@/services/settings.api";
import { SetManagerType, DeleteManagerType, GetManagerListType } from "@/types/settings.type";

/**
 * 설정 - 매장/계정관리 - 관리자 계성 생성/수정
 */
export const useSetManager = () => {
    return useMutation({
        mutationKey: ["setManager"],
        mutationFn: (payload: SetManagerType) => setManager(payload),
        onSuccess: (data) => console.log("useSetManager success", data),
        onError: (err) => console.error("useSetManager error", err),
    });
};

/**
 * 설정 - 매장/계정관리 - 재고 관리자 삭제
 */
export const useDeleteManager = () => {
    return useMutation({
        mutationKey: ["deleteManager"],
        mutationFn: (payload: DeleteManagerType) => deleteManager(payload),
        onSuccess: (data) => console.log("useDeleteManager success", data),
        onError: (err) => console.error("useDeleteManager error", err),
    });
};

/**
 * 설정 - 매장/계정관리 - 관리자 목록 조회
 */
export const useGetManagerList = (payload: GetManagerListType) => {
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["getManagerList", payload],
        queryFn: () => getManagerList(payload),
        staleTime: 0,
    });

    console.log("useGetManagerList", data);
    return { data, isLoading, isError, isFetching, refetch };
};