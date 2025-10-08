// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import { randomUUID } from "crypto";

const TABLE_NAME = "invite_codes";

export async function POST(req: Request) {
    const { is_active, expire_at } = await req.json();

    const insertPayload = {
        code: randomUUID().slice(0, 8),
        is_used: false,          // 항상 초기값
        is_active: is_active ?? true,
        expire_at: expire_at ?? null,
    };

    try {
        const supabase = await supabaseServer();

        // 기본 쿼리
        const query = supabase.from( TABLE_NAME ).insert( insertPayload );

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
                    resultMsg: "SUCCESS",
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