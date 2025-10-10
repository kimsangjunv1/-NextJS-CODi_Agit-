"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { Block, GetPostDetailResponseType, PostPrevNextInfo, SectionContent } from '@/types/post.type';
import { GetCommentDetailDataType } from "@/types/comment.type";

import { util } from '@/utils/util';
import { highlightCode } from '@/utils/highlight';

import useNavigate from '@/hooks/common/useNavigate';
import { useGetPostDetailQuery, useSetIncrementViewQuery } from '@/hooks/api/post.query';
import { useGetCommentDetailQuery, useSetCommentQuery } from "@/hooks/api/comment.query";

import { Edit } from "@/components/layout/Edit";
import UI from '@/components/common/UIComponent';
import IconComponent from "@/components/common/IconComponent";
import TextShimmer from "@/components/common/TextShimmerComponent";

import { useToastStore } from "@/stores/useToastStore";
import useScrollProgress from "@/hooks/dom/useScrollProgress";
import TextScreening from "@/components/common/TextComponent";
import { ApiHeaderResponseType } from "@/types/common.type";

// const ListSection = ({ id, initialData }: { id: string, initialData: { body: GetPostDetailResponseType; header: ApiHeaderResponseType } }) => {
const ListSection = ({ id }: { id: string }) => {
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
        <AnimatePresence mode='popLayout'>
            {/* <section className='flex flex-col justify-center items-center gap-[3.2rem] min-h-[calc(1.6rem*20)] h-[calc(100dvh-1.2rem-(var(--header-height)*0))] w-full'> */}
            <section className='flex flex-col justify-center items-center gap-[3.2rem] h-[100dvh] p-[0.8rem] w-full'>
                <Title key={"Title"} imageUrl={ DATA?.thumbnail } title={ DATA?.title } summary={ DATA?.summary } createDate={ DATA?.created_at } viewCount={ DATA?.views } />
            </section>
            
            <Contents key={"Contents"} contents={ DATA?.contents } prev={ DATA?.prev } next={ DATA?.next } />
            <Comment key={"Comment"} contents={ getCommentListData?.result } postIdx={ id } />
        </AnimatePresence>
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
    return (
        <motion.article
            className='relative flex flex-col items-end justify-end gap-[1.6rem] w-full h-full rounded-[calc(1.6rem*3)] overflow-hidden'
            initial={{ opacity: 0, transform: "scale(0.85)", filter: "blur(20px)" }}
            animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
            exit={{ opacity: 0, transform: "scale(0.85)" }}
            transition={{
                delay: 0.1 * 2,
                type: "spring",
                mass: 0.3,       // 약간 무게감 ↑
                stiffness: 50,  // 스프링 강하게 ↑
                damping: 8,      // 감쇠 낮춰서 튕기게 ↓
            }}
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
                        <motion.img
                            src="https://cdn.class101.net/images/dc898138-d426-45b7-9f2d-0763b921daef"
                            alt="프로필"
                            className='object-cover rounded-[2.4rem] w-[9.2rem] h-[9.2rem] shadow-[var(--shadow-normal)]'
                            initial={{ objectFit:"120px" }}
                            animate={{ objectFit:"0px" }}
                            transition={{
                                delay: 0.1,
                                duration: 2.5,
                                ease: "easeOut",
                                repeat: 10,       // 무한 반복
                                repeatType: "loop",
                            }}
                        />

                        <motion.div
                            key={`glow-${ initGlow }`}
                            className="absolute inset-0 z-[1000] pointer-events-none blur-[10px]"
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 10, opacity: -10 }}
                            transition={{
                                delay: 0.1,
                                duration: 2.5,
                                ease: "easeOut",
                                repeat: 0,       // 무한 반복
                                repeatType: "loop",
                            }}
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-brand-500) 50%, rgba(255,255,255,0) 70%)",
                                borderRadius: "50%",
                                transformOrigin: "center"
                            }}
                            // onAnimationEnd={() => setInitGlow( true )}
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
            <div className='absolute top-0 left-[50%] transform translate-x-[-50%] w-full h-full mask-[linear-gradient(0deg,_#000,_#000_30%,_#0000)] bg-[#00000000] backdrop-blur-[120px] z-1' />

            { !initGlow ? (
                <motion.div
                    key={`glow-${ initGlow }`}
                    className="absolute inset-0 z-[1000] pointer-events-none blur-[10px]"
                    initial={{ scale: 0, opacity: 0.4 }}
                    animate={{ scale: 10, opacity: -10 }}
                    transition={{
                        delay: 0.1,
                        duration: 10,
                        ease: "easeOut",
                        repeat: 0,       // 무한 반복
                        repeatType: "loop",
                    }}
                    style={{
                        // background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-brand-500) 50%, rgba(255,255,255,0) 70%)",
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
            ) : "" }
            <motion.img
                src={ imageUrl }
                alt="/"
                className="object-cover object-center w-full h-full rounded-[2.4rem] aspect-auto"
                // className="object-cover object-center max-w-[100%] max-h-[calc(1.6rem*20)] rounded-[calc(1.6rem*3)] shadow-[var(--shadow-normal)] aspect-auto"
                initial={{ opacity: 0, transform: "scale(0.85)", filter: "blur(20px)" }}
                animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
                exit={{ opacity: 0, transform: "scale(0.85)" }}
                transition={{
                    delay: 0.1 * 1,
                    type: "spring",
                    mass: 0.3,       // 약간 무게감 ↑
                    stiffness: 50,  // 스프링 강하게 ↑
                    damping: 8,      // 감쇠 낮춰서 튕기게 ↓
                }}
            />
        </motion.article>
    )
}

const Contents = ({ contents, prev, next }: { contents: SectionContent[][], prev?: PostPrevNextInfo, next?: PostPrevNextInfo }) => {
    const codeRef = useRef<HTMLDivElement>(null);
    
    const { pushToUrl } = useNavigate();
    const { setToast } = useToastStore();

    return (
        <article className='flex gap-[0.4rem] w-full max-w-[var(--size-tablet)] px-[1.2rem]'>
            <section className='flex flex-col gap-[7.2rem] flex-1'>
                { contents?.map((row, rowIdx) =>
                    <section key={ rowIdx } className={`flex flex-wrap gap-[1.6rem] ${ row.length === 1 && (row?.[0].type === 1 || row?.[0].type === 2) ? "" : "" }`}>

                        { row.map((col, colIdx) =>
                            <motion.section
                                key={ col.id } 
                                className={`flex-1 min-w-[calc((var(--size-tablet)-(1.6rem*10))/2)] ${ row.length !== 0 ? "flex gap-[2.4rem]" : "" } ${ row.length === 1 ? "col-span-2" : "min-h-[36.0rem]" } ${ col.type === 0 ? "flex-col" : "" } ${ col.type === 1 || col.type === 2 ? "rounded-[2.4rem] overflow-hidden" : "" } ${ col.type === 2 ? "flex-col" : "" }`}
                                layout
                                initial={{ opacity: 0, transform: "scale(0.9)" }}
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                exit={{ opacity: 0, transform: "scale(0.9)" }}
                                transition={{
                                    delay: 0.05 * colIdx,
                                    type: "spring",
                                    mass: 0.1,
                                    stiffness: 100,
                                    damping: 10,
                                }}
                            >
                                { col.type === 0 ? (
                                    <Fragment>
                                        { col.title || col.subtitle ? (
                                            <section className='flex flex-col gap-[0.8rem]'>
                                                { col.subtitle ? <p className='text-[#676767]'>{ col.subtitle }</p> : "" }
                                                { col.title ? <h5 className='text-[2.4rem] font-bold text-[var(--color-gray-1000)]'>{ col.title }</h5> : "" }
                                            </section>
                                        ) : "" }

                                        <section className='flex flex-col items-start gap-[1.6rem] overflow-x-auto'>
                                            { (col.content as Block[]).map((e, rowIdx) =>
                                                e.children.map((itemInfo, itemIdx) =>
                                                    <p
                                                        key={itemIdx}
                                                        style={{
                                                            lineHeight: itemInfo.style?.lineHeight,
                                                            fontSize: `${itemInfo.style?.fontSize}rem`,
                                                            fontWeight: itemInfo.style?.fontWeight,
                                                            color: itemInfo.style?.color,
                                                            textAlign: itemInfo.style?.textAlign as React.CSSProperties["textAlign"],
                                                            background: `${ itemInfo.style?.backgroundColor }`
                                                            // backgroundColor: `${ itemInfo.style?.backgroundColor }`
                                                        }}
                                                        className='whitespace-break-spaces transition-colors border border-transparent cursor-pointer hover:border-[var(--color-gray-400)] rounded-[0.8rem]'
                                                        onClick={async() => {
                                                            const text = itemInfo.value;

                                                            util.dom.setCopyOnClipboard( text );
                                                            setToast({ msg: "선택하신 문장을 복사했어요", time: 2 })
                                                        }}
                                                    >
                                                        { itemInfo.value }
                                                    </p>
                                                )
                                            )}
                                        </section>
                                    </Fragment>
                                ) : ""}

                                { col.type === 1 ? (
                                    <Fragment>
                                        <img
                                            src={ col.imageUrl }
                                            alt="/"
                                            className={`w-full ${ row.length === 2 ? "" : "" }`}
                                        />
                                    </Fragment>
                                ) : "" }

                                { col.type === 2 ? (
                                    <Fragment>
                                        {/* <section className='flex flex-col gap-[0.8rem]'>
                                            <p className='text-[var(--color-gray-500)]'>{ col.subtitle }</p>
                                            <h5 className='text-[1.6rem] font-bold text-[var(--color-gray-1000)]'>{ col.title }</h5>
                                        </section> */}

                                        <section className='overflow-x-auto'>
                                            {/* { getPureHTML( col.content )} */}
                                            {/* {col.content} */}
                                            
                                            <div
                                                ref={codeRef}
                                                // className="p-4 font-mono text-pink-400 whitespace-pre bg-gray-900 rounded"
                                                dangerouslySetInnerHTML={{ __html: `<pre class="code-block"><code>${ highlightCode(`${ col.content }`) }</code></pre>` }}
                                                // dangerouslySetInnerHTML={{ __html: `<pre class="code-block"><code>${ DOMPurify.sanitize(col.content, { ALLOWED_TAGS: ['p','br'] }) }</code></pre>` }}
                                            />

                                            {/* <SyntaxHighlighter language="ts" style={materialDark}>
                                                { JSON.stringify(col.content) }
                                            </SyntaxHighlighter> */}
                                        </section>
                                    </Fragment>
                                ) : "" }
                            </motion.section>
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

const Comment = ({ contents, postIdx }: { contents: GetCommentDetailDataType[], postIdx: string }) => {
    const [ inputMode, setInputMode ] = useState( false );
    const [ randName, setRandName ] = useState<string>("");
    const [ initGlow, setInitGlow ] = useState( false );
    const [ currentContainerWidth, setCurrentContainerWidth ] = useState(0);
    const [ currentContainerHeight, setCurrentContainerHeight ] = useState(0);

    const { setToast } = useToastStore();
    const { pushToUrl } = useNavigate();
    const { scrollValue } = useScrollProgress();
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
                top: commentContainerRef.current.scrollHeight,
                // behavior: "smooth",
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
                        className="fixed top-0 left-0 z-[10000] h-full w-full comment-list pb-[calc(1.6rem*2)] pt-[calc(1.6rem*2)] overflow-y-auto bg-[linear-gradient(0deg,_#ffffff,_#ffffff90)] backdrop-blur-lg flex items-end"
                        initial={{ opacity: 0, filter: "blur(20px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(20px)" }}
                        transition={{
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10
                        }}
                    >
                        <div
                            ref={ commentContainerRef }
                            data-lenis-prevent
                            className="w-full max-w-[var(--size-tablet)] mx-auto pt-[6.0rem] pb-[calc(1.6rem*6)] px-[1.2rem] overflow-y-auto max-h-[calc(100dvh-var(--header-height)-(1.6rem*2))] mask-[linear-gradient(0deg,#0000,#000_5%_95%,#0000)]"
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
                                    <section className="flex items-center gap-[1.2rem] pointer-events-none">
                                        <img src={"/images/picture/img-dummy-profile-1.png"} alt="/" className="w-[4.2rem] h-[4.2rem] shadow-[var(--shadow-hard)] rounded-full" />

                                        <div className="flex flex-col gap-[1.6rem] px-[1.2rem] pt-[0.8rem] pb-[0.4rem] bg-white rounded-[1.6rem] shadow-[var(--shadow-normal)]">
                                            <section className="flex flex-col gap-[0.8rem]">
                                                <section className="flex items-center gap-[0.4rem]">
                                                    <p className="font-bold">{ e.author }</p>
                                                    { e.is_admin ? <p className="border border-black text-[1.2rem] px-[0.2rem] py-[0.1rem] rounded-[0.4rem] font-bold">관리자</p> : "" }
                                                </section>

                                                <section>
                                                    <p className="whitespace-break-spaces leading-[1.5]">{ e.msg }</p>
                                                </section>
                                            </section>
                                        </div>
                                    </section>
                                    
                                    <p className="bg-[var(--color-gray-400)] text-white px-[0.8rem] py-[0.2rem] rounded-full">1일전</p>
                                </motion.section>
                            ) : (
                                <UI.Empty
                                    title={"지금 댓글의 주인공이 되어보세요!"}
                                    className="h-full"
                                />
                            )}
                        </div>

                        <section
                            ref={ inputRef }
                            className="fixed bottom-[calc(1.6rem*3)] left-[50%] transform w-full max-w-[var(--size-tablet)] translate-x-[-50%] z-10 body px-[1.2rem] py-[0.8rem] h-[calc(1.6rem*3)] min-w-[13.2rem] bg-[#ffffffcb] backdrop-blur-sm rounded-[calc(1.6rem*2)] flex items-center shadow-[var(--shadow-normal)] transition-opacity"
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
                                    className="text-left leading-[1.5] w-full h-full whitespace-break-spaces"
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
                                className={`absolute right-[0.4rem] top-[50%] transform translate-y-[-50%] flex justify-center items-center px-[1.2rem] h-[4.2rem] rounded-full overflow-hidden shadow-[var(--shadow-normal)] ${ inputMode ? "bg-[var(--color-gray-1000)]" : "pointer-events-none bg-black" }`}
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


            {/* 입력 */}
            <section className="fixed bottom-[1.6rem] left-[50%] w-full justify-center transform translate-x-[-50%] z-[100] flex gap-[1.2rem]">
                <AnimatePresence>
                    { scrollValue >= 10 ? (
                        <Fragment key={"one"}>
                            <motion.section
                                // key={e.id + i}
                                key={"button"}
                                className="flex items-center justify-center bg-[#00000090] backdrop-blur-sm p-[1.2rem] rounded-full"
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }}
                                exit={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                transition={{
                                    delay: 0.01 * 0,
                                    type: "spring",
                                    mass: 0.3,       // 약간 무게감 ↑
                                    stiffness: 50,  // 스프링 강하게 ↑
                                    damping: 8,      // 감쇠 낮춰서 튕기게 ↓
                                }}
                            >
                                <UI.Button
                                    className="text-white flex items-center justify-center px-[0.8rem] gap-[0.8rem]"
                                    onClick={() => {
                                        if ( !inputMode ) {
                                            setInputMode( true )
                                        }
                                    }}
                                >
                                    <p>댓글쓰기</p>
                                    <IconComponent type="outlined-arrow-swap" alt="테스트" className="invert-100" />
                                </UI.Button>
                            </motion.section>

                            <motion.section
                                // key={e.id + i}
                                key={"button2"}
                                className="flex items-center justify-center bg-[#00000090] backdrop-blur-sm p-[1.2rem] rounded-full"
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }}
                                exit={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                transition={{
                                    delay: 0.01 * 3,
                                    type: "spring",
                                    mass: 0.3,       // 약간 무게감 ↑
                                    stiffness: 50,  // 스프링 강하게 ↑
                                    damping: 8,      // 감쇠 낮춰서 튕기게 ↓
                                }}
                            >
                                <UI.Button
                                    // className="w-full h-full font-bold p-[1.6rem] bg-[#000000] text-white text-[1.8rem]"
                                    className="text-white flex items-center justify-center px-[0.8rem] gap-[0.8rem]"
                                    onClick={() => {
                                        pushToUrl(`/post/${postIdx}/modify`)
                                    }}
                                >
                                    <p>수정하기</p>
                                    <IconComponent type="outlined-arrow-swap" alt="테스트" className="invert-100" />
                                </UI.Button>
                            </motion.section>
                        </Fragment>
                    ) : "" }
                    
                    { false ? (
                        <Fragment key={"two"}>
                            <motion.section
                                // key={e.id + i}
                                key={"button3"}
                                className="flex items-center justify-center bg-[#00000090] backdrop-blur-sm p-[1.2rem] rounded-full"
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }}
                                exit={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                transition={{
                                    delay: 0.01 * 0,
                                    type: "spring",
                                    mass: 0.3,       // 약간 무게감 ↑
                                    stiffness: 50,  // 스프링 강하게 ↑
                                    damping: 8,      // 감쇠 낮춰서 튕기게 ↓
                                }}
                            >
                                <UI.Button
                                    className="text-white flex items-center justify-center px-[0.8rem] gap-[0.8rem]"
                                    onClick={() => {
                                        if ( !inputMode ) {
                                            setInputMode( true )
                                        }
                                    }}
                                >
                                    <p>이전글</p>
                                    <IconComponent type="outlined-arrow-swap" alt="테스트" className="invert-100" />
                                </UI.Button>
                            </motion.section>

                            <motion.section
                                // key={e.id + i}
                                key={"button4"}
                                className="flex items-center justify-center bg-[#00000090] backdrop-blur-sm p-[1.2rem] rounded-full"
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }}
                                exit={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                                transition={{
                                    delay: 0.01 * 3,
                                    type: "spring",
                                    mass: 0.3,       // 약간 무게감 ↑
                                    stiffness: 50,  // 스프링 강하게 ↑
                                    damping: 8,      // 감쇠 낮춰서 튕기게 ↓
                                }}
                            >
                                <UI.Button
                                    // className="w-full h-full font-bold p-[1.6rem] bg-[#000000] text-white text-[1.8rem]"
                                    className="text-white flex items-center justify-center px-[0.8rem] gap-[0.8rem]"
                                    onClick={() => {
                                        pushToUrl(`/post/${postIdx}/modify`)
                                    }}
                                >
                                    <p>다음글</p>
                                    <IconComponent type="outlined-arrow-swap" alt="테스트" className="invert-100" />
                                </UI.Button>
                            </motion.section>
                        </Fragment>
                    ) : "" }
                </AnimatePresence>
            </section>
            {/* 입력 */}
        </Fragment>
    )
}

export default ListSection