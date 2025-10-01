// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

const TABLE_NAME = "category";
const DEFAULT_PAGE_SIZE = 10;

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { searchParams } = new URL(req.url);

        const user_id = searchParams.get("user_id"); // string 그대로 받음

        let query;

        // id가 있으면 단일 조회
        if ( user_id ) {
            query = supabase.from(TABLE_NAME).select("*", { count: "exact" });
            query = query.eq("user_id", user_id);
        } else {
            query = supabase.from(TABLE_NAME).select("idx, title, is_enabled, description", { count: "exact" });

            const pageNum = parseInt(searchParams.get("pageNum") || "1", 10);
            const pageSize = parseInt(searchParams.get("pageSize") || `${DEFAULT_PAGE_SIZE}`, 10);

            if (pageSize > 0) {
                const from = (pageNum - 1) * pageSize;
                const to = from + pageSize - 1;
                query = query.range(from, to);
            }
        }

        const { data, count, error } = await query;

        if (error) throw error;

        return NextResponse.json(
            {
                body: {
                    result: data,
                    pagination: user_id
                        ? undefined
                        : { totalCount: count ?? 0, pageSize: parseInt(searchParams.get("pageSize") || "10"), pageNum: parseInt(searchParams.get("pageNum") || "1") },
                },
                header: {
                    resultMsg: "SUCCESS",
                    resultCode: 200,
                    isSuccessful: true,
                    timestamp: new Date().toISOString(),
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                body: { result: null, pagination: undefined },
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