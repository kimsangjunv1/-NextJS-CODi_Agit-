"use client";

import useNavigate from "@/shared/hooks/useNavigate";
import { useModalStore } from "@/shared/stores/useModalStore";
import UI from "@/shared/ui/common/UIComponent";
import {
    useDeleteCommentManagerQuery,
    useGetCommentManagerListQuery,
} from "@/entities/comment/api/comment.query";
import { CommentManagerItem } from "@/entities/comment/model/comment.type";
import { util } from "@/shared/lib/util";
import ManagerPageShell from "@/widgets/manager/ui/ManagerPageShell";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";

const CommentManager = () => {
    const { pushToUrl } = useNavigate();
    const { setModal } = useModalStore();

    const { data, isLoading } = useGetCommentManagerListQuery();
    const { mutate: deleteCommentFetch } = useDeleteCommentManagerQuery();

    const deleteCommentModal = (item: CommentManagerItem) =>
        setModal({
            type: "CHECK",
            title: "댓글을 삭제할까요?",
            content: (
                <article className="flex flex-col gap-[1.2rem]">
                    <p className="text-[var(--color-gray-600)]">
                        {item.author}: {item.msg}
                    </p>
                </article>
            ),
            cancel: { text: "취소" },
            confirm: {
                text: "삭제하기",
                onClick: () => deleteCommentFetch({ idx: item.idx }),
            },
            isOpen: true,
        });

    const list = data?.result ?? [];

    return (
        <ManagerPageShell title="댓글 관리" description="등록된 댓글을 조회·삭제합니다.">
            {isLoading ? (
                <ManagerListSkeleton />
            ) : list.length === 0 ? (
                <UI.Empty title="등록된 댓글이 없습니다" className="opacity-100" />
            ) : (
                <section className="flex flex-col w-full gap-[1.2rem]">
                    {list.map((item) => (
                        <article
                            key={item.idx}
                            className="flex flex-col sm:flex-row sm:items-start gap-[1.2rem] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem]"
                        >
                            <CommentInfo item={item} />

                            <div className="flex gap-[0.8rem] sm:flex-col sm:items-stretch shrink-0">
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-700)]"
                                    onClick={() => pushToUrl(`/post/${item.post_id}`)}
                                >
                                    게시물
                                </UI.Button>
                                <UI.Button
                                    className="flex-1 sm:flex-none bg-white rounded-[0.8rem] shadow-[var(--shadow-normal)] px-[1.2rem] py-[0.6rem] text-[var(--color-gray-600)]"
                                    onClick={() => deleteCommentModal(item)}
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

function CommentInfo({ item }: { item: CommentManagerItem }) {
    return (
        <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
            <div className="flex items-center gap-[0.8rem] flex-wrap">
                <p className="text-[1.4rem] font-bold">{item.author}</p>
                {item.is_admin ? (
                    <span className="text-[1.1rem] px-[0.6rem] py-[0.1rem] rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-600)] font-medium">
                        관리자
                    </span>
                ) : null}
            </div>
            <p className="text-[1.4rem] text-[var(--color-gray-700)] break-words">{item.msg}</p>
            <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                {item.posts?.title ? `${item.posts.title} · ` : ""}
                {util.string.getCurrentDate(item.created_at)}
            </p>
        </div>
    );
}

export default CommentManager;
