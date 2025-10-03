import { clientFetch } from "@/services/client";
import { setLoginPayloadType, setUserPayloadType } from "@/types/user.type";

// /**
//  * 포스트 - 목록 조회
//  */
// export const getPostListFetch = (idx?: number) => {
//     const url = idx ? `/api/v1/get/post/${idx}` : `/api/v1/get/post`;
//     return clientFetch( url, { method: "GET" } );
// };

// /**
//  * 포스트 - 최근 생성한 목록 조회 (10개)
//  */
// export const getPostLatestListFetch = (idx?: number) => {
//     const url = `/api/v1/get/post/latest`
//     return clientFetch( url, { method: "GET" } );
// };

/**
 * 포스트 - 생성
 */
export const setUserFetch = (data: setUserPayloadType) =>
    clientFetch("/api/v1/set/user", { method: "POST", body: data });

/**
 * 포스트 - 생성
 */
export const setLoginFetch = (data: setLoginPayloadType) =>
    clientFetch("/api/v1/set/login", { method: "POST", body: data });

// /**
//  * 포스트 - 수정
//  */
// export const patchPostFetch = ({ data, idx }: { data: any, idx: number }) =>
//     clientFetch(`/api/v1/patch/post/${idx}`, { method: "PATCH", body: data });


// /**
//  * 포스트 - 조회수 증가(사용안함)
//  */
// export const setPostViewIncrementFetch = (data: { postId: number; userId?: string }) =>
//     clientFetch(`/api/v1/set/view/increment`, { method: "POST", body: data });