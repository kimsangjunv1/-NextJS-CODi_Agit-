"use client";

interface ServicePlaceholderProps {
    title?: string;
    description?: string;
}

export default function ServicePlaceholder({
    title = "준비 중인 서비스입니다",
    description = "곧 새로운 기능으로 찾아뵐게요.",
}: ServicePlaceholderProps) {
    return (
        <section className="flex min-h-[40dvh] flex-col items-center justify-center gap-[1.2rem] px-[2.4rem]">
            <h2 className="text-[2.4rem] font-extrabold">{title}</h2>
            <p className="text-center text-[1.6rem] font-semibold text-[#00000090]">{description}</p>
        </section>
    );
}
