import Main from "@/components/layout/Main";

import ListSection from "@/containers/post/create/ListSection";

const Page = async () => {
    return (
        <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)]", container:"" }}>
            <ListSection />
            {/* <ListSection id={ id } /> */}
        </Main>
    )
}

export default Page