// app/(pages)/page.tsx
import Main from "@/components/layout/Main";
import ListSection from "@/containers/init/ListSection";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

import { ApiHeaderResponseType } from "@/types/common.type";
import { GetPostLatestListResponseType } from "@/types/post.type";

export const revalidate = 300; // ISR: 60초마다 페이지 재생성

const Page = async () => {
    let initialData: { body: GetPostLatestListResponseType; header: ApiHeaderResponseType } = {
        body: {
            result: [],
            pagination: { totalCount: 0, pageSize: 10, pageNum: 1 },
        },
        header: {
            resultMsg: "FAILED",
            resultCode: 500,
            isSuccessful: false,
            timestamp: new Date().toISOString(),
        },
    };

    try {
        const supabase = await supabaseServer();

        const { data: currentData, error } = await supabase
            .from("posts")
            .select("idx, title, thumbnail, summary, created_at, views, category!left(title)")
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) throw error;

        const formattedData = currentData?.map(item => ({
            ...item,
            category: item.category?.[0] ?? { title: "" }  // 배열 -> 단일 객체
        }));

        initialData = {
            body: {
                result: formattedData ?? [],
                pagination: {
                    totalCount: currentData?.length ?? 0,
                    pageSize: 10,
                    pageNum: 1,
                },
            },
            header: {
                resultMsg: "SUCCESS",
                resultCode: 200,
                isSuccessful: true,
                timestamp: new Date().toISOString(),
            },
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