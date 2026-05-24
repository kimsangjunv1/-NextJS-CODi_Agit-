import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/shared/lib/apiResponse";

const TABLE_NAME = "comments";

export async function DELETE(req: Request) {
    const payload = await req.json();

    try {
        const supabase = await supabaseServer();

        const { data, error } = await supabase.from(TABLE_NAME).delete().eq("idx", payload.idx).select();

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "댓글을 삭제했어요.",
            pagination: singleItemPagination(),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
