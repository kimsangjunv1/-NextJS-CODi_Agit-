// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

const TABLE_NAME_POST = "posts";

export async function GET() {
    try {
        const supabase = await supabaseServer();
        // const idx = parseInt(params.idx);

        // 현재 글 조회
        const { data: currentData, error: currentError } = await supabase
            .from(TABLE_NAME_POST)
            .select("idx, title, thumbnail, summary, created_at, views, category!left(title)")
            // idx, title, thumbnail, summary, created_at, category_idx, category!left(title)
            .order("created_at", { ascending: false })
            .limit(10);

        if (currentError) throw currentError;

        return NextResponse.json(
            {
                body: {
                    result: currentData,
                    pagination: {
                        totalCount: 1,
                        pageSize: 1,
                        pageNum: 1,
                    },
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