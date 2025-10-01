"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { Block, SectionContent } from '@/types/post.type';
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
import { useBlockStore } from '@/stores/useEditorBlockStore';

const ListSection = ({ id }: { id: string }) => {
    return (
        <section className='flex flex-col w-full post pb-[7.2rem]'>
            <section className='mx-auto post-inner w-full max-w-[var(--size-tablet)] flex flex-col gap-[1.6rem] px-[1.2rem]'>
                <RenderContents id={id} />
            </section>
        </section>
    )
}

const RenderContents = ({ id }: { id: string }) => {
    const { data: getPostListData, refetch: getPostListFetch } = useGetPostDetailQuery(parseInt( id ));
    // const { data: setIncrementViewData, mutate: setIncrementViewFetch } = useSetIncrementViewQuery();
    const { data: getCommentListData, refetch: getCommentListFetch } = useGetCommentDetailQuery(parseInt( id ));

    const DATA = useMemo(() => getPostListData?.result, [ getPostListData ])

    // const calledRef = useRef(false);

    // useEffect(() => {
    //     if (!calledRef.current) {
    //         setIncrementViewFetch({ postId: parseInt(id) });
    //         calledRef.current = true;
    //     }
    // }, [id]);

    return (
        <AnimatePresence mode='popLayout'>
            <section className='flex flex-col justify-center items-center gap-[3.2rem] min-h-[calc(1.6rem*20)] h-[calc(100dvh-(var(--header-height)*2))] mb-[calc(1.6rem*5)]'>
                <Thumbnail key={"Thumbnail"} imageUrl={ DATA?.thumbnail } contents={ DATA?.contents } />
                <Title key={"Title"} title={ DATA?.title } summary={ DATA?.summary } createDate={ DATA?.created_at } viewCount={ DATA?.views } />
            </section>
            
            <Contents key={"Contents"} contents={ DATA?.contents } />
            <Comment key={"Comment"} contents={ getCommentListData?.result } postIdx={ id } />
            <Action key={"Action"} id={id} />
        </AnimatePresence>
    )
}

const Thumbnail = ({
    imageUrl,
    contents,
}: { 
    imageUrl: string;
    contents: SectionContent[][];
}) => {
    const [ initGlow, setInitGlow ] = useState( false );
    const [ contentImageList, setContentImageList ] = useState<string[]>([]);

    useEffect(() => {
        if ( contents ) {
            setContentImageList(contents.map((init) => init.find((e) => e.type === 1 )?.imageUrl ?? "/"));
        }
    }, [ contents ])
    
    return (
        <article className='relative rounded-[calc(1.6rem*5)]'>
            <motion.img
                src={ imageUrl }
                alt="/"
                className="object-cover object-center max-w-[100%] max-h-[calc(1.6rem*20)] h-[calc(100dvh-(var(--header-height)*5))] rounded-[calc(1.6rem*3)] shadow-[var(--shadow-normal)] aspect-auto"
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

            { !initGlow ? (
                <motion.div
                    key={`glow-${ initGlow }`}
                    className="absolute inset-0 z-10 pointer-events-none blur-[10px]"
                    initial={{ scale: 0, opacity: 0.4 }}
                    animate={{ scale: 10, opacity: -10 }}
                    transition={{
                        duration: 3,
                        ease: "easeOut",
                        repeat: 0,       // 무한 반복
                        // repeatType: "loop",
                    }}
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0) 0%, var(--color-brand-500) 50%, rgba(255,255,255,0) 70%)",
                        borderRadius: "50%",
                        transformOrigin: "center"
                    }}
                    onAnimationEnd={() => setInitGlow( true )}
                />
            ) : "" }
        </article>
    )
}

const Title = ({
    title, 
    summary,
    createDate,
    viewCount,
}: {
    title: string, 
    summary: string,
    createDate: string,
    viewCount: number
}) => {
    return (
        <motion.article
            className='flex flex-col items-center justify-between gap-[1.6rem]'
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
            <section
                className='flex flex-col items-center justify-center gap-[1.6rem]'
            >
                <section className="flex flex-col gap-[0.8rem]">
                    <p className='font-semibold text-[1.8rem] text-[var(--color-gray-500)]'>
                        { util.string.getCurrentTime(createDate, 4) } ・ { viewCount } view
                    </p>
                    {/* <h2 className='font-extrabold text-[2.8rem] text-black leading-[1.5] whitespace-break-spaces text-center'>{ title }</h2> */}
                </section>
                <p className='font-bold text-center leading-[1.5] w-full whitespace-break-spaces mobile:text-left tablet:text-center mobile:text-[2.4rem] tablet:text-[2.8rem]'>{ summary }</p>
            </section>

            <section className='w-[0.2rem] h-[7.2rem] bg-[linear-gradient(180deg,_transparent_10%,_#000000)]' />

            <section className='flex flex-col items-center gap-[1.6rem]'>
                <img src="/images/picture/img-dummy-profile-1.png" alt="프로필" className='rounded-[1.2rem] w-[4.8rem] h-[5.8rem] shadow-[var(--shadow-normal)] object-cover' />
                
                <section className='flex flex-col items-center gap-[0.4rem]'>
                    <p className='font-bold text-[1.6rem]'>김상준</p>
                    <p className='text-[1.2rem] font-semibold text-[var(--color-gray-500)]'>프론트엔드 개발자</p>
                </section>
            </section>
        </motion.article>
    )
}

const Contents = ({ contents }: { contents: SectionContent[][] }) => {
    const { setToast } = useToastStore();
    const codeRef = useRef<HTMLDivElement>(null);

    return (
        <article className='flex gap-[0.4rem]'>
            {/* <section className='shortcut'>
                <h5>QUICK_MOVE</h5>
                <div>
                    <UI.Button>
                        LOGO
                    </UI.Button>
                </div>
            </section> */}

            <section className='flex flex-col gap-[5.2rem] flex-1'>
                { contents?.map((row, rowIdx) =>
                    <section key={ rowIdx } className={`grid grid-cols-[1fr_1fr] gap-[1.6rem] ${ row.length === 1 && (row?.[0].type === 1 || row?.[0].type === 2) ? "" : "" }`}>

                        { row.map((col, colIdx) =>
                            <motion.section
                                key={ col.id } 
                                className={`w-full min-w-0 ${ row.length !== 0 ? "flex gap-[1.2rem]" : "" } ${ row.length === 1 ? "col-span-2" : "min-h-[36.0rem]" } ${ col.type === 0 ? "flex-col" : "" } ${ col.type === 1 || col.type === 2 ? "rounded-[2.4rem] overflow-hidden" : "" } ${ col.type === 2 ? "flex-col" : "" }`}
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
                                                { col.title ? <h5 className='text-[2.0rem] font-bold text-[var(--color-gray-1000)]'>{ col.title }</h5> : "" }
                                            </section>
                                        ) : "" }

                                        <section className='flex flex-col items-start overflow-x-auto'>
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
                                                        className='transition-colors border border-transparent cursor-pointer hover:border-black'
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
                                            className={`h-full w-full object-cover max-h-[36.0rem] ${ row.length === 2 ? "" : "" }`}
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
        if ( inputMode ) {
            document.addEventListener("click", detectOutsideClick);
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [ inputMode ]);

    useEffect(() => {
        setRandName(util.string.getRandomName());
    }, [])

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

    useEffect(() => {
        if ( inputRef.current ) {
            setCurrentContainerWidth(inputRef.current?.offsetWidth)
        }
    }, [])

    return (
        <Fragment>
            {/* 목록 */}
            <AnimatePresence mode="wait">
                { inputMode ? (
                    <motion.section
                        key={"list"}
                        className="fixed top-0 left-0 h-full comment-list w-full pb-[calc(1.6rem*2)] pt-[calc(1.6rem*2)] overflow-y-auto mask-[linear-gradient(0deg,#0000,#000_5%_95%,#0000)] bg-[linear-gradient(0deg,_#ffffff,_#ffffff90)] backdrop-blur-lg flex items-end"
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
                            className="w-full max-w-[var(--size-tablet)] mx-auto pt-[6.0rem] pb-[calc(6.0rem*2)] px-[1.2rem] overflow-y-auto max-h-[calc(100dvh-var(--header-height)-(1.6rem*2))] mask-[linear-gradient(0deg,#0000,#000_5%_95%,#0000)]"
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
                    </motion.section>
                ) : "" }
            </AnimatePresence>
            {/* 목록 END */}


            {/* 입력 */}
            <motion.section
                ref={ inputRef }
                className="fixed bottom-[calc(1.6rem*3)] left-[50%] transform translate-x-[-50%] z-10 body px-[1.2rem] py-[0.8rem] h-[calc(1.6rem*3)] min-w-[13.2rem] w-auto max-w-[calc(100dvw-(1.6rem*2))] bg-[#ffffffcb] backdrop-blur-sm rounded-[calc(1.6rem*2)] flex items-center shadow-[var(--shadow-normal)]"
                animate={{
                    width: inputMode ? "var(--size-tablet)" : currentContainerWidth + 72 + 16,
                }}
                transition={{
                    type: "spring",
                    mass: 0.1,
                    stiffness: 50,
                    damping: 8,
                }}
                onClick={() => {
                    if ( !inputMode ) {
                        setInputMode( true )
                    }
                }}
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
                    className={`absolute right-[0.4rem] top-[50%] transform translate-y-[-50%] flex justify-center items-center px-[1.2rem] h-[4.2rem] rounded-full overflow-hidden shadow-[var(--shadow-normal)] ${ inputMode ? "bg-[var(--color-brand-500)]" : "pointer-events-none bg-black" }`}
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
            </motion.section>
            {/* 입력 */}
        </Fragment>
    )
}

const Action = ({ id }: { id: string }) => {
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
    const { pushToUrl } = useNavigate();

    return (
        <motion.article
            className='sticky bottom-0 flex'
            key={"Thumbnail"}
            layout
            initial={{ opacity: 0, transform: "scale(0.9)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.9)" }}
            transition={{
                delay: 0.05 * 5,
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <UI.Button
                className="w-full h-full p-[1.6rem] bg-[var(--color-brand-500)] font-bold text-white text-[1.8rem]"
                onClick={() => {
                    pushToUrl(`/post/create`)
                }}
            >
                작성하기
            </UI.Button>
            
            <UI.Button
                className="w-full h-full font-bold p-[1.6rem] bg-[#000000] text-white text-[1.8rem]"
                onClick={() => {
                    pushToUrl(`/post/${id}/modify`)
                }}
            >
                수정하기
            </UI.Button>
        </motion.article>
    )
}

export default ListSection