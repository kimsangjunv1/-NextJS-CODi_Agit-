import { cookies } from "next/headers";

import Main from "@/components/layout/Main";

import ListSection from "@/containers/init/ListSection";

const Page = async ({ searchParams }: { searchParams: Promise<{ hash: string }> }) => {
    const { hash } = await searchParams;  // result 값 가져오기

    // **
    // 쿠키 관련
    // **
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    // **
    // 쿠키 관련 END
    // **

    return (
        // <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem]", container:"" }}>
        <Main id={"home"} className={{ inner: "min-h-[100dvh]", container:"" }}>
            <ListSection />
        </Main>
    )
}

export default Page