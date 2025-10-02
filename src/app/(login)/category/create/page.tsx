import { cookies } from "next/headers";

import Main from "@/components/layout/Main";

import ListSection from "@/containers/category/create/ListSection";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;  // result 값 가져오기

    // **
    // 쿠키 관련
    // **
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    // **
    // 쿠키 관련 END
    // **

    return (
        <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)] pb-[calc(5.2rem+1.6rem)]", container:"" }}>
            <ListSection />
            {/* <ListSection id={ id } /> */}
        </Main>
    )
}

export default Page