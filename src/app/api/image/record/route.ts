// app/api/upload/route.ts
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

import { util } from "@/utils/util";

const CURRENT_TABLE_NAME = "images";

export async function POST(req: Request) {
    const supabase = await supabaseServer(); // createClient 함수가 async이므로 await를 붙여줍니다.

    const { data: { user } } = await supabase.auth.getUser();
    const REQUEST_PAYLOAD = await req.json();

    const PAYLOAD = { ...REQUEST_PAYLOAD, user_id: user?.id };

    try {
        const { data: RESPONSE_DATA, error: RESPONSE_ERROR } = await supabase
            .from( CURRENT_TABLE_NAME )
            .insert([ PAYLOAD ])
            .select();

        if ( RESPONSE_ERROR ) {
            return NextResponse.json(
                util.api.getApiReponse({
                    msg: RESPONSE_ERROR.message,
                    payload: PAYLOAD
                }),
                { status: 500 }
            );
        }

        return NextResponse.json(
            util.api.getApiReponse({
                msg: "성공",
                success: true,
                payload: PAYLOAD,
                data: RESPONSE_DATA?.[0]
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            util.api.getApiReponse({
                msg: "API 요청 실패",
                payload: PAYLOAD
            }),
            { status: 500 }
        );
    }
}