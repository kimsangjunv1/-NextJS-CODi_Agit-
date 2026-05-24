"use client";

import UI from "@/shared/ui/common/UIComponent";
import { useGetUserManagerListQuery } from "@/entities/user/api/user.query";
import { util } from "@/shared/lib/util";
import ManagerPageShell from "@/widgets/manager/ui/ManagerPageShell";
import ManagerListSkeleton from "@/widgets/manager/ui/ManagerListSkeleton";

const UserManager = () => {
    const { data, isLoading } = useGetUserManagerListQuery();
    const list = data?.result ?? [];

    return (
        <ManagerPageShell title="유저 관리" description="가입된 회원 목록을 조회합니다.">
            {isLoading ? (
                <ManagerListSkeleton />
            ) : list.length === 0 ? (
                <UI.Empty title="등록된 회원이 없습니다" className="opacity-100" />
            ) : (
                <section className="flex flex-col w-full gap-[1.2rem]">
                    {list.map((item) => (
                        <article
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] p-[1.6rem]"
                        >
                            <UserInfo item={item} />
                        </article>
                    ))}
                </section>
            )}
        </ManagerPageShell>
    );
};

function UserInfo({ item }: { item: { name: string; email: string; created_at: string } }) {
    return (
        <div className="flex-1 flex flex-col gap-[0.4rem] min-w-0">
            <p className="text-[1.6rem] font-bold">{item.name}</p>
            <p className="text-[1.4rem] text-[var(--color-gray-600)] break-all">{item.email}</p>
            <p className="text-[1.2rem] text-[var(--color-gray-500)]">
                가입일 {util.string.getCurrentDate(item.created_at)}
            </p>
        </div>
    );
}

export default UserManager;
