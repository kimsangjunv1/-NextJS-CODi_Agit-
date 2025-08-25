import { motion } from "motion/react";
import { useEffect, useState } from "react";

import style from "@/scss/components/_common.module.scss"
import { useToastStore } from "@/stores/useToastStore";
import useNavigate from "@/hooks/common/useNavigate";

interface TabComponentProps {
    className?: {
        container?: string;
        button?: string;
        active?: string;
        normal?: string;
    }
    list: {
        title: string;
        value: number;
        route?: string;
    }[]
    type?: "button" | "link";
    preventMsg?: string;
    preventTargetIdx?: number;
    defaultSelect?: number;
    onClick: ( e: number ) => void
}

const TabComponent = ({ list, type = "button", className, preventTargetIdx = 999, preventMsg = "제한 설정 됨", defaultSelect = 0, onClick }: TabComponentProps) => {
    const [ menuState, setMenuState ] = useState(defaultSelect);
    const { setToast } = useToastStore();
    const { pushToUrl } = useNavigate();
    
    useEffect(() => {
        setMenuState( defaultSelect );
        onClick( defaultSelect )
    }, [ defaultSelect ])
    
    return (
        <section className={`${ className?.container ? className.container : "" }`}>
            { list && list.map(( e ,i ) => 
                <motion.button
                    layout
                    key={ i }
                    value={ e.value }
                    onClick={() => {
                        if ( preventTargetIdx !== 999 && preventTargetIdx !== i ) {
                            setToast({ msg: preventMsg })

                            return;
                        }

                        if ( type === "button" ) {
                            console.log("엉?")
                            setMenuState( e.value );
                            onClick( e.value );
                        } else {
                            console.log("????")
                            pushToUrl( e.route ?? "/" );
                        }
                    }}
                    className={ `${ e.value === menuState ? `${ className?.active }` : `${ className?.normal }` } ${ className?.button }` }
                >
                    { e.title }
                </motion.button>
            )}
        </section>
    )
}

export default TabComponent