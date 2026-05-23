import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess } from "@/shared/lib/apiResponse";

const TABLE_NAME = "posts";

export async function POST(req: Request) {
    const payload = await req.json();

    try {
        const supabase = await supabaseServer();

        const query = supabase.from(TABLE_NAME).insert(payload).select("idx").single();

        const { data, error } = await query;

        if (error) throw error;

        return apiSuccess(
            {
                statusCode: 1,
                postIdx: data.idx,
            },
            { resultMessage: "등록성공", pagination: null }
        );
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
            result: { statusCode: 0 },
        });
    }
}
