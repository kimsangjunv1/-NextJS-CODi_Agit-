import { create } from "zustand";

export type Block = {
    id: string;
    type: number;
    title?: string;
    subtitle?: string;
    content: string;
    imageUrl?: string;
};

export type Row = Block[];

interface BlockStore {
    rows: Row[];
    copiedBlock: Block | null;
    selectedPosition: { rowIndex: number; blockIndex: number } | null;

    // 행/블록 조작
    addBlock: (rowIndex: number, direction: "right" | "down") => void;
    updateBlock: (rowIndex: number, blockIndex: number, newData: Partial<Block>) => void;
    deleteBlock: (rowIndex: number, blockIndex: number) => void;
    deleteRow: (rowIndex: number) => void;

    // 복사/붙여넣기
    copyBlock: (rowIndex: number, blockIndex: number) => void;
    pasteBlock: () => void;
    selectBlock: (rowIndex: number, blockIndex: number) => void;

    // 초기화/설정
    setRows: (rows: Row[]) => void;
}

export const useBlockStore = create<BlockStore>((set, get) => ({
    rows: [
        [{ id: Date.now().toString(), type: 0, title: "", subtitle: "", content: "<p>새 블록</p>", imageUrl: "" }],
    ],
    copiedBlock: null,
    selectedPosition: null,

    setRows: (rows) => set({ rows }),

    addBlock: (rowIndex, direction) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type: 0,
            title: "",
            subtitle: "",
            content: "<p>새 블록</p>",
            imageUrl: "",
        };
        set((state) => {
            const newRows = state.rows.map((row, i) =>
                i === rowIndex && direction === "right" && row.length < 2
                    ? [...row, newBlock]
                    : row
            );
            if (direction === "down") {
                newRows.splice(rowIndex + 1, 0, [newBlock]);
            }
            return { rows: newRows };
        });
    },

    updateBlock: (rowIndex, blockIndex, newData) =>
        set((state) => ({
            rows: state.rows.map((row, i) =>
                i === rowIndex
                    ? row.map((b, j) => (j === blockIndex ? { ...b, ...newData } : b))
                    : row
            ),
        })),

    deleteBlock: (rowIndex, blockIndex) =>
        set((state) => ({
            rows: state.rows
                .map((row, i) =>
                    i === rowIndex ? row.filter((_, j) => j !== blockIndex) : row
                )
                .filter((row) => row.length > 0),
        })),

    deleteRow: (rowIndex) =>
        set((state) => ({
            rows: state.rows.filter((_, i) => i !== rowIndex),
            selectedPosition:
                get().selectedPosition?.rowIndex === rowIndex ? null : get().selectedPosition,
        })),

    copyBlock: (rowIndex, blockIndex) => {
        const block = get().rows[rowIndex][blockIndex];
        set({ copiedBlock: { ...block } });
    },

    pasteBlock: () => {
        const { copiedBlock, selectedPosition, rows } = get();
        if (!copiedBlock || !selectedPosition) return;

        const newBlock = { ...copiedBlock, id: Date.now().toString() };
        const { rowIndex, blockIndex } = selectedPosition;

        const newRows = rows.map((row, i) =>
            i === rowIndex
                ? [...row.slice(0, blockIndex + 1), newBlock, ...row.slice(blockIndex + 1)]
                : row
        );
        set({ rows: newRows });
        set({ copiedBlock: null });
    },

    selectBlock: (rowIndex, blockIndex) => set({ selectedPosition: { rowIndex, blockIndex } }),
}));