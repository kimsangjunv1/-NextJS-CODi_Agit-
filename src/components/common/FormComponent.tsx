import { createContext, HTMLProps, useContext, useMemo } from 'react';
import styles from "@/scss/components/_form.module.scss"

interface Props extends HTMLProps<HTMLFormElement> {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    fieldsetProps?: HTMLProps<HTMLFieldSetElement>;
    legendProps?: HTMLProps<HTMLLegendElement>;
}

const Context = createContext<Pick<Props, 'fieldsetProps' | 'legendProps'>>({ fieldsetProps: undefined, legendProps: undefined });

const Form = ({ children, className, fieldsetProps, legendProps, ...props }: Props) => {
    const formStyle = useMemo(() => [styles.form, className].join(' '), [className]);

    return (
        <Context.Provider value={{ fieldsetProps, legendProps }}>
            <form {...props} className={formStyle}>
                {children}
            </form>
        </Context.Provider>
    );
};

const Fieldset = ({ children, className, ...props }: HTMLProps<HTMLFieldSetElement>) => {
    const { fieldsetProps } = useContext(Context);
    const fieldsetStyle = useMemo(
        () => [styles.fieldset, fieldsetProps?.className, className].join(' '),
        [fieldsetProps?.className, className]
    );

    return (
        <fieldset {...fieldsetProps} {...props} className={fieldsetStyle}>
            {children}
        </fieldset>
    );
};

const Legend = ({ children, className, ...props }: HTMLProps<HTMLLegendElement>) => {
    const { legendProps } = useContext(Context);
    const legendStyle = useMemo(
        () => [styles.legend, legendProps?.className, className].join(' '),
        [legendProps?.className, className]
    );

    return (
        <legend {...legendProps} {...props} className={legendStyle}>
            {children}
        </legend>
    );
};

// Export components
Form.Fieldset = Fieldset;
Form.Legend = Legend;

export default Form;