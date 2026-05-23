import { NextResponse } from "next/server";
import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError } from "@/shared/lib/apiResponse";

const TABLE_NAME = "invite_codes";

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json(
                {
                    pagination: null,
                    result: null,
                    statusCode: 0,
                    resultCode: "ERROR",
                    resultMessage: "code 값이 필요합니다",
                },
                { status: 200 }
            );
        }

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select("is_active, is_used, expire_at")
            .eq("code", code)
            .maybeSingle();

        if (error) throw error;

        let statusCode = 1;
        let resultMessage = "초대코드 조회 성공";

        if (!data) {
            statusCode = 5;
            resultMessage = "존재하지 않는 코드입니다";
        } else {
            const now = new Date();
            const expireDate = data.expire_at ? new Date(data.expire_at) : null;

            if (expireDate && expireDate < now) {
                statusCode = 2;
                resultMessage = "코드가 만료되었습니다";
            } else if (!data.is_active) {
                statusCode = 3;
                resultMessage = "비활성화된 코드입니다";
            } else if (data.is_used) {
                statusCode = 4;
                resultMessage = "이미 사용된 코드입니다";
            }
        }

        return NextResponse.json({
            pagination: null,
            result: data ?? null,
            statusCode,
            resultCode: statusCode === 1 ? "SUCCESS" : "ERROR",
            resultMessage,
        });
    } catch (error: any) {
        return apiError(error.message || "문제가 생겼습니다", {
            status: error.status ?? 500,
            result: null,
        });
    }
}
