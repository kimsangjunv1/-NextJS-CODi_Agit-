import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess, singleItemPagination } from "@/shared/lib/apiResponse";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";

export async function POST(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from(TABLE_NAME).insert([
            { email, name, password: hashedPassword },
        ]);

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
