import { ApiResponseType } from "@/shared/model/common.type";

export interface setCategoryPayloadType {
    title: string;
    description: string;
}

export interface patchCategoryPayloadType {
    idx: number;
    title?: string;
    description?: string;
    is_enabled?: boolean;
}

export interface deleteCategoryPayloadType {
    idx: number;
}

export interface CategoryItem {
    idx: number;
    title: string;
    is_enabled: boolean;
    description: string;
}

export interface CategoryItemManager extends CategoryItem {
    created_at: string;
}

export type GetCategoryListResponseType = ApiResponseType<CategoryItem[]>;
export type GetCategoryListOnManagerResponseType = ApiResponseType<CategoryItemManager[]>;
