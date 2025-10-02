import { AnimatePresence, motion } from "motion/react";
import { ReactNode, ElementType, ComponentPropsWithoutRef, RefAttributes, RefObject, Fragment, useEffect } from "react";
import UI from "../common/UIComponent";

interface SkeletonBaseProps {
    children?: ReactNode;
    target: boolean;
    targetData?: any;
    error?: boolean;
    ref?: RefObject<HTMLElement | null>,
    onError?: () => void;
    className?: {
        container?: string;
        skeleton?: string;
    };
    pointerEvents?: boolean;
    desc_no?: string;
    minWidth?: string;
    minHeight?: string;
    type: "text" | "title" | "item" | "avatar" | "thumbnail" | "containers";
    onExitComplete?: () => void;
}

// 태그에 맞는 속성을 합쳐주는 타입
type SkeletonProps<T extends ElementType> = SkeletonBaseProps & {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof SkeletonBaseProps | "as">;

const SkeletonBase = <T extends ElementType = "div">({
    children,
    target,
    targetData,
    error,
    onError,
    type,
    ref,
    minHeight = "min-h-[2.0rem]",
    minWidth = "min-w-[2.4rem]",
    className,
    desc_no,
    pointerEvents = true,
    onExitComplete,
    as,
    ...rest
}: SkeletonProps<T>) => {
    const Tag = as || "div";

    return (
        <Tag
            key="content"
            {...(rest as any)}
            ref={ ref }
            data-description={ desc_no }
            className={`relative ${ className?.container ?? "" } ${ pointerEvents ? "" : "pointer-events-none" }`}
        >
            { !error ? children : "" }

            <AnimatePresence onExitComplete={onExitComplete} mode="popLayout">
                { !error && !target && (
                    <motion.div
                        key="skeleton"
                        className={`${className?.skeleton ?? ""} ${minWidth} flex w-full ${minHeight} absolute top-0 left-0`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        data-description={ desc_no }
                    >
                        <SkeletonItem type={ type } />
                    </motion.div>
                )}

                {/* 에러 영역 */}
                { error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`${className?.skeleton ?? ""} ${minWidth} h-[auto!important] flex w-full ${minHeight} absolute top-0 left-0 col-span-3`}
                    >
                        <UI.Error onClick={() => onError?.()} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Tag>
    );
};

const SkeletonItem = ({ type }: { type: string }) => (
    <div className="relative w-full overflow-hidden rounded-[0.8rem] bg-[var(--color-gray-100)] skeleton-wrapper">
        <div className="skeleton-inner">
            <div className={`skeleton ${type} animation glowing-dark`} />
        </div>
    </div>
);

// 특정 태그 버전 제공
const Skeleton = Object.assign(SkeletonBase, {
    Article: (props: Omit<SkeletonProps<"article">, "as">) => (
        <SkeletonBase {...props} as="article" />
    ),
    Section: (props: Omit<SkeletonProps<"section">, "as">) => (
        <SkeletonBase {...props} as="section" />
    ),
    Header: (props: Omit<SkeletonProps<"header">, "as">) => (
        <SkeletonBase {...props} as="header" />
    ),
    Footer: (props: Omit<SkeletonProps<"footer">, "as">) => (
        <SkeletonBase {...props} as="footer" />
    ),
    Main: (props: Omit<SkeletonProps<"main">, "as">) => (
        <SkeletonBase {...props} as="main" />
    ),
    Aside: (props: Omit<SkeletonProps<"aside">, "as">) => (
        <SkeletonBase {...props} as="aside" />
    ),
    Nav: (props: Omit<SkeletonProps<"nav">, "as">) => (
        <SkeletonBase {...props} as="nav" />
    ),
    Ul: (props: Omit<SkeletonProps<"ul">, "as">) => (
        <SkeletonBase {...props} as="ul" />
    ),
    Li: (props: Omit<SkeletonProps<"li">, "as">) => (
        <SkeletonBase {...props} as="li" />
    ),
    Span: (props: Omit<SkeletonProps<"span">, "as">) => (
        <SkeletonBase {...props} as="span" />
    ),
    Div: (props: Omit<SkeletonProps<"div">, "as">) => (
        <SkeletonBase {...props} as="div" />
    ),
});

export default Skeleton;