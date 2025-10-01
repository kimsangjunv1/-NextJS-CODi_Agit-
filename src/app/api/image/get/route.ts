// app/api/upload/route.ts
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

import { util } from "@/utils/util";

const CURRENT_TABLE_NAME = "images";

export async function GET(req: Request) {
    const supabase = await supabaseServer(); // createClient 함수가 async이므로 await를 붙여줍니다.

    const { data: { user } } = await supabase.auth.getUser();
    console.log("API 라우트에서 조회된 user:", user);

    if ( !user ) {
        return NextResponse.json(
            util.api.getApiReponse({
                msg: "유저의 사진 정보를 가져오지 못했습니다.",
                success: false,
                code: 500,
                data: { data: user }
            }),
            { status: 500 }
        );
    }

    try {
        const SUPABASE_QUERY = supabase
            .from(CURRENT_TABLE_NAME)
            .select("*")
            .eq("user_id", user?.id);

        const { data: RESPONSE_DATA, error: RESPONSE_ERROR } = await SUPABASE_QUERY

        if ( RESPONSE_ERROR ) {
            return NextResponse.json(
                util.api.getApiReponse({
                    msg: RESPONSE_ERROR.message
                }),
                { status: 500 }
            );
        }

        return NextResponse.json(
            util.api.getApiReponse({
                msg: "청접장 목록을 가져왔어요.",
                code: 200,
                success: true,
                data: RESPONSE_DATA
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            util.api.getApiReponse({
                msg: "청접장 목록 요청 실패"
            }),
            { status: 500 }
        );
    }
}