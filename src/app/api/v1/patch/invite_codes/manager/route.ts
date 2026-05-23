import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/shared/lib/apiResponse";

const TABLE_NAME = "invite_codes";

export async function PATCH(req: Request) {
    const payload = await req.json();

    try {
        const supabase = await supabaseServer();

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(payload)
            .eq("id", payload.id)
            .select();

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "선택하신 초대 코드를 수정했어요.",
            pagination: singleItemPagination(),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
