"use client"

import UI from '@/components/common/UIComponent';
import SortableBlock from '@/components/layout/SortableBlock';
import { DUMMY_POST_RESPONSE } from '@/constants/lists/configDummyResponse';
import { useBlockStore } from '@/stores/useEditorBlockStore';
// import EditorBlocks from '@/components/layout/SortableBlock';
import { useLayoutStore } from '@/stores/useLayoutStore'
import { Fragment, useEffect, useRef, useState } from 'react'

const ListSection = ({ id }: { id?: string }) => {
    return (
        <section className='flex flex-col w-full post'>
            <section className='mx-auto post-inner w-full max-w-[var(--size-tablet)] bg-white'>
                <RenderContents id={ id }/>
            </section>
        </section>
    )
}

const RenderContents = ({ id }: { id?: string }) => {
    const IF_RESPONSE_LIKE_THAT = id ? DUMMY_POST_RESPONSE.contents : [];

    return (
        <Fragment>
            <Title />
            <Thumbnail />
            <Contents contents={ IF_RESPONSE_LIKE_THAT }/>
            <Action />
        </Fragment>
    )
}

const Title = () => {
    return (
        <article className='flex items-center justify-between p-[1.6rem]'>
            <section className='flex items-center gap-[0.8rem]'>
                <h2 className='font-bold text-[2.0rem]'>네이버는 왜 그럴까?</h2>
                <p className='bg-[var(--color-gray-200)] px-[0.4rem] py-[0.2rem] rounded-[0.4rem]'>코디</p>
                <p className='text-[var(--color-gray-400)]'>2025.01.24</p>
            </section>

            <section className='action'>
                <button>function</button>
            </section>
        </article>
    )
}

const Thumbnail = () => {
    return (
        <article className='h-[calc(1.6rem*20)]'>
            <img
                src={`/images/picture/img-dummy-thumbnail-01.png`}
                alt={`card-1`}
                className="object-cover w-full h-full"
            />
        </article>
    )
}

interface ContentsTempType {
    id: string;
    type: number;
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
}
const Contents = ({ contents }: { contents: ContentsTempType[][] }) => {
    
    return (
        <article className='flex gap-[0.4rem] p-[2.4rem]'>
            {/* <section className='shortcut'>
                <h5>QUICK_MOVE</h5>
                <div>
                    <UI.Button>
                        LOGO
                    </UI.Button>
                </div>
            </section> */}

            <SortableBlock contents={ contents }/>
        </article>
    )
}

const Action = ( ) => {
    const {
        rows,
        copiedBlock,
        selectedPosition,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteRow,
        copyBlock,
        pasteBlock,
        selectBlock,
    } = useBlockStore();
    return (
        <article className='p-[1.6rem] bg-[#dd4f1b]'>
            <UI.Button
                className="w-full h-full font-bold text-white text-[1.8rem]"
                onClick={() => console.log("rows", rows)}
            >
                수정완료
            </UI.Button>
        </article>
    )
}

export default ListSection