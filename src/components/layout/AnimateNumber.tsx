import { motion } from "framer-motion";
import { useState, useEffect, useRef, Fragment } from "react";

import { util } from "@/utils/util";

interface FontSizeProps {
    textSize?: 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38;
}

// 메인 컴포넌트 (숫자를 자릿수별로 분리해서 NumberColumn으로 보냄)
interface AnimateNumberProps extends FontSizeProps {
    value: number;
    digit?: number;
    className?: {
        container?: string;
        text?: string;
        guide?: {
            front?: string;
            back?: string;
        }
    };
    guide?: {
        front?: string;
        back?: string;
    };
    delay?: number;
    test?: string;
    onClick?: () => void;
}

interface NumberColumnProps extends FontSizeProps {
    digit: number;
    className: string;
    size: any;
    delay: number;
    onClick?: () => void;
}

const AnimateNumber = ({
    value,
    digit = 1,
    delay = 0,
    className = {
        container: "",
        text: "",
        guide: {
            front: "",
            back: ""
        }
    },
    textSize = 14,
    guide = {
        front: "",
        back: ""
    },
    test = "",
    onClick
}: AnimateNumberProps ) => {
    // console.log("들어옴", value)
    const FORMAT_VALUE = util.string.getCommaOnPrice( value ).padStart( digit, "0" ).split("");

    const sizeMap = {
        12: { text: "1.2", height: "1.2" },
        13: { text: "1.3", height: "1.3" },
        14: { text: "1.4", height: "1.4" },
        15: { text: "1.5", height: "1.5" },
        16: { text: "1.6", height: "1.6" },
        17: { text: "1.7", height: "1.7" },
        18: { text: "1.8", height: "1.8" },
        19: { text: "1.9", height: "1.9" },
        20: { text: "2.0", height: "2.0" },
        21: { text: "2.1", height: "2.1" },
        22: { text: "2.2", height: "2.2" },
        23: { text: "2.3", height: "2.3" },
        24: { text: "2.4", height: "2.4" },
        25: { text: "2.5", height: "2.5" },
        26: { text: "2.6", height: "2.6" },
        27: { text: "2.7", height: "2.7" },
        28: { text: "2.8", height: "2.8" },
        29: { text: "2.9", height: "2.9" },
        30: { text: "3.0", height: "3.0" },
        31: { text: "3.1", height: "3.1" },
        32: { text: "3.2", height: "3.2" },
        33: { text: "3.3", height: "3.3" },
        34: { text: "3.4", height: "3.4" },
        35: { text: "3.5", height: "3.5" },
        36: { text: "3.6", height: "3.6" },
        37: { text: "3.7", height: "3.7" },
        38: { text: "3.8", height: "3.8" },
    };


    const size = sizeMap[ textSize ] || sizeMap[ 14 ]; // fallback

    return (
        <div className={`${ className?.container ?? "" }`} data-testid={ test } data-value={ value } style={{ display: "flex", alignItems: "center" }}>
            { guide.front ? <motion.p layout className={`${ className.guide?.front ?? "" } `} style={{ fontSize: `${ size.text }` }}>{ guide.front }</motion.p> : "" }

            { FORMAT_VALUE.map(( digit, idx ) => {
                return ((
                    <Fragment key={ idx }>
                        { digit === "," ? <motion.p layout >,</motion.p> : <NumberColumn key={ idx } digit={ parseInt( digit )} className={ className?.text ?? "" } size={ size } delay={ delay } onClick={ onClick } /> }
                    </Fragment>
                ))
            })}

            { guide.back ? <motion.p layout className={`${ className.guide?.back ?? "" }`} style={{ fontSize: `${ size.text }` }}>{ guide.back }</motion.p> : "" }
        </div>
    );
};

// 숫자 하나(자릿수 하나) 애니메이션 처리
const NumberColumn = ({ digit, className, size, delay, onClick }: NumberColumnProps ) => {
    const [ position, setPosition ] = useState( 0 );

    const columnRef = useRef<HTMLDivElement>( null );

    useEffect(() => {
        if ( columnRef.current ) {
            const height = columnRef?.current?.clientHeight;

            setPosition( -height * digit); // 음수로 내려가야 증가됨
        }
    }, [ digit ]);

    return (
        <div className={`number-column ${ className }`} style={{ textAlign: "center", overflow: "hidden", height: `${ size.height }rem` }}  ref={ columnRef } onClick={ onClick }>
            <motion.div
                key="number-column"
                animate={{ y: position }}
                transition={{ duration: 0.3, delay: delay, ease: [0.25, 0.8, 0.25, 1], staggerChildren: 0.5 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                { Array(10).fill(0).map((n, i) => (
                    <p key={ i } className={ className } style={{ textAlign: "center", fontSize: `${ size.text }rem`, height: `${ size.height }rem` }}>
                        { i }
                    </p>
                ))}
            </motion.div>
        </div>
    );
};

export default AnimateNumber;