// app/api/increment-view/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

export async function POST(req: Request) {
    try {
        // 1. 요청 데이터
        const { postId, userId } = await req.json();
        if (!postId) {
            return NextResponse.json({
                body: null,
                header: {
                    resultMsg: "postId가 필요합니다.",
                    resultCode: 400,
                    isSuccessful: false,
                    timestamp: new Date().toISOString(),
                },
            }, { status: 400 });
        }

        // 2. 방문자 IP 추출
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

        const supabase = await supabaseServer();

        // 3. 조회 기록 확인 (IP 또는 userId)
        const filters: string[] = [];
        if (userId) filters.push(`user_id.eq.${userId}`);
        if (ip) filters.push(`ip.eq.${ip}`);

        let existing: any = null;
        if (filters.length > 0) {
            const { data, error } = await supabase
                .from("views")
                .select("id")
                .eq("post_id", postId)
                .or(filters.join(",")) // "user_id.eq.UUID,ip.eq.IP"
                .limit(1)
                .single();

            if (error && error.code !== "PGRST116") throw error; // 데이터 없으면 무시
            existing = data;
        }

        // 4. 조회 기록이 없으면 추가 & posts.views +1
        if (!existing) {
            const { error: insertError } = await supabase
                .from("views")
                .insert({ post_id: postId, user_id: userId ?? null, ip });
            if (insertError) throw insertError;

            // 현재 조회수 가져오기
            const { data: postData, error: selectError } = await supabase
                .from("posts")
                .select("views")
                .eq("idx", postId)
                .single();
            if (selectError) throw selectError;

            const newViews = (postData?.views || 0) + 1;
            const { error: updateError } = await supabase
                .from("posts")
                .update({ views: newViews })
                .eq("idx", postId);
            if (updateError) throw updateError;
        }

        // 5. 결과 반환
        return NextResponse.json({
            body: {
                success: true,
                viewsIncremented: !existing,
                alreadyViewed: !!existing
            },
            header: {
                resultMsg: "조회수 처리 완료",
                resultCode: 200,
                isSuccessful: true,
                timestamp: new Date().toISOString(),
            },
        });

    } catch (err: any) {
        return NextResponse.json({
            body: { success: false },
            header: {
                resultMsg: err.message || "조회수 처리 중 문제가 발생했습니다.",
                resultCode: err.status ?? 500,
                isSuccessful: false,
                timestamp: new Date().toISOString(),
            },
        }, { status: err.status ?? 500 });
    }
}