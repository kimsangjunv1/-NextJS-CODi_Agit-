import { supabaseServer } from "@/shared/lib/supabase/supabaseServer";
import { apiError, apiSuccess } from "@/shared/lib/apiResponse";

export async function POST(req: Request) {
    try {
        const { postId, userId } = await req.json();
        if (!postId) {
            return apiError("postId가 필요합니다.", {
                resultCode: "BAD_REQUEST",
                status: 400,
                result: null,
            });
        }

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

        const supabase = await supabaseServer();

        const filters: string[] = [];
        if (userId) filters.push(`user_id.eq.${userId}`);
        if (ip) filters.push(`ip.eq.${ip}`);

        let existing: { id: number } | null = null;
        if (filters.length > 0) {
            const { data, error } = await supabase
                .from("views")
                .select("id")
                .eq("post_id", postId)
                .or(filters.join(","))
                .limit(1)
                .single();

            if (error && error.code !== "PGRST116") throw error;
            existing = data;
        }

        if (!existing) {
            const { error: insertError } = await supabase
                .from("views")
                .insert({ post_id: postId, user_id: userId ?? null, ip });
            if (insertError) throw insertError;

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

        return apiSuccess(
            {
                success: true,
                viewsIncremented: !existing,
                alreadyViewed: !!existing,
            },
            { resultMessage: "조회수 처리 완료", pagination: null }
        );
    } catch (err: any) {
        return apiError(err.message || "조회수 처리 중 문제가 발생했습니다.", {
            status: err.status ?? 500,
            result: { success: false },
        });
    }
}
