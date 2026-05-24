"use client";

import { useRef } from "react";

import { useToastStore } from "@/shared/stores/useToastStore";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import ModalContent from "@/widgets/common/ui/ModalComponent";
import {
    useDeleteCategoryQuery,
    useGetCategoryListOnManagerQuery,
    usePatchCategoryQuery,
    useSetCategoryQuery,
} from "@/entities/category/api/category.query";
import { CategoryItemManager, patchCategoryPayloadType, setCategoryPayloadType } from "@/entities/category/model/category.type";
import { util } from "@/shared/lib/util";
import ManagerPageShell from "@/widgets/manager/ui/ManagerPageShell";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";

const CategoryManager = () => {
    const categoryCreateValueRef = useRef<setCategoryPayloadType>({ title: "", description: "" });
    const categoryPatchValueRef = useRef<patchCategoryPayloadType>({ idx: 0, title: "", is_enabled: true, description: "" });

    const { data: getCategoryListData, isLoading } = useGetCategoryListOnManagerQuery();
    const { mutate: setCategoryFetch } = useSetCategoryQuery();
    const { mutate: patchCategoryFetch } = usePatchCategoryQuery();
    const { mutate: deleteCategoryFetch } = useDeleteCategoryQuery();

    const { setToast } = useToastStore();
    const { setModal } = useModalStore();

    const resetCreateValue = () => (categoryCreateValueRef.current = { title: "", description: "" });
    const resetModifyValue = () =>
        (categoryPatchValueRef.current = { title: "", description: "", is_enabled: true, idx: 0 });

    const createCategoryModal = () =>
        setModal({
            type: "CHECK",
            title: "카테고리 생성",
            content: <ModalContent.Post.AddCategory onChange={(e) => (categoryCreateValueRef.current = e)} />,
            cancel: { text: "닫기" },
            confirm: {
                text: "확인",
                onClick: () => {
                    if (!categoryCreateValueRef.current.title) {
                        setToast({ msg: "카테고리 이름을 입력해주세요", time: 2 });
                        return false;
                    }
                    if (!categoryCreateValueRef.current.description) {
                        setToast({ msg: "카테고리 설명을 입력해주세요", time: 2 });
                        return false;
                    }
                    setCategoryFetch(categoryCreateValueRef.current);
                    resetCreateValue();
                },
            },
            isOpen: true,
        });

    const modifyCategoryModal = (info: CategoryItemManager) =>
        setModal({
            type: "CHECK",
            title: "카테고리 수정",
            content: (
                <ModalContent.Post.ModifyCategory
                    info={info}
                    onChange={(e) => (categoryPatchValueRef.current = e)}
                />
            ),
            cancel: { text: "닫기" },
            confirm: {
                text: "확인",
                onClick: () => {
                    if (!categoryPatchValueRef.current.title) {
                        setToast({ msg: "카테고리 이름을 입력해주세요", time: 2 });
                        return false;
                    }
                    if (!categoryPatchValueRef.current.description) {
                        setToast({ msg: "카테고리 설명을 입력해주세요", time: 2 });
                        return false;
                    }
                    patchCategoryFetch(categoryPatchValueRef.current);
                    resetModifyValue();
                },
            },
            isOpen: true,
        });

    const deleteCategoryModal = (info: CategoryItemManager) =>
        setModal({
            type: "CHECK",
            title: "카테고리를 삭제할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">삭제 대상: {info.title}</p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "삭제하기",
                onClick: () => deleteCategoryFetch({ idx: info.idx }),
            },
            isOpen: true,
        });

    const list = getCategoryListData?.result ?? [];

    return (
        <ManagerPageShell
            title="카테고리 관리"
            description="게시판에 노출되는 카테고리를 관리합니다."
            action={
                <UI.Button
                    className="shrink-0 px-[1.6rem] py-[0.8rem] rounded-[0.8rem] bg-[var(--color-brand-500)] text-white font-medium shadow-[var(--shadow-normal)]"
                    onClick={createCategoryModal}
                >
                    + 생성
                </UI.Button>
            }
        >
            {isLoading ? (
                <ManagerListSkeleton />
            ) : list.length === 0 ? (
                <UI.Empty title="등록된 카테고리가 없습니다" className="opacity-100" />
            ) : (
                <section className="flex flex-col w-full gap-[1.2rem]">
                    {list.map((item) => (
                        <article
                            key={item.idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem]"
                        >
                            <div className="flex items-center gap-[1.2rem]">
                                <div className="flex flex-col gap-[0.2rem]">
                                    <span className="text-[1.2rem] text-[var(--color-gray-500)]">활성화</span>
                                    <UI.Switch
                                        states={item.is_enabled}
                                        onChange={(enabled) =>
                                            patchCategoryFetch({ is_enabled: enabled, idx: item.idx })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
                                <p className="text-[1.6rem] font-bold truncate">{item.title}</p>
                                <p className="text-[1.4rem] text-[var(--color-gray-600)] line-clamp-2">
                                    {item.description}
                                </p>
                                <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                                    생성일 {util.string.getCurrentDate(item.created_at)}
                                </p>
                            </div>

                            <div className="flex gap-[0.8rem] sm:flex-col sm:items-stretch">
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-700)]"
                                    onClick={() => modifyCategoryModal(item)}
                                >
                                    수정
                                </UI.Button>
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-600)]"
                                    onClick={() => deleteCategoryModal(item)}
                                >
                                    삭제
                                </UI.Button>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </ManagerPageShell>
    );
};

export default CategoryManager;
