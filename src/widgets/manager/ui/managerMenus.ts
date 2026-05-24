export type ManagerMenuItem = {
    title: string;
    description: string;
    url: string;
    available: boolean;
};

export const MANAGER_MENUS: ManagerMenuItem[] = [
    {
        title: "카테고리 관리",
        description: "게시판 카테고리 생성·수정·활성화",
        url: "/manager/category",
        available: true,
    },
    {
        title: "초대코드 관리",
        description: "회원가입 초대코드 발급·만료 설정",
        url: "/manager/invitation",
        available: true,
    },
    {
        title: "게시물 관리",
        description: "게시글 조회·편집",
        url: "/manager/post",
        available: false,
    },
    {
        title: "유저 관리",
        description: "회원 정보·권한 관리",
        url: "/manager/user",
        available: false,
    },
    {
        title: "댓글 관리",
        description: "댓글 조회·삭제",
        url: "/manager/comment",
        available: false,
    },
];
