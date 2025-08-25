export interface SetManagerType {
    StartDate: string;
    EndDate: string;
    StoreId: number;
    MemberId: string;
    RewardType: string;
    PageSize: number;
    PageNum: number;
    requiredParam: {
        StoreIdx: number;
        ModDate: string;
    };
    ManagerIdx: number;
    ManagerName: string;
    ManagerPW: string;
    InsDate: string;
}

export interface DeleteManagerType {
    Managers: {
        ManagerIdx: number;
        ManagerName: string;
        ManagerPW: number;
        InsDate: string;
    }[];
}

export interface GetManagerListType {
    StoreIdx: number;
    ModDate: string;
}