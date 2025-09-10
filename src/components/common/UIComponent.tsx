"use client"

import { AnimatePresence, motion, Reorder, useDragControls } from 'motion/react';
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import {
    ButtonProps,
    CalendarModalProps,
    CheckBoxProps,
    DropDownProps,
    FileUploadProps,
    FilterProps,
    InputProps,
    MiniModalProps,
    MultiSelectProps,
    NumberInputProps,
    PaginationProps,
    RadioProps,
    SelectProps,
    SwitchProps,
    TabComponentProps,
    TextAreaProps
} from '@/types/ui.type';
import useNavigate from "@/hooks/common/useNavigate";
import { useToastStore } from "@/stores/useToastStore";
import IconComponent from '@/components/common/IconComponent';
import { highlightCode } from '@/utils/highlight';

const CheckBox = ({ defaultState = false, className, checked, guide, desc_no, preventClick = false, onChange }: CheckBoxProps) => {
    const [ currentState, setCurrentState ] = useState<boolean>( defaultState );

    useEffect(() => {
        setCurrentState( defaultState )
    }, [ defaultState ])

    return (
        <div className={`flex items-center justify-center ${ className?.container ? className.container : "" }`}>
            <UI.Button
                className={`flex items-center gap-[0.4rem] ${ className?.button ? className.button : "" }`}
                onClick={() => {
                    onChange( !currentState )
                    
                    if ( !preventClick ) {
                        setCurrentState( !currentState )
                    }
                }}
            >
                <div
                    className={`w-[1.8rem] h-[1.8rem] rounded-[0.4rem] m-[0.4rem] relative transition-colors ${ currentState ? "bg-[var(--color-blue-1000)]" : "bg-transparent border border-[var(--color-gray-200)] hover:bg-[var(--color-gray-200)]" }`}
                    data-description={ desc_no }
                >
                    <p className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] font-bold text-[1.2rem] pointer-events-none ${ currentState ? "text-white" : "hidden" }`}>✓</p>
                </div>
                { guide ? <p>{ guide }</p> : "" }
            </UI.Button>
        </div>
    )
}

const Radio = ({ list, defaultValue = 0, className, desc_no, onChange }: RadioProps) => {
    const [ currentSelected, setCurrentSelected ] = useState<number>( defaultValue );
    
    const DEFAULT_LIST = [
        {
            title: "사용함",
            value: 1,
        },
        {
            title: "사용 안함",
            value: 0,
        },
    ]
    return (
        <section
            className={`flex gap-[1.2rem] ${ className?.container ?? "" }`}
            data-description={ desc_no }
        >
            {( list ?? DEFAULT_LIST ).map((e, i) =>
                <motion.button
                    key={i}
                    type="button"
                    className={`item flex items-center gap-[0.8rem] p-[0.4rem] hover:bg-[var(--color-gray-200)] rounded-[0.8rem] transition-colors ${ className?.button ?? "" }`}
                    onClick={() => {
                        setCurrentSelected( e.value );
                        onChange( e.value );
                    }}
                    whileTap={{ scale: 0.9 }}
                    data-description={ desc_no }
                >
                    <div className={`w-[1.8rem] h-[1.8rem] relative rounded-full ${ currentSelected === e.value ? "bg-[var(--color-blue-1000)]" : "border border-[var(--color-gray-400)]" }`}>
                        <div className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-full w-[0.6rem] h-[0.6rem] ${ currentSelected === e.value ? "bg-white" : "bg-transparent" }`} />
                    </div>
                    <p className="font-medium pointer-events-none">{ e.title }</p>
                </motion.button>
            )}
        </section>
    )
}

const Switch = ({ states, onChange, desc_no }: SwitchProps) => {
    return (
        <motion.section
            className={`switch w-[calc(1.6rem*2+0.4rem)] h-[2.0rem] p-[0.2rem] rounded-full flex cursor-pointer ${
                states ? "justify-end" : "justify-start"
            }`}
            animate={{
                background: states ? "var(--color-blue-1000)" : "var(--color-gray-400)",
            }}
            onClick={() => onChange(!states)}
            data-description={ desc_no }
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
    );
};

const Input = forwardRef<{ reset: () => void }, InputProps>(({
    disabled = false,
    name = "input",
    desc_no,
    defaultValue,
    icon = false,
    type = "text",
    placeholder = "placeholder 지정이 필요해요",
    guide,
    className,
    autoComplete = "on",
    onChange,
    onInput,
    onBlur
}, ref) => {
    const [value, setValue] = useState(defaultValue || "");

    // 사용법
    // const inputRef = useRef<{ reset: () => void }>(null); <- 선언
    // inputRef.current?.reset(); <- 함수 실행
    useImperativeHandle(ref, () => ({
        reset() {
            setValue("");
            if (onChange) {
                onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
            }
        }
    }));

    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue);
            if (onChange) {
                onChange({ target: { value: defaultValue } } as React.ChangeEvent<HTMLInputElement>);
            }
        }
    }, [defaultValue]);

    return (
        <section
            className={`flex items-center gap-[0.8rem] px-[1.6rem] max-h-[var(--input-height)] h-full border border-[var(--color-gray-200)] hover:border-[var(--color-gray-500)] focus:border-[var(--color-gray-500)] transition-colors rounded-[0.8rem] relative ${className ? className : ""}`}
            data-description={desc_no}
        >
            { guide && <p className="absolute top-[50%] right-[1.6rem] transform -translate-y-1/2">{guide}</p> }
            <input
                name={name}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                onInput={onInput}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange?.(e);
                }}
                onBlur={onBlur}
                value={value}
                autoComplete={autoComplete}
                data-description={desc_no}
                className='w-full'
            />
            {icon && <IconComponent type="colored-lens" alt='돋보기' />}
        </section>
    );
});

Input.displayName = "Input";

const InputBackup = ({ disabled = false, name = "input", desc_no, defaultValue, icon = false, type = "text", placeholder = "placeholder 지정이 필요해요", guide, className, autoComplete = "on", onChange, onInput, onBlur }: InputProps) => {
    // const InputRef = useRef(defaultValue);
    useEffect(() => {
        if ( defaultValue ) {
            onChange({ target: { value: defaultValue }});
        }
    }, [ defaultValue ])
    return (
        <section
            className={`flex items-center gap-[0.8rem] px-[1.6rem] max-h-[var(--input-height)] h-full border border-[var(--color-gray-200)] hover:border-[var(--color-gray-500)] focus:border-[var(--color-gray-500)] transition-colors rounded-[0.8rem] relative ${ className ? className : "" }`}
            data-description={ desc_no }
        >
            { guide && <p className="absolute top-[50%] right-[1.6rem] transform translate-y-[-50%] translate-x-0">{ guide }</p> }
            { icon && <IconComponent type="colored-lens" alt='돋보기' /> }
            <input
                name={ name }
                disabled={ disabled }
                type={ type }
                placeholder={ placeholder }
                onInput={ onInput }
                onChange={ onChange }
                onBlur={ onBlur }
                defaultValue={ defaultValue }
                autoComplete={ autoComplete }
				data-description={ desc_no }
                className='w-full'
            />
        </section>
    )
}

const NumberInput = ({
	disabled = false,
	name = "number-input",
	desc_no,
	defaultValue = 0,
	icon = false,
	placeholder = "숫자를 입력하세요",
	guide,
	className,
	autoComplete = "off",
	onChange,
	onInput,
	onBlur,
	max = 1_000_000_000, // 기본 상한 10억
}: NumberInputProps) => {
    const inputValueRef = useRef<HTMLInputElement>( null );

	const handleChange = (e: any) => {
		let value = e.target.value;

		// 숫자만 허용
		value = value.replace(/[^0-9]/g, "");

		// 빈 값 처리
		if (value === "") value = "0";

		// 정수 변환
		let numValue = parseInt(value, 10);

		// 음수 방지
		if (numValue < 0) numValue = 0;

		// 상한 제한
		if (numValue > max) numValue = max;

		// input 값 강제 업데이트
		e.target.value = numValue.toString();

		onChange?.({ target: { value: numValue.toString() } });
	};

	const handleBlur = (e: any) => {
		let value = parseInt(e.target.value, 10);

		// blur 시점에서도 최소 0 보장
		if (isNaN(value) || value < 0) {
			value = 0;
			e.target.value = "0";
			onChange?.({ target: { value: "0" } });
		}

		onBlur?.(e);
	};

    useEffect(() => {
		if (defaultValue !== undefined && defaultValue !== null) {
			onChange?.({ target: { value: defaultValue.toString() } });
		}

        console.log("defaultValue : ", defaultValue)
        if ( inputValueRef.current ) {
            inputValueRef.current.value = `${ defaultValue }`
        }
	}, [defaultValue]);

	return (
		<section
			className={`flex items-center gap-[0.8rem] px-[1.6rem] border border-[var(--color-gray-200)] hover:border-[var(--color-blue-1000)] focus:border-[var(--color-blue-1000)] transition-colors rounded-[0.8rem] relative ${className ? className : ""}`}
			data-description={desc_no}
		>
			{guide && (
				<p className="absolute top-[50%] right-[1.6rem] transform translate-y-[-50%] translate-x-0">
					{guide}
				</p>
			)}
			{icon && <IconComponent type="colored-lens" alt="돋보기" />}
			<input
                ref={ inputValueRef }
				type="text"
				inputMode="numeric" // 모바일 키패드 숫자 전용
				name={ name }
				disabled={ disabled }
				placeholder={ placeholder }
				onInput={ onInput }
				onChange={ handleChange }
				onBlur={ handleBlur }
                // value={ `${ defaultValue }` }
				defaultValue={ defaultValue }
				autoComplete={ autoComplete }
				data-description={ desc_no }
			/>
		</section>
	);
};

const TextArea = ({
    onChange,
    maxLength,
    placeholder = "내용을 입력하세요.",
    className = "",
    value = "",
    desc_no,
}: TextAreaProps) => {
    const [ currentValue, setCurrentValue ] = useState( value );
    return (
        <div
            className="relative w-full"
            data-description={ desc_no }
        >
            <textarea
                value={currentValue}
                onChange={(e) => {
                    setCurrentValue(e.target.value);
                    onChange(e);
                }}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`w-full p-2 border rounded resize-none tab-size-[4] ${className}`}
            />
            {maxLength && (
                <span className="absolute text-[var(--color-gray-600)] bottom-[1.6rem] right-[1.6rem]">
                    {value.length}/{maxLength}자
                </span>
            )}
        </div>
    );
};

const Select = ({ list = [], defaultValue, className, desc_no, onChange }: SelectProps) => {
    const INIT_VALUE = list[0];
    const containerRef = useRef<HTMLElement>( null );
    const buttonRef = useRef<HTMLButtonElement>( null );

    const [ showMenu, setShowMenu ] = useState( false );
    const [ currentValue, setCurrentValue ] = useState( defaultValue ?? INIT_VALUE?.value );
    const [ positionStyle, setPositionStyle ] = useState<{ left?: number; right?: number; top?: number; bottom?: number }>({ left: 0 });

    const detectOutsideClick = (e: MouseEvent) => {
        if ( containerRef.current && !containerRef.current.contains(e.target as Node) ) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if ( showMenu ) {
            document.addEventListener("click", detectOutsideClick);

            if ( buttonRef.current ) {
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
    }, [ showMenu ]);

    return (
        <section
            ref={ containerRef }
            className={`switch rounded-[0.8rem] relative ${
                className?.container ? className.container : ""
            }`}
        >
            <button
                ref={ buttonRef }
                className={`${
                    className?.button ? className.button : ""
                    // className?.button ? className.button : "h-full"
                } min-w-[12.8rem] flex justify-between items-center h-[var(--input-height)] text-left px-[1.2rem] rounded-[0.8rem] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition-colors`}
                onClick={() => setShowMenu( !showMenu )}
                data-description={ desc_no }
            >
                {/* <p className='pointer-events-none'>{list.find((e) => e.value === currentValue)?.title}</p> */}
                <p className='pointer-events-none'>{list.find((e) => e.value === currentValue)?.title}</p>
                <IconComponent
                    type="colored-arrow-below"
                    alt="더보기"
                    className={`${ showMenu ? "rotate-180" : ""} transition-transform`}
                />
            </button>

            <AnimatePresence>
                { showMenu && (
                    <motion.section
                        className="absolute bg-white flex flex-col gap-[0.4rem] shadow-[var(--shadow-normal)] p-[0.4rem] rounded-[1.2rem] z-1 overflow-hidden"
                        style={{
                            width: buttonRef.current?.offsetWidth,
                            ...positionStyle
                        }}
                        initial={{ opacity: 0, transform: "scale(0.99)", height: "0px" }}
                        animate={{ opacity: 1, transform: "scale(1)", height: "auto" }}
                        exit={{ opacity: 0, transform: "scale(0.99)", height: "0px" }}
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
                                    className={`text-left hover:bg-[var(--color-gray-200)] text-[var(--color-gray-700)] rounded-[1.2rem] p-[1.2rem] transition-colors ${
                                        e.value === currentValue
                                            ? "bg-[var(--color-gray-100)]"
                                            : "bg-transparent"
                                    }`}
                                    onClick={() => {
                                        console.log("click 발생")
                                        setCurrentValue(e.value);
                                        onChange(e.value);
                                        setShowMenu(false);
                                    }}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        delay: 0.03 * (i + 1),
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

const Filter = forwardRef<{ reset: () => void }, FilterProps>(
    ({ list = [], defaultValue, className, style, desc_no, elementRef, onChange, onConfirm, onCancel }, ref) => {
        const [ showMenu, setShowMenu ] = useState(false);
        const [ currentIndex, setCurrentIndex ] = useState(0);
        const [ containerHeight, setContainerHeight ] = useState<number>(0);
        const [ initList, setInitList ] = useState<{ title: string, state: boolean, value?: any }[]>([]);
        const [ currentList, setCurrentList ] = useState<{ title: string; state: boolean; value?: any }[]>(list);
        const [ positionStyle, setPositionStyle ] = useState<{ left?: number; right?: number; top?: number; bottom?: number }>({ left: 0 });

        const { setToast } = useToastStore();

        const containerRef = useRef<HTMLElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);

        const allItems = list;
        const activeItems = currentList?.filter(e => e.state);

        const close = () => {
            setCurrentList( initList );
            setShowMenu( false );
        }

        const detectOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                close();
            }
        };

        useImperativeHandle(ref, () => ({
            reset: () => {
                setCurrentList(list.map(item => ({ ...item, state: true })));
            }
        }));

        useEffect(() => {
            if (showMenu) {
                document.addEventListener("click", detectOutsideClick);

                if (buttonRef.current) {
                    const rect = buttonRef.current.getBoundingClientRect();
                    const dropdownWidth = buttonRef.current.offsetWidth;
                    const dropdownHeight = 200;
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;

                    if (rect.left + dropdownWidth > viewportWidth) {
                        setPositionStyle({ right: 0 });
                    } else {
                        setPositionStyle({ left: 0 });
                    }

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
            onChange?.(currentList);
            setCurrentIndex(0);

            if (!activeItems?.length) return;

            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % activeItems.length);
            }, 2000);

            return () => clearInterval(interval);
        }, [currentList]);

        useEffect(() => {
            setContainerHeight(elementRef?.current?.offsetHeight ?? 0);
        }, [showMenu]);

        useEffect(() => {
            setInitList( list );
        }, [])

        return (
            <motion.section
                ref={containerRef}
                className={`switch rounded-[0.8rem] relative`}
            >
                <motion.button
                    ref={buttonRef}
                    layout="size"
                    className={`${className?.button ?? "h-full"} min-w-[19.0rem] flex justify-between items-center text-left px-[1.2rem] rounded-[0.8rem] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition-colors`}
                    data-description={desc_no}
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {activeItems?.length > 0 ? (
                        <div className="overflow-hidden h-[1.6rem] relative flex-1 flex items-center">
                            <AnimatePresence mode="wait">
                                {activeItems.map((item, i) =>
                                    i === currentIndex ? (
                                        <motion.p
                                            key={item.title}
                                            className="w-full pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", mass: 0.1, stiffness: 100, damping: 10 }}
                                        >
                                            {item.title}
                                        </motion.p>
                                    ) : null
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.p
                            className="pointer-events-none"
                            layout
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ type: "spring", mass: 0.1, stiffness: 100, damping: 10 }}
                        >
                            항목을 선택해주세요
                        </motion.p>
                    )}

                    {activeItems.length ? (
                        <p>{activeItems.length === allItems.length ? ` ・ 전체` : ` ・ ${activeItems.length}개`}</p>
                    ) : ""}

                    <IconComponent
                        type="colored-arrow-below"
                        alt="더보기"
                        className={`${showMenu ? "rotate-180" : ""} transition-transform`}
                    />
                </motion.button>

                <AnimatePresence>
                    {showMenu && (
                        <motion.section
                            className={`absolute bg-white overflow-y-auto scrollbar-hide top-[calc(4.2rem+0.8rem)] flex flex-col gap-[0.4rem] shadow-[var(--shadow-normal)] p-[0.4rem] rounded-[1.2rem] min-w-[26.0rem] z-1 ${className?.container ?? ""}`}
                            style={{
                                width: buttonRef.current?.offsetWidth,
                                ...style,
                                ...positionStyle
                            }}
                            initial={{ opacity: 0, transform: "scale(0.99)", height: `0px` }}
                            animate={{
                                opacity: 1,
                                transform: "scale(1)",
                                height: ref
                                    ? (containerHeight > currentList.length * (26 + 38 + 16 + 24)
                                        ? `auto`
                                        : `calc(${containerHeight}px - 4.2rem - (1.6rem * 2))`)
                                    : "auto"
                            }}
                            exit={{ opacity: 0, transform: "scale(0.99)", height: `0px` }}
                            transition={{
                                delay: 0,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10
                            }}
                        >
                            <AnimatePresence>
                                <motion.section
                                    key={`mini-modal-header`}
                                    className={`text-left text-[var(--color-gray-700)] rounded-[1.2rem] transition-colors`}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        delay: 0.1 * 1,
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10
                                    }}
                                >
                                    <UI.Button
                                        onClick={() => {
                                            setCurrentList(prev =>
                                                prev.map(items => ({
                                                    ...items,
                                                    state: true
                                                    // state: currentList.some(e => e.state === true) ? false : true
                                                }))
                                            );
                                        }}
                                        className="text-right w-full py-[1.2rem] underline"
                                    >
                                        전체선택
                                    </UI.Button>
                                </motion.section>

                                { currentList.map((item, key) => (
                                    <motion.div
                                        key={`${item}-${key}`}
                                        initial={{ opacity: 0, transform: "scale(0.8)" }}
                                        animate={{ opacity: 1, transform: "scale(1)" }}
                                        exit={{ opacity: 0, transform: "scale(0.8)" }}
                                        transition={{
                                            delay: 0.1 * (key + 1),
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 100,
                                            damping: 10
                                        }}
                                    >
                                        <UI.CheckBox
                                            defaultState={item.state}
                                            checked={item.state}
                                            preventClick={ currentList.filter(it => it.state).length === 1 }
                                            onChange={(e) => {
                                                // true 상태인 항목 수
                                                const activeCount = currentList.filter(it => it.state).length;

                                                // 마지막 하나를 false로 바꾸려는 경우
                                                if ( activeCount === 1 && item.state === true && e === false ) {
                                                    setToast({ msg: "하나 이상 선택하세요.", time: 2 })
                                                    console.log("하나 이상 선택하세요.");
                                                    
                                                    return; // 상태 업데이트 막기
                                                }

                                                // 정상 업데이트
                                                setCurrentList(prev =>
                                                    prev.map(items =>
                                                        items.title === item.title
                                                            ? { ...items, state: e }
                                                            : items
                                                    )
                                                );
                                            }}
                                            guide={item.title}
                                            className={{ button: "justify-start flex-1 w-full" }}
                                        />
                                    </motion.div>
                                ))}

                                <motion.section
                                    key={`mini-modal-footer`}
                                    className={`text-left flex flex-1 justify-end gap-[0.8rem] text-[var(--color-gray-700)] mt-[2.4rem] rounded-[1.2rem] transition-colors`}
                                    initial={{ opacity: 0, transform: "scale(0.8)" }}
                                    animate={{ opacity: 1, transform: "scale(1)" }}
                                    exit={{ opacity: 0, transform: "scale(0.8)" }}
                                    transition={{
                                        delay: 0.1 * 3,
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 100,
                                        damping: 10
                                    }}
                                >
                                    <UI.Button
                                        className={`bg-[var(--color-gray-200)] font-medium whitespace-nowrap rounded-[0.6rem] px-[1.6rem] h-[4.2rem]`}
                                        onClick={() => {
                                            close();
                                            
                                            onCancel?.( initList );
                                        }}
                                    >
                                        닫기
                                    </UI.Button>

                                    <UI.Button
                                        className={`text-white bg-[var(--color-blue-1000)] font-medium whitespace-nowrap rounded-[0.6rem] w-[12.8rem] h-[4.2rem]`}
                                        onClick={(e) => {
                                            setShowMenu(false);
                                            
                                            onConfirm?.( currentList );
                                        }}
                                    >
                                        완료
                                    </UI.Button>
                                </motion.section>
                            </AnimatePresence>
                        </motion.section>
                    )}
                </AnimatePresence>
            </motion.section>
        );
    }
);

Filter.displayName = "Filter";

const MiniModal = ({ element, className, defaultValue, desc_no, onConfirm, onCancel, onChange }: MiniModalProps) => {
    const containerRef = useRef<HTMLElement>( null );
    const buttonRef = useRef<HTMLButtonElement>( null );

    const [ showMenu, setShowMenu ] = useState( false );
    const [ currentValue, setCurrentValue ] = useState( "test" );
    const [ positionStyle, setPositionStyle ] = useState<{ left?: number; right?: number; top?: number; bottom?: number }>({ left: 0 });

    const detectOutsideClick = (e: MouseEvent) => {
        if ( containerRef.current && !containerRef.current.contains(e.target as Node) ) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if ( showMenu ) {
            document.addEventListener("click", detectOutsideClick);

            if ( buttonRef.current ) {
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
    }, [ showMenu ]);

    useEffect(() => {
        onChange( currentValue );
    }, [ currentValue ]);

    return (
        <section
            ref={ containerRef }
            // className={`switch rounded-[0.8rem] relative p-[2.0rem] ${ className?.container ? className.container : "" }`}
            className={`switch rounded-[0.8rem] relative`}
            data-description={ desc_no }
        >
            <button
                ref={buttonRef}
                className={`${
                    className?.button ? className.button : "h-full"
                } min-w-[12.8rem] flex justify-between items-center text-left px-[1.2rem] rounded-[0.8rem] bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition-colors`}
                onClick={() => setShowMenu(!showMenu)}
            >
                <p>{ defaultValue }</p>
                <IconComponent
                    type="colored-arrow-below"
                    alt="더보기"
                    className={`${showMenu ? "rotate-180" : ""} transition-transform`}
                />
            </button>

            <AnimatePresence>
                {showMenu && (
                    <motion.section
                        className={`absolute bg-white flex flex-col gap-[0.4rem] border border-[var(--color-gray-200)] rounded-[1.2rem] z-1 w-[26.0rem] ${ className?.container ? className.container : "" }`}
                        style={{
                            // width: buttonRef.current?.offsetWidth,
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
                            <motion.section
                                key={`mini-modal-header`}
                                className={`text-left text-[var(--color-gray-700)] rounded-[1.2rem] transition-colors`}
                                initial={{ opacity: 0, transform: "scale(0.8)" }}
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                exit={{ opacity: 0, transform: "scale(0.8)" }}
                                transition={{
                                    delay: 0.1 * 1,
                                    type: "spring",
                                    mass: 0.1,
                                    stiffness: 100,
                                    damping: 10
                                }}
                            >
                                { element.header }
                            </motion.section>

                            <motion.section
                                key={`mini-modal-body`}
                                className={`text-left text-[var(--color-gray-700)] rounded-[1.2rem] transition-colors`}
                                initial={{ opacity: 0, transform: "scale(0.8)" }}
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                exit={{ opacity: 0, transform: "scale(0.8)" }}
                                transition={{
                                    delay: 0.1 * 2,
                                    type: "spring",
                                    mass: 0.1,
                                    stiffness: 100,
                                    damping: 10
                                }}
                            >
                                { element.body }
                            </motion.section>

                            <motion.section
                                key={`mini-modal-footer`}
                                className={`text-left flex flex-1 justify-end gap-[0.4rem] text-[var(--color-gray-700)] mt-[2.4rem] rounded-[1.2rem] transition-colors`}
                                initial={{ opacity: 0, transform: "scale(0.8)" }}
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                exit={{ opacity: 0, transform: "scale(0.8)" }}
                                transition={{
                                    delay: 0.1 * 3,
                                    type: "spring",
                                    mass: 0.1,
                                    stiffness: 100,
                                    damping: 10
                                }}
                            >
                                <UI.Button
                                    className={`bg-[var(--color-gray-200)] font-medium whitespace-nowrap rounded-[0.6rem] px-[1.6rem] h-[4.2rem]`}
                                    onClick={(e) => {
                                        onCancel(e);
                                    }}
                                >
                                    닫기
                                </UI.Button>

                                <UI.Button
                                    className={`text-white bg-[var(--color-blue-1000)] font-medium whitespace-nowrap rounded-[0.6rem] w-[12.8rem] h-[4.2rem]`}
                                    onClick={(e) => {
                                        onConfirm(e);
                                    }}
                                >
                                    완료
                                </UI.Button>
                                { element.footer }
                            </motion.section>
                        </AnimatePresence>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
};

const DropDown = ({ children, className, list, height = "var(--input-height)", desc_no, prevent=false }: DropDownProps) => {
    const containerRef = useRef<HTMLElement>(null);

    const [ isShowList, setIsShowList ] = useState( false );
    const [ positionStyle, setPositionStyle ] = useState<{ left?: number; right?: number; top?: number; bottom?: number }>({ left: 0 });

    const detectOutsideClick = (e: MouseEvent) => {
        if ( containerRef.current && !containerRef.current.contains(e.target as Node) ) {
            setIsShowList(false);
        }
    };

    useEffect(() => {
        if ( isShowList ) {
            if ( containerRef.current ) {
                const rect = containerRef.current.getBoundingClientRect();

                const dropdownWidth = containerRef.current.offsetWidth;
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

            document.addEventListener("click", detectOutsideClick);
        }
        return () => {
            document.removeEventListener("click", detectOutsideClick);
        };
    }, [isShowList]);

    return (
        <AnimatePresence>
            <section
                ref={ containerRef }
                className={`${ className?.container ?? "" } relative cursor-pointer`}
                onClick={(e) => {
                    if ( prevent ) {
                        e.preventDefault();
                    }
                    setIsShowList( !isShowList );
                }}
                data-description={ desc_no }
            >
                { children }

                { isShowList && (
                    <motion.section
                        className={`${ className?.inner ?? "" } absolute z-[100] flex flex-col cursor-pointer whitespace-nowrap rounded-2xl p-[0.4rem] bg-white border border-[var(--color-gray-100)]`}
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
                        style={{
                            ...positionStyle
                        }}
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
                                        value={ e.value }
                                        className={`${ e.className } item px-[1.6rem] py-[1.3rem]`}
                                        onClick={() => {
                                            e.onClick?.();
                                        }}
                                        data-description={ desc_no }
                                    >
                                        { e.title }
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

const Calendar = ({
    className = "bg-[var(--color-gray-100)] text-[var(--color-gray-1000)] rounded-[0.8rem] px-[1.2rem] h-[4.2rem]",
    icon = false,
    desc_no,
    onClose,
    onDateSelect,
    limitMonths = 12, // 추가
    limitMessage = "더 이상 이전 달을 조회할 수 없습니다.", // 추가
}: CalendarModalProps) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ selectedDate, setSelectedDate ] = useState<Date>();
    const [ positionStyle, setPositionStyle ] = useState<{ left?: number; right?: number }>({ left: 0 });

    const { setToast } = useToastStore();

    const containerRef = useRef<HTMLElement>( null );
    const calendarRef = useRef<HTMLButtonElement>( null );

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
        const SELECTED_DATE = new Date(Date.UTC(year, month, day));
        const CONVERT = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        setSelectedDate(SELECTED_DATE);
        setModalOpen(false);
        if (onDateSelect) onDateSelect(CONVERT);
    };

    // 이전 달 이동
    const prevMonth = () => {
        if (limitMonths) {
            const today = new Date();
            const limitDate = new Date(today.getFullYear(), today.getMonth() - limitMonths, 1);

            // 현재 달이 limitDate 보다 이전으로 가려 할 경우 막기
            if (new Date(year, month - 1, 1) < limitDate) {
                console.log(limitMessage);
                setToast({ msg: `조회 가능한 최대 기간은 ${ limitMonths }개월입니다.`, time: 2 })
                return;
            }
        }
        setCurrentDate(new Date(year, month - 1, 1));
    };

    // 다음 달 이동
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const detectOutsideClick = (e: MouseEvent) => {
        if ( containerRef.current && !containerRef.current.contains(e.target as Node) ) {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        if ( modalOpen ) {
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
    }, [ modalOpen ]);

    return (
        <section
            ref={ containerRef }
            className="relative calendar"
        >
            <motion.button
                ref={ calendarRef }
                onClick={() => setModalOpen( !modalOpen )}
                className={`${ className } ${
                    icon ? "flex gap-[2.8rem] items-center justify-between" : ""
                } hover:bg-[var(--color-gray-200)] transition-colors`}
                whileTap={{ scale: 0.95 }}
                data-description={ desc_no }
            >
                {(selectedDate || currentDate).toISOString().split("T")[0]}
                { icon && <IconComponent type="colored-calendar" alt="캘린더" /> }
            </motion.button>

            <AnimatePresence>
                { modalOpen && (
                    <motion.section
                        className="absolute flex items-center justify-center z-[1000] bg-white rounded-[1.2rem] shadow-[var(--shadow-normal)] overflow-hidden"
                        onClick={() => {
                            const VALUE = selectedDate
                                ? selectedDate.toLocaleDateString("ko-KR")
                                : currentDate.toLocaleDateString("ko-KR")
                                
                            // onClose( VALUE );
                        }}
                        style={{
                            top: (calendarRef.current?.offsetHeight ?? 0) + 4,
                            ...positionStyle,
                        }}
                        initial={{ opacity: 0, transform: "scale(0.99)", height: "0px" }}
                        animate={{ opacity: 1, transform: "scale(1)", height: "auto" }}
                        exit={{ opacity: 0, transform: "scale(0.99)", height: "0px" }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 150,
                            damping: 10,
                        }}
                    >
                        <div
                            className="p-[2.4rem] w-[calc(1.6rem*20)] flex flex-col gap-[2.4rem]"
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

                                        const isSelected =
                                            selectedDate &&
                                            day === selectedDate.getDate() &&
                                            month === selectedDate.getMonth() &&
                                            year === selectedDate.getFullYear();

                                        return (
                                            <motion.button
                                                key={day}
                                                type="button"
                                                onClick={() => handleDateClick(day)}
                                                className={`text-center py-1 hover:bg-[var(--color-gray-200)] transition-colors w-[2.8rem] h-[2.8rem] rounded-full
                                                    ${isSelected // 사용자가 선택
                                                    ? "bg-[var(--color-blue-1000)] text-white" 
                                                    : isToday // 오늘 일 경우
                                                        ? "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]" 
                                                        : ""}`}
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
            // onChange?.(reader.result as string);
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

const Button = ({ children, className, type = "button", disabled = false, ref, test, desc_no, onClick, onPointerDown }: ButtonProps) => {
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
            onPointerDown={ onPointerDown }
            className={`${ className } relative overflow-hidden transition-opacity ${ disabled ? "opacity-[0.5]" : "" }`}
            disabled={ disabled }
            whileTap={{ 
                scale: 0.95 
            }}
            data-testid={`${ test ? test : "" }`}
            data-description={ desc_no }
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

const Pagination = ({ totalCount, pageSize, currentPage, desc_no, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const maxVisible = 5;

    // 현재 페이지 기준으로 보이는 페이지 범위 계산
    const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    const pageNumbers = [];
    
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div
            className="flex items-center justify-center gap-2 mt-4"
            data-description={ desc_no }
        >
            {/* 처음 */}
            {/* <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-[var(--color-gray-300)] rounded disabled:opacity-50"
            >
                처음
            </button> */}

            {/* 이전 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-transparent rounded-full p-[0.4rem] hover:bg-[var(--color-gray-200)] disabled:opacity-50"
            >
                {/* 이전 */}
                <IconComponent type='colored-arrow-below' className='rotate-90' width={24} height={24} alt='이전' />
            </button>

            {/* 페이지 번호 */}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`rounded-full w-[3.2rem] h-[3.2rem] text-[var(--color-gray-1000)] transition-colors ${
                        page === currentPage ? "bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-700)] hover:text-white" : "hover:bg-[var(--color-gray-200)]"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* 다음 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-transparent rounded-full p-[0.4rem] hover:bg-[var(--color-gray-200)] disabled:opacity-50"
            >
                {/* 다음 */}
                <IconComponent type='colored-arrow-below' className='rotate-270' width={24} height={24} alt='이전' />
            </button>

            {/* 끝 */}
            {/* <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-[var(--color-gray-300)] rounded disabled:opacity-50"
            >
                끝
            </button> */}
        </div>
    );
};

type TableProps = {
    className?: string;
    desc_no?: string;
    // className?: {
    //     // container?: string;
    //     // header?: string;
    //     // body?: string;
    //     // row?: string;
    //     // col?: string;
    // };
    children: React.ReactNode;
};

const Table = ({ className, desc_no, children }: TableProps) => {
    return (
        <section
            className={`${className ?? ""}`}
            data-description={ desc_no }
        >
            <section className="table-inner border border-[var(--color-gray-200)] rounded-[0.6rem]">
                {children}
            </section>
        </section>
    );
};

const TableHeader = ({ children, desc_no, className }: { children: React.ReactNode; desc_no?: string; className?: string }) => {
    return (
        <section
            className={`
                ${className ?? ""} 
                grid font-semibold bg-gray-100 border-b border-b-[var(--color-gray-200)] p-[0.4rem]
            `}
            data-description={ desc_no }
        >
            {children}
        </section>
    );
};

const TableBody = ({
  children,
  desc_no,
  className,
  reorder = false,
  values,
  onReorder,
}: {
  children: React.ReactNode;
  desc_no?: string;
  className?: string;
  reorder?: boolean;
  values?: any[];
  onReorder?: (newOrder: any[]) => void;
}) => {
  if (reorder) {
    return (
      <Reorder.Group
        axis="y"
        values={values ?? []}
        onReorder={onReorder ?? (() => {})}
        // onReorder={onReorder ?? (() => {})}
        className={`${className ?? ""} flex flex-col`}
        data-description={desc_no}
      >
        {children}
      </Reorder.Group>
    );
  }

  return (
    <section
      className={`${className ?? ""} flex flex-col`}
      data-description={desc_no}
    >
      {children}
    </section>
  );
};

const TableRow = ({
  children,
  className,
  reorder = false,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  reorder?: boolean;
  value?: any;
}) => {
  const controls = useDragControls();

  if (reorder) {
    return (
      <Reorder.Item
        value={value}
        dragListener={false} // 기본 drag 막기
        dragControls={controls} // handle로만 drag 허용
        className={`
          ${className ?? ""} 
          grid border-b border-b-[var(--color-gray-200)] last:border-b-0 p-[0.4rem]
        `}
      >
        {/* 순서 변경 버튼 (이걸로만 drag 시작) */}
        <button
          onPointerDown={(e) => controls.start(e)}
          className="mr-2 cursor-grab"
        >
          ☰
        </button>
        {children}
      </Reorder.Item>
    );
  }

  return (
    <div
      className={`
        ${className ?? ""} 
        grid border-b border-b-[var(--color-gray-200)] last:border-b-0 p-[0.4rem]
      `}
    >
      {children}
    </div>
  );
};

const TableCell = ({
    children,
    className,
    desc_no,
    onClick,
}: {
    children?: React.ReactNode;
    className?: string;
    desc_no?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
    return (
        <div
            className={`
                ${ typeof children === "string" ? "pointer-events-none" : "" }
                ${ className ? className : "px-[2.0rem] py-[1.3rem]" } 
                flex items-center justify-center flex-1 rounded-[0.8rem]
            `}
            onClick={ onClick }
            data-description={ desc_no }
        >
            { typeof children === "string" ? (
                <p
                    className={`${className ?? ""} flex-1`}
                    data-description={ desc_no }
                >
                    { children }
                </p>
            ) : (
                children
            )}
        </div>
    );
};

const Code = ({ initialContent }: { initialContent: string }) => {
    const [content, setContent] = useState(initialContent);
    const [html, setHtml] = useState(initialContent);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const text = (e.target as HTMLDivElement).innerText;
        setContent(text);

        // 디바운스 초기화
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            setHtml(text);
        }, 2000); // 2초 후 하이라이팅 적용
    };

    return (
        <div
            contentEditable
            className="p-4 font-mono text-white whitespace-pre-wrap bg-gray-900 rounded code-block editable-code"
            dangerouslySetInnerHTML={{ __html: highlightCode(html) }}
            onInput={handleInput}
        />
    );
}

const Empty = ({
    title = "결과가 없습니다",
    desc_no
}: {
    title?: string
    desc_no?: string
}) => {
    return (
        <div
            className='col-span-3 p-[2.0rem] w-full flex items-center justify-center h-[var(--empty-element-height)] bg-[var(--color-gray-100)] rounded-[1.2rem]'
            data-description={ desc_no }
        >
            <p className='pointer-events-none text-center text-[var(--color-gray-500)]'>{ title }</p>
        </div>
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
    Button,
    TextArea,
    Pagination,
    MiniModal,
    DropDown,
    NumberInput,
    Filter,
    Code,
    Empty,
    Table: Object.assign(Table, {
        Header: TableHeader,
        Body: TableBody,
        Row: TableRow,
        Cell: TableCell,
    }),
}

export default UI