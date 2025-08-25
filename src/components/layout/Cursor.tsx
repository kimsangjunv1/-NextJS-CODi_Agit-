"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// import { editorSectionDescList } from "@/constants/lists/configServiceList";

const Mouse = () => {
    const [ currentDesc, setCurrentDesc ] = useState(0);

    const cursorMain = useRef<HTMLDivElement | any>(null);
    const cursorSub = useRef<HTMLDivElement | any>(null);
    const cursorDesc = useRef<HTMLDivElement | any>(null);

    const elasticMouse = (props: HTMLDivElement, isNeedTransform: boolean) => {
        // 원 형태의 요소를 선택합니다.
        const circleElement = props;

        // 마우스 위치와 커서 위치를 추적하는 객체를 생성합니다.
        const mouse = { x: 0, y: 0 }; // 현재 마우스 위치 추적
        const circle = { x: 0, y: 0 }; // 원의 위치 추적

        // 커서 이동 속도를 부드럽게 만드는 변수 (0 = 부드럽게, 1 = 즉시, 0.17 = 기본)
        const speed = 0.17;

        // Update mouse position on the 'mousemove' event
        window.addEventListener("mousemove", (e: any) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener("mouseover", (e: any) => {
            const hoveredEl = e.target;

            // 전체 dataset 보기
            const CURRENT_DESC_ID = parseInt( hoveredEl?.dataset.description ? hoveredEl?.dataset.description : "0" );

            setCurrentDesc( CURRENT_DESC_ID )
        });

        // 애니메이션 시작
        const tick = () => {
            // 이동
            // 마우스 위치를 기반으로 한 원의 이동 계산 및 부드럽게
            circle.x += (mouse.x - circle.x) * speed;
            circle.y += (mouse.y - circle.y) * speed;

            // 커서 이동을 위한 변환 문자열 생성
            const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

            // 모든 변환을 지정된 순서대로 원 요소에 적용합니다: 이동 -> 회전 -> 크기 조절
            circleElement.style.transform = `${ translateTransform }`;

            // 애니메이션을 계속 진행하기 위해 다음 프레임을 요청합니다.
            window.requestAnimationFrame(tick);
        };

        // 애니메이션 루프 시작
        tick();
    };

    useEffect(() => {
        if (cursorMain.current !== "null") {
            elasticMouse(cursorMain.current, true);
        }
    }, []);

    return (
        <article id="cursor">
            <section className="cursor main" ref={ cursorMain }>
                <AnimatePresence>
                    { currentDesc !== 0 ? (
                        <motion.div
                            layout="size"
                            className="description"
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -5 }}
                            transition={{
                                duration: 0.2,
                                ease: [0, 0.9, 0.95, 1]
                            }}
                        >
                            {/* <h6>{ editorSectionDescList.find((e) => e.id === currentDesc)?.section }</h6>

                            <div>
                                <p><strong>설명</strong> { editorSectionDescList.find((e) => e.id === currentDesc)?.description }</p>
                                <p><strong>TIP</strong> { editorSectionDescList.find((e) => e.id === currentDesc)?.example }</p>
                            </div> */}
                        </motion.div>
                    ) : "" }
                </AnimatePresence>
            </section>
        </article>
    );
};

export default Mouse;
