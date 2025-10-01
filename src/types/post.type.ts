import { ApiPaginationResponseType } from "./common.type";

export interface TextStyle {
    lineHeight: number;
    fontSize: number;
    fontWeight: number;
    color: string;
    textAlign: string;
    backgroundColor: string;
}

export interface TextChild {
    value: string;
    style: TextStyle;
}

export interface Block {
    type: number;
    order: number;
    children: TextChild[];
    style: TextStyle;
}

// 일반 블록 (텍스트, 이미지 포함, 소제목 등)
export interface NormalSectionContent {
    id: string;
    type: number;
    title: string;
    summary: string;
    subtitle: string;
    content: string | Block[];
    imageUrl: string;
}

// 코드 블록
export interface CodeSectionContent {
    id: string;
    type: number;
    title: string;
    summary: string;
    subtitle: string;
    content: string | Block[]; // HTML string
    imageUrl: string;
}

export type SectionContent = NormalSectionContent | CodeSectionContent;

export interface PostResponse {
    title: string;
    thumbnail: string;
    summary: string;
    contents: SectionContent[][];
    create_at: string;
}

export interface PostItem {
    id: string;
    idx: number;
    user_id: string | null;
    title: string;
    thumbnail: string;
    contents: SectionContent[][];
    category_idx: number; 
    created_at: string;
    summary: string;
    views: number;
    category?: {
        title: string;
        description: string;
        is_enabled: boolean;
    }
}

export interface PostLatestItem {
  idx: number;
  title: string;
  thumbnail: string;
  summary: string;
  created_at: string; // ISO 날짜 문자열
  views: number;
  category: {
    title: string;
  };
}

export interface PostViewItem {
  success: boolean,
  viewsIncremented: boolean,
  alreadyViewed: boolean
}

export interface SetIncrementPostViewType {
    result: PostViewItem;
    pagination: ApiPaginationResponseType;
}

export interface GetPostLatestListResponseType {
    result: PostLatestItem[];
    pagination: ApiPaginationResponseType;
}

export interface GetPostListResponseType {
    result: PostItem[];
    pagination: ApiPaginationResponseType;
}

export interface GetPostDetailResponseType {
    result: PostItem;
    pagination: ApiPaginationResponseType;
}