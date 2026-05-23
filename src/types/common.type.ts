export interface ApiPaginationResponseType {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiResponseType<T = unknown> {
    pagination: ApiPaginationResponseType | null;
    result: T;
    resultCode: string;
    resultMessage: string;
}

/** @deprecated ApiResponseType.resultCode / resultMessage 사용 */
export interface ApiHeaderResponseType {
    resultMsg: string;
    resultCode: number;
    isSuccessful: boolean;
    timestamp: string;
}
