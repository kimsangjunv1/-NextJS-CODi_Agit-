export interface CommonServerResponse {
    header: {
        IsSuccessful: boolean;
        ResultCode: number;
        ResultMsg: string;
        pageNum: number;
        pageSize: number;
        totalCount: number;
    };
    body: any;
}

export interface SetUserLoginType {
    Id: string;
    Pw: string;
    deviceInfo: {
        LocalSystemDate: string;
        SerialNo: string;
        SubSerialNo: string;
        ExternalIp: string;
        InternalIp: string;
        MacAddress: string;
        HostName: string;
    };
}