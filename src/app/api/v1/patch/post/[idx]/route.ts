// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

const TABLE_NAME = "posts";
const DEFAULT_PAGE_SIZE = 10; // 기본 페이지 크기

export async function PATCH(req: Request) {
    const payload = await req.json();
    
    try {
        const supabase = await supabaseServer();
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const idx = segments[segments.length - 1]; // 마지막 경로가 idx

        // 기본 쿼리
        const query = supabase
            .from( TABLE_NAME )
            .update( payload )
            .eq("idx", idx)
            // .select();

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