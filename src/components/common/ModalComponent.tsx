"use client"

import { useEffect, useState } from "react";

import UI from "@/components/common/UIComponent";
import { DUMMY_IMAGE_RESPONSE } from "@/constants/lists/configDummyResponse";
import { CategoryItemManager } from "@/types/category.type";

// 이미지: 관리

// 사진 업로드
// 업로드는 한번에 하나씩
// 업로드 하면 -> 링크 반환 -> 이미지 목록 담아두는 테이블에 저장 ->

// 컴포넌트 설계
// 사진 업로드 후 다시 현재 이미지 목록 Fetch
// 선택한 이미지 주소 onChange로 반환

// Response 값
// idx, create_at,  url
const Box = ({ onChange }: { onChange: (e: any) => void }) => {
    const [ selectedImage, setSelectedImage ] = useState<number>();

    return (
        <article className="flex flex-col gap-[1.6rem]">
            <section data-lenis-prevent="true" className="grid grid-cols-[1fr_1fr_1fr_1fr] pb-[3.2rem] h-[calc(1.6rem*10)] overflow-y-auto">
                { DUMMY_IMAGE_RESPONSE.map((e, i) =>
                    <UI.Button
                        key={i}
                        className={`h-[calc(1.6rem*2)] ${ e.idx === selectedImage ? "border border-[var(--color-brand-500)]" : "" }`}
                        onClick={() => {
                            onChange( e.url );
                            setSelectedImage( e.idx );
                        }}
                    >
                        <img src={ e.url } alt={ "사진" } />
                    </UI.Button>
                )}
            </section>
            <section className="">
                <UI.FileUpload
                    onChange={(e) => {
                        // updateBlock(rowIndex, blockIndex, { content: html })
                    }}
                    placeholder="배너 이미지를 추가해주세요."
                    buttonText="이미지 추가"
                />
            </section>
        </article>
    )
}

// 카테고리 생성 모달 내용
const AddCategory = ({ onChange }: { onChange: (e: any) => void }) => {
    const [ currentState, setCurrentState ] = useState({});

    useEffect(() => {
        onChange(currentState);
    }, [ currentState ])

    return (
        <article className="flex flex-col gap-[2.4rem]">
            <section className="flex flex-col gap-[1.2rem]">
                <section className='flex flex-col gap-[0.8rem]'>
                    <p className="text-[var(--color-gray-500)] font-medium">이름</p>
                </section>
                
                <section className='flex flex-col gap-[0.8rem]'>
                    <UI.Input
                        validationPattern={/^[\p{L}\p{N}\s]+$/u}
                        onChange={(e) => {
                            setCurrentState(prev => ({
                                ...prev,
                                title: e.target.value
                            }));
                        }}
                        placeholder="카테고리 이름을 입력해주세요"
                        className={{
                            container: "h-[4.2rem]"
                        }}
                    />
                </section>
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <section className='flex flex-col gap-[0.8rem]'>
                    <p className="text-[var(--color-gray-500)] font-medium">설명</p>
                </section>
                
                <section className='flex flex-col gap-[0.8rem]'>
                    <UI.Input
                        validationPattern={/^[\p{L}\p{N}\s]+$/u}
                        onChange={(e) => {
                            setCurrentState(prev => ({
                                ...prev,
                                description: e.target.value ?? ""
                            }));
                        }}
                        placeholder="카테고리에 대한 설명을 입력해주세요"
                        className={{
                            container: "h-[4.2rem]"
                        }}
                    />
                </section>
            </section>
        </article>
    )
}

// 카테고리 수정 모달 내용
const ModifyCategory = ({ info, onChange }: { info: CategoryItemManager, onChange: (e: any) => void }) => {
    const [ currentState, setCurrentState ] = useState({
        title: info.title,
        description: info.description,
        idx: info.idx,
        is_enabled: info.is_enabled
    });

    useEffect(() => {
        onChange(currentState);
    }, [ currentState, info ])

    return (
        <article className="flex flex-col gap-[2.4rem]">
            <section className="flex flex-col gap-[1.2rem]">
                <section className='flex flex-col gap-[0.8rem]'>
                    <p className="text-[var(--color-gray-500)] font-medium">이름</p>
                </section>
                
                <section className='flex flex-col gap-[0.8rem]'>
                    <UI.Input
                        defaultValue={ info.title }
                        validationPattern={/^[\p{L}\p{N}\s]+$/u}
                        onChange={(e) => {
                            setCurrentState(prev => ({
                                ...prev,
                                title: e.target.value
                            }));
                        }}
                        placeholder="카테고리 이름을 입력해주세요"
                        className={{
                            container: "h-[4.2rem]"
                        }}
                    />
                </section>
            </section>

            <section className="flex flex-col gap-[1.2rem]">
                <section className='flex flex-col gap-[0.8rem]'>
                    <p className="text-[var(--color-gray-500)] font-medium">설명</p>
                </section>
                
                <section className='flex flex-col gap-[0.8rem]'>
                    <UI.Input
                        defaultValue={ info.description }
                        validationPattern={/^[\p{L}\p{N}\s]+$/u}
                        onChange={(e) => {
                            setCurrentState(prev => ({
                                ...prev,
                                description: e.target.value ?? ""
                            }));
                        }}
                        placeholder="카테고리에 대한 설명을 입력해주세요"
                        className={{
                            container: "h-[4.2rem]"
                        }}
                    />
                </section>
            </section>
        </article>
    )
}


const ModalContent = {
    Image: {
        Box  
    },
    Post: {
        AddCategory,
        ModifyCategory,
    }
}

export default ModalContent