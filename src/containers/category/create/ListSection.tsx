"use client"

import { Fragment } from 'react'

import UI from '@/components/common/UIComponent';
import { useBlockStore } from '@/stores/useEditorBlockStore';
import { DUMMY_POST_RESPONSE } from '@/constants/lists/configDummyResponse';

const ListSection = ({ id }: { id?: string }) => {
    return (
        <section className='flex flex-col w-full post'>
            <section className='mx-auto post-inner w-full max-w-[var(--size-tablet)] flex flex-col gap-[1.6rem]'>
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
        <article className='flex gap-[0.4rem]'>
            <p>카테고리 생성 페이지</p>
            {/* <section className='shortcut'>
                <h5>QUICK_MOVE</h5>
                <div>
                    <UI.Button>
                        LOGO
                    </UI.Button>
                </div>
            </section> */}
            {/* <SortableBlock contents={ contents }/> */}
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
        <article className='p-[1.6rem] bg-[var(--color-brand-500)] sticky bottom-[var(--button-height)]'>
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