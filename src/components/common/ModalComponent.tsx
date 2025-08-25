"use client"

import { format } from "date-fns";
import { section } from 'motion/react-client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import IconComponent from '@/components/common/IconComponent';
import UI from "./InputComponent";
// ui/index.ts

interface CalendarModalProps {
    className?: string;
    isOpen: boolean;
    icon?: boolean;
    onClose: () => void;
    onDateSelect: (date: Date) => void;
}

const Radio = ({ list, defaultValue = 0, className, onChange }: { list: { value: any, title: string }[], defaultValue: any, className?: { container: string, button: string }, onChange: (e: number ) => void }) => {
    const [ currentSelected, setCurrentSelected ] = useState<number>( defaultValue );
    
    const DUMMY = [
        {
            title: "설정된 리스트가 없습니다.",
            value: 0,
        }
    ]
    return (
        <section className={`flex gap-[1.2rem] ${ className?.container ?? "" }`}>
            {( list ?? DUMMY ).map((e, i) =>
                <button
                    key={i}
                    type="button"
                    className={`item flex items-center gap-[0.8rem] p-[0.4rem] hover:bg-[var(--color-gray-200)] rounded-[0.8rem] transition-colors ${ className?.button ?? "" }`}
                    onClick={() => {
                        setCurrentSelected( e.value );
                        onChange( e.value );
                    }}
                >
                    <div className={`w-[1.8rem] h-[1.8rem] relative rounded-full ${ currentSelected === e.value ? "bg-[var(--color-blue-1000)]" : "border border-[var(--color-gray-400)]" }`}>
                        <div className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-full w-[0.6rem] h-[0.6rem] ${ currentSelected === e.value ? "bg-white" : "bg-transparent" }`} />
                    </div>
                    <p className="font-medium">{ e.title }</p>
                </button>
            )}
        </section>
    )
}

// 이벤트: 이벤트 추가
const AddEvent = () => {
    return (
        <article className="flex flex-col gap-[1.6rem]">
            <section className="flex flex-col gap-[1.2rem]">
                <p>상품 분류*</p>
                <UI.FileUpload
                    onChange={(e) => console.log("e", e)}
                    placeholder="배너 이미지를 추가해주세요."
                    buttonText="이미지 추가"
                />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>상품 분류*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>상품명*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>판매 금액*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>재고 현황</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>매입가/과세</p>
                
                <section className="flex gap-[0.8rem]">
                    <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
                    <UI.CheckBox onChange={(e) => console.log("e", e)} guide="비과세" />
                </section>
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>바코드 번호</p>
                
                <section className="flex gap-[0.8rem]">
                    <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
                    <button type="button">자동 생성</button>
                </section>
            </section>
        </article>
    )
}

const Switch = ({ status = false }: { status: boolean }) => {
    const [ currentStatus, setCurrentStatus ] = useState(status);

    return (
        <section className="switch bg-[var(--color-gray-100)] rounded-[0.8rem] p-[0.4rem]">
            <button type="button" className={`${ currentStatus ? "" : "bg-[var(--color-gray-50)]" }`} />
            <button type="button" className={`${ currentStatus ? "bg-[var(--color-gray-50)]" : "" }`} />
        </section>
    );
};

// 회원: 회원 상세정보
const Detail = () => {
    const STYLE_ROW = "flex justify-between";

    return (
        <article className="flex flex-col">
            <section className="flex flex-col gap-[1.2rem]">
                <div className={ STYLE_ROW }>
                    <p className='text-[var(--color-gray-600)]'>연락처</p>
                    <p>999원</p>
                </div>
                
                <div className={ STYLE_ROW }>
                    <p className='text-[var(--color-gray-600)]'>마일리지</p>
                    <p>골드</p>
                </div>

                <div className={ STYLE_ROW }>
                    <p className='text-[var(--color-gray-600)]'>누적 결제액</p>
                    <p>1,000,000원</p>
                </div>
            </section>
        </article>
    )
}

// 상품: 분류 추가
const AddCategory = () => {
    return (
        <article className="flex flex-col">
            <section className="flex flex-col gap-[1.2rem]">
                <p>상품 분류*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>
        </article>
    )
}

// 상품: 분류 추가
const AddProduct = () => {
    return (
        <article className="flex flex-col gap-[1.6rem]">
            <section className="flex flex-col gap-[1.2rem]">
                <p>상품 분류*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>상품명*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>판매 금액*</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>재고 현황</p>
                <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>매입가/과세</p>
                
                <section className="flex gap-[0.8rem]">
                    <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
                    <UI.CheckBox onChange={(e) => console.log("e", e)} guide="비과세" />
                </section>
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <p>바코드 번호</p>
                
                <section className="flex gap-[0.8rem]">
                    <UI.Input onChange={(e) => console.log("e", e)} placeholder="분류명을 입력하세요." className="h-[4.2rem]" />
                    <button type="button">자동 생성</button>
                </section>
            </section>
        </article>
    )
}

const ModalContent = {
    Event: {
        Switch,
        AddEvent
    },
    Account: {
        Detail,
    },
    Product: {
        AddCategory,
        AddProduct
    }
}

export default ModalContent