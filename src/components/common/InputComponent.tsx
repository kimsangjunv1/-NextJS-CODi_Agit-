"use client"

import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useEffect, useRef, useState } from 'react';

import {
    ButtonProps,
    CalendarModalProps,
    CheckBoxProps,
    FileUploadProps,
    InputProps,
    MultiSelectProps,
    RadioProps,
    SelectProps,
    SwitchProps,
    TabComponentProps
} from '@/types/ui.type';
import useNavigate from "@/hooks/common/useNavigate";
import { useToastStore } from "@/stores/useToastStore";
import IconComponent from '@/components/common/IconComponent';

const CheckBox = ({ defaultState = false, className, guide, onChange }: CheckBoxProps) => {
    const [ currentState, setCurrentState ] = useState( defaultState );
    useEffect(() => {
        console.log("currentState", currentState)
    }, [currentState ])

    return (
        <div className={`flex items-center justify-center ${ className ? className : "" }`}>
            <button
                className="flex items-center justify-center gap-[0.4rem]"
                onClick={() => {
                    setCurrentState( !currentState )
                    onChange( !currentState )
                }}
            >
                <div className={`w-[1.8rem] h-[1.8rem] rounded-[0.4rem] m-[0.4rem] relative ${ currentState ? "bg-[var(--color-blue-1000)]" : "bg-transparent border border-[var(--color-gray-200)]" }`}>
                    <p className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] font-bold text-[1.2rem] ${ currentState ? "text-white" : "hidden" }`}>✓</p>
                </div>
                { guide ? <p>{ guide }</p> : "" }
            </button>
        </div>
    )
}

const Radio = ({ list, defaultValue = 0, className, onChange }: RadioProps) => {
    const [ currentSelected, setCurrentSelected ] = useState<number>( defaultValue );
    
    const DUMMY = [
        {
            title: "설정된 리스트가 없습니다.",
            value: 0,
        }
    ]
    return (
        <section className={`flex gap-[1.2rem] ${ className?.container ?? "" }`}>
            {( list ?? DUMMY ).map((e, i) =>
                <motion.button
                    key={i}
                    type="button"
                    className={`item flex items-center gap-[0.8rem] p-[0.4rem] hover:bg-[var(--color-gray-200)] rounded-[0.8rem] transition-colors ${ className?.button ?? "" }`}
                    onClick={() => {
                        setCurrentSelected( e.value );
                        onChange( e.value );
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className={`w-[1.8rem] h-[1.8rem] relative rounded-full ${ currentSelected === e.value ? "bg-[var(--color-blue-1000)]" : "border border-[var(--color-gray-400)]" }`}>
                        <div className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-full w-[0.6rem] h-[0.6rem] ${ currentSelected === e.value ? "bg-white" : "bg-transparent" }`} />
                    </div>
                    <p className="font-medium">{ e.title }</p>
                </motion.button>
            )}
        </section>
    )
}

const Switch = ({ data, onChange }: SwitchProps) => {
    const [ list, setList ] = useState( data );
    
    useEffect(() => {
        onChange( list );
    }, [ list ])

    return (
        <Fragment>
            { list ? (
                <motion.section
                    className={`switch w-[calc(1.6rem*2+0.4rem)] h-[2.0rem] p-[0.2rem] rounded-full flex cursor-pointer ${ list.state ? "justify-end" : "justify-start" }`}
                    animate={{ background: list.state ? "var(--color-blue-1000)" : "var(--color-gray-400)" }}
                    onClick={() => {
                        setList(prev =>
                            prev.state ? { ...prev, state: !prev.state } : { ...prev, state: !prev.state }
                        );
                    }}
                >
                    <motion.div
                        layout
                        className="w-[1.6rem] h-[1.6rem] bg-white rounded-full"
                        transition={{
                            duration: 0.5,
                            ease: [0, 0.9, 0.95, 1],
                        }}
                    />
                </motion.section>
            ) : "" }
        </Fragment>
    );
};

const Input = ({ defaultValue, icon = false, type = "text", placeholder = "placeholder 지정이 필요해요", guide, className, onChange }: InputProps) => {
    useEffect(() => {
        if ( defaultValue ) {
            onChange({ target: { value: defaultValue }});
        }
    }, [ defaultValue ])
    return (
        <section className={`flex items-center gap-[0.8rem] px-[1.6rem] border border-[var(--color-gray-200)] rounded-[0.8rem] relative ${ className ? className : "" }`}>
            { guide && <p className="absolute top-[50%] right-[1.6rem] transform translate-y-[-50%] translate-x-0">{ guide }</p> }
            { icon && <IconComponent type="colored-lens" alt='돋보기' /> }
            <input type={ type } placeholder={ placeholder } onChange={ onChange } defaultValue={ defaultValue } />
        </section>
    )
}

const Select = ({ list = [], className, onChange }: SelectProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    // const style = useRef<testProps>({});

    const INIT_VALUE = list[0];
    const [currentValue, setCurrentValue] = useState(INIT_VALUE?.value);
    const [showMenu, setShowMenu] = useState(false);
    const [positionStyle, setPositionStyle] = useState<{ left?: number; right?: number; top?: number; bottom?: number }>({ left: 0 });

    const detectOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("detect")) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener("click", detectOutsideClick);

            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const dropdownWidth = buttonRef.current.offsetWidth;
                const dropdownHeight = 200; // 예상 높이 (필요하면 동적 측정 가능)
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                // 가로 위치 계산
                if (rect.left + dropdownWidth > viewportWidth) {
                    setPositionStyle({ right: 0 });
                } else {
                    setPositionStyle({ left: 0 });
                }

                // 세로 위치 계산
                if (rect.bottom + dropdownHeight > viewportHeight) {
                    setPositionStyle({ bottom: rect.height + 4 });
                } else {
                    setPositionStyle({ top: rect.height + 4 });
                }
            }
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [showMenu]);

    useEffect(() => {
        onChange(INIT_VALUE?.value);
    }, []);

    return (
        <section
            className={`switch rounded-[0.8rem] relative ${
                className?.container ? className.container : ""
            }`}
        >
            <button
                ref={buttonRef}
                className={`${
                    className?.button ? className.button : "h-full"
                } min-w-[12.8rem] flex justify-between items-center text-left px-[1.2rem] rounded-[0.8rem] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition-colors`}
                onClick={() => setShowMenu(!showMenu)}
            >
                <p>{list.find((e) => e.value === currentValue)?.title}</p>
                <IconComponent
                    type="colored-arrow-below"
                    alt="더보기"
                    className={`${showMenu ? "rotate-180" : ""} transition-transform`}
                />
            </button>

            <AnimatePresence>
                {showMenu && (
                    <motion.section
                        className="absolute bg-white flex flex-col gap-[0.4rem] border border-[var(--color-gray-200)] p-[0.4rem] rounded-[1.2rem] z-1"
                        style={{
                            width: buttonRef.current?.offsetWidth,
                            ...positionStyle
                        }}
                        initial={{ opacity: 0, transform: "scale(0.99)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{ opacity: 0, transform: "scale(0.99)" }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10
                        }}
                    >
                        <AnimatePresence>
                            {list.map((e, i) => (
                                <motion.button
                                    key={`${e}-${i}`}
                                    type="button"
                                    className={`text-left hover:bg-[var(--color-gray-200)] text-[var(--color-gray-700)] p-[1.2rem] rounded-[1.2rem] transition-colors ${
                                        e.value === currentValue
                                            ? "bg-[var(--color-gray-100)]"
                                            : "bg-transparent"
                                    }`}
                                    onClick={() => {
                                        setCurrentValue(e.value);
                                        setShowMenu(false);
                                    }}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        delay: 0.1 * (i + 1),
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10
                                    }}
                                >
                                    {e.title}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
};

const Calendar = ({
    className = "bg-[var(--color-gray-100)] text-[var(--color-gray-1000)] rounded-[0.8rem] p-[1.2rem]",
    // isOpen,
    icon = false,
    onClose,
    onDateSelect,
}: CalendarModalProps) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null);
    const [ positionStyle, setPositionStyle ] = useState<{ left?: number; right?: number }>({ left: 0 });

    const calendarRef = useRef<HTMLButtonElement>(null);
    const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const handleDateClick = (day: number) => {
        const selected = new Date(year, month, day);
        setSelectedDate(selected);
        setModalOpen(false);
        if (onDateSelect) onDateSelect(selected);
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const detectOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("detect")) {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        if (modalOpen) {
            document.addEventListener("click", detectOutsideClick);

            if (calendarRef.current) {
                const rect = calendarRef.current.getBoundingClientRect();
                const calendarWidth = 320; // 예상 너비 (w-[calc(1.6rem*20)] 약 320px)
                const viewportWidth = window.innerWidth;

                if (rect.left + calendarWidth > viewportWidth) {
                    setPositionStyle({ right: 0 });
                } else {
                    setPositionStyle({ left: 0 });
                }
            }
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [modalOpen]);

    return (
        <section className="relative calendar">
            <motion.button
                ref={ calendarRef }
                onClick={() => setModalOpen(true)}
                className={`${ className } ${
                    icon ? "flex gap-[2.8rem] items-center justify-between" : ""
                } hover:bg-[var(--color-gray-200)] transition-colors`}
                whileTap={{ scale: 0.95 }}
            >
                { selectedDate
                    ? selectedDate.toLocaleDateString("ko-KR")
                    : currentDate.toLocaleDateString("ko-KR")
                }
                { icon && <IconComponent type="colored-calendar" alt="캘린더" /> }
            </motion.button>

            <AnimatePresence>
                {modalOpen && (
                    <motion.section
                        className="absolute flex items-center justify-center"
                        onClick={() => {
                            const VALUE = selectedDate
                                ? selectedDate.toLocaleDateString("ko-KR")
                                : currentDate.toLocaleDateString("ko-KR")
                                
                            onClose( VALUE );
                        }}
                        style={{
                            top: (calendarRef.current?.offsetHeight ?? 0) + 4,
                            ...positionStyle,
                        }}
                        initial={{ opacity: 0, transform: "scale(0.99)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{ opacity: 0, transform: "scale(0.99)" }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        <div
                            className="bg-white rounded-[1.2rem] shadow-lg p-[2.4rem] w-[calc(1.6rem*20)] flex flex-col gap-[2.4rem]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <section className="flex items-center justify-between mb-4">
                                <button
                                    onClick={prevMonth}
                                    className="px-2 py-1 rounded hover:bg-gray-200"
                                    type="button"
                                >
                                    &lt;
                                </button>
                                <h6 className="font-semibold text-[2.0rem]">
                                    {month + 1}월 {year}
                                </h6>
                                <button
                                    onClick={nextMonth}
                                    className="px-2 py-1 rounded hover:bg-gray-200"
                                    type="button"
                                >
                                    &gt;
                                </button>
                            </section>

                            <section>
                                <section className="grid w-full grid-cols-7 mb-2 text-sm text-center gap-[1.8rem]">
                                    {DAYS.map((day, index) => (
                                        <p
                                            key={day}
                                            className={`${
                                                index === 0
                                                    ? "text-[var(--color-red-500)]"
                                                    : "text-[var(--color-gray-1000)]"
                                            } w-[2.8rem] place-self-center`}
                                        >
                                            {day}
                                        </p>
                                    ))}
                                </section>

                                <section className="grid grid-cols-7 gap-[1.8rem]">
                                    {Array(firstDay).fill(null).map((_, idx) => (
                                        <div key={"empty-" + idx} />
                                    ))}

                                    {Array(daysInMonth).fill(null).map((_, idx) => {
                                        const day = idx + 1;
                                        const today = new Date();
                                        const isToday =
                                            day === today.getDate() &&
                                            month === today.getMonth() &&
                                            year === today.getFullYear();

                                        return (
                                            <motion.button
                                                key={day}
                                                type="button"
                                                onClick={() => handleDateClick(day)}
                                                className={`text-center py-1 hover:bg-[var(--color-gray-200)] transition-colors w-[2.8rem] h-[2.8rem] rounded-full ${
                                                    isToday
                                                        ? "bg-[var(--color-blue-1000)] text-white"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {day}
                                            </motion.button>
                                        );
                                    })}
                                </section>
                            </section>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
};

const MultiSelect = ({ data, onChange }: MultiSelectProps) => {
    const [ list, setList ] = useState( data );

    useEffect(() => {
        onChange( list );
    }, [ list ])

    return (
        <section className="flex gap-[0.8rem]">
            { list.map((e: any, i: number) =>
                <motion.button
                    key={ i }
                    className={`p-[1.6rem] rounded-[0.8rem] ${ e.state ? "bg-[var(--color-blue-100)] text-[var(--color-blue-1000)]" : "bg-[var(--color-gray-100)]" }`}
                    onClick={() => {
                        setList(prev =>
                            prev.map( item => item.id === e.id ? { ...item, state: !item.state } : item )
                        );
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    { e.title }
                </motion.button>
            )}
        </section>
    )
};

const FileUpload = ({ placeholder = "파일을 여기에 드래그하거나", buttonText = "파일 선택", onChange }: FileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (file: File) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onChange?.(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: any) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    return (
        <section
            className={`relative w-full h-64 border rounded-lg flex items-center justify-center ${
                isDragging ? "border-blue-400 bg-blue-50" : "border-[var(--color-gray-200)] bg-white"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {preview ? (
                <img
                    src={preview}
                    alt="preview"
                    className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
                />
            ) : (
                <div className="flex flex-col items-center gap-[0.8rem] text-center">
                    <p className="text-gray-500">{placeholder}</p>
                    <button
                        type="button"
                        className="h-[4.2rem] px-[1.2rem] text-black bg-[var(--color-gray-200)] rounded-[0.6rem]"
                        onClick={() => inputRef.current?.click()}
                    >
                        {buttonText}
                    </button>
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleInputChange}
            />
        </section>
    );
};

const Tab = ({ list, type = "button", className, preventTargetIdx = 999, preventMsg = "제한 설정 됨", defaultSelect = 0, onClick }: TabComponentProps) => {
    const [ menuState, setMenuState ] = useState( defaultSelect );

    const { setToast } = useToastStore();
    const { pushToUrl } = useNavigate();
    
    useEffect(() => {
        setMenuState( defaultSelect );
        onClick( defaultSelect )
    }, [ defaultSelect ])
    
    return (
        <section className={`${ className?.container ? className.container : "" }`}>
            { list && list.map(( e ,i ) =>
                <section key={i}>
                    <motion.button
                        key={ i }
                        value={ e.value }
                        // className={ `${ e.value === menuState ? `${ className?.active }` : `${ className?.normal }` } ${ className?.button }` }
                        className="px-[2.0rem] py-[1.2rem]"
                        onClick={() => {
                            if ( preventTargetIdx !== 999 && preventTargetIdx !== i ) {
                                setToast({ msg: preventMsg })

                                return;
                            }

                            if ( type === "button" ) {
                                setMenuState( e.value );
                                onClick( e.value );
                            } else {
                                pushToUrl( e.route ?? "/" );
                            }
                        }}
                    >
                        { e.title }
                    </motion.button>

                    { e.value === menuState ?
                        <motion.p
                            layout
                            key={"tab"}
                            id="underline"
                            layoutId="underline"
                            className="h-[0.2rem] w-full bg-black"
                        />
                    : "" }
                </section>
            )}
        </section>
    )
}

const Button = ({ children, className, type = "button", disabled = false, ref, test, onClick }: ButtonProps) => {
    const [ripples, setRipples] = useState<
        { x: number; y: number; id: number }[]
    >([]);

    // const ButtonRef = useRef<any>(null);

    const handleClick = (e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        // 외부 onClick 실행
        if ( onClick ) {
            onClick(e);
        }

        // 일정 시간 뒤 ripple 제거
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
    };

    return (
        <motion.button
            type={ type }
            ref={ ref }
            onClick={ handleClick }
            className={`${ className } relative`}
            disabled={ disabled }
            whileTap={{ 
                scale: 0.95 
            }}
            data-testid={`${ test ? test : "" }`}
        >
            {/* Ripple 효과 */}
            {/* {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 10, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        top: ripple.y,
                        left: ripple.x,
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(20, 20, 20, 1) 0%, rgba(221, 79, 27, 0) 80%)",
                        width: `${ ButtonRef.current.offsetWidth / 2 }px`,
                        height: `${ ButtonRef.current.offsetWidth / 2 }px`,
                        pointerEvents: "none",
                    }}
                />
            ))} */}
            {/* Ripple 효과 END */}
            
            { children }
        </motion.button>
    )
}

const UI = {
    Select,
    Switch,
    Calendar,
    Input,
    Radio,
    MultiSelect,
    CheckBox,
    FileUpload,
    Tab,
    Button
}

export default UI