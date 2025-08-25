export enum KqrRoutes {
    // 스토어 관련
    GET_STORE_AUTH = "/api/KMachine/KQR/v1/StoreAuth",
    GET_STORE_CONFIG = "/api/KMachine/KQR/v1/StoreConfig",
    GET_CHECK_OPERATION_TIME = "/api/KMachine/KQR/v1/CheckOperationTime",  // 방 충전 리스트
    
    // 회원 관련
    POST_USER_LOGIN = "/api/KMachine/KQR/v1/UserLogin",
    POST_USER_SIGN_UP = "/api/KMachine/KQR/v1/UserSignUp",
    GET_USER_REMAINING = "/api/KMachine/KQR/v1/FetchUserRemaining",
    GET_USAGE_HISTORY = "/api/KMachine/KQR/v1/FetchUsageHistory",
    GET_USER_VALIDATION = "/api/KMachine/KQR/v1/UserValidation",
    
    // 쿠폰 관련
    POST_COUPON_USE = "/api/KMachine/KQR/v1/UseCoupon",
    POST_COUPON_SAVE = "/api/KMachine/KQR/v1/SaveCoupon",
    GET_COUPON_USED = "/api/KMachine/KQR/v1/UsedCoupon",
    GET_COUPON_AVAILABLE = "/api/KMachine/KQR/v1/AvailableCoupon",
    GET_USE_WAITING_TIME = "/api/KMachine/KQR/v1/FetchUseWaitingTime",
    
    // 곡 관련
    POST_COIN_USE = "/api/KMachine/KQR/v1/UseCoin",
    
    POST_COIN_CHARGE = "/api/KMachine/KQR/v1/ChargeCoin",
    GET_COIN_CHARGE_OPTION = "/api/KMachine/KQR/v1/FetchChargeCoinOption",
    
    // 시간 관련
    POST_TIME_USE = "/api/KMachine/KQR/v1/UseTime",
    GET_TIME_USE_OPTION = "/api/KMachine/KQR/v1/FetchUseTimeOption",
    
    POST_TIME_CHARGE = "/api/KMachine/KQR/v1/ChargeTime",
    GET_TIME_CHARGE_OPTION = "/api/KMachine/KQR/v1/FetchChargeTimeOption",
    
    // 금액 관련
    POST_CASH_USE = "/api/KMachine/KQR/v1/UseCash",
    GET_CASH_USE_OPTION = "/api/KMachine/KQR/v1/FetchUseCashOption",
    
    POST_CASH_CHARGE = "/api/KMachine/KQR/v1/ChargeCash",
    GET_CASH_CHARGE_OPTION = "/api/KMachine/KQR/v1/FetchChargeCashOption",
    
    // 즉시 사용 관련
    GET_ROOM_STATE = "/api/KMachine/KQR/v1/FetchRoomState",                 // 방 상태 관련
    POST_ROOM_CHARGE = "/api/KMachine/KQR/v1/ChargeRoom",                   // 방 충전
    GET_ROOM_CHARGE_OPTION = "/api/KMachine/KQR/v1/FetchChargeRoomOption",  // 방 충전 리스트

    ////
    ////
    ////
    // 멀티머신
    ////
    ////
    ////

    // 방 관련
    POST_CHECK_IN = "/api/kqr/v1/check-in",  // 체크인
    POST_GET_USAGE_STATE = "/api/kqr/v1/get-usage-state",  // 이용 상태 조회
    POST_TIMEBASED_CURRENT= "/api/kqr/v1/pricing-plan/timebased/current",  // 이용 상태 조회
}

// export enum CommonApiErrorType {
//     ERROR_NO_APP_CARD_PROCESS = -998,
//     ERROR_CANT_USE = -999
// }

// export enum KqrLoginErrorType {
//     FOUND_ID = -96,
//     FOUND_NOTHING = -97,
//     FOUND_SOMETHING_ERROR = -98,
// }