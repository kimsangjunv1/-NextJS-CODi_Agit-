"use client"

import React, { Fragment, useState } from 'react'

import { useModalStore } from '@/stores/useModalStore'
import { tabList } from '@/constants/lists/configServiceList'

import UI from '@/components/common/UIComponent'

import IconComponent from '@/components/common/IconComponent'
import ModalContent from '@/components/common/ModalComponent'
import ButtonComponent from '@/components/common/ButtonComponent'
import { signIn } from 'next-auth/react'
import useNavigate from '@/hooks/common/useNavigate'
import { useToastStore } from '@/stores/useToastStore'

const ListSection = () => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null);
    const [ selectedMenu, setSelectedMenu ] = useState<number>(1);
    const DATA_DUMMY_CATE = [
        {
            title: "키오스크 A",
            value: 1,
        },
        {
            title: "키오스크 B",
            value: 2,
        },
        {
            title: "키오스크 C",
            value: 3,
        },
        {
            title: "키오스크 D",
            value: 4,
        },
    ]

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
            {/* 탭 */}
            {/* <article id="tab" className="flex px-[2.0rem] gap-[1.2rem] items-center">
                <div className='border-b-[var(--color-gray-200)] border-b-2 w-full'>
                    <UI.Tab
                        list={ tabList.payment.history }
                        onClick={(e) => setSelectedMenu(e)}
                        defaultSelect={1}
                        className={{
                            container: "flex gap-[1.8rem]",
                            button: "p-[1.2rem]",
                            active: "border-b-2 border-b-[var(--color-gray-900)]"
                        }}
                    />
                </div>
            </article> */}
            {/* 탭 END */}

            {/* 기능 */}
            {/* <article id="function" className="px-[2.0rem] flex gap-[0.8rem] items-center">
                <UI.Input icon={ true } placeholder="이름으로 검색" onChange={(e) => console.log("e",e)} />
                <UI.Calendar
                    icon={ true }
                    isOpen={ modalOpen }
                    onClose={() => setModalOpen(false)}
                    onDateSelect={(date) => setSelectedDate(date)}
                />
                <p>~</p>
                <UI.Calendar
                    icon={ true }
                    isOpen={ modalOpen }
                    onClose={() => setModalOpen(false)}
                    onDateSelect={(date) => setSelectedDate(date)}
                />
            </article> */}
            {/* 기능 END */}

            {/* 목록 */}
            { SelectedTabContent( selectedMenu ) }
            {/* 목록 END */}
        </Fragment>
    )
}

// 탭: 상품 분류 관리
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const DEFAULT_PATH = "/home"

        // 현재 URL의 query에서 callbackUrl 가져오기
        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") ?? DEFAULT_PATH; // 기본 이동

        const res = await signIn("credentials", {
            redirect: false, // 자동 리다이렉트 끄기
            email,
            password,
            callbackUrl, // NextAuth가 내부적으로 redirect URL 계산
        });

        if (res?.ok && res.url) {
            // 세션 적용 잠깐 기다린 후 이동
            setTimeout(() => {
                replaceToUrl(res.url ?? DEFAULT_PATH);
            }, 100);
        } else {
            setToast({ msg: "아이디 혹은 비밀번호를 다시 확인해주세요", time: 2 });
        }
    };

    return (
        <article id="list" className="px-[2.0rem] bg-[linear-gradient(90deg,_#ffffff_10%,_var(--color-gray-100),_#ffffff_90%)] h-[100dvh] flex items-center justify-center">
            <form onSubmit={handleSubmit} className='bg-white p-[2.4rem] rounded-[2.4rem] flex flex-col gap-[2.4rem] max-w-[var(--size-mobile)] w-full'>
                <h2 className='font-bold text-center text-[1.8rem]'>아이머신 CEO 어드민</h2>

                {/* <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> */}
                <section className='flex flex-col gap-[1.6rem]'>
                    <section className='flex flex-col gap-[0.8rem]'>
                        <p>아이디</p>
                        <UI.Input
                            defaultValue='test@test.com'
                            placeholder='아이디'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>

                    <section className='flex flex-col gap-[0.8rem]'>
                        <p>비밀번호</p>
                        <UI.Input
                            defaultValue='1234'
                            type='password'
                            placeholder='비밀번호'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                </section>

                <UI.Button
                    type='submit'
                    className='bg-[var(--color-blue-1000)] text-white py-[1.6rem] rounded-[0.8rem]'
                >
                    로그인
                </UI.Button>

                <section className='flex flex-col gap-[0.4rem]'>
                    <p className='text-[var(--color-gray-500)]'>테스트 계정</p>
                    <p className='text-[var(--color-gray-500)]'>아이디: test@test.com</p>
                    <p className='text-[var(--color-gray-500)]'>비밀번호: 1234</p>
                </section>
            </form>
        </article>
    )
}

export default ListSection