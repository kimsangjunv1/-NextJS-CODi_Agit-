export enum ServiceTitle {
    HOME        = "대시보드",
    PRODUCT     = "상품관리",
    ACCOUNT     = "회원・리워드 관리",
    MILEAGE     = "결제·정산 관리",
    EVENT       = "이벤트",
    SETTING     = "설정",
    ALIM_TALK   = "알림톡(임시)",
    KIOSK       = "키오스크 설정(임시)",
    PLAN_SELECT        = "요금제 선택(임시)",
    PLAN_STATUS        = "요금제 현황(임시)",
}

export enum ServiceDesc {
    HOME        = "매장 운영 현황과 주요 지표를 한눈에 확인하세요.",
    PRODUCT     = "상품을 관리할수있는 페이지에요.",
    ACCOUNT     = "고객 회원 정보 조회 및 관리가 가능합니다.",
    MILEAGE     = "결제·정산 관리 적립 및 사용 내역을 관리하세요.",
    EVENT       = "진행 중인 이벤트를 확인하고 새 이벤트를 등록하세요.",
    SETTING     = "매장 환경 및 서비스 설정을 변경할 수 있습니다.",
    ALIM_TALK   = "알림톡과 관련된 서비스 설정을 변경 할 수 있습니다.",
    KIOSK       = "키오스크 설정과 관련된 서비스 설정을 변경 할 수 있습니다.",
    PLAN_SELECT        = "플랜 서비스 선택을 변경 할 수 있습니다.",
    PLAN_STATUS        = "플랜 서비스 상태를 변경 할 수 있습니다.",
}

export enum ServiceRoute {
    HOME                 = "/",
    PRODUCT              = "/product",
    ACCOUNT              = "/account",
    MILEAGE              = "/mileage",
    EVENT                = "/event",
    SETTING              = "/settings",
    ALIM_TALK            = "/alimtalk",
    KIOSK                = "/kiosk",
    PLAN_SELECT                 = "/plan/select",
    PLAN_STATUS                 = "/plan/status",
}