// app/(pages)/page.tsx
import { cookies } from "next/headers";
import Main from "@/components/layout/Main";
import ListSection from "@/containers/init/ListSection";
import { GetPostLatestListResponseType } from "@/types/post.type";

// revalidate 초 단위 (예: 60초마다 재생성)
export const revalidate = 60;

const Page = async () => {
    let result;

    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/get/post/latest`, {
            method: "GET",
            // SSG를 위해 revalidate 옵션 적용
            next: { revalidate },
        });

        const json = await res.json();
        
        if (json) {
            result = json
        };
    } catch (err) {
        console.error("SSG fetch error:", err);
    }

    return (
        <Main id="home" className={{ inner: "min-h-[100dvh]", container: "" }}>
            <ListSection initialData={result} />
        </Main>
    );
};

export default Page;