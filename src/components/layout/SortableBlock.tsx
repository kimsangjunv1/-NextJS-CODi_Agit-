"use client";

import { motion, Reorder } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

import TipTap from "./Tiptap";
import UI from "@/components/common/UIComponent";
import IconComponent from "@/components/common/IconComponent";
import ModalContent from "@/components/common/ModalComponent";
import BlockEditableComponent from "@/components/common/BlockEditableComponent";

import { useModalStore } from "@/stores/useModalStore";
import { useToastStore } from "@/stores/useToastStore";
import { Row, useBlockStore } from "@/stores/useEditorBlockStore";

import type { SectionContent, Block } from "@/types/post.type";

const SortableBlock = ({ contents }: { contents?: Row[] }) => {
    const [ isGrabbing, setIsGrabbing ] = useState( false );
    const {
        rows,
        copiedBlock,
        selectedPosition,
        setRows,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteRow,
        copyBlock,
        pasteBlock,
        selectBlock,
    } = useBlockStore();
    const { setToast } = useToastStore();

    useEffect(() => {
        if (contents && contents.length > 0) {
            setRows(contents);
        }
    }, [contents, setRows]);

    return (
        <Reorder.Group
            axis="y"
            values={ rows }
            onReorder={(newRows) => useBlockStore.getState().setRows(newRows)}
            as="section"
            className="flex flex-col flex-1 gap-[0.4rem] px-[0.8rem]"
        >
            { rows.map(( row, rowIndex ) => (
                <Reorder.Item
                    key={ row.map((b) => b.id).join("-") }
                    value={ row }
                    className={`relative flex items-center justify-center flex-col gap-[0.8rem] bg-[#ffffff80] shadow-[var(--shadow-normal)] rounded-[2.4rem] p-[0.4rem] ${ isGrabbing ? "scale-[0.97]" : "scale-[1]" }`}
                    as="div"
                >
                    <section
                        className={`flex gap-[1.6rem] w-full justify-between ${ isGrabbing ? "cursor-grabbing" : "cursor-grab" }`}
                        onPointerDown={() => setIsGrabbing( true )}
                        onPointerUp={() => setIsGrabbing( false )}
                    >
                        { row.length && (
                            <section className="flex items-center justify-center bg-white rounded-full shadow-[var(--shadow-normal)]">
                                <UI.Button
                                    onClick={() => {
                                        if ( row.length === 2 ) {
                                            setToast({ msg: "블록은 최대 2개까지 생성 가능해요", time: 2 })
                                            return;
                                        }
                                        addBlock(rowIndex, "right")
                                    }}
                                    className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                                >
                                    <p>블록추가</p>
                                    <IconComponent type="outlined-arrow-add-right" alt="오른쪽에 블록 추가" />
                                </UI.Button>

                                <UI.Button
                                    onClick={() => {
                                        const newRows = rows.map((e, idx) => idx === rowIndex ? e.reverse() : e);
                                        
                                        useBlockStore.getState().setRows(newRows);
                                    }}
                                    className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                                >
                                    {/* 내용 스왑 */}
                                    <p>블록전환</p>
                                    <IconComponent type="outlined-arrow-swap" alt="내용 스왑" />
                                </UI.Button>
                            </section>
                        )}
                        
                        <section className="flex items-center justify-center bg-white rounded-full shadow-[var(--shadow-normal)]">
                            <UI.Button
                                onClick={() => addBlock(rowIndex, "down")}
                                className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                            >
                                <p>아래에 그룹 추가</p>
                                <p>+</p>
                            </UI.Button>
                            
                            <UI.Button
                                onClick={() => {
                                    console.log("rows.length", rows.length)
                                    if ( rows.length === 1 ) {
                                        setToast({ msg: "마지막 그룹은 삭제 할 수 없어요", time: 2 })
                                        return;
                                    } else {
                                        setToast({ msg: "그룹을 제거했어요", time: 2 })
                                    }
                                    deleteRow( rowIndex )
                                }}
                                className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                            >
                                <p>그룹 삭제</p>
                                <p>-</p>
                            </UI.Button>
                        </section>

                        {/* <div className="flex items-center justify-center cursor-grab select-none h-[calc(1.6rem*2)] w-[calc(1.6rem*2)] rounded-[1.6rem] shadow-[var(--shadow-normal)]">
                            =
                        </div> */}
                    </section>

                    <section className="flex flex-1 w-full h-full gap-[2.4rem]">
                        { row.map(( block, blockIndex ) => (
                            <section
                                key={ block.id }
                                className="flex-1"
                            >
                                <Block block={ block } rowIndex={ rowIndex } blockIndex={ blockIndex } last={ row.length !== 1 } blockCount={ row.length } />
                            </section>
                        ))}
                    </section>

                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
};

const Block = ({ block, rowIndex, blockIndex, last, blockCount }: { block: SectionContent, rowIndex: number, blockIndex: number, last: boolean, blockCount: number }) => {
    const {
        rows,
        copiedBlock,
        selectedPosition,
        currentRowStyle,
        currentRowPosition,
        currentLockKey,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteRow,
        copyBlock,
        pasteBlock,
        selectBlock,
        unSelectBlock,
        unSelectRow,
    } = useBlockStore();
    const { setModal } = useModalStore();
    const { setToast } = useToastStore();

    const [ list, setList ] = useState<Block[]>( (block.content as Block[]) );

    // const [ currentIndex, setCurrentIndex ] = useState<{ row: number, block: number }>({ row: 0, block: 0 });
    const [ currentImageUrl, setCurrentImageUrl ] = useState<string>("/");
    const containerRef = useRef<HTMLDivElement>( null );

    const detectOutsideClick = (e: MouseEvent) => {
        if ( containerRef.current && !containerRef.current.contains(e.target as Node) ) {
            // unSelectBlock()
            // unSelectRow()
        }
    };

    const setPreventModal = () => setModal({
        type: "CHECK",
        title: "이미지 관리",
        content: (
            <ModalContent.Image.Box
                onChange={( url ) => {
                    setCurrentImageUrl(url);
                    updateBlock(rowIndex, blockIndex, { imageUrl: url ?? "" })
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

    const isSelected =
        selectedPosition?.rowIndex === rowIndex &&
        selectedPosition?.blockIndex === blockIndex;

    const applyStyle = (blockOrder: number, childIndex: number, newStyle: any) => {
        setList(prev =>
            prev.map(block => {
                if (block.order !== blockOrder) return block;

                const updatedChildren = block.children.map((child, i) => {
                    if (i !== childIndex) return child;

                    let updated = { ...child.style };
                    if (newStyle.fontWeight === "toggleBold") {
                        updated.fontWeight = child.style.fontWeight === 700 ? 500 : 700;
                    } else if (typeof newStyle.fontSize === "string") {
                        updated.fontSize = (child.style.fontSize || 1) + parseFloat(newStyle.fontSize);
                    } else {
                        updated = { ...updated, ...newStyle };
                    }

                    return { ...child, style: updated };
                });

                return { ...block, children: updatedChildren };
            })
        );
    };

    useEffect(() => {
        if ( selectedPosition ) {
            document.addEventListener("click", detectOutsideClick);
        }

        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [selectedPosition]);

    return (
        <motion.div
            ref={ containerRef }
            tabIndex={0}
            className={`flex flex-col gap-2 h-full backdrop-blur-lg border ${ block.type !== 0 ? "rounded-[2.4rem] overflow-hidden shadow-[var(--shadow-normal)]" : "" } ${ isSelected ? "border-transparent" : "border-transparent" }`}
            onClick={() => {
                selectBlock(rowIndex, blockIndex);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
                // 현재 이벤트가 발생한 요소
                const target = e.target as HTMLElement;

                // input, textarea, contenteditable 요소에서는 막지 않기
                if (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable
                ) {
                    return;
                }

                // 나가기
                // Ctrl+C 또는 Cmd+C
                if ( e.key === "Escape" ) {
                    e.preventDefault();
                    
                    console.log("esc 감지!");
                    unSelectBlock();

                    setToast({ msg: "선택 해제 되었어요", time: 2 })
                }

                // 복사
                // Ctrl+C 또는 Cmd+C
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
                    e.preventDefault();

                    copyBlock(rowIndex, blockIndex);

                    setToast({ msg: "복사가 완료됐어요!", time: 2 })
                }

                // 붙여넣기
                // Ctrl+V 또는 Cmd+V
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
                    e.preventDefault();

                    console.log("Ctrl or Cmd + C 감지!");
                    pasteBlock();

                    setToast({ msg: "복사한 col을 붙여넣었어요", time: 2 })
                }
            }}
        >
            <section className={`relative flex flex-col gap-[1.6rem] min-h-[43.0rem] h-full ${ block.type === 0 ? "p-[1.2rem]" : "p-[0.4rem]" }`}>
                {/* 액션 */}
                <section className="absolute top-[0.8rem] right-[0.8rem] flex items-center gap-[0.8rem] justify-between z-1">
                    { last ? (
                        <UI.Button
                            onClick={() => {
                                if ( !last ) {
                                    setToast({ msg: "마지막 남은 블록은 삭제 할 수 없어요", time: 2 })
                                    
                                    return;
                                }

                                deleteBlock(rowIndex, blockIndex)
                            }}
                            className="p-[0.8rem] rounded-full bg-white shadow-[var(--shadow-normal)]"
                        >
                            <IconComponent type="outlined-cross" alt="닫기" />
                        </UI.Button>
                    ) : "" }
                </section>
                {/* 액션 END */}
                    
                { block.type === 0 ? (
                    <Fragment>
                        <section className="flex flex-col gap-[0.8rem]">
                            <UI.Input
                                type="text"
                                placeholder="부제목"
                                defaultValue={block.subtitle}
                                onChange={(e) =>
                                    updateBlock(rowIndex, blockIndex, { subtitle: e.target.value })
                                }
                                className={{
                                    container: "w-full border-b border-b-[var(--color-gray-200)]",
                                    input: "h-[calc(1.4rem+0.8rem)] text-[var(--color-gray-500)]"
                                }}
                            />

                            <UI.Input
                                type="text"
                                placeholder="제목"
                                defaultValue={block.title}
                                onChange={(e) =>
                                    updateBlock(rowIndex, blockIndex, { title: e.target.value })
                                }
                                className={{
                                    container: "w-full border-b border-b-[var(--color-gray-200)]",
                                    input: "h-[calc(1.6rem+0.8rem)] text-[2.0rem] font-bold text-[var(--color-gray-1000)]"
                                }}
                            />
                        </section>

                        <BlockEditableComponent
                            rowIndex={ rowIndex }
                            blockIndex={ blockIndex }
                            mouseOverState={
                                selectedPosition?.blockIndex === blockIndex &&
                                selectedPosition?.rowIndex === rowIndex
                            }
                            initData={ list }
                            onChange={( data ) => {
                                updateBlock(rowIndex, blockIndex, { content: data })
                            }}
                        />
                    </Fragment>
                ) : ""}

                { block.type === 1 ? (
                    <Fragment>
                        <img
                            src={ block.imageUrl !== "" ? block.imageUrl : "https://dummyimage.com/200x200/ededed/000000&text=placeholder" }
                            alt="/"
                            className={`object-cover rounded-[2.0rem] ${ blockCount === 1 ? "max-h-[36.0rem]" : "h-full" }`}
                            // className={`object-cover ${ blockCount === 1 ? "h-[calc(1.6rem*16)]" : "h-full" }`}
                            // className="shadow-[var(--shadow-normal)]"
                        />
                        <UI.Button
                            onClick={() => setPreventModal()}
                            className="p-[1.6rem] bg-[white] hover:bg-[var(--color-brand-500)] transition-all backdrop-blur-sm rounded-[1.6rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] shadow-[var(--shadow-normal)] font-semibold"
                        >
                            이미지 선택
                        </UI.Button>
                    </Fragment>
                ) : "" }

                { block.type === 2 ? (
                    <Fragment>
                        {/* 임시 비활성화 */}
                        { false ? (
                            <section className="flex flex-col gap-[0.8rem]">
                                <UI.Input
                                    type="text"
                                    placeholder="부제목"
                                    defaultValue={block.subtitle}
                                    onChange={(e) =>
                                        updateBlock(rowIndex, blockIndex, { subtitle: e.target.value })
                                    }
                                    className={{
                                        container: "w-full border-b border-b-[var(--color-gray-200)]",
                                        input: "h-[calc(1.4rem+0.8rem)] text-[var(--color-gray-500)]"
                                    }}
                                />

                                <UI.Input
                                    type="text"
                                    placeholder="제목"
                                    defaultValue={block.title}
                                    onChange={(e) =>
                                        updateBlock(rowIndex, blockIndex, { title: e.target.value })
                                    }
                                    className={{
                                        container: "w-full border-b border-b-[var(--color-gray-200)]",
                                        input: "h-[calc(1.6rem+0.8rem)] text-[2.0rem] font-bold text-[var(--color-gray-1000)]"
                                    }}
                                />
                            </section>
                        ) : "" }

                        <TipTap.Code
                            content={ block.content as string }
                            onChange={(html) =>
                                updateBlock(rowIndex, blockIndex, { content: html })
                            }
                        />
                    </Fragment>
                ) : "" }

                <article className={`flex justify-center action ${ block.type !== 0 ? "mb-[0.8rem]" : "" }`}>
                    <section className="action-inner flex items-center justify-center bg-[#ffffff90] p-[0.4rem] rounded-full shadow-[var(--shadow-normal)]">
                        <UI.Button
                            onClick={() =>updateBlock(rowIndex, blockIndex, { type: 0 })}
                            className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem] bg-white shadow-[var(--shadow-normal)]"
                        >
                            <p>텍스트</p>
                        </UI.Button>

                        <UI.Button
                            onClick={() =>updateBlock(rowIndex, blockIndex, { type: 1 })}
                            className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                        >
                            <p>이미지</p>
                        </UI.Button>

                        <UI.Button
                            onClick={() =>updateBlock(rowIndex, blockIndex, { type: 2 })}
                            className="text-black rounded-[1.6rem] flex gap-[0.4rem] h-full items-center px-[1.2rem] py-[0.8rem]"
                        >
                            <p>코드</p>
                        </UI.Button>
                    </section>
                </article>
            </section>

        </motion.div>
    );
};

export default SortableBlock;