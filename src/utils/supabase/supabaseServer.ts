// utils/supabase/server.ts
// 이 파일은 서버 컴포넌트, API 라우트, 서버 액션, 미들웨어에서 임포트됩니다.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Next.js 14+에서 서버 쿠키 접근용
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export async function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    // cookies 옵션 제거
  );
}