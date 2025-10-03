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
    const [ selectedMenu, setSelectedMenu ] = useState<number>(1);

    const SelectedTabContent = ( value: number ) => {
        switch ( value ) {
            case 1:
                return <LoginForm />
        
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
    const [ initGlow, setInitGlow ] = useState(false);
    const [ currentValue, setCurrentValue ] = useState({
        email: '',
        password: '',
    });

    const { pushToUrl, replaceToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const DEFAULT_PATH = "/"
        // const DEFAULT_PATH = "/home"

        // 현재 URL의 query에서 callbackUrl 가져오기
        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") ?? DEFAULT_PATH; // 기본 이동

        const res = await signIn("credentials", {
            redirect: false,
            email: currentValue.email,
            password: currentValue.password,
            callbackUrl,
        });

        if (res?.ok && res.url) {
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
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
                        <Item
                            type="text"
                            title="아이디"
                            placeholder="아이디"
                            onChange={(e) =>
                                setCurrentValue(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            }
                        />
                        
                        <Item
                            type="password"
                            title="비밀번호"
                            placeholder="비밀번호"
                            onChange={(e) =>
                                setCurrentValue(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))
                            }
                        />
                    </section>
                    {/* 바디 END */}

                    {/* 푸터 */}
                    <section className='flex flex-col gap-[0.8rem] justify-center w-full'>
                        <UI.Button
                            type='submit'
                            className='bg-[var(--color-gray-1000)] text-white py-[1.6rem] rounded-[1.6rem] shadow-[var(--shadow-normal)] flex-1'
                        >
                            로그인
                        </UI.Button>
                        
                        <UI.Button
                            onClick={() => pushToUrl("/signup")}
                            className='bg-white text-black py-[1.6rem] rounded-[1.6rem] shadow-[var(--shadow-normal)] flex-1'
                        >
                            회원가입
                        </UI.Button>
                    </section>
                    {/* 푸터 END */}

                    { !initGlow ? (
                        <motion.div
                            key={`glow-${ initGlow }`}
                            className="absolute inset-0 z-10 pointer-events-none blur-[10px]"
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 10, opacity: -10 }}
                            transition={{ duration: 3, ease: "easeOut", repeat: 0 }}
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-gray-500) 20%, rgba(255,255,255,0) 70%)",
                                borderRadius: "50%",
                                transformOrigin: "center"
                            }}
                            onAnimationComplete={() => setInitGlow(true)}
                        />
                    ) : "" }
                </motion.form>
            </article>
        </Fragment>
    )
}

const Item = ({ type, title, description, placeholder, onChange }: { type: string, title: string, description?: string, placeholder: string, onChange: (e: any) => void }) => {
    return (
        <section className='flex flex-col gap-[0.8rem]'>
            <div className='flex items-center gap-[0.8rem]'>
                <p>{ title }</p>
                { description && (
                    <p className='text-[1.2rem] text-[var(--color-gray-500)]'>{ description }</p>
                )}
            </div>
            <UI.Input
                type={ type }
                placeholder={ placeholder }
                onChange={ onChange }
            />
        </section>
    )
}

export default ListSection