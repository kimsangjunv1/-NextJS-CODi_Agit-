import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/shared/lib/apiResponse";

const TABLE_POST = "posts";
const TABLE_COMMENT = "comments";
const TABLE_VIEW = "views";

export async function DELETE(req: Request) {
    const payload = await req.json();

    try {
        const supabase = await supabaseServer();
        const idx = payload.idx;

        if (!idx) {
            return apiError("게시물 번호가 필요합니다", { status: 400 });
        }

        const { error: commentError } = await supabase.from(TABLE_COMMENT).delete().eq("post_id", idx);
        if (commentError) throw commentError;

        const { error: viewError } = await supabase.from(TABLE_VIEW).delete().eq("post_id", idx);
        if (viewError) throw viewError;

        const { data, error } = await supabase.from(TABLE_POST).delete().eq("idx", idx).select();

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "게시물을 삭제했어요.",
            pagination: singleItemPagination(),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
