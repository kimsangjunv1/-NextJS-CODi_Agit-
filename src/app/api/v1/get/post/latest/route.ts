import { supabaseServer } from "@/utils/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/utils/apiResponse";

const TABLE_NAME_POST = "posts";

export async function GET() {
    try {
        const supabase = await supabaseServer();

        const { data, error } = await supabase
            .from(TABLE_NAME_POST)
            .select("idx, title, thumbnail, summary, created_at, views, category!left(title)")
            .order("created_at", { ascending: false })
            .limit(10);

        if (error) throw error;

        const formattedData = data?.map((item) => ({
            ...item,
            category: item.category?.[0] ?? { title: "" },
        }));

        return apiSuccess(formattedData ?? [], {
            resultMessage: "조회성공",
            pagination: singleItemPagination(),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
