// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

const TABLE_NAME = "invite_codes";

export async function PATCH(req: Request) {
    const payload = await req.json();
    
    try {
        const supabase = await supabaseServer();

        // 기본 쿼리
        const query = supabase
            .from( TABLE_NAME )
            .update( payload )
            .eq("id", payload.id)
            .select();

        const { data, count, error } = await query;

        if (error) throw error;

        return NextResponse.json(
            { 
                body: {
                    result: data,
                    pagination: {
                        totalCount: count ?? 0,
                        pageSize: 1,
                        pageNum: 1,
                    }
                },
                header: {
                    resultMsg: "선택하신 초대 코드를 수정했어요.",
                    resultCode: 200,
                    isSuccessful: true,
                    timestamp: new Date().toISOString(),
                }
            },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                body: {
                    result: null,
                    pagination: {
                        totalCount: 0,
                        pageSize: 1,
                        pageNum: 1,
                    }
                },
                header: {
                    resultMsg: error.message || "문제가 생겼습니다",
                    resultCode: error.status ?? 500,
                    isSuccessful: false,
                    timestamp: new Date().toISOString(),
                },
            },
        );
    }
}