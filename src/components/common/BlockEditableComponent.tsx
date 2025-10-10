import { Fragment, useEffect, useRef, useState } from "react";

import { Block } from "@/types/post.type";
import { useBlockStore } from "@/stores/useEditorBlockStore";

import { Edit } from "../layout/Edit";
import ToolbarComponent from "./ToolbarComponent";

const BlockEditableComponent = ({ initData, rowIndex, blockIndex, mouseOverState, onChange }: { rowIndex?: number, blockIndex?: number, mouseOverState?: boolean, initData: Block[], onChange: (e: any) => void }) => {
    const [ list, setList ] = useState<Block[]>(initData);
    const [ config, setConfig ] = useState<Record<string, string>>({});
    const [ selectedOrder, setSelectedOrder ] = useState<number | null>(null);

    const { setCurrentRowStyle, setCurrentRowPosition, setCurrentLockKey } = useBlockStore();
    
    // order → ref 매핑
    const tempRef = useRef<string>("");
    const actionLock = useRef<Record<number, boolean>>({});
    const refs = useRef<Record<number, HTMLDivElement | null>>({});
    const containerRefs = useRef<Record<number, HTMLElement | null>>({});


    const getLockKey = (blockOrder: number, childIndex: number) => blockOrder * 1000 + childIndex;

    // 새로운 child 블록 추가
    // 새로운 블록 추가
    const handleEnter = (blockOrder: number) => {
        if (actionLock.current[blockOrder]) return;
        actionLock.current[blockOrder] = true;

        setList(prev => {
            const blockIdx = prev.findIndex(b => b.order === blockOrder);
            if (blockIdx === -1) return prev;

            // 새로 추가할 블록
            const newBlock: Block = {
                type: 5,
                order: 0, // 나중에 map으로 순서 재정렬
                children: [
                    {
                        value: "",
                        style: {
                            lineHeight: 1.5,
                            fontSize: 1.6,
                            fontWeight: 500,
                            color: "#000000",
                            textAlign: "left",
                            backgroundColor: "#ffffff00"
                        }
                    },
                ],
                style: {
                    lineHeight: 1.5,
                    fontSize: 1.6,
                    fontWeight: 500,
                    color: "#2d2d2d",
                    textAlign: "left",
                    backgroundColor: "#ffffff00"
                }
            };

            const newList = [...prev];
            newList.splice(blockIdx + 1, 0, newBlock);

            // order 재정렬
            const updatedList = newList.map((b, i) => ({ ...b, order: i }));

            setTimeout(() => {
                console.log("??? idx",  refs.current[updatedList[blockIdx + 1].order * 1000 + 0])
                // 새로 추가된 블록의 첫 번째 child focus
                refs.current[updatedList[blockIdx + 1].order * 1000 + 0]?.focus();
                actionLock.current[blockOrder] = false;
            }, 0);

            return updatedList;
        });
    };

    const insertLineBreak = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        range.deleteContents();

        const newline = document.createTextNode("\n");
        range.insertNode(newline);

        range.setStartAfter(newline);
        range.setEndAfter(newline);

        sel.removeAllRanges();
        sel.addRange(range);
    };

    const handleDelete = (blockOrder: number, childIndex: number) => {
        setList(prev => {
            const blockIdx = prev.findIndex(b => b.order === blockOrder);
            if (blockIdx === -1) return prev;

            const targetBlock = prev[blockIdx];

            // child 삭제
            const newChildren = targetBlock.children.filter((_, i) => i !== childIndex);

            // child가 남아 있으면 -> 해당 block 유지
            if (newChildren.length > 0) {
                const updatedBlock = { ...targetBlock, children: newChildren };
                const newList = [...prev];
                newList[blockIdx] = updatedBlock;

                setTimeout(() => {
                    // 삭제한 child 이전 child로 포커스 (없으면 0번 child)
                    const newChildIndex = Math.max(childIndex - 1, 0);
                    const prevRef = refs.current[getLockKey(blockOrder, newChildIndex)];
                    if (!prevRef) return;

                    prevRef.focus();

                    const range = document.createRange();
                    range.selectNodeContents(prevRef);
                    range.collapse(false);

                    const sel = window.getSelection();
                    sel?.removeAllRanges();
                    sel?.addRange(range);
                }, 0);

                return newList;
            }

            // child가 하나도 안 남으면 -> row 자체 삭제
            const newList = prev.filter((_, i) => i !== blockIdx).map((b, i) => ({
                ...b,
                order: i, // order 재정렬
            }));

            setTimeout(() => {
                // 삭제한 row 위쪽 row의 마지막 child에 포커스
                const prevBlock = newList[blockIdx - 1];
                if (!prevBlock) return;

                const lastChildIndex = prevBlock.children.length - 1;
                const prevRef = refs.current[getLockKey(prevBlock.order, lastChildIndex)];
                if (!prevRef) return;

                prevRef.focus();

                const range = document.createRange();
                range.selectNodeContents(prevRef);
                range.collapse(false);

                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            }, 0);

            return newList;
        });
    };

    const isEmpty = (html: string) => {
        return html === "" || html === "\n" || html === "<br>" || html === "<div><br></div>";
    };

    const handleClick = (order: number) => {
        setSelectedOrder(order);
        // const el = refs.current[order];
        // if (el) {
        //     const rect = el.getBoundingClientRect();
        //     setToolbarPos({ top: rect.top - 40, left: rect.left });
        // }
    };

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

    const getSelectedTextInfo = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return null;

        const range = sel.getRangeAt(0);
        
        return {
            selectedText: range.toString(),
            startContainer: range.startContainer,
            endContainer: range.endContainer,
            startOffset: range.startOffset,
            endOffset: range.endOffset,
        };
    };

    useEffect(() => {
        onChange(list);
    }, [list]);

    return (
        <section className="flex flex-col gap-[1.6rem] h-full">
            { list.length ? (
                <Fragment>
                    { list.map(( block, idx ) => 
                        <section
                            key={ idx }
                            ref={el => { containerRefs.current[idx] = el; }}
                            className="relative"
                        >
                            { block.children.map((child, childIndex) => {
                                const lockKey = getLockKey(block.order, childIndex);
                                const PAYLOAD_STYLE = {
                                    // ...prev,
                                    color: child.style?.color,
                                    backgroundColor: `${ child.style?.backgroundColor }`,
                                    fontSize: `${ child.style?.fontSize }`,
                                    textAlign: `${ child.style?.textAlign }`
                                }

                                return (
                                    <Edit.div
                                        key={lockKey}
                                        // tabIndex={0}
                                        ref={( el: HTMLDivElement | null ) => { refs.current[lockKey] = el; }}
                                        defaultValue={child.value}
                                        // placeholder="내용을 입력해주세요"
                                        className="transition-colors border-none rounded-[0.4rem]"
                                        style={{
                                            lineHeight: child.style?.lineHeight,
                                            fontSize: `${child.style?.fontSize}rem`,
                                            fontWeight: child.style?.fontWeight,
                                            color: child.style?.color,
                                            textAlign: child.style?.textAlign as React.CSSProperties["textAlign"],
                                            backgroundColor: `${ child.style?.backgroundColor }`
                                        }}
                                        onFocus={() => {
                                            handleClick( lockKey )
                                            
                                            setConfig( PAYLOAD_STYLE )
                                            setCurrentRowStyle( PAYLOAD_STYLE )
                                        }}
                                        onClick={() => { 
                                            tempRef.current = refs.current[lockKey]?.innerText ?? "";
                                            
                                            setConfig( PAYLOAD_STYLE )
                                            setCurrentRowStyle( PAYLOAD_STYLE )

                                            setCurrentRowPosition({
                                                blockOrder: Math.floor((selectedOrder ?? 0) / 1000),
                                                childIndex: (selectedOrder ?? 0) % 1000
                                            })
                                            setCurrentLockKey(lockKey)
                                        }}
                                        onKeyDown={event => {
                                            const html = refs.current[lockKey]?.innerText ?? "";
                                            tempRef.current = html;

                                            console.log("?html", html)
            
                                            if (event.key === "Enter") {
                                                event.preventDefault();

                                                if ( event.shiftKey ) {
                                                    insertLineBreak()
                                                } else {
                                                    handleEnter(block.order)
                                                }
                                                // event.shiftKey ? insertLineBreak() : handleEnter(block.order);
                                            }
            
                                            if (event.key === "Backspace" || event.key === "Delete") {
                                                if (isEmpty(html) && list.length !== 1 ) {
                                                    event.preventDefault();
                                                    handleDelete(block.order, childIndex);
                                                }
                                            }
                                            
                                            if (event.key === "ArrowDown") {
                                                console.log("ArrowDown")
                                                const sel = window.getSelection();
                                                if (!sel || sel.rangeCount === 0) return;
                                                const range = sel.getRangeAt(0);
            
                                                const el = refs.current[lockKey];
                                                if (!el) return;
            
                                                const cursorRect = range.getBoundingClientRect();   // 현재 커서 rect
                                                const elRect = el.getBoundingClientRect();          // 현재 element rect
            
                                                const VALUE = (cursorRect.bottom) - (elRect.bottom - 5);
            
                                                // 커서가 엘리먼트의 마지막 줄(하단 근처)에 있으면 다음 엘리먼트로 이동
                                                // if (cursorRect.bottom >= elRect.bottom - 5) {
                                                if (VALUE <= 10 && VALUE > -10) {
                                                    event.preventDefault();
        
                                                    // 현재 key들을 정렬된 배열로 변환
                                                    const keys = Object.keys(refs.current)
                                                        .map(k => parseInt(k, 10))
                                                        .sort((a, b) => a - b);
        
                                                    // 현재 위치 찾고
                                                    const currentIndex = keys.indexOf(lockKey);
                                                    if (currentIndex === -1) return;
        
                                                    // 다음 key 찾기
                                                    const nextKey = keys[currentIndex + 1];
                                                    if (nextKey !== undefined) {
                                                        refs.current[nextKey]?.focus();
                                                    }
                                                }
                                            }
            
                                            if (event.key === "ArrowUp") {
                                                const sel = window.getSelection();
                                                if (!sel || sel.rangeCount === 0) return;
                                                const range = sel.getRangeAt(0);
                                                
                                                const el = refs.current[lockKey];
                                                if (!el) return;
                                                console.log("ArrowUp")
            
                                                const cursorRect = range.getBoundingClientRect();
                                                const elRect = el.getBoundingClientRect();
            
                                                const VALUE = (cursorRect.top) - (elRect.top + 5);
            
                                                // 커서가 맨 윗줄에 있으면 이전 element로 이동
                                                if (VALUE <= 10 && VALUE > -10) {
                                                    console.log("여기 까지 옴 2")
                                                    // 단순히 -1 하면 같은 block에서만 동작
                                                    // 다른 block까지 고려하려면:
                                                    let prevKey = lockKey - 1;
                                                    while (!refs.current[prevKey] && prevKey >= 0) {
                                                        prevKey--;
                                                    }
        
                                                    const prev = refs.current[prevKey];
                                                    if (prev) {
                                                        prev.focus();
                                                    }
                                                }
                                            }
                                        }}
                                        onBlur={() => {
                                            console.log("????asd")
                                            const html = refs.current[lockKey]?.innerText ?? "";
                                            
                                            setList(prev =>
                                                prev.map(b => {
                                                    if (b.order !== block.order) return b;
                                                    const updatedChildren = b.children.map((c, i) =>
                                                        i === childIndex ? { ...c, value: html } : c
                                                    );
                                                    return { ...b, children: updatedChildren };
                                                })
                                            );
                                        }}
                                    />
                                );
                            })}
                        </section>
                    )}
                </Fragment>
            ) : "" }

            { mouseOverState ? (
                <ToolbarComponent
                    defaultConfig={{
                        color: config.color,
                        backgroundColor: config.backgroundColor,
                        fontSize: config.fontSize,
                        textAlign: config.textAlign
                    }}
                    onStyleChange={style => {
                        if ( selectedOrder !== null ) {
                            const blockOrder = selectedOrder === 0 ? 0 : Math.floor(selectedOrder / 1000);
                            const childIndex = selectedOrder % 1000;
                            
                            applyStyle(blockOrder, childIndex, style);
                        }
                    }}
                />
            ) : ""}
        </section>
    );
};

export default BlockEditableComponent;