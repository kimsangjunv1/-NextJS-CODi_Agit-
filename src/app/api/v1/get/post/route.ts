import { supabaseServer } from "@/utils/supabase/supabaseServer";
import { apiError, apiSuccess, buildPaginationFromQuery, getPageParams } from "@/utils/apiResponse";

const TABLE_NAME_POST = "posts";
const DEFAULT_PAGE_SIZE = 10;

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { searchParams } = new URL(req.url);

        const idx = searchParams.get("idx");

        let query;

        if (idx) {
            query = supabase.from(TABLE_NAME_POST).select("*", { count: "estimated" });
            query = query.eq("idx", idx);
        } else {
            query = supabase
                .from(TABLE_NAME_POST)
                .select("idx, title, thumbnail, summary, created_at, category_idx, views, category!left(title)", { count: "estimated" })
                .order("idx", { ascending: true });

            const { page, pageSize } = getPageParams(searchParams, DEFAULT_PAGE_SIZE);

            if (pageSize > 0) {
                const from = (page - 1) * pageSize;
                const to = from + pageSize - 1;
                query = query.range(from, to);
            }
        }

        const { data, count, error } = await query;

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "조회성공",
            pagination: idx
                ? null
                : buildPaginationFromQuery(searchParams, count ?? 0, DEFAULT_PAGE_SIZE),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
