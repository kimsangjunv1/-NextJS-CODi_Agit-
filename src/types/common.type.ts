export interface ApiHeaderResponseType {
    resultMsg: string;       // 결과 메시지
    resultCode: number;      // 상태 코드 (HTTP 200 등)
    isSuccessful: boolean;   // 성공 여부
    timestamp: string;       // ISO 8601 형식의 생성 시각
}

export interface ApiPaginationResponseType {
    totalCount: number;
    pageSize: number;
    pageNum: number;
}