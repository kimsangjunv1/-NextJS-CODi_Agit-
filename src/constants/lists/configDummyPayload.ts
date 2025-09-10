export const DUMMY_GET_DASHBOARD_PAYLOAD = {
  StoreIdx: 26,
  StartDate: "",
  EndDate: "",
  PageSize: 100,
  PageNum: 1
}

export const DUMMY_SALES_DETAILS_PAYLOAD_DEV = ({
    StoreIdx = 15,
    StartDate = "2024-08-29T00:00:00.000Z",
    EndDate = "2025-08-29T00:00:00.000Z",

    SearchText = "",
    TypeIdx = 0,

    PageSize = 10,
    PageNum = 1,
}: {
    StoreIdx?: number;
    StartDate?: string;
    EndDate?: string;

    TypeIdx?: number;
    SearchText?: string;

    PageSize?: number,
    PageNum?: number,
}) => {
    return {
        StartDate: StartDate,
        EndDate: EndDate,
        PageSize: PageSize,
        PageNum: PageNum,
        TypeIdx: TypeIdx,
        ProdGroupIdx: 0,
        OrderIdx: 0,
        TaxType: "",
        EasyPayment: "",
        SearchText: SearchText,
        requiredParam: {
            StoreIdx: StoreIdx,
            ModDate: "2025-08-29T00:00:00.000Z"
        }
    }
}

export const DUMMY_SALES_DETAILS_PAYLOAD = {
    StartDate: "2024-08-29T00:00:00.000Z",
    EndDate: "2025-08-29T00:00:00.000Z",
    PageSize: 10,
    PageNum: 1,
    TypeIdx: 0,
    ProdGroupIdx: 0,
    OrderIdx: 0,
    TaxType: "",
    EasyPayment: "",
    SearchText: "",
    requiredParam: {
        StoreIdx: 15,
        ModDate: "2025-08-29T00:00:00.000Z"
    }
}

export const DUMMY_GET_VACS_HIST_VIEW_PAYLOAD = {
    requiredParam: {
        StoreIdx: 15,
        ModDate: "2025-08-27T11:36:29.754Z"
    },
    TranKind: "string",
    StartDate: "2023-08-27T11:36:29.754Z",
    EndDate: "2025-08-27T11:36:29.754Z",
    PageSize: 20,
    PageNum: 1
}

export const DUMMY_GET_PREPAID_CASH_SALES_DATA = {
    StoreIdx: 26,
    StartDate: "2025-08-27T11:36:29.754Z",
    EndDate: "2025-08-27T11:36:29.754Z",
    PhoneNo: "",
    IsRefunded: true,
    PageSize: 100,
    PageNum: 1
}

export const DUMMY_PROD_KIND_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-26T02:53:12.029Z"
}

export const DUMMY_PAYLOAD_MEMBER_DETAILS = {
    StartDate: "",
    EndDate: "",
    StoreId: 5,
    MemberId: "",
    RewardType: "포인트",
    PageSize: 100,
    PageNum: 1,
};

export const DUMMY_GET_MEMBER_DATA = {
    StoreIdx: 26,
    MemberId: "",
    PageSize: 100,
    PageNum: 1
}

export const DUMMY_GET_REWARD_STORE_CONFIG_PAYLOAD = {
    StoreId: 26,
    MemberId: "string",
    AfterMemberId: "string",
    RewardType: "string",
    TranType: "string",
    TranValue: 0,
    MemberIdx: 0,
    TranMemo: "string",
    TranUserId: "string",
    TranUserName: "string",
    RefKey: "string",
    RefData: "string",
    TotalAmount: 0,
    ApprovalKey: "string"
}

export const DUMMY_GET_STORE_CONFIG_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-26T06:17:27.566Z"
}

export const DUMMY_GET_EVENT_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-25T14:07:52.269Z"
}

export const DUMMY_MENU_GROUD_LIST_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-31T08:57:01.521Z"
}

export const DUMMY_PROD_GROUP_KIND_TYPE_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-27T13:37:59.847Z"
}

export const DUMMY_GET_MANAGER_LIST_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-30T16:29:49.383Z"
}

export const DUMMY_GET_BARCODE_AUTO_PAYLOAD = {
    StoreIdx: 26,
    ModDate: "2025-08-30T16:29:49.383Z"
}

export const DUMMY_MENU_GROUP_PROD_LIST_PAYLOAD = ({
    storeIdx = 26,
    MenuGroupIdx = 0,
    ProdKindIdx = 0,
    SearchText = ""
}: {
    storeIdx?: number, 
    MenuGroupIdx?: number, 
    ProdKindIdx?: number, 
    SearchText?: string
}) => {

    return {
        LengTypeIdx: 0,
        // MenuGroupIdx: MenuGroupIdx,
        MenuGroupIdx: 58959,
        ProdKindIdx: ProdKindIdx,
        SearchText: SearchText,
        PageSize: 0,
        PageNum: 0,
        requiredParam: {
            StoreIdx: storeIdx,
            ModDate: "2025-08-27T13:15:18.287Z"
        }
    }
}

export const DUMMY_GET_SALES_DETAILS_LIST_PAYLOAD = {
    StoreIdx: 26,
    OrderIdx: 10291193
}

export const DUMMY_PROD_GROUP_LIST_PAGING = {
    ProdKindTypeIdx: [
        51178
    ],
    ProdType: 0,
    ProdIdx: 0,
    SearchText: "",
    PageSize: 10,
    PageNum: 1,
    requiredParam: {
        StoreIdx: 26,
        ModDate: "2025-08-27T13:35:10.948Z"
    }
}

export const DUMMY_PATCH_PROD_GROUPS_PAYLOAD = {
    requiredParam: {
        StoreIdx: 26,
        ModDate: "2025-09-06T10:53:18.308Z"
    },
    patchProdGroups: [
        // {
        //     Idx: 0,
        //     KindTypeIdx: 0,
        //     ProdGroupName: "string",
        //     SalePrice: 0,
        //     PurchasePrice: 0,
        //     IsTaxFree: 0,
        //     BarCode: "string",
        //     StockCount: 0
        // }
    ]
}

export const DUMMY_GET_PREPAID_CASH_PROD_PAYLOAD = {
    StoreIdx: 26
}
