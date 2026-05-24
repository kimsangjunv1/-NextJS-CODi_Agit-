import { ApiPaginationResponseType } from "@/shared/model/common.type";

import { ApiResponseType } from "@/shared/model/common.type";

export interface setUserPayloadType {
    name: string;
    password: string;
    email: string;   
}

export interface setLoginPayloadType {
    password: string;
    email: string;   
}

export interface UserManagerItem {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export type GetUserManagerListResponseType = ApiResponseType<UserManagerItem[]>;