import { ApiPaginationResponseType } from "./common.type";

export interface setInvitationCodePayloadType {
    // code: string;
    is_active: boolean;
    expire_at: string | null;
}

export interface patchInvitationCodePayloadType {
    id: number;
    is_active: boolean
    expire_at: string | null;
}

export interface deleteInvitationCodePayloadType {
    id: number;
}

export interface InvitationCodeListItem {
  id: number;
  code: string;
  is_used: boolean;
  used_by: string | null;        // UUID, null 가능
  created_at: string;            // ISO 문자열로 받음
  is_active: boolean;
  expire_at: string | null;      // ISO 문자열, null 가능
}

export interface GetInvitationCodeListOnManagerResponseType {
    result: null;
    pagination: ApiPaginationResponseType;
}

export interface GetInvitationCodeCheckResponseType {
    result: {
        is_active: boolean,
        is_used: boolean,
        expire_at: string
    };
    statusCode: number;
    pagination: ApiPaginationResponseType;
}