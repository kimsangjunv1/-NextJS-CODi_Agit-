// app/api/upload/route.ts
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

import { supabaseServer } from "@/utils/supabase/supabaseServer";
import { util } from "@/utils/util";

const CURRENT_TABLE_NAME_IMAGES = "images";
const CURRENT_TABLE_NAME_UPLOADED = "user_uploaded_images";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // 0.1. 파일 있는지 여부 검사
    if (!file) {
        return NextResponse.json({ success: false, msg: "파일이 없습니다." }, { status: 400 });
    }

    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    // 0.2. 인증된 유저인지 검증
    if (!user) {
        return NextResponse.json({ success: false, msg: "로그인이 필요합니다." }, { status: 401 });
    }

    // 1. 파일 가공
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const fileExt = file.name.split('.').pop();

    const filePath = `config/codi-agit/${ fileName }.${ fileExt }`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from( arrayBuffer );

    // 2. 최적화
    const optimizedBuffer = await sharp( buffer )
        .resize({ width: 1440 })
        .toFormat("webp", { quality: 20 })
        .toBuffer();

    // 3. 파일 업로드
    // 처음엔 요청 -> cdn -> supabase -> cdn -> 유저 순으로 요청
    // 이후에는 요청 -> cdn -> 유저 순으로 요청
    const { data, error } = await supabase
        .storage
        .from( CURRENT_TABLE_NAME_IMAGES )
        .upload( filePath.replace( /\.\w+$/, ".webp" ), optimizedBuffer, {
            contentType: "image/webp",
            cacheControl: "86400",
            upsert: false,
        });

    // 3.1. 파일 업로드에 실패했을 경우
    if ( error ) {
        return NextResponse.json({ success: false, msg: "업로드 실패", error }, { status: 500 });
    }

    // 4. 이미지 URL 추출
    const publicUrl = supabase
        .storage
        .from( CURRENT_TABLE_NAME_IMAGES )
        .getPublicUrl( filePath.replace( /\.\w+$/, ".webp" ))
        .data
        .publicUrl;

    // 5. 업로드한 파일 기록
    const PAYLOAD = { user_id: user?.id, file_name: fileName, public_url: publicUrl };

    const { data: RESPONSE_DATA, error: RESPONSE_ERROR } = await supabase
        .from( CURRENT_TABLE_NAME_UPLOADED )
        .insert([ PAYLOAD ])
        .select();

    // 5.1. 업로드한 파일에 오류가 발생했을경우
    if ( RESPONSE_ERROR ) {
        return NextResponse.json(
            util.api.getApiReponse({
                msg: RESPONSE_ERROR.message,
                payload: PAYLOAD
            }),
            { status: 500 }
        );
    }

    // 6. 최종 업로드 완료
    return NextResponse.json({
        success: true,
        msg: "업로드 성공",
        data: {
            filePath,
            publicUrl,
        },
    });
}