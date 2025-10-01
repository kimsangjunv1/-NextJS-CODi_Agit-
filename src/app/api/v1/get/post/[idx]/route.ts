// app/api/post/[idx]/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabaseServer";

export async function GET(req: Request) {
    try {
        const supabase = await supabaseServer();
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const idx = segments[segments.length - 1]; // 마지막 경로가 idx
        // const idx = parseInt(idx);

        // 1. 방문자 IP 추출
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

        // 2. 조회 기록 확인 (IP 또는 userId)
        let alreadyViewed = false;
        const userId = req.headers.get("x-user-id") || undefined;
        const filters: string[] = [];
        if (userId) filters.push(`user_id.eq.${userId}`);
        if (ip) filters.push(`ip.eq.${ip}`);

        if (filters.length > 0) {
            const { data, error } = await supabase
                .from("views")
                .select("id")
                .eq("post_id", idx)
                .or(filters.join(","))
                .limit(1)
                .single();
            if (error && error.code !== "PGRST116") throw error;
            alreadyViewed = !!data;
        }


    // 3. current 글(full) + prev/next 글(minimal) 병렬 조회
    const [currentResult, postsResult] = await Promise.all([
      supabase.from("posts").select("*").eq("idx", idx).single(),
      supabase.from("posts").select("idx, title, summary").or(`idx.lt.${idx},idx.gt.${idx}`)
    ]);

    const currentData = currentResult.data;
    const postsData = postsResult.data;

    if (!currentData) {
      return NextResponse.json(
        { body: { success: false }, header: { resultMsg: "글을 찾을 수 없습니다.", resultCode: 404, isSuccessful: false, timestamp: new Date().toISOString() } },
        { status: 404 }
      );
    }

    const prevData = postsData?.filter(p => p.idx < idx).sort((a, b) => b.idx - a.idx)[0] ?? null;
    const nextData = postsData?.filter(p => p.idx > idx).sort((a, b) => a.idx - b.idx)[0] ?? null;

        // 6. 조회 기록이 없으면 views 증가
        if (!alreadyViewed && currentData) {
            const { error: insertError } = await supabase
                .from("views")
                .insert({ post_id: idx, user_id: userId ?? null, ip });
            if (insertError) throw insertError;

            const newViews = (currentData.views || 0) + 1;
            const { error: updateError } = await supabase
                .from("posts")
                .update({ views: newViews })
                .eq("idx", idx);
            if (updateError) throw updateError;

            // 메모리상 currentData 업데이트
            currentData.views = newViews;
        }

        // 7. 결과 반환
        return NextResponse.json({
            body: {
                result: {
                    ...currentData,
                    prev: prevData,
                    next: nextData,
                    viewsIncremented: !alreadyViewed,
                    alreadyViewed,
                },
                pagination: {
                    totalCount: 1,
                    pageSize: 1,
                    pageNum: 1,
                },
            },
            header: {
                resultMsg: "조회수 처리 및 포스트 정보 조회 완료",
                resultCode: 200,
                isSuccessful: true,
                timestamp: new Date().toISOString(),
            },
        });

    } catch (err: any) {
        return NextResponse.json(
            {
                body: { success: false },
                header: {
                    resultMsg: err.message || "조회수 처리 중 문제가 발생했습니다.",
                    resultCode: err.status ?? 500,
                    isSuccessful: false,
                    timestamp: new Date().toISOString(),
                },
            },
            { status: err.status ?? 500 }
        );
    }
}