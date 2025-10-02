// utils/supabase/server.ts
// 이 파일은 서버 컴포넌트, API 라우트, 서버 액션, 미들웨어에서 임포트됩니다.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Next.js 14+에서 서버 쿠키 접근용

export async function supabaseServer() { // 함수 이름을 명확하게!
    const cookieStore = await cookies(); // 동기 함수이므로 await 필요 없어요.

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                        );
                    } catch (error) {
                        // 이 에러 핸들링은 미들웨어에서 세션을 새로고침할 때 발생할 수 있는
                        // 'cookies().set()' 호출 오류를 무시하기 위함입니다.
                        // (주로 Server Component에서 setAll이 호출될 때)
                    }
                },
            },
        }
    )
};