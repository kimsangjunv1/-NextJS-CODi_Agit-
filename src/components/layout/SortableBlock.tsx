"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Reorder } from "framer-motion";
// import TiptapEditor from "./Tiptap";
// import { useBlockStore } from "./useBlockStore"; // store 경로에 맞게 수정
import { Block, useBlockStore } from "@/stores/useEditorBlockStore";
import UI from "../common/UIComponent";
import { useModalStore } from "@/stores/useModalStore";
import ModalContent from "../common/ModalComponent";
import TipTap from "./Tiptap";
import { highlightCode } from "@/utils/highlight";

const MAX_COLS = 2;

interface ContentsTempType {
    id: string;
    type: number;
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
}

const SortableBlock = ({ contents }: { contents: ContentsTempType[][] }) => {
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

    console.log("contents contents", contents)

    // ✅ 서버에서 받은 contents를 store rows로 세팅
    useEffect(() => {
        if (contents && contents.length > 0) {
            setRows(contents);
        }
    }, [contents, setRows]);

    return (
        <Fragment>
            { copiedBlock && selectedPosition && (
                <UI.Button
                    onClick={pasteBlock}
                    className="px-3 py-1 mb-4 text-white bg-green-500 rounded"
                >
                    붙여넣기
                </UI.Button>
            )}

            <Reorder.Group
                axis="y"
                values={ rows }
                onReorder={(newRows) => useBlockStore.getState().setRows(newRows)}
                as="section"
                className="flex flex-col flex-1 gap-[3.2rem]"
            >
                { rows.map(( row, rowIndex ) => (
                    <Reorder.Item
                        key={ row.map((b) => b.id).join("-") }
                        value={ row }
                        className="relative flex items-center justify-center gap-4"
                        as="div"
                    >
                        <UI.Button
                            onClick={() => deleteRow( rowIndex )}
                            className="absolute top-0 right-0 z-10 px-2 py-1 text-xs text-white bg-red-600 rounded"
                        >
                            행 삭제
                        </UI.Button>

                        <Reorder.Group
                            axis="x"
                            values={row}
                            onReorder={(newRow) => {
                                const newRows = rows.map((r, i) =>
                                    i === rowIndex ? newRow : r
                                );
                                useBlockStore.getState().setRows(newRows);
                            }}
                            className="flex flex-1 gap-4"
                            as="section"
                        >
                            { row.map(( block, blockIndex ) => (
                                <Reorder.Item
                                    key={block.id}
                                    value={block}
                                    className="flex-1"
                                    as="div"
                                >
                                    <Block block={ block } rowIndex={ rowIndex }  blockIndex={ blockIndex } />

                                    { blockIndex === 0 && (
                                        <div className="flex gap-2 mt-2">
                                            <UI.Button
                                                onClick={() => addBlock(rowIndex, "down")}
                                                className="px-2 py-1 text-white bg-blue-500 rounded"
                                            >
                                                + 아래
                                            </UI.Button>
                                            
                                            <UI.Button
                                                onClick={() => addBlock(rowIndex, "right")}
                                                className="px-2 py-1 text-white bg-green-500 rounded"
                                            >
                                                + 오른쪽
                                            </UI.Button>
                                        </div>
                                    )}
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                        <div className="flex items-center justify-center w-8 h-[100px] bg-gray-300 rounded cursor-grab select-none">
                            =
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </Fragment>
    );
};

const Block = ({ block, rowIndex, blockIndex }: { block: Block, rowIndex: number, blockIndex: number }) => {
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
    const { setModal } = useModalStore();

    const [ currentImageUrl, setCurrentImageUrl ] = useState<string>("/");

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

    return (
        <div
            className={`flex flex-col gap-2 h-full ${
                isSelected ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => selectBlock(rowIndex, blockIndex)}
        >
            { block.type === 0 ? (
                <section className="p-2 border border-[var(--color-gray-100)]">
                    <UI.Input
                        type="text"
                        placeholder="부제목"
                        defaultValue={block.subtitle}
                        onChange={(e) =>
                            updateBlock(rowIndex, blockIndex, { subtitle: e.target.value })
                        }
                        className="w-full p-1 border rounded"
                    />

                    <UI.Input
                        type="text"
                        placeholder="제목"
                        defaultValue={block.title}
                        onChange={(e) =>
                            updateBlock(rowIndex, blockIndex, { title: e.target.value })
                        }
                        className="w-full p-1 border rounded"
                    />
        
                    <TipTap.Normal
                        content={block.content}
                        onChange={(html) =>
                            updateBlock(rowIndex, blockIndex, { content: html })
                        }
                    />
                </section>
            ) : ""}

            { block.type === 1 ? (
                <section className="border border-[var(--color-gray-100)]">
                    <img src={ block.imageUrl !== "" ? block.imageUrl : "https://dummyimage.com/200x200/ededed/000000&text=placeholder" } alt="/" />
                    <UI.Button
                        onClick={() => setPreventModal()}
                        className="p-[1.6rem] bg-black text-white w-full"
                    >
                        이미지 선택
                    </UI.Button>
                </section>
            ) : "" }

            { block.type === 2 ? (
                <section className="border border-[var(--color-gray-100)]">
                    <UI.Input
                        type="text"
                        placeholder="부제목"
                        defaultValue={block.subtitle}
                        onChange={(e) =>
                            updateBlock(rowIndex, blockIndex, { subtitle: e.target.value })
                        }
                        className="w-full p-1 border rounded"
                    />

                    <UI.Input
                        type="text"
                        placeholder="제목"
                        defaultValue={block.title}
                        onChange={(e) =>
                            updateBlock(rowIndex, blockIndex, { title: e.target.value })
                        }
                        className="w-full p-1 border rounded"
                    />

                    <TipTap.Code
                        content={block.content}
                        onChange={(html) =>
                            updateBlock(rowIndex, blockIndex, { content: html })
                        }
                    />
                    {/* <div
                        contentEditable
                        className="p-4 font-mono text-white whitespace-pre-wrap bg-gray-900 rounded code-block editable-code"
                        dangerouslySetInnerHTML={{ __html: highlightCode(block.content) }}
                    /> */}
                    {/* <UI.Code initialContent={ block.content } /> */}
                </section>
            ) : "" }

            <div className="flex gap-2 mt-2">
                {[0, 1, 2].map((e, i) =>
                    <UI.Button
                        key={ i }
                        onClick={() => {
                            updateBlock(rowIndex, blockIndex, { type: e })
                        }}
                    >
                        { e === 0 ? "텍스트" : e === 1 ? "이미지" : "코드" }
                    </UI.Button>
                )}
            </div>

            <div className="flex gap-2 mt-2">
                <UI.Button
                    onClick={() => deleteBlock(rowIndex, blockIndex)}
                    className="px-2 py-1 text-white bg-red-500 rounded"
                >
                    삭제
                </UI.Button>
                <UI.Button
                    onClick={() => copyBlock(rowIndex, blockIndex)}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                >
                    복사
                </UI.Button>
            </div>
        </div>
    );
};

export default SortableBlock;