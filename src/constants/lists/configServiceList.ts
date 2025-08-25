import { ServiceDesc, ServiceRoute, ServiceTitle } from "@/constants/enum/configServiceList"

export const menuList = {
    home: [
        {
            title: ServiceTitle.HOME,
            route: ServiceRoute.HOME,
            desc: ServiceDesc.HOME,
            icon: "home",
        },
        {
            title: ServiceTitle.PRODUCT,
            route: ServiceRoute.PRODUCT,
            desc: ServiceDesc.PRODUCT,
            icon: "box",
        },
        {
            title: ServiceTitle.ACCOUNT,
            route: ServiceRoute.ACCOUNT,
            desc: ServiceDesc.ACCOUNT,
            icon: "user",
        },
        {
            title: ServiceTitle.MILEAGE,
            route: ServiceRoute.MILEAGE,
            desc: ServiceDesc.MILEAGE,
            icon: "profit",
        },
        {
            title: ServiceTitle.EVENT,
            route: ServiceRoute.EVENT,
            desc: ServiceDesc.EVENT,
            icon: "home",
        },
        {
            title: ServiceTitle.SETTING,
            route: ServiceRoute.SETTING,
            desc: ServiceDesc.SETTING,
            icon: "setting",
        },
        {
            title: ServiceTitle.ALIM_TALK,
            route: ServiceRoute.ALIM_TALK,
            desc: ServiceDesc.ALIM_TALK,
            icon: "setting",
        },
        {
            title: ServiceTitle.KIOSK,
            route: ServiceRoute.KIOSK,
            desc: ServiceDesc.KIOSK,
            icon: "setting",
        },
        {
            title: ServiceTitle.PLAN_STATUS,
            route: ServiceRoute.PLAN_STATUS,
            desc: ServiceDesc.PLAN_STATUS,
            icon: "setting",
        },
        {
            title: ServiceTitle.PLAN_SELECT,
            route: ServiceRoute.PLAN_SELECT,
            desc: ServiceDesc.PLAN_SELECT,
            icon: "setting",
        },
    ],
}

export const tabList = {
    event: [
        {
            title: "이벤트 관리",
            value: 1,
        },
        {
            title: "팝업 설정",
            value: 2,
        },
    ],

    product: [
        {
            title: "상품 분류 관리",
            value: 1,
            route: "/product/category"
        },
        {
            title: "상품 조회",
            value: 2,
            route: "/product/info"
        },
        {
            title: "키오스크 노출 상품",
            value: 3,
            route: "/product/kiosk"
        },
    ],

    account: [
        {
            title: "상품 분류 관리",
            value: 1,
        },
        {
            title: "상품 조회",
            value: 2,
        },
        {
            title: "키오스크 노출 상품",
            value: 3,
        },
    ],

    alimtalk: [
        {
            title: "기본 설정",
            value: 1
        },
        {
            title: "알림톡 충전",
            value: 2
        },
        {
            title: "알림톡 바로 전송",
            value: 3
        },
        {
            title: "발송 내역 조회",
            value: 4
        },
        {
            title: "계좌 및 충전내역",
            value: 5
        },
    ],

    kiosk: [
        {
            title: "상태",
            value: 1
        },
        {
            title: "결제수단",
            value: 2
        },
        {
            title: "프린트 설정",
            value: 3
        },
        {
            title: "포장백 설정",
            value: 4
        },
    ],
}