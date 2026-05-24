"use client";

import useNavigate from "@/shared/hooks/useNavigate";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import {
    useDeletePostManagerQuery,
    useGetPostManagerListQuery,
} from "@/entities/post/api/post.query";
import { PostManagerItem } from "@/entities/post/model/post.type";
import { util } from "@/shared/lib/util";
import ManagerPageShell from "@/widgets/manager/ui/ManagerPageShell";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";

const PostManager = () => {
    const { pushToUrl } = useNavigate();
    const { setModal } = useModalStore();

    const { data, isLoading } = useGetPostManagerListQuery();
    const { mutate: deletePostFetch } = useDeletePostManagerQuery();

    const deletePostModal = (item: PostManagerItem) =>
        setModal({
            type: "CHECK",
            title: "게시물을 삭제할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">삭제 대상: {item.title}</p>
                    <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                        연결된 댓글과 조회 기록도 함께 삭제됩니다.
                    </p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "삭제하기",
                onClick: () => deletePostFetch({ idx: item.idx }),
            },
            isOpen: true,
        });

    const list = data?.result ?? [];

    return (
        <ManagerPageShell title="게시물 관리" description="등록된 게시글을 조회·수정·삭제합니다.">
            {isLoading ? (
                <ManagerListSkeleton />
            ) : list.length === 0 ? (
                <UI.Empty title="등록된 게시물이 없습니다" className="opacity-100" />
            ) : (
                <section className="flex flex-col w-full gap-[1.2rem]">
                    {list.map((item) => (
                        <article
                            key={item.idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem]"
                        >
                            <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
                                <p className="text-[1.6rem] font-bold truncate">{item.title}</p>
                                {item.summary ? (
                                    <p className="text-[1.4rem] text-[var(--color-gray-600)] line-clamp-2">
                                        {item.summary}
                                    </p>
                                ) : null}
                                <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                                    {item.category?.title ? `${item.category.title} · ` : ""}
                                    조회 {item.views ?? 0} · {util.string.getCurrentDate(item.created_at)}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-[0.8rem] sm:flex-col sm:items-stretch">
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-700)]"
                                    onClick={() => pushToUrl(`/post/${item.idx}`)}
                                >
                                    보기
                                </UI.Button>
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-700)]"
                                    onClick={() => pushToUrl(`/post/${item.idx}/modify`)}
                                >
                                    수정
                                </UI.Button>
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-600)]"
                                    onClick={() => deletePostModal(item)}
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

export default PostManager;
