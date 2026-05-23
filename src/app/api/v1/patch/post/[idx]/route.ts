import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess } from "@/shared/lib/apiResponse";

const TABLE_NAME = "posts";

export async function PATCH(req: Request) {
    const payload = await req.json();

    try {
        const supabase = await supabaseServer();
        const url = new URL(req.url);
        const segments = url.pathname.split("/");
        const idx = segments[segments.length - 1];

        const query = supabase.from(TABLE_NAME).update(payload).eq("idx", idx).select().single();

        const { data, error } = await query;

        if (error) throw error;

        return apiSuccess(
            {
                statusCode: 1,
                postIdx: data.idx,
            },
            { resultMessage: "수정성공", pagination: null }
        );
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
            result: { statusCode: 0 },
        });
    }
}
