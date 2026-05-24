"use client";

import React, { useRef } from "react";

import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import ModalContent from "@/widgets/common/ui/ModalComponent";
import {
    useDeleteInvitationCodeQuery,
    useGetInvitationCodeListOnManagerQuery,
    usePatchInvitationCodeQuery,
    useSetInvitationCodeQuery,
} from "@/entities/invitation/api/invitation.query";
import {
    InvitationCodeListItem,
    patchInvitationCodePayloadType,
    setInvitationCodePayloadType,
} from "@/entities/invitation/model/invitation.type";
import { util } from "@/shared/lib/util";
import ManagerPageShell from "@/widgets/manager/ui/ManagerPageShell";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";

const InvitationManager = () => {
    const invitationCodeCreateValueRef = useRef<setInvitationCodePayloadType>({ is_active: false, expire_at: "" });

    const { data: getInvitationCodeListData, isLoading } = useGetInvitationCodeListOnManagerQuery();
    const { mutate: setInvitationCodeFetch } = useSetInvitationCodeQuery();
    const { mutate: patchInvitationCodeFetch } = usePatchInvitationCodeQuery();
    const { mutate: deleteInvitationCodeFetch } = useDeleteInvitationCodeQuery();

    const { setModal } = useModalStore();

    const resetCreateValue = () => (invitationCodeCreateValueRef.current = { is_active: true, expire_at: "" });

    const createInvitationModal = () =>
        setModal({
            type: "CHECK",
            title: "초대코드 생성",
            content: (
                <ModalContent.Invitation.AddInvitationCode
                    onChange={(e) => (invitationCodeCreateValueRef.current = e)}
                />
            ),
            cancel: { text: "닫기" },
            confirm: {
                text: "확인",
                onClick: () => {
                    setInvitationCodeFetch(invitationCodeCreateValueRef.current);
                    resetCreateValue();
                },
            },
            isOpen: true,
        });

    const deleteInvitationModal = (info: InvitationCodeListItem) =>
        setModal({
            type: "CHECK",
            title: "초대코드를 삭제할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">삭제 대상: {info.code}</p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "삭제하기",
                onClick: () => deleteInvitationCodeFetch({ id: info.id }),
            },
            isOpen: true,
        });

    const list = getInvitationCodeListData?.result ?? [];

    return (
        <ManagerPageShell
            title="초대코드 관리"
            description="회원가입에 사용되는 초대코드를 발급·관리합니다."
            action={
                <UI.Button
                    className="shrink-0 px-[1.6rem] py-[0.8rem] rounded-[0.8rem] bg-[var(--color-brand-500)] text-white font-medium shadow-[var(--shadow-normal)]"
                    onClick={createInvitationModal}
                >
                    + 생성
                </UI.Button>
            }
        >
            {isLoading ? (
                <ManagerListSkeleton />
            ) : list.length === 0 ? (
                <UI.Empty title="등록된 초대코드가 없습니다" className="opacity-100" />
            ) : (
                <section className="flex flex-col w-full gap-[1.2rem]">
                    {list.map((item) => (
                        <article
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem]"
                        >
                            <div className="flex flex-col gap-[0.2rem]">
                                <span className="text-[1.2rem] text-[var(--color-gray-500)]">활성화</span>
                                <UI.Switch
                                    states={item.is_active}
                                    onChange={(enabled) =>
                                        patchInvitationCodeFetch({
                                            is_active: enabled,
                                            id: item.id,
                                            expire_at: item.expire_at,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
                                <p className="text-[1.6rem] font-bold font-mono tracking-wide break-all">
                                    {item.code}
                                </p>
                                <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                                    생성일 {util.string.getCurrentDate(item.created_at)}
                                </p>
                                {item.expire_at ? (
                                    <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                                        만료일 {util.string.getCurrentDate(item.expire_at)}
                                    </p>
                                ) : null}
                            </div>

                            <UI.Button
                                className="sm:self-center bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-600)]"
                                onClick={() => deleteInvitationModal(item)}
                            >
                                삭제
                            </UI.Button>
                        </article>
                    ))}
                </section>
            )}
        </ManagerPageShell>
    );
};

export default InvitationManager;
