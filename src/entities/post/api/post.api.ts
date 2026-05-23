import { clientApi } from "@/shared/lib/api/client";

/**
 * 포스트 - 목록 조회
 */
export const getPostListFetch = (idx?: number) => {
    const url = idx ? `/api/v1/get/post/${idx}` : `/api/v1/get/post`;
    return clientApi( url, { method: "GET" } );
};

/**
 * 포스트 - 최근 생성한 목록 조회 (10개)
 */
export const getPostLatestListFetch = (idx?: number) => {
    const url = `/api/v1/get/post/latest`
    return clientApi( url, { method: "GET" } );
};

/**
 * 포스트 - 생성
 */
export const setPostFetch = (data: any) =>
    clientApi("/api/v1/set/post/create", { method: "POST", body: data });

/**
 * 포스트 - 수정
 */
export const patchPostFetch = ({ data, idx }: { data: any, idx: number }) =>
    clientApi(`/api/v1/patch/post/${idx}`, { method: "PATCH", body: data });


/**
 * 포스트 - 조회수 증가(사용안함)
 */
export const setPostViewIncrementFetch = (data: { postId: number; userId?: string }) =>
    clientApi(`/api/v1/set/view/increment`, { method: "POST", body: data });