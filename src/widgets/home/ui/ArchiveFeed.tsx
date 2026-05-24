"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll } from "motion/react";

import useNavigate from "@/shared/hooks/useNavigate";
import { useGetPostLatestListQuery, useGetPostListQuery } from "@/entities/post/api/post.query";

import { util } from "@/shared/lib/util";
import UI from "@/shared/ui/common/UIComponent";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

import { GetPostLatestListResponseType } from "@/entities/post/model/post.type";

const clampPageScroll = () => {
    const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (window.scrollY > maxScrollTop) {
        window.scrollTo({ top: maxScrollTop });
    }
};

const ArchiveFeed = ({ initialData }: { initialData: GetPostLatestListResponseType }) => {
    const { mainViewMode, categoryFilter } = useLayoutStore();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [mainViewMode]);

    useLayoutEffect(() => {
        clampPageScroll();
        requestAnimationFrame(clampPageScroll);
    }, [mainViewMode, categoryFilter]);

    return mainViewMode === 1 ? (
        <section className="flex-1 w-full h-full overflow-hidden">
            <UI.ErrorBoundaryWrapper>
                <Slider initialData={initialData} />
            </UI.ErrorBoundaryWrapper>
        </section>
    ) : (
        <section className="w-full h-full pt-[var(--header-height)] pb-[calc(1.6rem*4)]">
            <UI.ErrorBoundaryWrapper>
                <List />
            </UI.ErrorBoundaryWrapper>
        </section>
    );
};

const Slider = ({ initialData }: { initialData: GetPostLatestListResponseType }) => {
    const { data, refetch: getPostLatestListFetch } = useGetPostLatestListQuery(initialData);

    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);

    const [maxTranslate, setMaxTranslate] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);

    const { replaceToUrl } = useNavigate();

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    // ------------------ 트랙/뷰포트 크기 계산 ------------------
    const calculateMaxTranslate = useCallback(() => {
        const track = sliderRef.current;
        const viewport = containerRef.current;
        if (!track || !viewport) {
            setMaxTranslate(0);
            return;
        }
        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        setMaxTranslate(Math.max(0, trackWidth - viewportWidth));
    }, []);

    useEffect(() => {
        calculateMaxTranslate();

        const ro = typeof window !== "undefined" && "ResizeObserver" in window ? new ResizeObserver(calculateMaxTranslate) : null;

        window.addEventListener("resize", calculateMaxTranslate);
        if (ro) {
            if (sliderRef.current) ro.observe(sliderRef.current);
            if (containerRef.current) ro.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", calculateMaxTranslate);
            ro?.disconnect();
        };
    }, [data, calculateMaxTranslate]);

    // ------------------ 스크롤 → x 매핑 ------------------
    useEffect(() => {
        if (maxTranslate <= 0) return;
        const unsub = scrollYProgress.on("change", (v) => {
            if (!isDragging) x.set(-v * maxTranslate);
        });
        return () => unsub();
    }, [scrollYProgress, maxTranslate, isDragging, x]);

    // ------------------ 드래그 핸들러 ------------------
    const handleDragStart = () => setIsDragging(true);

    const handleDragEnd = (_: any, info: any) => {
        setIsDragging(false);
        const finalX = x.get();
        const progress = maxTranslate > 0 ? Math.max(0, Math.min(1, -finalX / maxTranslate)) : 0;
        const scrollEl = scrollRef.current;
        if (!scrollEl) return;

        const startScroll = scrollEl.offsetTop;
        const endScroll = scrollEl.offsetTop + scrollEl.offsetHeight - window.innerHeight;
        const targetScrollTop = startScroll + progress * (endScroll - startScroll);

        window.scrollTo({ top: Math.round(targetScrollTop), behavior: "smooth" });
    };

    // ------------------ 카드 높이 실시간 업데이트 ------------------
    const updateCardHeights = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        cardRefs.current.forEach((card) => {
            if (!card) return;
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.width / 2;
            const ratio = Math.max(0, 1 - distance / maxDistance);

            card.style.height = `${30 + 20 * ratio}dvh`;
        });
    }, []);

    useEffect(() => {
        const unsub = x.onChange(() => requestAnimationFrame(updateCardHeights));
        updateCardHeights(); // 초기 높이 계산

        return () => unsub();
    }, [x, data, updateCardHeights]);

    return (
        <div
            ref={scrollRef}
            className="relative w-full h-[300vh]"
        >
            <section className="fixed top-0 flex items-center w-full h-screen">
                <div
                    ref={containerRef}
                    className="flex items-center w-full h-full overflow-hidden"
                >
                    <motion.div
                        ref={sliderRef}
                        className="flex gap-[2.4rem] items-center px-[calc(50dvw-(36.0rem/2))] cursor-grab"
                        style={{ x }}
                        drag={maxTranslate > 0 ? "x" : false}
                        dragConstraints={{ left: -maxTranslate, right: 0 }}
                        dragElastic={0.12}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {data?.result?.map((e, i) => (
                            <motion.section
                                date-idx={e.idx}
                                ref={(el) => {
                                    cardRefs.current[i] = el ?? null;
                                }}
                                key={`${e}-${i}`}
                                className="item w-[36.0rem] relative flex shrink-0 flex-col gap-[1.2rem] overflow-hidden h-[30dvh] rounded-[3.2rem] shadow-[var(--shadow-normal)]"
                                initial={{
                                    opacity: 0,
                                    y: "100dvh",
                                    filter: "blur(20px)",
                                }}
                                animate={{
                                    // y: 0,
                                    y: Math.sin(i * 0.8 + 6 * 0.5) * 90,
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    filter: "blur(20px)",
                                    // y: "100dvh"
                                }}
                                transition={{
                                    delay: 0.1 * (i + 1),
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                }}
                                onClick={() => replaceToUrl(`/post/${e.idx}`)}
                            >
                                <img
                                    src={e.thumbnail}
                                    alt={`card-${i + 1}`}
                                    className="object-cover h-full pointer-events-none"
                                />
                                <div className="absolute h-[30%] mask-[linear-gradient(0deg,_#000,_#000_2.5%,_#000_50%,_#0000)] bottom-0 left-0 w-full bg-[#00000000] backdrop-blur-[30px]" />
                                <motion.div
                                    // className={`absolute bottom-0 left-[50%] bg-[linear-gradient(0deg,#000000ff_50%,#00000000)] transform translate-x-[-50%] w-full flex flex-col justify-center items-center`}
                                    className={`absolute bottom-0 left-[50%] bg-[linear-gradient(0deg,#00000000_0%,#00000000)] transform translate-x-[-50%] w-full flex flex-col justify-center items-center`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10,
                                    }}
                                >
                                    <div className="p-[2.4rem] flex flex-col justify-center gap-[0.8rem]">
                                        <div className="relative overflow-hidden">
                                            <motion.h5
                                                className="text-center text-white font-extrabold text-[calc(1dvh+1.8rem)] leading-[1.5] whitespace-break-spaces"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    delay: 0.1 * 2,
                                                    type: "spring",
                                                    mass: 0.1,
                                                    stiffness: 100,
                                                    damping: 10,
                                                }}
                                            >
                                                {e.title}
                                            </motion.h5>
                                        </div>

                                        <div className="relative overflow-hidden">
                                            <motion.p
                                                className="text-center text-[#ffffff99] text-[1.4rem] font-bold whitespace-break-spaces"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    delay: 0.1 * 3,
                                                    type: "spring",
                                                    mass: 0.1,
                                                    stiffness: 100,
                                                    damping: 10,
                                                }}
                                            >
                                                {e.category?.title} ・ 2025.01.01 ・ 2달전 ・ {e.views} views
                                            </motion.p>
                                        </div>

                                        <div className="relative overflow-hidden">
                                            <motion.p
                                                className="text-center text-[#ffffff99] text-[1.4rem] leading-[1.5] font-bold whitespace-break-spaces"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    delay: 0.1 * 4,
                                                    type: "spring",
                                                    mass: 0.1,
                                                    stiffness: 100,
                                                    damping: 10,
                                                }}
                                            >
                                                {e.summary}
                                            </motion.p>
                                        </div>
                                    </div>

                                    {/* <div className={`bg-[#00000090] h-[1.2rem] w-full relative`}>
                                        <motion.div
                                            key={"?"} // 슬라이드 index마다 새로 렌더링
                                            className='absolute top-0 left-0 bg-[var(--color-brand-500)] h-full w-[calc(4.2rem*2)]'
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{
                                                // duration: TIME/1000,
                                                ease: "easeInOut",
                                                // repeat: Infinity, // 무한 반복
                                                // repeatType: "loop" // 끝에서 시작으로 계속 반복
                                            }}
                                        />
                                    </div> */}
                                </motion.div>
                            </motion.section>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const List = () => {
    const { data } = useGetPostListQuery();

    const { categoryFilter } = useLayoutStore();
    const { pushToUrl } = useNavigate();
    const listRef = useRef<HTMLElement | null>(null);

    const filtered = categoryFilter !== 999 ? data?.result?.filter((item) => item.category_idx === categoryFilter) : data?.result;

    useLayoutEffect(() => {
        clampPageScroll();

        const listEl = listRef.current;
        if (!listEl || typeof ResizeObserver === "undefined") return;

        const ro = new ResizeObserver(() => {
            requestAnimationFrame(clampPageScroll);
        });
        ro.observe(listEl);

        return () => ro.disconnect();
    }, [categoryFilter, filtered?.length]);

    return (
        <article
            ref={listRef}
            className="flex flex-col gap-6"
        >
            <AnimatePresence mode="popLayout">
                {filtered
                    ? filtered.map((e) => (
                          <motion.section
                              key={e.idx}
                              layout
                              //   layout="position"
                              className="max-w-[var(--size-tablet)] mx-auto relative w-full"
                              initial={{ opacity: 0, transform: "scale(0.8)" }}
                              animate={{ opacity: 1, transform: "scale(1)" }}
                              exit={{ opacity: 0, transform: "scale(0.8)" }}
                              transition={{
                                  type: "spring",
                                  mass: 0.1,
                                  stiffness: 100,
                                  damping: 10,
                              }}
                          >
                              <UI.Button
                                  className="flex justify-start items-center gap-[1.6rem] hover:scale-[1.04] transition-transform px-[1.2rem]"
                                  onClick={() => {
                                      pushToUrl(`/post/${e.idx}`);
                                  }}
                              >
                                  <img
                                      src={e.thumbnail}
                                      alt={e.title}
                                      className="w-[calc(1.6rem*6)] h-[calc(1.6rem*9)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]"
                                  />

                                  <div className="flex flex-col gap-[0.8rem] flex-1">
                                      <p
                                          className={`text-left font-extrabold ${e.category_idx === 1 ? "text-[var(--color-brand-500)]" : e.category_idx === 2 ? "text-[var(--color-blue-500)]" : "text-[var(--color-pink-500)]"}`}
                                      >
                                          {e.category?.title}
                                      </p>
                                      <h5 className="text-left text-[2.0rem] font-extrabold mobile:text-[1.8rem] tablet:text-[2.2rem] ">{e.title}</h5>
                                      <p className="text-left font-semibold leading-[1.5] text-[#00000090] line-clamp-2 mobile:text-[1.4rem] tablet:text-[1.8rem]">{e.summary}</p>
                                      <h5 className="text-left text-[1.4rem] font-bold text-[#00000090]">{util.string.getCurrentDate(e.created_at)}</h5>
                                  </div>
                              </UI.Button>
                          </motion.section>
                      ))
                    : null}
            </AnimatePresence>
        </article>
    );
};

export default ArchiveFeed;
