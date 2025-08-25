"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { BubbleMenu } from "@tiptap/react/menus";

type Props = {
    content?: string;
    onChange?: (html: string) => void;
};

export default function TiptapEditor({ content = "", onChange }: Props) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            TextStyle,
            Color,
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

    const MenuBar = ({ editor }: { editor: any }) => {
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
                    {[1, 2, 3, 4, 5, 6].map((level) => (
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
        <div className="">
            {/* <MenuBar editor={editor} /> */}
            <EditorContent
                editor={editor}
                className="min-h-[150px] border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <BubbleMenu
                editor={editor}
                className="flex gap-2 p-2 bg-white border rounded shadow-lg"
            >
                <MenuBar editor={editor} />

                {/* <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={buttonClass(!!editorState?.isBold)}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={buttonClass(!!editorState?.isItalic)}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={buttonClass(
                        editorState?.isUnderline as unknown as boolean
                    )}
                >
                    Underline
                </button> */}
            </BubbleMenu>
        </div>
    );
}