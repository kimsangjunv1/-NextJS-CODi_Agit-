export enum FitCollaboRoutes {
    GET_PAYCARD_LIST= "/Api/FitCollabo/getPayCardList",
    REQ_PART_PAYMENT= "/Api/FitCollabo/partPayment",
    REQ_AUTH_DATA_PAY= "/Api/FitCollabo/reqAuthDatapay",
    REQ_APPCARD_PAYMENT= "/Api/FitCollabo/appcardPayment",
    REQ_APPCARD_CANCEL= "/Api/FitCollabo/reqCancelApproval",
    REQ_TID= "/Api/FitCollabo/requestTid",
    
    GET_KQR_STORE_CONFIG= "/Api/KQR/v1/GetStoreConfig",
    GET_KQR_APPROVAL= "/Api/KQR/v1/sales/data/approval",
    GET_KQR_TIME_BASED= "/Api/KQR/v1/appcard/approval/timebased",
}