"use client"

import { motion } from 'motion/react'
import { signIn } from 'next-auth/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'

import useNavigate from '@/hooks/common/useNavigate'
import { useToastStore } from '@/stores/useToastStore'
import { useModalStore } from '@/stores/useModalStore'
import UI from '@/components/common/UIComponent'
import ModalContent from '@/components/common/ModalComponent'
import { useDeleteCategoryQuery, useGetCategoryListOnManagerQuery, useGetCategoryListQuery, usePatchCategoryQuery, useSetCategoryQuery } from '@/hooks/api/category.query'
import { CategoryItemManager, patchCategoryPayloadType, setCategoryPayloadType } from '@/types/category.type'
import { util } from '@/utils/util'
import { useDeleteInvitationCodeQuery, useGetInvitationCodeListOnManagerQuery, usePatchInvitationCodeQuery, useSetInvitationCodeQuery } from '@/hooks/api/invitation.query'
import { InvitationCodeListItem, patchInvitationCodePayloadType, setInvitationCodePayloadType } from '@/types/invitation.type'

const ListSection = () => {
    const [ selectedMenu, setSelectedMenu ] = useState<number>(1);

    const SelectedTabContent = ( value: number ) => {
        switch ( value ) {
            case 1:
                return <LoginForm />

            // case 2:
            //     return <RefundHistory />

            // case 3:
            //     return <PrintConfig />

            // case 4:
            //     return <PackageConfig />
        
            default:
                return <LoginForm />
        }
    }
    
    return (
        <Fragment>
            {/* 목록 */}
            <UI.ErrorBoundaryWrapper>
                { SelectedTabContent( selectedMenu ) }
            </UI.ErrorBoundaryWrapper>
            {/* 목록 END */}
        </Fragment>
    )
}

// 탭: 상품 분류 관리
const LoginForm = () => {
    const invitationCodeCreateValueRef = useRef<setInvitationCodePayloadType>({ is_active: false, expire_at: "" });
    const invitationCodePatchValueRef = useRef<patchInvitationCodePayloadType>({ id: 0, is_active: true, expire_at: "" });

    const { data: getInvitationCodeListData } = useGetInvitationCodeListOnManagerQuery();
    const { mutate: setInvitationCodeFetch } = useSetInvitationCodeQuery();
    const { mutate: patchInvitationCodeFetch } = usePatchInvitationCodeQuery();
    const { mutate: deleteInvitationCodeFetch } = useDeleteInvitationCodeQuery();

    const { setToast } = useToastStore();
    const { setModal } = useModalStore();

    const resetCreateValue = () => invitationCodeCreateValueRef.current = { is_active: true, expire_at: "" };
    const resetModifyValue = () => invitationCodePatchValueRef.current = { id: 0, is_active: true, expire_at: "" };
    
    const createCategoryModal = () => setModal({
        type: "CHECK",
        title: "초대코드 생성",
        content: (
            <ModalContent.Invitation.AddInvitationCode
                // info={ info }
                onChange={(e) => invitationCodeCreateValueRef.current = e}
            />
        ),
        cancel: { text: "닫기", },
        confirm: {
            text: "확인",
            onClick: () => {
                console.log("최종", invitationCodeCreateValueRef)
                setInvitationCodeFetch(invitationCodeCreateValueRef.current)
            }
        },
        isOpen: true
    });

    // const modifyCategoryModal = ( info: InvitationCodeListItem ) => setModal({
    //     type: "CHECK",
    //     title: "초대코드 수정",
    //     content: (
    //         <ModalContent.Post.ModifyCategory
    //             info={ info }
    //             onChange={(e) => categoryPatchValueRef.current = e}
    //         />
    //     ),
    //     cancel: { text: "닫기", },
    //     confirm: {
    //         text: "확인",
    //         onClick: () => {
    //             if ( !categoryPatchValueRef.current.title ) {
    //                 setToast({ msg: "카테고리 이름을 입력해주세요", time: 2 });

    //                 return false;
    //             }

    //             if ( !categoryPatchValueRef.current.description ) {
    //                 setToast({ msg: "카테고리 이름을 입력해주세요", time: 2 });
                    
    //                 return false;
    //             }

    //             console.log("PAYLOAD", categoryPatchValueRef.current)

    //             patchInvitationCodeFetch( categoryPatchValueRef.current )
    //             resetModifyValue();
    //         }
    //     },
    //     isOpen: true
    // });

    const deleteCategoryModal = ( info: InvitationCodeListItem ) => setModal({
        type: "CHECK",
        title: "초대코드를 삭제할까요?",
        content: (
            <article className="flex flex-col gap-[2.4rem]">
                <section className="flex flex-col gap-[1.2rem]">
                    <p>삭제될것: { info.code }</p>
                </section>
            </article>
        ),
        cancel: { text: "취소", },
        confirm: {
            text: "삭제하기",
            onClick: () => {
                const PAYLOAD = {
                    id: info.id
                }

                deleteInvitationCodeFetch(PAYLOAD)
            }
        },
        isOpen: true
    });

    // 메모용
    useEffect(() => {
        console.log("* 메모: 동일한 이름의 카테고리가 있으면 수정, 생성 막아야 함")
    }, [])

    return (
        <Fragment>
            <article
                id="list"
                className="px-[2.0rem] flex-1 flex flex-col gap-[2.4rem] w-full items-center justify-start overflow-hidden max-w-[var(--size-tablet)] mx-auto"
            >
                <section className='w-full'>
                    <h2>초대코드 관리</h2>
                </section>

                <section id='list' className='flex flex-col w-full gap-[1.6rem]'>
                    { getInvitationCodeListData ? getInvitationCodeListData.result.map((e, i) =>
                        <section key={i} className='flex gap-[0.8rem] bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] p-[1.2rem] flex-1'>
                            <section className='d'>
                                <UI.CheckBox
                                    // guide="d"
                                    className={{ container: "" }}
                                    onChange={(e) => console.log("e", e)}
                                />
                                <UI.Switch
                                    states={ e.is_active ? true : false }
                                    onChange={(event) => {
                                        const PAYLOAD = {
                                            is_active: event,
                                            id: e.id,
                                            expire_at: e.expire_at
                                        }
                                        patchInvitationCodeFetch( PAYLOAD );
                                        // setData(prev => prev.map((item) => item.id === e.id ? {...item, state: e.state} : item))
                                    }}
                                />
                            </section>

                            <section className='flex-1 description'>
                                <p>{ e.code }</p>
                                <p>{ util.string.getCurrentDate(e.created_at) }</p>
                            </section>

                            <section className='function flex gap-[0.8rem] items-center'>
                                <UI.Button
                                    className='bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[0.4rem] py-[0.2rem] text-[var(--color-gray-600)]'
                                    onClick={() => {
                                        deleteCategoryModal(e);
                                    }}
                                >
                                    삭제
                                </UI.Button>

                                {/* <UI.Button
                                    className='bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[0.4rem] py-[0.2rem] text-[var(--color-gray-600)]'
                                    onClick={() => {
                                        modifyCategoryModal(e);
                                    }}
                                >
                                    수정
                                </UI.Button> */}
                            </section>
                        </section>   
                    ) : "" }
                </section>

                <section id='action' className='w-full'>
                    <UI.Button
                        
                        onClick={() => createCategoryModal()}
                    >
                        생성하기
                    </UI.Button>
                </section>
            </article>
        </Fragment>
    )
}

const Item = ({ title, url }: { title: string, url: string }) => {
    const { replaceToUrl } = useNavigate();
    return (
        <motion.button
            type='button'
            onClick={() => replaceToUrl( url )}
            className='bg-white p-[2.4rem] rounded-[2.4rem] text-nowrap flex items-center flex-col gap-[2.4rem] max-w-[var(--size-mobile)] w-full shadow-[var(--shadow-normal)]'
            initial={{
                opacity: 0,
                scale: 0.8,
                filter: "blur(20px)"
            }}
            animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)"
            }}
            exit={{
                opacity: 0,
                scale: 0.8,
                filter: "blur(20px)"
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20
            }}
        >
            { title }
        </motion.button>
    )
}

export default ListSection