import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, buildPaginationFromQuery, getPageParams } from "@/shared/lib/apiResponse";

const TABLE_NAME = "users";
const DEFAULT_PAGE_SIZE = 20;

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { searchParams } = new URL(req.url);

        let query = supabase
            .from(TABLE_NAME)
            .select("id, name, email, created_at", { count: "estimated" })
            .order("created_at", { ascending: false });

        const { page, pageSize } = getPageParams(searchParams, DEFAULT_PAGE_SIZE);

        if (pageSize > 0) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;
            query = query.range(from, to);
        }

        const { data, count, error } = await query;

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "조회성공",
            pagination: buildPaginationFromQuery(searchParams, count ?? 0, DEFAULT_PAGE_SIZE),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
