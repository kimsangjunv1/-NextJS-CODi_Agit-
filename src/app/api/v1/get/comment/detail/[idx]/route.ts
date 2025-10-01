// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

const TABLE_NAME_POST = "comments";

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const idx = segments[segments.length - 1]; // 마지막 경로가 idx
        const post_id = parseInt(idx);

        // 현재 글 조회
        const { data: currentData, error: currentError } = await supabase
            .from(TABLE_NAME_POST)
            .select("*")
            .eq("post_id", post_id)
            .order("idx", { ascending: true })
            // .single();

        if (currentError) throw currentError;

        return NextResponse.json(
            {
                body: {
                    result: currentData ?? null,
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