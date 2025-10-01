"use client";

import { motion } from 'framer-motion';
import styles from "@/scss/components/_common.module.scss";

interface TextShimmerProps {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number; // seconds
    style?: any;
    color?: {
        start: string;
        end: string;
    }
}

const TextShimmer = ({
    children,
    as: Component = 'span',
    className,
    style,
    color,
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
        style={{
            ...style,
            backgroundImage: `linear-gradient(45deg,${ color?.start } 0%,${ color?.end } 50%,${ color?.start } 100%)`  
        }}
    >
        {children}
    </MotionComponent>
)};

export default TextShimmer;