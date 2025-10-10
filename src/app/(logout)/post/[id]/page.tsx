import Main from "@/components/layout/Main";

import ListSection from "@/containers/post/ListSection";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;  // result 값 가져오기

    return (
        <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem]", container:"" }}>
            <ListSection id={ id } />
        </Main>
    )
}

export default Page

