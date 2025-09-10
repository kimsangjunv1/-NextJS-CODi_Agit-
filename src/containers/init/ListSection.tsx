"use client"

import UI from '@/components/common/UIComponent'
import { DUMMY_POST_LIST_RESPONSE } from '@/constants/lists/configDummyResponse'
import useNavigate from '@/hooks/common/useNavigate'
import { useLayoutStore } from '@/stores/useLayoutStore'
import { AnimatePresence, motion, PanInfo } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'

const ListSection = () => {
    const [ isShow, setIsShow ] = useState(false);
    const { mainViewMode, setMainViewMode } = useLayoutStore();
    // const SelectedTabContent = ( value: number ) => {
    //     switch ( value ) {
    //         case 1:
    //             return <Contents />

    //         // case 2:
    //         //     return <ProductInfo />

    //         // case 3:
    //         //     return <Kiosk />

    //         default:
    //             return <Contents />
    //     }
    // }

    return (
        <Fragment>
            <section className='fixed bottom-[calc(1.6rem*3)] left-[50%] transform translate-x-[-50%] bg-[#000000ed] p-[1.6rem] rounded-full z-[10000] flex items-center gap-[1.6rem]'>
                <UI.Button
                    onClick={() => setMainViewMode( 1 )}
                    className="text-white text-[1.6rem] font-bold"
                >
                    최근 업로드
                </UI.Button>

                <div className='h-[1.2rem] w-[0.1rem] bg-[#ffffff50]' />

                <UI.Button
                    onClick={() => setMainViewMode( 2 )}
                    className="text-white text-[1.6rem] font-bold"
                >
                    전체보기
                </UI.Button>
            </section>

            <AnimatePresence mode='popLayout'>
                {/* 최근 업로드한 컨텐츠 */}
                { mainViewMode === 1 &&
                    <motion.section
                        key={"slider"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            // delay: 0.05 * (i + 1),
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                        className='flex-1 w-full h-full overflow-hidden'
                    >
                        <Slider />
                        {/* <Slider /> */}
                    </motion.section>
                 }
                {/* 최근 업로드한 컨텐츠 END */}

                {/* 목록 */}
                { mainViewMode === 2 &&
                    <motion.section
                        key={"list"}
                        initial={{ opacity: 0, transform: "scale(0.9)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{ opacity: 0, transform: "scale(0.9)" }}
                        transition={{
                            // delay: 0.05 * (i + 1),
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                        className='w-full h-full pt-[var(--header-height)] pb-[calc(1.6rem*4)]'
                    >
                        <List />
                    </motion.section>
                }
                {/* 목록 END */}
            </AnimatePresence>
            

            {/* 방향 */}
            {/* <img src="/images/picture/img-arrow-below.svg" alt='아래' className='m-auto' /> */}
            {/* 방향 END */}

        </Fragment>
    )
}

const Slider = () => {
    const [currentSelect, setCurrentSelect] = useState(0);
	const { pushToUrl } = useNavigate();

	const TIME = 1000 * 5;
	const ACTIVE = (index: number) => index === currentSelect;
	const router = useRouter();

	const CardRef = useRef<HTMLElement>(null);
	const FinalRef = useRef<HTMLElement>(null);
	const ContainerRef = useRef<HTMLElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const onDragEnd = (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
		stopInterval();

		if (!ContainerRef.current || !FinalRef.current) return;

		const finalRect = FinalRef.current.getBoundingClientRect();
		const finalCenter = finalRect.left + finalRect.width / 2;

		// 모든 카드 center 좌표 구하기
		const cards = Array.from(ContainerRef.current.querySelectorAll(".item"));
		let closestIndex = 0;
		let minDistance = Infinity;

		cards.forEach((card, index) => {
			const rect = card.getBoundingClientRect();
			const cardCenter = rect.left + rect.width / 2;
			const distance = Math.abs(cardCenter - finalCenter);

			if (distance < minDistance) {
				minDistance = distance;
				closestIndex = index;
			}
		});

		// 가장 가까운 index를 active
		setCurrentSelect(closestIndex);
		startInterval();
	};

	// 자동 슬라이드 시작
	const startInterval = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setCurrentSelect((prev) => (prev + 1) % 10);
		}, TIME);
	};

	// 자동 슬라이드 멈춤
	const stopInterval = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	// 초기 자동 슬라이드 시작
	useEffect(() => {
		startInterval();
		return () => stopInterval();
	}, []);

	// 휠 이벤트: up → prev, down → next
	useEffect(() => {
		let isScrolling = false;

		const handleWheel = (e: WheelEvent) => {
			if (isScrolling) return; // 연속 입력 방지
			isScrolling = true;
			stopInterval();

			if (e.deltaY > 0) {
				setCurrentSelect((prev) => (prev + 1) % 10);
			} else if (e.deltaY < 0) {
				setCurrentSelect((prev) => (prev - 1 + 10) % 10);
			}

			setTimeout(() => {
				isScrolling = false;
			}, 300); // 0.3초 쿨다운

			startInterval();
		};

		window.addEventListener("wheel", handleWheel, { passive: true });
		return () => window.removeEventListener("wheel", handleWheel);
	}, []);

	return (
		<article
			ref={FinalRef}
			className="flex items-center justify-center w-full h-full slider min-h-[100dvh]"
		>
			<motion.section
				ref={ContainerRef}
				drag="x"
				dragElastic={0.1}
				onDragStart={() => stopInterval()}
				onDragEnd={(event, info) => onDragEnd(event, info)}
				className="slider-inner flex h-[calc(100dvh-var(--header-height)-var(--header-height))] relative cursor-grab"
			>
				<motion.section
					// className="h-[calc(100dvh-(1.6rem*20))] w-[calc(50dvh+(10dvh*0)-var(--header-height)-(1.6rem*1))] flex items-center justify-start gap-[0.8rem] absolute left-[50%] top-0 transform translate-x-[-50%]"
					className="h-[calc(100dvh-var(--header-height)-(1.2rem*3)))] w-[calc(50dvh+(10dvh*0)-var(--header-height)-(1.6rem*1))] flex items-center justify-start gap-[0.8rem] absolute left-[50%] top-0 transform translate-x-[-50%]"
					animate={{
						transform: `translateX(calc((${CardRef?.current?.offsetWidth}px + (0.8rem * 1)) * (${currentSelect} * -1)))`,
					}}
					transition={{
						delay: 0.05,
						type: "spring",
						mass: 0.1,
						stiffness: 100,
						damping: 10,
					}}
				>
					{ DUMMY_POST_LIST_RESPONSE.map((e, i) => (
							<motion.section
								ref={CardRef}
								key={`${e}-${i}`}
								className="item w-[calc(50dvh+(10dvh*0)-var(--header-height)-(1.6rem*1))] relative flex shrink-0 flex-col gap-[1.2rem]"
								animate={{
									y: Math.sin(i * 0.8 + currentSelect * 0.5) * 60,
									opacity: ACTIVE(i) ? 1 : 0.5,
									scale: 1,
									height: ACTIVE(i)
										? "calc(50dvh + (10dvh*3) - var(--header-height))"
										: "calc(50dvh + (10dvh*2) - var(--header-height))",
								}}
								initial={{ opacity: 0, scale: 0.9 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ type: "spring", stiffness: 100, damping: 15 }}
								onClick={() => {
									router.push(`/post/${i + 1}`);
									stopInterval();
								}}
							>
								<img
									src={`/images/picture/img-dummy-thumbnail-0${i + 1}.png`}
									alt={`card-${i + 1}`}
									className="object-cover h-full"
								/>
								{/* Active 상태일 때만 정보 표시 */}
								{ACTIVE(i) && (
									<motion.div
                                        className={`absolute bottom-0 left-[50%] bg-[linear-gradient(0deg,#000000ed,#00000000)] transform translate-x-[-50%] w-full flex flex-col justify-center items-center`}
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
                                        <div className='p-[2.4rem] flex flex-col justify-center gap-[0.8rem]'>
                                            <div className='relative overflow-hidden'>
                                                <motion.p
                                                    className='text-center text-[#DD4F1B] font-bold'
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{
                                                        delay: 0.1 * 1,
                                                        type: "spring",
                                                        mass: 0.1,
                                                        stiffness: 100,
                                                        damping: 10,
                                                    }}
                                                >
                                                    개발
                                                </motion.p>
                                            </div>

                                            <div className='relative overflow-hidden'>
                                                <motion.h5 
                                                    className='text-center text-white font-bold text-[calc(1dvh+1.8rem)]'
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
                                                    { e.title }
                                                </motion.h5>
                                            </div>

                                            <div className='relative overflow-hidden'>
                                                <motion.p 
                                                    className='text-center text-[#ffffff99] text-[1.4rem] font-bold'
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
                                                    2025.01.01・2달전
                                                </motion.p>
                                            </div>
                                        </div>
                                        
                                        <div className={`bg-[#00000090] h-[1.2rem] w-full relative ${ ACTIVE(i) ? "" : "hidden" }`}>
                                            <motion.div
                                                key={currentSelect} // 슬라이드 index마다 새로 렌더링
                                                className='absolute top-0 left-0 bg-[#DD4F1B] h-full w-[calc(4.2rem*2)]'
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{
                                                    duration: TIME/1000,
                                                    ease: "easeInOut",
                                                    // repeat: Infinity, // 무한 반복
                                                    // repeatType: "loop" // 끝에서 시작으로 계속 반복
                                                }}
                                            />
                                        </div>
                                    </motion.div>
								)}
							</motion.section>
						))}
				</motion.section>
			</motion.section>
		</article>
	);
}

const List = () => {
    const [filter, setFilter] = useState<number | null>(null);
    const { categoryFilter, setCategoryFilter } = useLayoutStore();

    const filtered = categoryFilter !== 999 ? DUMMY_POST_LIST_RESPONSE.filter(item => item.category === categoryFilter) : DUMMY_POST_LIST_RESPONSE;

    return (
        <article
            className="flex flex-col gap-6"
            // className="max-h-[calc(100dvh-var(--header-height))] flex flex-col justify-start items-start gap-[3.2rem] pt-[calc(1.6rem*2)]"
        >
            <AnimatePresence mode='popLayout'>
                {filtered.map((e, i) => (
                    <motion.section
                        key={ e.id }
                        layout
                        initial={{ opacity: 0, transform: "scale(0.9)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{ opacity: 0, transform: "scale(0.9)" }}
                        transition={{
                            delay: 0.05 * (i + 1),
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                        // className="flex items-center gap-6 p-4 border rounded-lg shadow-md"
                        className='max-w-[var(--size-tablet)] mx-auto relative'
                    >
                        <UI.Button
                            className='flex justify-start items-center gap-[1.6rem]'
                        >
                            <img src={ e.thumbnail } alt={ e.title } className='w-[calc(1.6rem*7)] h-[calc(1.6rem*10)] object-cover rounded-[1.6rem] shadow-[var(--shadow-normal)]'/>

                            <div className='flex flex-col gap-[0.8rem]'>
                                <motion.p className='text-left text-[#DD4F1B] font-extrabold'>{ e.category === 1 ? "개발" : e.category === 2 ? "디자인" : "미지정" }</motion.p>
                                <motion.h5 className='text-left text-[2.4rem] font-extrabold'>{ e.title }</motion.h5>
                                <motion.p className='text-left text-[1.8rem] font-semibold leading-[1.5] text-[#00000090] line-clamp-2'>{ e.desc }</motion.p>
                            </div>

                        </UI.Button>
                    </motion.section>
                ))}
            </AnimatePresence>
        </article>
    );
}

export default ListSection