import { clientApi } from "@/shared/lib/api/client";

/**
 * 댓글 - 게시물에 해당하는 댓글 목록 불러오기
 */
export const getCommentListFetch = (idx: number) => {
    const url = `/api/v1/get/comment/detail/${idx}`;
    return clientApi(url, { method: "GET" });
};

/**
 * 댓글 - 모든 게시물에서 최신 댓글 10개 불러오기
 */
export const getCommentLatestListFetch = () => {
    const url = `/api/v1/get/comment/latest`;
    return clientApi(url, { method: "GET" });
};

/**
 * 댓글 - 생성
 */
export const setCommentFetch = (data: any) =>
    clientApi("/api/v1/set/comment/create", { method: "POST", body: data });
