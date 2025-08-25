import { cookies } from "next/headers";

import Main from "@/components/layout/Main";

import ListSection from "@/containers/login/ListSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";


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

    const session = await getServerSession(authOptions)

    return (
        <Main id={"login"} className={{ inner: "flex flex-col gap-[2.4rem] ", container:"" }}>
            <ListSection />
        </Main>
    )
}

export default Page