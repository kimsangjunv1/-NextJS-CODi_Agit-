import { clientFetch } from "@/services/client";
import { deleteCategoryPayloadType, setCategoryPayloadType } from "@/types/category.type";
import { deleteInvitationCodePayloadType, patchInvitationCodePayloadType, setInvitationCodePayloadType } from "@/types/invitation.type";

/**
 * 카테고리 - 목록 조회
 */
export const getInvitationCodeCheckFetch = (code: string) => {
    const url = `/api/v1/get/invite_codes?code=${code}`;
    return clientFetch( url, { method: "GET" } );
};

/**
 * 카테고리 - 목록 조회
 */
export const getInvitationCodeListOnManagerFetch = () => {
    const url = `/api/v1/get/invite_codes/manager`;
    return clientFetch( url, { method: "GET" } );
};

/**
 * 카테고리 - 생성
 */
export const setInvitationCodeFetch = (data: setInvitationCodePayloadType) =>
    clientFetch("/api/v1/set/invite_codes/manager", { method: "POST", body: data });

/**
 * 카테고리 - 수정
 */
export const patchInvitationFetch = (data: patchInvitationCodePayloadType) =>
    clientFetch("/api/v1/patch/invite_codes/manager", { method: "PATCH", body: data });

/**
 * 카테고리 - 삭제
 */
export const deleteInvitationFetch = (data: deleteInvitationCodePayloadType) =>
    clientFetch("/api/v1/delete/invite_codes/manager", { method: "DELETE", body: data });