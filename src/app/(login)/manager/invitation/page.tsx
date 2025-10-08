import Main from "@/components/layout/Main";

import ListSection from "@/containers/manager/invitation/ListSection";

const Page = () => {

    return (
        <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)] pb-[calc(5.2rem+1.6rem)]", container:"" }}>
            <ListSection />
        </Main>
    )
}

export default Page