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
    const [ initGlow, setInitGlow ] = useState(false);
    const [ currentValue, setCurrentValue ] = useState({
        Id: '',
        Pw: '',
    });

    const { replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const DEFAULT_PATH = "/plan/check"
        // const DEFAULT_PATH = "/home"

        // 현재 URL의 query에서 callbackUrl 가져오기
        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") ?? DEFAULT_PATH; // 기본 이동

        const res = await signIn("credentials", {
            redirect: false, // 자동 리다이렉트 끄기
            email: currentValue.Id,
            password: currentValue.Pw,
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
        <Fragment>
            <article
                id="list"
                className="px-[2.0rem] bg-[linear-gradient(90deg,_#ffffff_10%,_var(--color-gray-100),_#ffffff_90%)] h-[100dvh] w-full flex items-center justify-center overflow-hidden"
            >
                <motion.form
                    onSubmit={handleSubmit}
                    className='bg-white p-[2.4rem] rounded-[2.4rem] flex items-center flex-col gap-[2.4rem] max-w-[var(--size-mobile)] w-full shadow-[var(--shadow-normal)]'
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
                    {/* 헤더 */}
                    <section className='flex justify-center w-full'>
                        <IconComponent
                            type='graphic-logo-vertical'
                            alt='코디 아지트'
                            width={100}
                            height={106}
                        />
                    </section>
                    {/* 헤더 END */}
                    
                    {/* 바디 */}
                    <section className='w-full flex flex-col gap-[1.6rem]'>
                        <section className='flex flex-col gap-[0.8rem]'>
                            <p>아이디</p>
                            
                            <UI.Input
                                placeholder='아이디'
                                onChange={(e) => {
                                    setCurrentValue(prev => ({
                                        ...prev,
                                        Id: e.target.value
                                    }))
                                }}
                            />
                        </section>

                        <section className='flex flex-col gap-[0.8rem]'>
                            <p>비밀번호</p>
                            
                            <UI.Input
                                // defaultValue='1234'
                                type='password'
                                placeholder='비밀번호'
                                onChange={async(e) => {
                                    // setPassword(e.target.value)
                                    const hashedPw = await util.analyze.convertSha256(e.target.value);

                                    setCurrentValue(prev => ({
                                        ...prev,
                                        Pw: hashedPw
                                    }))
                                }}
                            />
                        </section>
                    </section>
                    {/* 바디 END */}

                    {/* 푸터 */}
                    <section className='flex justify-center w-full'>
                        <UI.Button
                            type='submit'
                            className='bg-[var(--color-gray-1000)] text-white py-[1.6rem] rounded-[1.6rem] shadow-[var(--shadow-normal)] flex-1'
                        >
                            로그인
                        </UI.Button>
                    </section>
                    {/* 푸터 END */}

                    { !initGlow ? (
                        <motion.div
                            key={`glow-${ initGlow }`}
                            className="absolute inset-0 z-10 pointer-events-none blur-[10px]"
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 10, opacity: -10 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                                repeat: 0,       // 무한 반복
                                // repeatType: "loop",
                            }}
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-gray-500) 20%, rgba(255,255,255,0) 70%)",
                                borderRadius: "50%",
                                transformOrigin: "center"
                            }}
                            onAnimationComplete={() => setInitGlow( true )}
                        />
                    ) : "" }
                </motion.form>
            </article>
        </Fragment>
    )
}

export default ListSection