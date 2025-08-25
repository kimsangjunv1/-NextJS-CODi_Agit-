import { AnimatePresence, motion } from "motion/react";
import { Fragment, ReactNode, useEffect, useState } from "react";

interface SkeletonLoaderComponentProps {
    children?: ReactNode;
    target: boolean;
    className?: string;
    minWidth?: string;
    minHeight?: string;
    type: "text" | "title" | "item" | "avatar" | "thumbnail" | "containers";
    onExitComplete?: () => void;
}

interface SkeletonComponentProps {
    type: string;
}


const Skeleton = ({ children, target, type, minHeight, minWidth, className, onExitComplete }: SkeletonLoaderComponentProps) => {
    const MIN_WIDTH = minWidth ?? "min-w-[2.4rem]";
    const MIN_HEIGHT = minHeight ?? "min-h-[2.0rem]";

    const [ isLoading, setIsLoading ] = useState( false );
    
    useEffect(() => {
        if (!target) {
            setIsLoading(true);
        } else {
            // target이 있을 때 로딩 상태를 2초 후에 false로 변경 (exit 애니메이션 딜레이 주기)
            const timer = setTimeout(() => {
                setIsLoading( false );
            }, 300); // 여기서 딜레이 주기
    
            return () => clearTimeout(timer);
        }
    }, [ target ]);

    return (
        <Fragment>
            <AnimatePresence onExitComplete={ onExitComplete }>
                { !isLoading && target ? (
                    <motion.div
                        key="children"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            ease: [0, 0.25, 0.95, 1],
                        }}
                        className={`${ className }`}
                    >
                        {children}
                    </motion.div>
                ) : (
                    <motion.article
                        key="skeleton"
                        className={`${ className } relative rounded-[0.4rem] overflow-hidden ${ MIN_WIDTH } w-full ${ MIN_HEIGHT }`}
                        exit={{ opacity: 0, transition: { delay: 0.5 } }}
                        animate={{ opacity: 1 }}
                        // initial={{ opacity: 0 }}
                        transition={{
                            duration: 0.1,
                            ease: [0, 0.9, 0.95, 1],
                            // delay: 0.5, // 딜레이 적용
                        }}
                    >
                        <SkeletonItem type={ type }/>
                    </motion.article>
                )};
            </AnimatePresence>
        </Fragment>
    )
}

export const SkeletonItem = ({ type }: { type: string }) => {
    return (
        <section className="absolute top-0 left-0 skeleton-wrapper">
            <section className="skeleton-inner">
                <SkeletonComponent type={ type } />
            </section>
        </section>
    );
};

const SkeletonComponent = ({ type }: SkeletonComponentProps) => {
    const classes = `skeleton ${type} animation glowing-dark`;
    return <div className={classes}></div>;
};

export default Skeleton