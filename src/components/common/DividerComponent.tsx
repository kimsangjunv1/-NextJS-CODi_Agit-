import styles from "@/scss/components/_common.module.scss"

interface DividerComponentProps {
    type: "horizontal" | "vertical";
    className?: string;
    height?: string;
}

const DividerComponent = ({ type, className }: DividerComponentProps) => {
    return (
        <hr className={`${ styles.divider } ${ className } ${ type === 'vertical' ? styles.vertical : styles.horizontal }`} />
    )
}

export default DividerComponent