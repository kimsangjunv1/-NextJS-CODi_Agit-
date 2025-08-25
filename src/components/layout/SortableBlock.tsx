"use client";

import { Fragment } from "react";
import { Reorder } from "framer-motion";
import TiptapEditor from "./Tiptap";
// import { useBlockStore } from "./useBlockStore"; // store 경로에 맞게 수정
import { useBlockStore } from "@/stores/useEditorBlockStore";

const MAX_COLS = 2;

const SortableBlock = () => {
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

    const renderBlock = (block, rowIndex, blockIndex) => {
        const isSelected =
            selectedPosition?.rowIndex === rowIndex &&
            selectedPosition?.blockIndex === blockIndex;

        return (
            <div
                className={`flex flex-col gap-2 p-2 border h-full rounded ${
                    isSelected ? "ring-2 ring-blue-500" : "border-gray-200"
                }`}
                onClick={() => selectBlock(rowIndex, blockIndex)}
            >
                <input
                    type="text"
                    placeholder="제목"
                    value={block.title}
                    onChange={(e) =>
                        updateBlock(rowIndex, blockIndex, { title: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                />
                <input
                    type="text"
                    placeholder="부제목"
                    value={block.subtitle}
                    onChange={(e) =>
                        updateBlock(rowIndex, blockIndex, { subtitle: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                />

                <TiptapEditor
                    content={block.content}
                    onChange={(html) =>
                        updateBlock(rowIndex, blockIndex, { content: html })
                    }
                />

                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => deleteBlock(rowIndex, blockIndex)}
                        className="px-2 py-1 text-white bg-red-500 rounded"
                    >
                        삭제
                    </button>
                    <button
                        onClick={() => copyBlock(rowIndex, blockIndex)}
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                    >
                        복사
                    </button>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {copiedBlock && selectedPosition && (
                <button
                    onClick={pasteBlock}
                    className="px-3 py-1 mb-4 text-white bg-green-500 rounded"
                >
                    붙여넣기
                </button>
            )}

            <Reorder.Group
                axis="y"
                values={rows}
                onReorder={(newRows) => useBlockStore.getState().setRows(newRows)}
                as="section"
                className="flex flex-col flex-1 gap-[3.2rem]"
            >
                {rows.map((row, rowIndex) => (
                    <Reorder.Item
                        key={row.map((b) => b.id).join("-")}
                        value={row}
                        className="relative flex items-center justify-center gap-4"
                        as="div"
                    >
                        <button
                            onClick={() => deleteRow(rowIndex)}
                            className="absolute top-0 right-0 z-10 px-2 py-1 text-xs text-white bg-red-600 rounded"
                        >
                            행 삭제
                        </button>

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
                            {row.map((block, blockIndex) => (
                                <Reorder.Item
                                    key={block.id}
                                    value={block}
                                    className="flex-1"
                                    as="div"
                                >
                                    {renderBlock(block, rowIndex, blockIndex)}

                                    {blockIndex === 0 && (
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => addBlock(rowIndex, "down")}
                                                className="px-2 py-1 text-white bg-blue-500 rounded"
                                            >
                                                + 아래
                                            </button>
                                            <button
                                                onClick={() => addBlock(rowIndex, "right")}
                                                className="px-2 py-1 text-white bg-green-500 rounded"
                                            >
                                                + 오른쪽
                                            </button>
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

export default SortableBlock;