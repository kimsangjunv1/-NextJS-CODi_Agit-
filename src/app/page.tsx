import HomeView from "@/views/home/HomeView";
import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { buildPagination } from "@/shared/lib/utils/apiResponse";

export const revalidate = 300;

const Page = async () => {
    let initialData = {
        result: [] as Array<{
            idx: number;
            title: string;
            thumbnail: string;
            summary: string;
            created_at: string;
            views: number;
            category: { title: string };
        }>,
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
    } catch (err: unknown) {
        console.error("SSR fetch error:", err);
    }

    return <HomeView initialData={initialData} />;
};

export default Page;
