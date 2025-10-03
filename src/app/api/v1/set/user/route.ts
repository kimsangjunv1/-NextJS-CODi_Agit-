// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";
const DEFAULT_PAGE_SIZE = 10; // 기본 페이지 크기

export async function POST(req: Request) {
    try {
        const supabase = await supabaseServer();

        // 기본 쿼리
        const { name, email, password } = await req.json();

        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, count, error } = await supabase
            .from( TABLE_NAME )
            .insert([
                { email, name, password: hashedPassword },
            ]);
        // const query = supabase.from( TABLE_NAME ).insert( payload );

        // const { data, count, error } = await query;

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