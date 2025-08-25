import { useState } from 'react'

import style from "@/scss/components/_common.module.scss"

interface FilterComponentProps {
    list: {
        title: string;
        value: number;
    }[]
    onClick: ( e: number ) => void
}

const FilterComponent = ({ list, onClick }: FilterComponentProps) => {
    const [ menuState, setMenuState ] = useState(0);
    
    return (
        <section className={ style.filter }>
            { list && list.map(( e ,i ) => 
                <button
                    key={ i }
                    value={ e.value }
                    onClick={() => {
                        setMenuState( e.value );
                        onClick( e.value );
                    }}
                    className={ i === menuState ? style.active : "" }
                >{ e.title }</button>
            )}
        </section>
    )
}

export default FilterComponent