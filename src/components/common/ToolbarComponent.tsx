"use client"

import React, { Fragment } from 'react'
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import UI from './UIComponent';
import { useBlockStore } from "@/stores/useEditorBlockStore";
import { usePatchPostQuery } from "@/hooks/api/post.query";

const ToolbarComponent = ({ defaultConfig, onStyleChange }: { defaultConfig: Record<string, string>, onStyleChange: (style: any) => void }) => {
    const { rows } = useBlockStore();
    const { data, mutate: patchPostFetch } = usePatchPostQuery();

    // console.log('defaultConfig', defaultConfig.)
    const IS_SELECTED = defaultConfig.color && defaultConfig.backgroundColor && defaultConfig.fontSize && defaultConfig.textAlign

    return ReactDOM.createPortal (
        <AnimatePresence>
            <motion.article
                key={"toolbar"}
                className="fixed gap-[0.4rem] z-100 p-[0.4rem] rounded-[1.4rem] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bottom-[calc(5.0rem)] bg-[#ffffffd1] backdrop-blur-md shadow-[var(--shadow-normal)] grid grid-cols-[0.3fr_0.5fr_0.5fr_1fr_1fr]"
                initial={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                        staggerChildren: 0.15,
                    }
                }}
                exit={{ opacity: 0, y: "5.2rem", scale: 0.9, filter: "blur(10px)" }}
                transition={{
                    delay: 0,
                    type: "spring",
                    mass: 0.1,
                    stiffness: 100,
                    damping: 10,
                }}
            >
                { IS_SELECTED ? (
                    <Fragment>
                        {/* Bold / Italic / Underline */}
                        <button
                            onClick={() => onStyleChange({ fontWeight: "toggleBold" })}
                            className="bg-white shadow-[var(--shadow-normal)] rounded-[1.2rem] text-black text-[1.4rem] w-[4.2rem] h-[4.2rem] font-bold hover:bg-[var(--color-brand-400)] transition-colors"
                        >
                            B
                        </button>
                        {/* <button
                            onClick={() => onStyleChange({ fontStyle: "italic" })}
                            className="text-black text-[1.4rem] py-[1.6rem] italic hover:bg-[var(--color-brand-400)] transition-colors"
                        >
                            I
                        </button>
                        <button
                            onClick={() =>
                                onStyleChange({ textDecoration: "underline" })
                            }
                            className="text-black text-[1.4rem] py-[1.6rem] underline hover:bg-[var(--color-brand-400)] transition-colors"
                        >
                            U
                        </button> */}
        
                        {/* Font Weight (100~900) */}
                        {/* <select
                            onChange={(e) =>
                                onStyleChange({ fontWeight: parseInt(e.target.value, 10) })
                            }
                            className="px-1 py-0.5 border rounded text-sm"
                            defaultValue="400"
                        >
                            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
                                <option key={w} value={w}>
                                    {w}
                                </option>
                            ))}
                        </select> */}
                        <section className='shadow-[var(--shadow-normal)] flex items-center justify-center gap-[0.8rem] px-[1.2rem] bg-white rounded-[1.2rem] h-[4.2rem]'>
                            <p className='text-[1.4rem] font-semibold whitespace-nowrap text-[var(--color-gray-500)]'>텍스트</p>

                            <UI.ColorPicker
                                defaultValue={ defaultConfig.color }
                                onChange={(e) => {
                                    console.log("asd",e );
                                    onStyleChange({ color: e });
                                }}
                            />
                        </section>
        
                        <section className='shadow-[var(--shadow-normal)] flex items-center justify-center gap-[0.8rem] px-[1.2rem] bg-white rounded-[1.2rem] h-[4.2rem]'>
                            <p className='text-[1.4rem] font-semibold whitespace-nowrap text-[var(--color-gray-500)]'>배경</p>

                            <UI.ColorPicker
                                defaultValue={ defaultConfig.backgroundColor }
                                onChange={(e) => {
                                    console.log("asd",e );
                                    onStyleChange({ backgroundColor: e });
                                }}
                            />
                        </section>
        
                        {/* Font Size */}
                        {/* <p>defaultConfig.fontSize{ parseFloat(defaultConfig.fontSize) === 1.4 ? "asd" : "?" }</p> */}
                        <section className='shadow-[var(--shadow-normal)] flex items-center justify-center gap-[0.8rem] px-[1.2rem] bg-white rounded-[1.2rem] h-[4.2rem]'>
                            <p className='text-[1.4rem] font-semibold whitespace-nowrap text-[var(--color-gray-500)]'>텍스트</p>

                            <UI.Select
                                trackingData={`fontSize`}
                                defaultValue={ parseFloat(defaultConfig.fontSize) }
                                list = {[
                                    {
                                        title: "14",
                                        value: 1.4
                                    },
                                    {
                                        title: "16",
                                        value: 1.6
                                    },
                                    {
                                        title: "18",
                                        value: 1.8
                                    },
                                    {
                                        title: "20",
                                        value: 2.0
                                    },
                                ]}
                                onChange={(e) => {
                                    onStyleChange({ fontSize: e })
                                    // onStyleChange({ fontSize: parseInt(e, 10) })
                                    console.log("e", e)
                                }}
                                className={{
                                    button: "p-0"
                                    // button: "p-0 min-w-[calc(1.6rem*5)] shadow-[var(--shadow-normal)] flex gap-[0.8rem] px-[1.2rem] bg-white rounded-[1.2rem] h-[4.2rem]"
                                }}
                            />
                        </section>
                        {/* <section className="flex text-[1.4rem] underline transition-colors">
                            <UI.Button className="hover:bg-[var(--color-brand-400)]" onClick={() => onStyleChange({ fontSize: "+0.2" })}>
                                A+
                            </UI.Button>
                            <p>{ defaultConfig.fontSize ?? 0 }</p>
                            <UI.Button className="hover:bg-[var(--color-brand-400)]" onClick={() => onStyleChange({ fontSize: "-0.2" })}>
                                A-
                            </UI.Button>
                        </section> */}
        
                        {/* Text Align */}
                        {/* <select
                            onChange={(e) =>
                                onStyleChange({ textAlign: e.target.value })
                            }
                            className="px-1 py-0.5 border rounded text-sm"
                            defaultValue="left"
                        >
                            <option value="left">좌</option>
                            <option value="center">중앙</option>
                            <option value="right">우</option>
                        </select> */}
                        <section className='shadow-[var(--shadow-normal)] flex items-center justify-center gap-[0.8rem] px-[1.2rem] bg-white rounded-[1.2rem] h-[4.2rem]'>
                            <p className='text-[1.4rem] font-semibold whitespace-nowrap text-[var(--color-gray-500)]'>정렬</p>

                            <UI.Select
                                trackingData={`textAlign`}
                                defaultValue={ defaultConfig.textAlign }
                                list = {[
                                    {
                                        title: "왼쪽",
                                        value: "left"
                                    },
                                    {
                                        title: "가운데",
                                        value: "center"
                                    },
                                    {
                                        title: "오른쪽",
                                        value: "right"
                                    },
                                ]}
                                onChange={(e) => {
                                    console.log("e", e)
                                    onStyleChange({ textAlign: e })
                                }}
                                className={{
                                    button: "p-0"
                                    // button: "p-0 min-w-[calc(1.6rem*5)] shadow-[var(--shadow-normal)] flex gap-[0.8rem] px-[1.2rem] bg-white rounded-[1.2rem] h-[4.2rem]"
                                }}
                            />
                        </section>
                    </Fragment>
                ) : <p className='col-span-5'>이곳에서 스타일 조정을 할 수 있어요</p> }
            </motion.article>
        </AnimatePresence>
        ,document.body
    );
};

export default ToolbarComponent