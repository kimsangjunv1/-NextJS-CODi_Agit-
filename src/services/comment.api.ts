import { clientFetch } from "@/services/client";

/**
 * 댓글 - 게시물에 해당하는 댓글 목록 불러오기
 */
export const getCommentListFetch = (idx?: number) => {
    const url = idx ? `/api/v1/get/comment/detail/${idx}` : `/api/v1/get/comment`;
    return clientFetch( url, { method: "GET" } );
};

/**
 * 댓글 - 모든 게시물에서 최신 댓글 10개 불러오기
 */
export const getCommentLatestListFetch = (idx?: number) => {
    const url = `/api/v1/get/comment/latest`
    return clientFetch( url, { method: "GET" } );
};

/**
 * 댓글 - 생성
 */
export const setCommentFetch = (data: any) =>
    clientFetch("/api/v1/set/comment/create", { method: "POST", body: data });

/**
 * 댓글 - 수정
 */
export const patchCommentFetch = ({ data, idx }: { data: any, idx: number }) =>
    clientFetch(`/api/v1/patch/comment/${idx}`, { method: "PATCH", body: data });