import { useEffect, useState, useRef, Fragment, ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from '@/stores/useToastStore';

import ui from "@/scss/components/_common.module.scss";

interface Option {
    title: string;
    value: number | string;
    isDefault?: boolean;
    element?: ReactNode;
    onClick?: () => void;
}

interface CommonProps {
    list: Option[];
    message?: string;
    prevent?: boolean;
    className?: {
        container?: string;
        inner?: string;
        button?: string;
    };
    height?: string;
    width?: string;
    onClick?: (value: number | string) => void;
}

interface SelectProps extends CommonProps {
    element?: ReactNode
}

interface DropDownProps extends CommonProps {
    children: ReactNode
}

// ==========================
// Select Component
// ==========================
const Select = ({ list, className, message, height = "var(--input-height)", width, onClick }: SelectProps) => {
    const [isShowList, setIsShowList] = useState(false);
    const [currentSelect, setCurrentSelect] = useState<number | string>("");
    const [defaultSelect, setDefaultSelect] = useState<number | string>("");
    const { setToast } = useToastStore();
    const selectBoxRef = useRef<HTMLSelectElement | null>(null);

    const setValue = (target: number | string) => {
        const selected = list.find((e) => e.value === target);
        if (selected) {
            setCurrentSelect(selected.title);
            if (defaultSelect === "") setDefaultSelect(selected.title);
        }

        onClick?.(target);
        setIsShowList(false);
    };

    const detectOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("detect")) {
            setIsShowList(false);
        }
    };

    useEffect(() => {
        if (isShowList) {
            document.addEventListener("click", detectOutsideClick);
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [isShowList]);

    useEffect(() => {
        if (defaultSelect !== currentSelect && message) {
            setToast({ msg: message, icon: "success", time: 2 });
            setDefaultSelect(currentSelect);
        }
    }, [currentSelect]);

    useEffect(() => {
        const defaultItem = list.find((e) => e.isDefault) || list[0];

        if ( defaultItem ) {
            setValue( defaultItem.value );
        };
    }, []);

    return (
        <article className={className?.container ?? ""}>
            <section className="select" ref={selectBoxRef}>
                <button
                    type="button"
                    className={`detect ${className?.button ?? "default-button"} ${height ? `height-${height}` : "default-height"} ${width ?? "default-width"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsShowList(!isShowList);
                    }}
                >
                    {currentSelect}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 16 16" className="icon">
                        <path fill="currentColor" fillRule="evenodd" d="M10.147 10.635a.21.21 0 0 1-.294 0L7.109 7.891a.625.625 0 0 0-.884.884l2.744 2.744c.57.57 1.493.57 2.062 0l2.744-2.744a.625.625 0 1 0-.884-.884z" clipRule="evenodd" />
                    </svg>
                </button>

                <AnimatePresence>
                    {isShowList && (
                        <motion.section
                            className="select-list"
                            style={{ top: `calc(${height} + 0.8rem)` }}
                        >
                            {list.map((e, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    value={e.value}
                                    className="select-item"
                                    onClick={(e) => setValue((e.target as HTMLButtonElement).value)}
                                >
                                    {e.title}
                                </button>
                            ))}
                        </motion.section>
                    )}
                </AnimatePresence>
            </section>
        </article>
    );
};

// ==========================
// DropDown Component
// ==========================
const DropDown = ({ children, className, list, height = "var(--input-height)", prevent=false }: DropDownProps) => {
    const [isShowList, setIsShowList] = useState( false );

    const detectOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("detect")) {
            setIsShowList(false);
        }
    };

    useEffect(() => {
        if (isShowList) {
            document.addEventListener("click", detectOutsideClick);
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [isShowList]);

    return (
        <AnimatePresence>
            <section
                className={`${ className?.container ?? "" } ${ ui.drop_down }`}
                onClick={(e) => {
                    if ( prevent ) {
                        e.preventDefault();
                    }
                    setIsShowList( !isShowList );
                }}
            >
                { children }

                { isShowList && (
                    <motion.section
                        // className={ ui.list }
                        className={`${ className?.inner ?? "" } ${ ui.list }`}
                        initial={{ scale: 0.95, opacity: 0, y: -10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -5 }}
                        transition={{
                            duration: 0.5,
                            ease: [0, 0.9, 0.95, 1],
                            // delay: 0.2,
                        }}
                        // style={{ top: `calc(${height} + 0.8rem)` }}
                    >
                        { list.map((e, index) => (
                            <Fragment key={index}>
                                { e.element ? (
                                    <Fragment>
                                        { e.element }
                                    </Fragment>
                                ) : (
                                    <button
                                        key={ index }
                                        type="button"
                                        value={e.value}
                                        className="item"
                                        onClick={() => {
                                            e.onClick?.();
                                        }}
                                    >
                                        {e.title}
                                    </button>
                                ) }
                            </Fragment>
                            
                        ))}
                    </motion.section>
                )}
            </section>
        </AnimatePresence>
    );
};

// ==========================
// Compound Component Export
// ==========================
const MenuComponent = {
    Select,
    DropDown,
};

export default MenuComponent;