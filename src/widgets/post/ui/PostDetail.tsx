"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Block, GetPostDetailResponseType, PostPrevNextInfo, SectionContent } from '@/entities/post/model/post.type';
import { GetCommentDetailDataType } from "@/entities/comment/model/comment.type";

import { util } from '@/shared/lib/util';
import { highlightCode } from '@/shared/lib/highlight';

import useNavigate from '@/shared/hooks/useNavigate';
import { useGetPostDetailQuery, useSetIncrementViewQuery } from '@/entities/post/api/post.query';
import { useGetCommentDetailQuery, useSetCommentQuery } from "@/entities/comment/api/comment.query";

import { Edit } from "@/shared/ui/layout/Edit";
import UI from '@/shared/ui/common/UIComponent';
import IconComponent from "@/shared/ui/common/IconComponent";
import TextShimmer from "@/shared/ui/common/TextShimmerComponent";

import { useToastStore } from "@/shared/stores/useToastStore";
import { useScrollPastThreshold } from "@/shared/hooks/useScrollProgress";
import TextScreening from "@/shared/ui/common/TextComponent";
import { ApiHeaderResponseType } from "@/shared/model/common.type";
import { useCreatePostStore } from "@/shared/stores/useCreatePostStore";

// const PostDetail = ({ id, initialData }: { id: string, initialData: { body: GetPostDetailResponseType; header: ApiHeaderResponseType } }) => {
const PostDetail = ({ id }: { id: string }) => {
    const { setPostIdx } = useCreatePostStore();
    
    useEffect(() => {
        setPostIdx(parseInt(id))
    }, [])

    return (
        <section className='flex flex-col w-full post pb-[7.2rem]'>
            <section className='mx-auto post-inner flex flex-col gap-[5.2rem] w-full items-center'>
                <RenderContents id={id} />
            </section>
        </section>
    )
}

const RenderContents = ({ id }: { id: string }) => {
    const { data: getPostListData } = useGetPostDetailQuery(parseInt( id ));
    const { data: getCommentListData } = useGetCommentDetailQuery(parseInt( id ));

    const DATA = useMemo(() => getPostListData?.result, [ getPostListData ])

    return (
        <>
            <section className='flex flex-col justify-center items-center gap-[3.2rem] h-[100dvh] p-[0.8rem] w-full'>
                <Title imageUrl={ DATA?.thumbnail ?? "" } title={ DATA?.title ?? "" } summary={ DATA?.summary ?? "" } createDate={ DATA?.created_at ?? "" } viewCount={ DATA?.views ?? 0 } />
            </section>

            <Contents contents={ DATA?.contents ?? [] } prev={ DATA?.prev } next={ DATA?.next } />
            <Comment contents={ getCommentListData?.result ?? [] } postIdx={ id } />
        </>
    )
}

const Title = ({
    title, 
    summary,
    createDate,
    viewCount,
    imageUrl,
}: {
    title: string, 
    imageUrl: string;
    summary: string,
    createDate: string,
    viewCount: number
}) => {
    const [ initGlow, setInitGlow ] = useState( false );
    const heroImageSrc = imageUrl || undefined;

    return (
        <motion.article
            className='relative flex flex-col items-end justify-end gap-[1.6rem] w-full h-full rounded-[calc(1.6rem*3)] overflow-hidden'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
        >
            <section className="flex flex-col items-start justify-end gap-[2.4rem] h-full w-full max-w-[var(--size-tablet)] px-[1.2rem] py-[7.2rem] z-[100] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                <section className="flex flex-col gap-[1.2rem] pointer-events-none">
                    <TextShimmer
                        as="h2"
                        duration={2}
                        style={{
                            // fontSize: "2.0rem",
                        }}
                        color={{
                            start: "#ffffff90",
                            end: "var(--color-gray-1000)"
                        }}
                        className="font-bold tablet:text-[2.0rem] mobile:text-[1.4rem]"
                    >
                        { title }
                    </TextShimmer>
                    <h2 className='font-extrabold text-left tablet:text-[3.2rem] mobile:text-[2.0rem] text-white leading-[1.5] whitespace-break-spaces'>&quot;{ summary }&quot;</h2>
                </section>

                <section className='flex items-end flex-wrap gap-[1.6rem] pointer-events-none'>
                    <div className="relative rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]">
                        <img
                            src="https://cdn.class101.net/images/dc898138-d426-45b7-9f2d-0763b921daef"
                            alt="프로필"
                            className='object-cover rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]'
                        />
                    </div>
                    
                    <section className='flex flex-col items-start gap-[1.2rem]'>
                        <section className="flex gap-[0.8rem]">
                            <p className='font-bold text-[2.0rem] text-white'>김상준</p>
                            <p className='text-[2.0rem] font-semibold text-[#ffffff90]'>FRONT END DEVELOPER</p>
                        </section>
                        
                        <p className='font-semibold text-[2.0rem] text-white '>{ util.string.getCurrentTime(createDate, 4) } ・ { viewCount } view</p>
                    </section>
                </section>
            </section>
            
            <div className="absolute top-0 left-[50%] transform translate-x-[-50%] w-full h-full bg-[linear-gradient(0deg,_#000,_#00000000)] z-1 rounded-[2.4rem]" />
            <div className='absolute top-0 left-[50%] transform translate-x-[-50%] w-full h-full mask-[linear-gradient(0deg,_#000,_#000_30%,_#0000)] bg-[#00000000] backdrop-blur-[32px] z-1' />

            { !initGlow ? (
                <motion.div
                    className="absolute inset-0 z-[1000] pointer-events-none blur-[10px]"
                    initial={{ scale: 0.8, opacity: 0.35 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    onAnimationComplete={() => setInitGlow(true)}
                    style={{
                        background: `
                            radial-gradient(
                                circle at 50% 50%,
                                rgba(255, 255, 255, 0.25) 0%,
                                rgba(173, 216, 230, 0.35) 25%,
                                rgba(144, 238, 255, 0.4) 40%,
                                rgba(255, 182, 193, 0.35) 60%,
                                rgba(255, 255, 255, 0.15) 80%,
                                transparent 100%
                            )
                        `,
                        borderRadius: "50%",
                        transformOrigin: "center"
                    }}
                />
            ) : null }
            { heroImageSrc ? (
                <img
                    src={ heroImageSrc }
                    alt=""
                    className="object-cover object-center w-full h-full rounded-[2.4rem] aspect-auto"
                />
            ) : (
                <div className="w-full h-full rounded-[2.4rem] bg-[var(--color-gray-200)]" aria-hidden />
            ) }
        </motion.article>
    )
}

const CodeBlockContent = memo(({ content }: { content: string }) => {
    const html = useMemo(
        () => `<pre class="code-block"><code>${highlightCode(content)}</code></pre>`,
        [content],
    );

    return (
        <section className="overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
});
CodeBlockContent.displayName = "CodeBlockContent";

const ContentColumn = memo(({
    col,
    rowLength,
    onCopySentence,
}: {
    col: SectionContent;
    rowLength: number;
    onCopySentence: (text: string) => void;
}) => {
    const columnClassName = `flex-1 min-w-[calc((var(--size-tablet)-(1.6rem*10))/2)] ${ rowLength !== 0 ? "flex gap-[2.4rem]" : "" } ${ rowLength === 1 ? "col-span-2" : "min-h-[36.0rem]" } ${ col.type === 0 ? "flex-col" : "" } ${ col.type === 1 || col.type === 2 ? "rounded-[2.4rem] overflow-hidden" : "" } ${ col.type === 2 ? "flex-col" : "" }`;

    return (
        <section className={columnClassName}>
            { col.type === 0 ? (
                <Fragment>
                    { col.title || col.subtitle ? (
                        <section className='flex flex-col gap-[0.8rem]'>
                            { col.subtitle ? <p className='text-[#676767]'>{ col.subtitle }</p> : null }
                            { col.title ? <h5 className='text-[2.4rem] font-bold text-[var(--color-gray-1000)]'>{ col.title }</h5> : null }
                        </section>
                    ) : null }

                    <section className='flex flex-col items-start gap-[1.6rem] overflow-x-auto'>
                        { (col.content as Block[]).map((e) =>
                            e.children.map((itemInfo, itemIdx) => (
                                <p
                                    key={`${col.id}-${itemIdx}`}
                                    style={{
                                        lineHeight: itemInfo.style?.lineHeight,
                                        fontSize: `${itemInfo.style?.fontSize}rem`,
                                        fontWeight: itemInfo.style?.fontWeight,
                                        color: itemInfo.style?.color,
                                        textAlign: itemInfo.style?.textAlign as React.CSSProperties["textAlign"],
                                        background: `${ itemInfo.style?.backgroundColor }`,
                                    }}
                                    className='whitespace-break-spaces transition-colors border border-transparent cursor-pointer hover:border-[var(--color-gray-400)] rounded-[0.8rem]'
                                    onClick={() => onCopySentence(itemInfo.value)}
                                >
                                    { itemInfo.value }
                                </p>
                            ))
                        )}
                    </section>
                </Fragment>
            ) : null}

            { col.type === 1 && col.imageUrl ? (
                <img src={ col.imageUrl } alt="" className="w-full" />
            ) : null }

            { col.type === 2 ? (
                <CodeBlockContent content={`${col.content}`} />
            ) : null }
        </section>
    );
});
ContentColumn.displayName = "ContentColumn";

const Contents = ({ contents, prev, next }: { contents: SectionContent[][], prev?: PostPrevNextInfo, next?: PostPrevNextInfo }) => {
    const { pushToUrl } = useNavigate();
    const { setToast } = useToastStore();

    const handleCopySentence = useCallback((text: string) => {
        util.dom.setCopyOnClipboard(text);
        setToast({ msg: "선택하신 문장을 복사했어요", time: 2 });
    }, [setToast]);

    return (
        <article className='flex gap-[0.4rem] w-full max-w-[var(--size-tablet)] px-[1.2rem] [content-visibility:auto]'>
            <section className='flex flex-col gap-[7.2rem] flex-1'>
                { contents?.map((row, rowIdx) =>
                    <section key={ rowIdx } className={`flex flex-wrap gap-[1.6rem] ${ row.length === 1 && (row?.[0].type === 1 || row?.[0].type === 2) ? "" : "" }`}>

                        { row.map((col) =>
                            <ContentColumn
                                key={ col.id }
                                col={ col }
                                rowLength={ row.length }
                                onCopySentence={ handleCopySentence }
                            />
                        )}
                    </section>
                )}

                <section className="flex gap-[1.6rem] flex-wrap">
                    <UI.Button
                        className={`flex items-center justify-start gap-[0.8rem] border border-[var(--color-gray-200)] min-w-[calc(var(--size-tablet)/2-(1.6rem*10))] flex-1 p-[1.6rem] rounded-[1.6rem] hover:border-[var(--color-blue-500)] ${ prev ? "" : "pointer-events-none" }`}
                        onClick={() => {
                            if ( prev ) {
                                pushToUrl(`/post/${ prev?.idx }`)
                            } else {
                                setToast({ msg: "이전 글이 없어요", time: 2 });
                            }
                        }}
                    >
                        { prev ? (
                            <Fragment>
                                <IconComponent type="outlined-arrow-below" alt="테스트" className="rotate-90" />
                                
                                <div className="flex flex-col gap-[0.8rem]">
                                    <p className="text-left text-[1.2rem] font-semibold text-[var(--color-gray-500)]">이전글</p>
                                    <p className="text-left text-[1.6rem] font-semibold">{ prev.title }</p>
                                </div>
                            </Fragment>
                        ) : <p className="text-[var(--color-gray-500)]">이전글이 없습니다.</p> }
                    </UI.Button>

                    <UI.Button
                        className={`flex items-center justify-end gap-[0.8rem] border border-[var(--color-gray-200)] min-w-[calc(var(--size-tablet)/2-(1.6rem*10))] flex-1 p-[1.6rem] rounded-[1.6rem] hover:border-[var(--color-blue-500)] ${ next ? "" : "pointer-events-none" }`}
                        onClick={() => {
                            if ( next ) {
                                pushToUrl(`/post/${ next?.idx }`)
                            } else {
                                setToast({ msg: "다음 글이 없어요", time: 2 });
                            }
                        }}
                    >
                        { next ? (
                            <Fragment>
                                <div className="flex flex-col gap-[0.8em]">
                                    <p className="text-right text-[1.2rem] font-semibold text-[var(--color-gray-500)]">다음글</p>
                                    <p className="text-right text-[1.6rem] font-semibold">{ next.title }</p>
                                </div>
                                <IconComponent type="outlined-arrow-below" alt="테스트" className="rotate-270" />
                            </Fragment>
                        ) : <p className="text-[var(--color-gray-500)]">다음글이 없습니다.</p> }
                    </UI.Button>
                </section>
            </section>
        </article>
    )
}

const CommentFloatingButton = memo(({
    visible,
    onOpen,
}: {
    visible: boolean;
    onOpen: () => void;
}) => (
    <section className="fixed bottom-[1.6rem] left-[50%] w-full justify-center transform translate-x-[-50%] z-[100] flex gap-[1.2rem]">
        <AnimatePresence>
            { visible ? (
                <motion.section
                    key="comment-fab"
                    className="flex items-center justify-center bg-[#00000090] backdrop-blur-sm p-[1.2rem] rounded-full"
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: "5.2rem", scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: "5.2rem", scale: 0.9 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
                >
                    <UI.Button
                        className="text-white flex items-center justify-center px-[0.8rem] gap-[0.8rem]"
                        onClick={onOpen}
                    >
                        <p>댓글 남기기</p>
                    </UI.Button>
                </motion.section>
            ) : null }
        </AnimatePresence>
    </section>
));
CommentFloatingButton.displayName = "CommentFloatingButton";

const Comment = ({ contents, postIdx }: { contents: GetCommentDetailDataType[], postIdx: string }) => {
    const [ inputMode, setInputMode ] = useState( false );
    const [ randName, setRandName ] = useState<string>("");
    const [ initGlow, setInitGlow ] = useState( false );
    const [ currentContainerWidth, setCurrentContainerWidth ] = useState(0);
    const [ currentContainerHeight, setCurrentContainerHeight ] = useState(0);

    const showCommentFab = useScrollPastThreshold(10);

    const { setToast } = useToastStore();
    const { pushToUrl } = useNavigate();
    const { data: setCommentData, mutate: setCommentFetch } = useSetCommentQuery();

    const commentContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);   // 여러 아이템 참조

    const [ confirmedPayload, setConfirmedPayload ] = useState<{ title: string, avatar: number, msg: string}>({
        title: "",
        avatar: 0,
        msg: ""
    });

    const detectOutsideClick = (e: MouseEvent) => {
        const target = e.target as Node;
        const clickedInsideInput = inputRef.current?.contains(target);
        const clickedInsideItem = itemRefs.current.some(ref => ref?.contains(target)); // 아이템 여러 개 체크

        if (!clickedInsideInput && !clickedInsideItem) {
            console.log("인풋/아이템 외부 클릭 → 닫기");
            setInputMode(false);
        }
    };

    useEffect(() => {
        setRandName(util.string.getRandomName());

        if ( inputRef.current ) {
            setCurrentContainerWidth(inputRef.current?.offsetWidth)
        }
    }, [])

    useEffect(() => {
        if ( inputMode ) {
            document.addEventListener("click", detectOutsideClick);
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [ inputMode ]);

    useEffect(() => {
        if ( inputMode ) {
            commentContainerRef.current?.scrollTo({
                top: commentContainerRef.current.scrollHeight
            });
        }
        util.dom.setScrollDefence(inputMode ? true : false);
    }, [ inputMode ]);

    useEffect(() => {
        const ELEMENT = commentContainerRef.current;
        
        if ( ELEMENT ) {
            setCurrentContainerHeight( ELEMENT.scrollHeight )
        }
    }, [ commentContainerRef ])

    return (
        <Fragment>
            {/* 목록 */}
            <AnimatePresence mode="wait">
                { inputMode ? (
                    <motion.section
                        key={"list"}
                        className="fixed bottom-[0.8rem] shadow-[var(--shadow-normal)] z-[10000] h-full w-full tablet:max-w-[calc(var(--size-tablet)-(0.8rem*8))] mobile:max-w-[calc(100dvw-1.6rem)] left-[50%] overflow-hidden rounded-[3.2rem] transform translate-x-[-50%] tablet:max-h-[calc(100dvh-(1.6rem*8))] mobile:max-h-[calc(100dvh-(0.8rem*2))] comment-list p-[0.8rem] bg-[linear-gradient(0deg,_#ffffff,_#ffffff90)] backdrop-blur-lg flex flex-col items-end"
                        initial={{ y: 100, opacity: 0, filter: "blur(20px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: 100, opacity: 0, filter: "blur(20px)" }}
                        transition={{
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10
                        }}
                    >
                        <section className="flex items-end w-full h-full">
                            <div
                                ref={ commentContainerRef }
                                data-lenis-prevent
                                // className="w-full max-w-[var(--size-tablet)] flex-1 mx-auto pt-[6.0rem] pb-[calc(1.6rem*6)] px-[1.2rem] overflow-y-auto tablet:max-h-[calc(100dvh-var(--header-height)-(1.6rem*2))] mobile:max-h-[100%] mask-[linear-gradient(0deg,#0000,#000_5%_95%,#0000)]"
                                className="w-full max-w-[var(--size-tablet)] flex-1 mx-auto p-[1.6rem] overflow-y-auto tablet:max-h-[calc(100dvh-var(--header-height)-(1.6rem*6))] mobile:max-h-[calc(100dvh-var(--header-height)-(1.6rem*0))] mask-[linear-gradient(0deg,#0000,#000_5%_95%,#0000)]"
                            >
                                { contents?.length ? contents?.map((e, i) =>
                                    <motion.section
                                        key={i}
                                        ref={(el) => {
                                            itemRefs.current[i] = el;
                                        }}
                                        className="item flex items-center gap-[1.6rem] mb-[1.6rem] last:mb-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            delay: 0.03 * ((contents.length - i) + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 60,
                                            damping: 10
                                        }}
                                    >
                                        <section className="flex items-start gap-[1.2rem] pointer-events-none">
                                            <img src={"/images/picture/img-dummy-profile-1.png"} alt="/" className="w-[4.2rem] h-[4.2rem] shadow-[var(--shadow-hard)] rounded-full" />

                                            <div className="flex flex-col gap-[1.6rem] px-[1.2rem] pt-[0.8rem] pb-[0.4rem] bg-white rounded-[1.6rem] shadow-[var(--shadow-normal)]">
                                                <section className="flex flex-col gap-[0.8rem]">
                                                    <section className="flex items-center gap-[0.4rem]">
                                                        <p className="font-bold">{ e.author }</p>
                                                        { e.is_admin ? <p className="border border-black text-[1.2rem] px-[0.2rem] py-[0.1rem] rounded-[0.4rem] font-bold">관리자</p> : "" }
                                                    </section>

                                                    <section>
                                                        <p className="whitespace-break-spaces leading-[1.5]">{ e.msg }</p>
                                                        {/* <p className="break-words leading-[1.5]">{ e.msg }</p> */}
                                                    </section>
                                                </section>
                                        <p className="bg-[var(--color-gray-400)] text-white px-[0.8rem] py-[0.2rem] rounded-full">1일전</p>
                                            </div>
                                        </section>
                                        
                                    </motion.section>
                                ) : (
                                    <UI.Empty
                                        title={"지금 댓글의 주인공이 되어보세요!"}
                                        className="h-full"
                                    />
                                )}
                            </div>
                        </section>

                        <section
                            ref={ inputRef }
                            className="w-full max-w-[var(--size-tablet)] body px-[1.6rem] py-[1.6rem] min-h-[calc(5.2rem)] h-[fit-content] min-w-[13.2rem] bg-[#ffffffcb] backdrop-blur-sm rounded-[calc(1.6rem*2)] flex items-center shadow-[var(--shadow-normal)] transition-opacity"
                        >
                            { !inputMode ? (
                                <TextShimmer
                                    as="p"
                                    duration={3}
                                    style={{
                                        color: "#000000",
                                        fontSize: "1.4rem",
                                    }}
                                    color={{
                                        start: "#000000",
                                        end: "#ffffff"
                                    }}
                                    className="h-[2.1rem] leading-[1.7]"
                                >
                                    이곳을 눌러 댓글을 작성 해주세요
                                </TextShimmer>
                            ) : (
                                <Edit.div
                                    className="text-left leading-[1.5] w-full whitespace-break-spaces h-[fit-content]"
                                    onKeyUp={(e) => {
                                        const value = e.currentTarget.innerText
                                        setConfirmedPayload( prev => ({
                                            ...prev,
                                            msg: value
                                        }))
                                    }}
                                />
                            ) }
                            
                            <UI.Button
                                className={`absolute right-[0.4rem] bottom-[0.4rem] flex justify-center items-center w-[4.2rem] h-[4.2rem] rounded-full overflow-hidden shadow-[var(--shadow-normal)] ${ inputMode ? "bg-[var(--color-gray-1000)]" : "pointer-events-none bg-black" }`}
                                onClick={() => {
                                    if ( inputMode ) {
                                        const PAYLOAD = {
                                            "post_id": postIdx,
                                            "profile": 1,
                                            "author": randName,
                                            "msg": confirmedPayload.msg,
                                            "password": null,
                                            "is_admin": false,
                                            "is_modified": false,
                                            "is_secret": false
                                        }
                                        setCommentFetch(PAYLOAD)
                                    }
                                }}
                            >
                                <IconComponent type="graphic-arrow-up" alt="댓글 작성" className={`invert-[1] ${ inputMode ? "rotate-0" : "rotate-90" }`} />
                                {/* { inputMode 
                                    ? <IconComponent type="graphic-arrow-up" alt="댓글 작성" className="invert-[1] rotate-0" />
                                    : <p className="text-white text-nowrap">작성하기</p> } */}
                            </UI.Button>

                            { inputMode && !initGlow ? (
                                <motion.div
                                    key={111}
                                    className="absolute bottom-[0] left-[50%] transform translate-x-[-50%] inset-0 z-10 pointer-events-none blur-[10px]"
                                    initial={{ scale: 0, opacity: 0.2 }}
                                    animate={{ scale: 10, opacity: 0 }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeOut",
                                        repeat: 0,
                                    }}
                                    style={{
                                        background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-gray-500) 50%, rgba(255,255,255,0) 70%, rgba(255,255,255,0))",
                                        borderRadius: "50%",
                                        transformOrigin: "center"
                                    }}
                                    onAnimationEnd={() => setInitGlow( true )}
                                />
                            ) : ""}
                        </section>
                    </motion.section>
                ) : "" }
            </AnimatePresence>
            {/* 목록 END */}


            <CommentFloatingButton
                visible={ showCommentFab && !inputMode }
                onOpen={() => setInputMode(true)}
            />
        </Fragment>
    )
}

export default PostDetail