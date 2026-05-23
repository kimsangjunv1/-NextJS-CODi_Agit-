// app/(pages)/page.tsx
import Main from "@/components/layout/Main";
import ListSection from "@/containers/init/ListSection";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import { buildPagination } from "@/utils/apiResponse";

import { GetPostLatestListResponseType } from "@/types/post.type";

export const revalidate = 300; // ISR: 60초마다 페이지 재생성

const Page = async () => {
    let initialData: GetPostLatestListResponseType = {
        result: [],
        pagination: buildPagination({ page: 1, pageSize: 10, totalCount: 0 }),
        resultCode: "ERROR",
        resultMessage: "조회실패",
    };

    try {
        const supabase = await supabaseServer();

        const { data: currentData, error } = await supabase
            .from("posts")
            .select("idx, title, thumbnail, summary, created_at, views, category!left(title)")
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) throw error;

        const formattedData = currentData?.map((item) => ({
            ...item,
            category: item.category?.[0] ?? { title: "" },
        }));

        const totalCount = currentData?.length ?? 0;

        initialData = {
            result: formattedData ?? [],
            pagination: buildPagination({
                page: 1,
                pageSize: 10,
                totalCount,
            }),
            resultCode: "SUCCESS",
            resultMessage: "조회성공",
        };
    } catch (err: any) {
        console.error("SSR fetch error:", err);
    }

    return (
        <Main id="home" className={{ inner: "min-h-[100dvh]", container: "" }}>
            <ListSection initialData={initialData} />
        </Main>
    );
};

export default Page;
