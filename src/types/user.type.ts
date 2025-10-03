import { ApiPaginationResponseType } from "./common.type";

export interface setUserPayloadType {
    name: string;
    password: string;
    email: string;   
}

export interface setLoginPayloadType {
    password: string;
    email: string;   
}