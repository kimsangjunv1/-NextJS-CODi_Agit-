import { useRef, useState, useEffect, ElementType } from "react";

import editor from "@/scss/components/_editor.module.scss";

interface EditableProps {
    as?: ElementType;
    editable?: boolean;
    defaultValue?: string;
    placeholder?: string;
    className?: string;
    role?: string;
    style?: React.CSSProperties;
	desc_no?: number;
    onChange?: (value: string) => void;
	handleBlur?: (value?: string) => void;
}

const DEFAULT_STYLE: React.CSSProperties = {
    minHeight: "1.5em",
    border: "1px solid #ccc",
    padding: "0.5em",
    borderRadius: "4px",
};

const createEditable = (Tag: ElementType, displayName: string) => {
	const Component = ({
		editable = true,
		defaultValue = "",
		placeholder,
		className = "",
		role = "textbox",
		style = DEFAULT_STYLE,
		desc_no = 0,
		onChange,
		handleBlur,
	}: EditableProps) => {
		const ref = useRef<HTMLElement>(null);

		const handleInput = (e: React.FormEvent<HTMLElement>) => {
			const text = (e.target as HTMLElement).innerText;

			onChange?.( text );
		};

		return (
			<Tag
				ref={ ref }
				role={ role }
				contentEditable={ editable }
				className={`${ className } ${ editor.editable }`}
				onInput={ handleInput }
				onBlur={ handleBlur }
				aria-placeholder={ placeholder }
				suppressContentEditableWarning
				style={ style }
				data-description={ desc_no }
			>
				{ defaultValue }
			</Tag>
		);
	};

	Component.displayName = `Editable(${ displayName })`;

	return Component;
};

export const edit = {
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

// export default Editable;