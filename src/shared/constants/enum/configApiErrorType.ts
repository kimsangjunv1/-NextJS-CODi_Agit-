export enum CommonApiErrorType {
    ERROR_NO_APP_CARD_PROCESS = -998,
    ERROR_CANT_USE = -999
}

export enum KqrStoreConfigErrorType {
    // 0: 저장 성공
    // -99: Unhandeld exception
    // -98: 쿠폰 저장 설정 OFF
    // -97: 결제해야할 상품이 남음
    // -96: 기본 차감값보다 적은 값이 남음
    // -95: 결제해야할 금액이 남음
    // (-94: - KQR의 경우 없음)
    // -93: 이용권 사용 시 저장 불가 (이용권은 구독 요금제 같은 상품)
    // -92: 저장쿠폰 사용 불가 시간
    // -91: SP 오류 (-99와 동일한 처리 필요)
    // -90: 처음 결제한 사람이 아님 (sp: -99, 임의 수정)
    // -89: 다른 기기에서 충전 (sp: -100, 임의 수정)

    FOUND_UNHANDLED_EXCEPTION = -99,
    FOUND_COUPON_SAVE_OPTION_OFF = -98,
    FOUND_UNPAID_PRODUCT_EXISTS = -97,
    FOUND_SAVE_VALUE_LOWER_THAN_DEFAULT = -96,
    FOUND_REMAINING_PAYMENT_AMOUNT = -95,
    FOUND_ROOM_NOTHING_CHARGE = -94,
    FOUND_NOT_SAVE_FOR_VOUCHER = -93,
    FOUND_SAVE_NOT_ALLOWED_AT_THIS_TIME = -92,
    FOUND_SP_ERROR = -91,
    FOUND_FIRST_PURCHASER_REQUIRED = -90,
    FOUND_CHARGE_ON_OTHER_DEVICE = -89,
    FOUND_SAVE_IN_FIVE_MINUTES = -88,
    FOUND_SERVICE_HISTORY = -87,
}

export enum KqrLoginErrorType {
    FOUND_ID = -96,
    FOUND_NOTHING = -97,
    FOUND_SOMETHING_ERROR = -98,
}
