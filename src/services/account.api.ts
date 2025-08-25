import { clientFetch } from "@/services/client";
import {
    GetEvents,
    GetMemberDetailsType,
    GetMemberSearchByHpType,
    PatchEvents,
    SetEvent,
    SetProdGroupRewardAllType,
    SetRewardStoreConfigType,
    SetStoreConfig
} from "@/types/account.type";

// 회원 - 회원 조회 - 검색
export const getMemberSearchByHpFetch = (data: GetMemberSearchByHpType) =>
    clientFetch("/api/v1/get/MemberSearchHp", { method: "POST", body: data });

// 회원 - 회원 조회 - 리스트
export const getMemberDetailsFetch = (data: GetMemberDetailsType) =>
    clientFetch("/api/v2/get/MemberDetails", { method: "POST", body: data });





// 회원 - 포인트 - 나머지 설정 값
export const setRewardStoreConfigFetch = (data: SetRewardStoreConfigType) =>
    clientFetch("/api/v1/set/RewardStoreConfig", { method: "POST", body: data });

// 회원 - 포인트 - 포인트 기본 적립률
export const setProdGroupRewardAllFetch = (data: SetProdGroupRewardAllType) =>
    clientFetch("/api/v1/set/ProdGroupRewardAll", { method: "POST", body: data });





// 회원 - 이벤트 - 이벤트 생성/수정
export const setEventFetch = (data: SetEvent) =>
    clientFetch("/api/v1/set/Event", { method: "POST", body: data });

// 회원 - 이벤트 - 이벤트 진행 여부 수정/삭제
export const patchEventFetch = (data: PatchEvents) =>
    clientFetch("/api/v1/set/Event", { method: "POST", body: data });

// 회원 - 이벤트 - 이벤트 목록 조회
export const getEventFetch = (data: GetEvents) =>
    clientFetch("/api/v1/set/Event", { method: "POST", body: data });

// 회원 - 이벤트 - 이벤트 생성/수정
export const setStoreConfigFetch = (data: SetStoreConfig) =>
    clientFetch("/api/v1/set/Event", { method: "POST", body: data });






// 회원 - 알림톡 - 기본설정 - 알림톡 설정 값 저장
export const setRewardStoreConfigEachFetch = (data: SetStoreConfig) =>
    clientFetch("/api/v1/set/RewardStoreConfigEach", { method: "POST", body: data });

// 회원 - 알림톡 - 기본설정 - 알림톡 설정 값 저장
export const getRewardStoreConfigFetch = (data: SetStoreConfig) =>
    clientFetch("/api/v1/get/RewardStoreConfig", { method: "POST", body: data });

// 회원 - 알림톡 - 계좌 및 충전내역
export const getVacsHistViewFetch = (data: SetStoreConfig) =>
    clientFetch("/api/v2/get/VacsHistView", { method: "POST", body: data });
// 회원 - 알림톡 - 없음
// 회원 - 알림톡 - 없음