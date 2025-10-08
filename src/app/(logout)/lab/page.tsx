import Main from "@/components/layout/Main";

const Page = async () => {
    return (
        <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)] ", container:"" }}>
            <p>아직 개발중</p>
        </Main>
    )
}

export default Page