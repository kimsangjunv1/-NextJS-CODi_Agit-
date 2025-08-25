export enum NewSvcType {
    USE = 0,
    CHARGE = 1,
    OVERFLOW = 2,
    REGISTER = 3,
    AUTH = 4,
    QUICK_USE = 5,
    LOGIN = 6,
    VALIDATION = 7,
    COUPON = 8
}

export enum SvcListType {
    USE = 0,
    CHARGE = 1
}

export enum AccessKeyType {
    FIT_COLLABO = 1,
    IMACHINE = 2,
    SELFYO = 3,
    MMACHINE = 4,
}

// 서비스 환경 모드
export enum SvcEnv {
    MAIN = 0,
    CHARGE = 1,
    USE = 2,
    PAYMENT = 3
}

// 결제 타입
// 0 = 곡,시간,이용권
// 1 = 정액권
export enum PaymentModeType {
    USAGE_BASED = "C",
    FLAT_RATE = "M"
}

export enum ServiceType {
    USE_OR_CHARGE_COIN = 0,
    USE_OR_CHARGE_TIME = 1
}

export enum FlowType {
    ENTER = "0",
    EXIT_PAYMENT = "1",
    EXIT_RECEIPT = "2",
}