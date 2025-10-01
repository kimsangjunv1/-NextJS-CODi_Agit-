"use client";

import { useEditor, EditorContent, useEditorState, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
// import { Color } from "@tiptap/extension-color";
import { BubbleMenu } from "@tiptap/react/menus";
import CodeBlock from "@tiptap/extension-code-block";
import { useState } from "react";
import { highlightCode } from "@/utils/highlight";

// --- Tiptap Core Extensions ---
// import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
// import { TextAlign } from "@tiptap/extension-text-align"
// import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
// import { Subscript } from "@tiptap/extension-subscript"
// import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

type Props = {
    content?: string;
    onChange?: (html: string) => void;
};

const CustomTextStyle = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize || null,
                renderHTML: attributes => {
                    if (!attributes.fontSize) return {};
                    return { style: `font-size: ${attributes.fontSize}` };
                },
            },
            lineHeight: {
                default: null,
                parseHTML: element => element.style.lineHeight || null,
                renderHTML: attributes => {
                    if (!attributes.lineHeight) return {};
                    return { style: `line-height: ${attributes.lineHeight}` };
                },
            },
        };
    },
});

const Normal = ({ content = "", onChange }: Props) => {
    const editor = useEditor({
        // immediatelyRender: false,
        // extensions: [
        //     StarterKit,
        //     Bold,
        //     Italic,
        //     Underline,
        //     TextStyle,
        //     Color,
        //     CustomTextStyle,
        // ],
        // content,
        // onUpdate: ({ editor }) => {
        //     onChange?.(editor.getHTML());
        // },
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
        attributes: {
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            "aria-label": "Main content area, start typing to enter text.",
            class: "simple-editor",
        },
        },
        extensions: [
            StarterKit.configure({
                horizontalRule: false,
                link: {
                openOnClick: false,
                enableClickSelection: true,
                },
            }),
            // HorizontalRule,
            Bold,
            Italic,
            Underline,
            // TextStyle,
            // Color,
            CustomTextStyle,
            // TextAlign.configure({ types: ["heading", "paragraph"] }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            Image,
            // Typography,
            // Superscript,
            // Subscript,
            Selection,
            // ImageUploadNode.configure({
            //     accept: "image/*",
            //     maxSize: MAX_FILE_SIZE,
            //     limit: 3,
            //     upload: handleImageUpload,
            //     onError: (error) => console.error("Upload failed:", error),
            // }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx?.editor?.isActive("bold") ?? false,
            canBold: ctx?.editor?.can().chain().toggleBold().run() ?? false,
            isItalic: ctx?.editor?.isActive("italic") ?? false,
            canItalic: ctx?.editor?.can().chain().toggleItalic().run() ?? false,
            isStrike: ctx?.editor?.isActive("strike") ?? false,
            canStrike: ctx?.editor?.can().chain().toggleStrike().run() ?? false,
            isCode: ctx?.editor?.isActive("code") ?? false,
            canCode: ctx?.editor?.can().chain().toggleCode().run() ?? false,
            canClearMarks: ctx?.editor?.can().chain().unsetAllMarks().run() ?? false,
            isParagraph: ctx?.editor?.isActive("paragraph") ?? false,
            isHeading1: ctx?.editor?.isActive("heading", { level: 1 }) ?? false,
            isHeading2: ctx?.editor?.isActive("heading", { level: 2 }) ?? false,
            isHeading3: ctx?.editor?.isActive("heading", { level: 3 }) ?? false,
            isHeading4: ctx?.editor?.isActive("heading", { level: 4 }) ?? false,
            isHeading5: ctx?.editor?.isActive("heading", { level: 5 }) ?? false,
            isHeading6: ctx?.editor?.isActive("heading", { level: 6 }) ?? false,
            isBulletList: ctx?.editor?.isActive("bulletList") ?? false,
            isOrderedList: ctx?.editor?.isActive("orderedList") ?? false,
            isCodeBlock: ctx?.editor?.isActive("codeBlock") ?? false,
            isBlockquote: ctx?.editor?.isActive("blockquote") ?? false,
            canUndo: ctx?.editor?.can().chain().undo().run() ?? false,
            canRedo: ctx?.editor?.can().chain().redo().run() ?? false,
            isUnderline: ctx?.editor?.isActive('underline') ?? false,
        canUnderline: ctx?.editor?.can().chain().toggleUnderline().run() ?? false,
        }),
    });

    if (!editor) return null;

    const buttonClass = (active: boolean) =>
        `px-3 py-1 rounded border transition-colors ${
            active
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
        }`;

    const disabledButtonClass =
        "px-3 py-1 rounded border bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const MenuBar = ({ editor }: { editor: Editor }) => {
        return (
            <div className="mb-4 control-group">
                <div className="flex flex-wrap gap-2">
                    {/* Marks */}
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editorState?.canBold}
                        className={buttonClass(!!editorState?.isBold)}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editorState?.canItalic}
                        className={buttonClass(!!editorState?.isItalic)}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editorState?.canStrike}
                        className={buttonClass(!!editorState?.isStrike)}
                    >
                        Strike
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={!editorState?.canCode}
                        className={buttonClass(!!editorState?.isCode)}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => editor.chain().focus().unsetAllMarks().run()}
                        className={disabledButtonClass}
                    >
                        Clear marks
                    </button>
                    <button
                        onClick={() => editor.chain().focus().clearNodes().run()}
                        className={disabledButtonClass}
                    >
                        Clear nodes
                    </button>

                    {/* Paragraph & Headings */}
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={buttonClass(!!editorState?.isParagraph)}
                    >
                        Paragraph
                    </button>
                    {[1, 2, 3, 4, 5, 6].map((level: any) => (
                        <button
                            key={level}
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level }).run()
                            }
                            className={buttonClass(!!
                                editorState?.[`isHeading${level}` as keyof typeof editorState]
                            )}
                        >
                            H{level}
                        </button>
                    ))}
                    <div className="flex gap-2">
                        {[12, 14, 16, 18, 20, 24].map((size) => (
                            <button
                                key={size}
                                onClick={() =>
                                    editor.chain().focus().setMark('textStyle', { fontSize: `${size}px` }).run()
                                }
                                className="px-2 py-1 border rounded"
                            >
                                {size}px
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        {['1', '1.2', '1.5', '1.8', '2'].map((lh) => (
                            <button
                                key={lh}
                                onClick={() =>
                                    editor.chain().focus().setMark('textStyle', { lineHeight: lh }).run()
                                }
                                className="px-2 py-1 border rounded"
                            >
                                {lh}
                            </button>
                        ))}
                    </div>

                    {/* Lists */}
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={buttonClass(!!editorState?.isBulletList)}
                    >
                        Bullet list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={buttonClass(!!editorState?.isOrderedList)}
                    >
                        Ordered list
                    </button>

                    {/* Blocks */}
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={buttonClass(!!editorState?.isCodeBlock)}
                    >
                        Code block
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={buttonClass(!!editorState?.isBlockquote)}
                    >
                        Blockquote
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className={disabledButtonClass}
                    >
                        Horizontal rule
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                        className={disabledButtonClass}
                    >
                        Hard break
                    </button>

                    {/* Undo/Redo */}
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editorState?.canUndo}
                        className={disabledButtonClass}
                    >
                        Undo
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editorState?.canRedo}
                        className={disabledButtonClass}
                    >
                        Redo
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className=" h-full rounded-[1.2rem]">
            {/* <MenuBar editor={editor} /> */}
            <EditorContent
                editor={editor}
                className="min-h-[150px] h-full rounded-[1.6rem] outline-none stroke-none focus:outline-none"
                onInput={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log("무야호", e)
                }}
            />
            {/* <BubbleMenu
                editor={editor}
                className="flex gap-2 p-2 bg-white border rounded shadow-lg"
            >
                <MenuBar editor={editor} />
            </BubbleMenu> */}
        </div>
    );
}

const Code = ({ content = "", onChange }: Props) => {
    const [ isUseTab, setIsUseTab ] = useState( false );
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                // 불필요한 확장은 비활성화
                // history: true, // undo/redo는 유지
                // paragraph: false,
                heading: false,
                bold: false,
                italic: false,
                strike: false,
                code: false,
            }),
            // CodeBlock, // 코드 블록만 사용
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="w-full h-full rounded-[2.0rem] overflow-hidden">
            <EditorContent
                editor={editor}
                className="min-h-[150px] h-full border border-gray-300 rounded p-2 font-mono bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Tab") {
                        e.preventDefault(); // 기본 동작 방지
                        setIsUseTab( true );

                        // 선택된 위치에 스페이스 4개 삽입
                        editor.chain().focus().insertContentAt(editor.state.selection.from, "\u00A0\u00A0\u00A0\u00A0").run();
                    }

                    if ( e.key === "Enter" ) {
                        // 선택된 위치에 스페이스 4개 삽입
                        editor.chain().focus().insertContentAt(editor.state.selection.from, "\u00A0\u00A0\u00A0\u00A0").run();
                    }
                }}
            />
        </div>
    );
}

const TipTap = {
    Normal,
    Code
}

export default TipTap