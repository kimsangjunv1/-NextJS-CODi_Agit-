"use client"

import { signIn } from 'next-auth/react'
import React, { Fragment, useState } from 'react'
import { motion } from 'motion/react'

import UI from '@/components/common/UIComponent'
import useNavigate from '@/hooks/common/useNavigate'
import { useToastStore } from '@/stores/useToastStore'
import IconComponent from '@/components/common/IconComponent'
import { util } from '@/utils/util'

const ListSection = () => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null);
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
            { SelectedTabContent( selectedMenu ) }
            {/* 목록 END */}
        </Fragment>
    )
}

// 탭: 상품 분류 관리
const LoginForm = () => {
    return (
        <Fragment>
            <article
                id="list"
                className="px-[2.0rem] flex-1 flex flex-col gap-[2.4rem] bg-[linear-gradient(0deg,var(--color-gray-200)_80%,#00000000)] w-full items-center justify-center overflow-hidden"
            >
                <section>
                    <h2>아래 버튼을 클릭해 이동해주세요(임시)</h2>
                </section>

                <section className='flex gap-[1.6rem]'>
                    <Item title={"카테고리 관리"} url='/manager/category' />
                    <Item title={"게시물 관리"} url='/manager/post' />
                    <Item title={"유저 관리"} url='/manager/user' />
                    <Item title={"댓글 관리"} url='/manager/comment' />
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