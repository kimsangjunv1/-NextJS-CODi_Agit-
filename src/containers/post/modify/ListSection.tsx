"use client"

import { Fragment, useEffect, useState } from 'react'

import { Edit } from '@/components/layout/Edit';
import UI from '@/components/common/UIComponent';
import SortableBlock from '@/components/layout/SortableBlock';
import ModalContent from '@/components/common/ModalComponent';

import { useGetCategoryListQuery } from '@/hooks/api/category.query';
import { useGetPostDetailQuery, usePatchPostQuery } from '@/hooks/api/post.query';

import { useModalStore } from '@/stores/useModalStore';
import { useToastStore } from '@/stores/useToastStore';
import { Row, useBlockStore } from '@/stores/useEditorBlockStore';

import { SectionContent } from '@/types/post.type';
import { DUMMY_POST_RESPONSE_NEW } from '@/constants/lists/configDummyResponse';

const ListSection = ({ id }: { id: string }) => {
    return (
        <section className='flex flex-col w-full post bg-[linear-gradient(0deg,var(--color-gray-200)_80%,#00000000)]'>
            <section className='mx-auto post-inner w-full max-w-[var(--size-tablet)] flex flex-col items-center gap-[1.6rem]'>
                <RenderContents id={ id }/>
            </section>
        </section>
    )
}

type CreatePostState = {
  title: string;
  thumbnail: string;
  summary: string;
  category_idx: number;
  contents: any[]; // 여기는 실제 타입에 맞게 바꿔주세요
};

const RenderContents = ({ id }: { id: string }) => {
    const { data: getPostListData, refetch: getPostListFetch } = useGetPostDetailQuery(parseInt( id ));

    const [ createPostState, setCreatePostState ] = useState<CreatePostState>({
        title: "",
        thumbnail: "",
        summary: "",
        category_idx: 0,
        contents: []
    });

    return (
        <Fragment>
            <section className='py-[7.2rem] flex flex-col justify-center items-center gap-[3.2rem]'>
                <Thumbnail imageUrl={ getPostListData?.result?.thumbnail } contents={ getPostListData?.result?.contents } setCreatePostState={ setCreatePostState }/>
                <Title title={ getPostListData?.result?.title } summary={ getPostListData?.result?.summary } category_idx={ getPostListData?.result?.category_idx } setCreatePostState={ setCreatePostState }/>
            </section>
            
            <Contents contents={ getPostListData?.result?.contents } />
            <Action id={ parseInt( id ) } createPostState={ createPostState } />
        </Fragment>
    )
}


const Title = ({
    title,
    summary,
    category_idx,
    setCreatePostState,
}: {
    title: string;
    summary: string;
    category_idx: number;
    setCreatePostState: React.Dispatch<React.SetStateAction<CreatePostState>>;
}) => {
    const { data: getCategoryListData, refetch } = useGetCategoryListQuery();
    
    useEffect(() => {
        if ( title && summary ) {
            setCreatePostState((prev) => ({
                ...prev,
                title: title,
                summary: summary,
                category_idx: category_idx,
            }));
        }
    }, [ title, summary ])

    return (
        <article className='flex flex-col items-center justify-between gap-[1.6rem]'>
            <section className='flex flex-col items-center justify-center gap-[1.6rem]'>
                <UI.Select
                    trackingData={`${ getCategoryListData?.result?.find((e) => e.idx === category_idx)?.title }`}
                    defaultValue={ getCategoryListData?.result?.find((e) => e.idx === category_idx)?.idx }

                    list={ getCategoryListData?.result?.map((e) => {
                        return {
                            title: e.title,
                            value: e.idx
                        }
                    })}

                    onChange={(e) => {
                        console.log("category_idx", e)
                        setCreatePostState((prev) => ({
                            ...prev,
                            category_idx: e,
                        }));
                    }}
                    className={{
                        container: "px-0",
                        button: "bg-[#ffffff20] px-[0.8rem] min-w-[5.2rem]"
                    }}
                />
                
                <Edit.h2
                    defaultValue={ title }
                    className='h-auto p-0 font-extrabold text-center text-[2.8rem] leading-[1.5]'
                    onKeyUp={(e) => {
                        const value = e.currentTarget.innerText;
                        console.log("value", value)
                        setCreatePostState((prev) => ({
                            ...prev,
                            title: value,
                        }));
                    }}
                />
                
                <Edit.p
                    defaultValue={ summary }
                    className='h-auto p-0 font-medium text-[1.2rem] text-center leading-[1.5]'
                    onKeyUp={(e) => {
                        const value = e.currentTarget.innerText;
                        console.log("value", value)
                        setCreatePostState((prev) => ({
                            ...prev,
                            summary: value,
                        }));
                    }}
                />
            </section>
        </article>
    )
}

const Thumbnail = ({
    imageUrl,
    contents,
    setCreatePostState,
}: {
    imageUrl: string;
    contents: SectionContent[][];
    setCreatePostState: React.Dispatch<React.SetStateAction<CreatePostState>>;
}) => {
    const { setModal } = useModalStore();
    const { setToast } = useToastStore();
    
    const [ currentImageUrl, setCurrentImageUrl ] = useState<string>(imageUrl);
    const [ contentImageList, setContentImageList ] = useState<string[]>([]);

    const setPreventModal = () => setModal({
        type: "CHECK",
        title: "이미지 관리",
        content: (
            <ModalContent.Image.Box
                onChange={( url ) => {
                    setCurrentImageUrl(url);
                    setCreatePostState((prev) => ({
                        ...prev,
                        thumbnail: currentImageUrl,
                    }));
                    // updateBlock(rowIndex, blockIndex, { imageUrl: url ?? "" })
                }}
            />
        ),
        className: {
            container: "max-w-[calc(var(--size-pc)-(2.0rem*2))] w-full"
        },
        cancel: { text: " ", },
        confirm: {
            text: "확인",
            onClick: () => console.log("first")
        },
        isOpen: true
    });

    useEffect(() => {
        if ( currentImageUrl ) {
            setCreatePostState((prev) => ({
                ...prev,
                thumbnail: currentImageUrl,
            }));
        }
    }, [ currentImageUrl ])

    useEffect(() => {
        if ( imageUrl ) {
            setCurrentImageUrl( imageUrl );
        }
    }, [ imageUrl ])

    useEffect(() => {
        if ( contents ) {
            setContentImageList(contents.map((init) => init.find((e) => e.type === 1 )?.imageUrl ?? "/"));
        }
    }, [ contents ])

    return (
        <article className='h-[calc(1.6rem*13)] w-[calc(1.6rem*13)] relative rounded-[2.4rem]'>
            <img
                src={ currentImageUrl }
                alt="/"
                className="object-cover object-center w-full h-full rounded-[2.4rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[10] shadow-[var(--shadow-normal)]"
                // className="object-cover object-center w-full h-full rounded-[2.4rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rotate-[7deg] z-[10] shadow-[var(--shadow-normal)]"
            />
            {/* { contentImageList?.map((e, i) =>
                <img
                    key={i}
                    src={ e }
                    alt="/"
                    className={`object-cover object-center w-full h-full rounded-[2.4rem] absolute top-[50%] ${ i !== 1 ? "left-[calc(50%-(1.6rem*8))] rotate-[-12deg]" : "left-[calc(50%+(1.6rem*8))] rotate-[9deg]" } transform translate-x-[-50%] translate-y-[-50%] shadow-[var(--shadow-normal)]`}
                />
            )} */}
            <UI.Button
                onClick={() => setPreventModal()}
                className="p-[1.6rem] bg-[white] hover:bg-[var(--color-brand-500)] backdrop-blur-sm rounded-[1.6rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] shadow-[var(--shadow-normal)] font-semibold z-100"
            >
                이미지 선택
            </UI.Button>
        </article>
    )
}

const Contents = ({ contents }: { contents: SectionContent[][] }) => {
    return (
        <article className='flex gap-[0.4rem] w-full'>
            <SortableBlock contents={ contents }/>
        </article>
    )
}

const Action = ({ id, createPostState }: { id: number, createPostState: CreatePostState }) => {
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
    const { setToast } = useToastStore();
    
    const { data, mutate: patchPostFetch } = usePatchPostQuery();
    
    return (
        // <article className='h-[5.2rem] fixed bottom-0 left-0 flex items-center justify-between w-full bg-black'>
        <article className='sticky bottom-0 h-[5.2rem] flex items-center justify-between w-full bg-black z-10 rounded-[2.4rem]'>
            <UI.Button
                className="font-bold text-white text-[1.8rem] hover:bg-[var(--color-brand-500)] h-full px-[2.4rem]"
                onClick={() => {
                    const PAYLOAD = {
                        title: createPostState.title,
                        thumbnail: createPostState.thumbnail,
                        summary: createPostState.summary,
                        category_idx: createPostState.category_idx,
                        contents: rows,
                    };

                    if ( !PAYLOAD.title ) {
                        setToast({ msg: "제목을 입력해주세요", time: 2 })

                        return;
                    }

                    if ( !PAYLOAD.summary ) {
                        setToast({ msg: "요약을 입력해주세요", time: 2 })
                        
                        return;
                    }

                    if ( !PAYLOAD.thumbnail ) {
                        setToast({ msg: "썸네일을 선택해주세요", time: 2 })
                        
                        return;
                    }

                    patchPostFetch({ data: PAYLOAD, idx: id });
                }}
            >
                수정완료
            </UI.Button>
        </article>
    )
}

export default ListSection