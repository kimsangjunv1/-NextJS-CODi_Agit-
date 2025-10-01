import { ApiPaginationResponseType } from "./common.type";

export interface GetCommentDetailDataType {
    idx: number;
    id: string; // UUID
    post_id: number;
    profile: number;
    author: string;
    msg: string;
    password: string | null;
    is_admin: boolean;
    is_modified: boolean;
    created_at: string; // ISO Date string
    updated_at: string; // ISO Date string
}

export interface GetCommentDetailResponseType {
    result: GetCommentDetailDataType[],
    pagination: ApiPaginationResponseType
}

export interface GetCommentLatestListType {
    idx: number;
    author: string;
    msg: string;
    created_at: string; // ISO Date string
}


export interface GetCommentLatestListResponseType {
    result: GetCommentLatestListType[],
    pagination: ApiPaginationResponseType
}

// ApiPaginationResponseType