export interface GetMemberDetailsType {
    StartDate: string;
    EndDate: string;
    StoreId: number;
    MemberId: string;
    RewardType: string;
    PageSize: number;
    PageNum: number;
}

export interface GetMemberSearchByHpType {
    Id: string;
    Pw: string;
    DeviceInfo: {
        LocalSystemDate: string;
        SerialNo: string;
        SubSerialNo: string;
        ExternalIp: string;
        InternalIp: string;
        MacAddress: string;
        HostName: string;
    };
    StoreId: number;
    MemberId: string;
    RewardType: string;
    TranType: string;
    TranValue: number;
    TranMemo: string;
    TranUserId: string;
    TranUserName: string;
    RefKey: string;
    RefData: string;
    TotalAmount: number;
    ApprovalKey: string;
    ApprovalType: string;
}


export interface SetRewardStoreConfigType {
    StoreId: number;
    DayAccumCount: number;
    Configs: {
        ConfigKey: string;
        ConfigValue: string;
    }[];
    IssuableTimes: {
        IsEnabled: number;
        WeekDayId: number;
        StartTime: string;
        EndTime: string;
        RewardType: string;
    }[];
    Coupons: {
        ProdIdx: string;
        ProdName: string;
        UseTempCount: number;
        SortNo: number;
    }[];
}

export interface SetProdGroupRewardAllType {
    requiredParam: {
        StoreIdx: number;
        ModDate: string;
    };
    Config: {
        ProdGroupIdx: number;
        ProdKindType: string;
        ProdGroupName: string;
        SalePrice: number;
        RewardType: string;
        RewardValue: number;
        IsEarned: number;
    };
}

export interface SetEvent {
    StoreIdx: number;
    EventIdx: number;
    EventName: string;
    IsEnabled: number;
    EventDescription: string;
    ContentSourceName: string;
    StartDate: string;
    EndDate: string;
    ProdKindType: number;
    ProdGroupCount: number;
    EventType: string;
    EventValue: number;
    IsDeleted: number;
    SortNo: number;
}

export interface PatchEvents {
    StoreIdx: number;
    Events: {
        StoreIdx: number;
        EventIdx: number;
        EventName: string;
        IsEnabled: number;
        EventDescription: string;
        ContentSourceName: string;
        StartDate: string;
        EndDate: string;
        ProdKindType: number;
        ProdGroupCount: number;
        EventType: string;
        EventValue: number;
        IsDeleted: number;
        SortNo: number;
    }[];
}

export interface GetEvents {
    StoreIdx: number;
    ModDate: string;
}

export interface SetStoreConfig {
    StoreConfigs: {
        Idx: number;
        ConfigKey: string;
        ConfigValue: string;
        ConfigDescription: string;
    }[];
    requiredParam: {
        StoreIdx: number;
        ModDate: string;
    };
}