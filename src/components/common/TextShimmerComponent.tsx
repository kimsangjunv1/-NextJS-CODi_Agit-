"use client";

import { motion } from 'framer-motion';
import styles from "@/scss/components/_common.module.scss";

interface TextShimmerProps {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number; // seconds
    style?: any;
}

const TextShimmer = ({
    children,
    as: Component = 'span',
    className,
    style,
    duration = 2,
}: TextShimmerProps) => {
    
const MotionComponent = motion(Component);

return (
    <MotionComponent
        className={`${ styles.shimmerText } ${ className }`}
        // initial={{ backgroundPosition: '100% center' }}
        // animate={{ backgroundPosition: '0% center' }}
        // transition={{
        //     repeat: Infinity,
        //     duration,
        //     ease: 'linear',
        // }}
        style={ style }
    >
        {children}
    </MotionComponent>
)};

export default TextShimmer;