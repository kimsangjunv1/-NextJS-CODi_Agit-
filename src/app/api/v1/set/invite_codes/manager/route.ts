import { randomUUID } from "crypto";
import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/shared/lib/apiResponse";

const TABLE_NAME = "invite_codes";

export async function POST(req: Request) {
    const { is_active, expire_at } = await req.json();

    const insertPayload = {
        code: randomUUID().slice(0, 8),
        is_used: false,
        is_active: is_active ?? true,
        expire_at: expire_at ?? null,
    };

    try {
        const supabase = await supabaseServer();

        const { data, error } = await supabase.from(TABLE_NAME).insert(insertPayload);

        if (error) throw error;

        return apiSuccess(data, {
            resultMessage: "등록성공",
            pagination: singleItemPagination(),
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
        });
    }
}
