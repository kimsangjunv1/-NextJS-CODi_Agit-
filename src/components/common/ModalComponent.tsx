"use client"

import { useState } from "react";

import UI from "@/components/common/UIComponent";
import { DUMMY_IMAGE_RESPONSE } from "@/constants/lists/configDummyResponse";

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


const ModalContent = {
    Image: {
        Box  
    },
}

export default ModalContent