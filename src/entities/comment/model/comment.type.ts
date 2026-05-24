import { ApiResponseType } from "@/shared/model/common.type";

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

export type GetCommentDetailResponseType = ApiResponseType<GetCommentDetailDataType[]>;

export interface GetCommentLatestListType {
    idx: number;
    author: string;
    msg: string;
    created_at: string; // ISO Date string
}

export type GetCommentLatestListResponseType = ApiResponseType<GetCommentLatestListType[]>;

export interface CommentManagerItem {
    idx: number;
    post_id: number;
    author: string;
    msg: string;
    is_admin: boolean;
    created_at: string;
    posts?: {
        title: string;
    };
}

export interface deleteCommentManagerPayloadType {
    idx: number;
}

export type GetCommentManagerListResponseType = ApiResponseType<CommentManagerItem[]>;
export type DeleteCommentManagerResponseType = ApiResponseType<unknown>;
