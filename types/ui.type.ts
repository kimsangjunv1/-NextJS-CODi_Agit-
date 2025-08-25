import { ReactNode } from "react";

export interface CalendarModalProps {
    className?: string;
    // isOpen?: boolean;
    icon?: boolean;
    onClose: (e: string) => void;
    onDateSelect: (date: Date) => void;
}

export interface MultiSelectProps {
    title: string,
    id: number,
    state: boolean
}

export interface SwitchProps {
    title: string,
    id: number,
    state: boolean,
    date?: string
}

export interface FileUploadProps {
    placeholder?: string;
    buttonText?: string;
    onChange?: (file: File) => void;
}

export interface TabComponentProps {
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

export interface ButtonProps {
    children: ReactNode | string,
    className?: string,
    type?: "button" | "reset" | "submit",
    disabled?: boolean,
    ref?: any,
    test?: string,
    onClick?: (e: any) => void
}

export interface MultiSelectProps {
    data: MultiSelectProps[],
    onChange: (e: MultiSelectProps[]) => void
}

export interface SelectProps {
    list: {
        title: string; value: any
    }[];
    onChange: (e: any) => void;
    className?: {
        container?: string; button?: string
    };
}

export interface InputProps {
    defaultValue?: string,
    icon?: boolean,
    type?: string,
    placeholder?: string,
    guide?: string,
    className?: string,
    onChange: (e: any) => void
}

export interface SwitchProps {
    data: SwitchProps,
    onChange: (e: SwitchProps) => void 
}

export interface RadioProps {
    list: {
        value: any,
        title: string
    }[],
    defaultValue: any,
    className?: {
        container: string,
        button: string
    },
    onChange: (e: number ) => void
}

export interface CheckBoxProps {
    defaultState?: boolean,
    className?: string,
    guide?: string,
    onChange: (e:boolean) => void
}