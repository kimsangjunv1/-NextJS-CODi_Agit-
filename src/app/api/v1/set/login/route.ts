import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess } from "@/shared/lib/apiResponse";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";

export async function POST(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { email, password } = await req.json();

        const { data: user, error } = await supabase
            .from(TABLE_NAME)
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            return apiError("등록되지 않은 이메일입니다", {
                resultCode: "NOT_FOUND",
                status: 404,
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return apiError("비밀번호가 일치하지 않습니다", {
                resultCode: "UNAUTHORIZED",
                status: 401,
            });
        }

        return apiSuccess(
            {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            { resultMessage: "로그인 성공", pagination: null }
        );
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: 500,
        });
    }
}
