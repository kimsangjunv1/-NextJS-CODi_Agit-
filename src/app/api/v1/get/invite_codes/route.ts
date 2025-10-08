// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

const TABLE_NAME = "invite_codes";

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json(
                {
                    body: { result: null, pagination: null, statusCode: 0 },
                    header: {
                        resultMsg: "code 값이 필요합니다",
                        resultCode: 400,
                        isSuccessful: false,
                        timestamp: new Date().toISOString(),
                    },
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

        // 기본값
        let statusCode = 1;
        let resultMsg = "초대코드 조회 성공";

        if (!data) {
            statusCode = 5;
            resultMsg = "존재하지 않는 코드입니다";
        } else {
            const now = new Date();
            const expireDate = data.expire_at ? new Date(data.expire_at) : null;

            if (expireDate && expireDate < now) {
                statusCode = 2; // 만료
                resultMsg = "코드가 만료되었습니다";
            } else if (!data.is_active) {
                statusCode = 3; // 비활성
                resultMsg = "비활성화된 코드입니다";
            } else if (data.is_used) {
                statusCode = 4; // 사용됨
                resultMsg = "이미 사용된 코드입니다";
            }
        }

        return NextResponse.json(
            {
                body: {
                    result: data ?? null,
                    pagination: null,
                    statusCode,
                },
                header: {
                    resultMsg,
                    resultCode: 200,
                    isSuccessful: statusCode === 1,
                    timestamp: new Date().toISOString(),
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                body: { result: null, pagination: null, statusCode: 4 },
                header: {
                    resultMsg: error.message || "문제가 생겼습니다",
                    resultCode: error.status ?? 500,
                    isSuccessful: false,
                    timestamp: new Date().toISOString(),
                },
            },
            { status: error.status ?? 500 }
        );
    }
}