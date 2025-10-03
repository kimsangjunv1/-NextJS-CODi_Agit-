// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";

export async function POST(req: Request) {
    try {
        const supabase = await supabaseServer();
        const { email, password } = await req.json();

        // 사용자 조회
        const { data: user, error } = await supabase
            .from(TABLE_NAME)
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            return NextResponse.json(
                {
                    header: {
                        resultMsg: "등록되지 않은 이메일입니다",
                        resultCode: 404,
                        isSuccessful: false,
                        timestamp: new Date().toISOString()
                    },
                    body: { result: null }
                },
                { status: 404 }
            );
        }

        // 비밀번호 비교
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                {
                    header: {
                        resultMsg: "비밀번호가 일치하지 않습니다",
                        resultCode: 401,
                        isSuccessful: false,
                        timestamp: new Date().toISOString()
                    },
                    body: { result: null }
                },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                header: {
                    resultMsg: "로그인 성공",
                    resultCode: 200,
                    isSuccessful: true,
                    timestamp: new Date().toISOString()
                },
                body: {
                    result: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        // token,
                    }
                }
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                header: {
                    resultMsg: error.message || "문제가 생겼습니다",
                    resultCode: 500,
                    isSuccessful: false,
                    timestamp: new Date().toISOString()
                },
                body: { result: null }
            },
            { status: 500 }
        );
    }
}