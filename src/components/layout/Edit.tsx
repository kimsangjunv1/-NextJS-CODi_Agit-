import React, { ElementType, useEffect, useState, forwardRef } from "react";

type EditableProps = {
    editable?: boolean | "plaintext-only";
    defaultValue?: string;
    style?: React.CSSProperties;
};

const DEFAULT_STYLE: React.CSSProperties = {
    minHeight: "1.5rem",
    outline: "none",
};

const createEditable = (Tag: ElementType, displayName: string) => {
    const Component = forwardRef<HTMLDivElement, EditableProps & React.HTMLAttributes<HTMLDivElement>>(
        ({ editable = "plaintext-only", defaultValue = "", style = DEFAULT_STYLE, ...props }, ref) => {
            const [value, setValue] = useState(defaultValue);
            const [isFocused, setIsFocused] = useState(false);

            useEffect(() => {
                setValue(defaultValue);
            }, [defaultValue]);

            return (
                <Tag
                    ref={ref} // 여기서 forwardRef로 받아서 전달
                    contentEditable={editable}
                    suppressContentEditableWarning
                    style={{ ...style }}
                    onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
                        setIsFocused(true);
                        const text = e.currentTarget.textContent ?? "";
                        setValue(text);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
                        setIsFocused(false);
                    }}
                    {...props}
                >
                    {value}
                </Tag>
            );
        }
    );

    Component.displayName = `Editable(${displayName})`;
    return Component;
};

export const Edit = {
    div: createEditable("div", "div"),
    span: createEditable("span", "span"),
    p: createEditable("p", "p"),
    h1: createEditable("h1", "h1"),
    h2: createEditable("h2", "h2"),
    h3: createEditable("h3", "h3"),
    h4: createEditable("h4", "h4"),
    h5: createEditable("h5", "h5"),
    h6: createEditable("h6", "h6"),
    label: createEditable("label", "label"),
    pre: createEditable("pre", "pre"),
    article: createEditable("article", "article"),
    section: createEditable("section", "section"),
    blockquote: createEditable("blockquote", "blockquote"),
};

export default createEditable;