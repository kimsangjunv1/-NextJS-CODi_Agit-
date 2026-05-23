import { create } from "zustand";

export interface CreatePostState {
  title: string;
  thumbnail: string;
  summary: string;
  category_idx: number;
  contents: any[]; // 필요하면 타입 구체적으로 지정하세요
}

interface TempStorageStore {
  createPostState: CreatePostState;
  setCreatePostState: (newState: Partial<CreatePostState>) => void;
  resetCreatePostState: () => void;
}

const initialState: CreatePostState = {
  title: "",
  thumbnail: "",
  summary: "",
  category_idx: 0,
  contents: [],
};

export const useTempStorageStore = create<TempStorageStore>((set) => ({
  createPostState: initialState,

  setCreatePostState: (newState) =>
    set((state) => ({
      createPostState: { ...state.createPostState, ...newState },
    })),

  resetCreatePostState: () => set({ createPostState: initialState }),
}));