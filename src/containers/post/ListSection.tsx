"use client"

import { Fragment, useEffect, useRef, useState } from 'react';
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import hljs from 'highlight.js';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useBlockStore } from '@/stores/useEditorBlockStore';

import UI from '@/components/common/UIComponent';

import { DUMMY_POST_RESPONSE } from '@/constants/lists/configDummyResponse';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useNavigate from '@/hooks/common/useNavigate';
import { highlightCode } from '@/utils/highlight';

const ListSection = ({ id }: { id: string }) => {
    const [ isShow, setIsShow ] = useState(false);
    const { mainViewMode, setMainViewMode } = useLayoutStore();

    return (
        <section className='flex flex-col w-full post'>
            <section className='mx-auto post-inner w-full max-w-[var(--size-tablet)] bg-white'>
                <RenderContents id={id} />
            </section>
        </section>
    )
}

const RenderContents = ({ id }: { id: string }) => {
    return (
        <Fragment>
            <Title title={ DUMMY_POST_RESPONSE.title } createDate={ DUMMY_POST_RESPONSE.create_at } />
            <Thumbnail imageUrl={ DUMMY_POST_RESPONSE.thumbnail } />
            <Contents contents={ DUMMY_POST_RESPONSE.contents }/>
            <Action id={id} />
        </Fragment>
    )
}

const Title = ({ title, createDate }: { title: string, createDate: string }) => {
    return (
        <article className='flex items-center justify-between p-[1.6rem]'>
            <section className='flex items-center gap-[0.8rem]'>
                <h2 className='font-bold text-[2.0rem]'>{ title }</h2>
                <p className='bg-[var(--color-gray-200)] px-[0.4rem] py-[0.2rem] rounded-[0.4rem]'>코디</p>
                <p className='text-[var(--color-gray-400)]'>{ createDate }</p>
            </section>

            <section className='action'>
                <button>function</button>
            </section>
        </article>
    )
}

const Thumbnail = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <article className='h-[calc(1.6rem*20)]'>
            <img
                src={ imageUrl }
                alt={`card-1`}
                className="object-cover w-full h-full"
            />
        </article>
    )
}

interface ContentsTempType {
    id: string;
    type: number;
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
}

const Contents = ({ contents }: { contents: ContentsTempType[][] }) => {
    const getPureHTML = ( content: any ) => {
        // const cleanHTML = DOMPurify.sanitize(content, {
        //     ALLOWED_TAGS: ["p", "div", "span", "strong", "em", "ul", "li", "ol", "br"],
        // });

        // // 불필요한 중첩 <p> 제거
        // const fixedHTML = cleanHTML.replace(/<p>\s*<\/p>/g, ""); 
        // return <div>{parse(fixedHTML)}</div>;
        return <div>{ parse( content ) }</div>;
    }

    const codeRef = useRef<HTMLDivElement>(null);

        /**
     * 기존 dangerouslySetInnerHTML HTML을 코드 하이라이트용으로 변환
     * - <p> -> 줄바꿈 유지
     * - &nbsp; -> 공백 유지
     * - 키워드, 태그, 문자열 간단 색상 처리
     */
const parseCodeHTMLs = (rawHtml: string) => {
  // <p>...</p> 태그만 추출
  const matches = rawHtml.match(/<p>(.*?)<\/p>/g) || [];

  // 하이라이트 색상 기준
  const grayKeywords = ["function", "const", "let", "var", "return", "if", "else", "for", "while"];

  const codeLines = matches.map((pTag) => {
    let line = pTag.replace(/<p>|<\/p>/g, "").replace(/&nbsp;/g, " "); // <p> 제거 + 공백 처리

    const tokens: string[] = [];

    // 정규식 순서: 태그 → 문자열 → 주석 → 숫자 → 키 → 키워드 → 함수/변수/타입
    // 1. HTML 태그
    line = line.replace(/(&lt;\/?[\w]+&gt;)/g, (m) => `<span class="tag">${m}</span>`);

    // 2. 문자열
    line = line.replace(/(&quot;.*?&quot;|'.*?')/g, (m) => `<span class="string">${m}</span>`);

    // 3. 주석
    line = line.replace(/(\/\/.*|\/\*.*?\*\/)/g, (m) => `<span class="comment">${m}</span>`);

    // 4. 숫자
    line = line.replace(/\b\d+\b/g, (m) => `<span class="number">${m}</span>`);

    // 5. JSON 키
    line = line.replace(/(".*?"\s*:)/g, (m) => `<span class="key">${m}</span>`);

    // 6. JS 키워드 (회색)
    grayKeywords.forEach((kw) => {
      const reg = new RegExp(`\\b${kw}\\b`, "g");
      line = line.replace(reg, `<span class="keyword-gray">${kw}</span>`);
    });

    // 7. 함수 이름 (function xxx)
    line = line.replace(
      /\bfunction\s+([a-zA-Z0-9_]+)/g,
      `function <span class="function-name">$1</span>`
    );

    // 8. 변수 이름 (const|let|var xxx = ...)
    line = line.replace(
      /\b(const|let|var)\s+([a-zA-Z0-9_]+)(?=\s*[:=])/g,
      `$1 <span class="function-name">$2</span>`
    );

    // 9. 타입 이름 (변수 타입 또는 interface, class 등)
    line = line.replace(
      /\b([A-Z][a-zA-Z0-9_]+)\b/g,
      (m) => `<span class="type-name">${m}</span>`
    );

    // 10. 중괄호
    line = line.replace(/([{}])/g, `<span class="bracket">$1</span>`);

    return line;
  });

  return codeLines.join("<br>");
};

const parseCodeHTML_BAK = (rawHtml: string) => {
    const matches = rawHtml.match(/<p>(.*?)<\/p>/g) || [];

    const grayKeywords = ["function", "const", "let", "var", "return", "if", "else", "for", "while"];

    const codeLines = matches.map((pTag) => {
        let line = pTag.replace(/<p>|<\/p>/g, ""); // <p> 제거
        line = line.replace(/&nbsp;/g, " ");       // 공백 처리

        // 태그
        line = line.replace(/(&lt;\/?[\w]+&gt;)/g, `<span class="tag">$1</span>`);

        // 주석
        line = line.replace(/(\/\/.*|\/\*.*\*\/)/g, `<span class="comment">$1</span>`);

        // 괄호
        line = line.replace(/([{}])/g, `<span class="bracket">$1</span>`);

        // 키 (JSON 스타일 key)
        line = line.replace(/(".*?"\s*:)/g, `<span class="key">$1</span>`);

        // 문자열
        line = line.replace(/(&quot;.*?&quot;|'.*?')/g, `<span class="string">$1</span>`);

        // 숫자
        line = line.replace(/(\b\d+\b)/g, `<span class="number">$1</span>`);

        // JS 키워드
        grayKeywords.forEach((kw) => {
            const reg = new RegExp(`\\b${kw}\\b`, "g");
            line = line.replace(reg, `<span class="keyword-gray">${kw}</span>`);
        });

        // 함수 이름 (function xxx)
        line = line.replace(/function\s+([a-zA-Z0-9_]+)/g, `function <span class="function-name">$1</span>`);

        // 변수/함수 이름 (const|let|var xxx =)
        line = line.replace(/\b(const|let|var)\s+([a-zA-Z0-9_]+)(?=\s*[:=])/g, `$1 <span class="function-name">$2</span>`);

        // 타입 이름 (변수 뒤 : 타입)
        line = line.replace(/:\s*([A-Z][a-zA-Z0-9_]+)/g, `: <span class="type-name">$1</span>`);

        return line;
    });

    return codeLines.join("<br>");
};

    console.log("contents",contents)

    return (
        <article className='flex gap-[0.4rem] p-[2.4rem]'>
            {/* <section className='shortcut'>
                <h5>QUICK_MOVE</h5>
                <div>
                    <UI.Button>
                        LOGO
                    </UI.Button>
                </div>
            </section> */}

            <section className='flex flex-col gap-[5.2rem]'>
                { contents.map((row, rowIdx) =>
                    <section key={ rowIdx } className={`grid grid-cols-[1fr_1fr] gap-[1.6rem]`}>

                        { row.map((col, colIdx) =>
                            <section key={ colIdx } className={`w-full min-w-0 ${ row.length !== 0 ? "flex gap-[0.4rem]" : "" } ${ row.length === 1 ? "col-span-2" : "" } ${ col.type === 0 || col.type === 2 ? "flex-col" : "" }`}>

                                { col.type === 0 ? (
                                    <Fragment>
                                        <section className='flex flex-col gap-[0.8rem]'>
                                            <p className='text-[var(--color-gray-500)]'>{ col.subtitle }</p>
                                            <h5 className='text-[1.6rem] font-bold text-[var(--color-gray-1000)]'>{ col.title }</h5>
                                        </section>

                                        <section className='overflow-x-auto'>
                                            { getPureHTML( col.content )}
                                        </section>
                                    </Fragment>
                                ) : ""}

                                { col.type === 1 ? (
                                    <Fragment>
                                        <img src={ col.imageUrl } alt="/" />
                                    </Fragment>
                                ) : "" }

                                { col.type === 2 ? (
                                    <Fragment>
                                        <section className='flex flex-col gap-[0.8rem]'>
                                            <p className='text-[var(--color-gray-500)]'>{ col.subtitle }</p>
                                            <h5 className='text-[1.6rem] font-bold text-[var(--color-gray-1000)]'>{ col.title }</h5>
                                        </section>

                                        <section className='overflow-x-auto'>
                                            {/* { getPureHTML( col.content )} */}
                                            {/* {col.content} */}
                                            
                                            <div
                                                ref={codeRef}
                                                // className="p-4 font-mono text-pink-400 whitespace-pre bg-gray-900 rounded"
                                                dangerouslySetInnerHTML={{ __html: `<pre class="code-block"><code>${ highlightCode(col.content) }</code></pre>` }}
                                                // dangerouslySetInnerHTML={{ __html: `<pre class="code-block"><code>${ DOMPurify.sanitize(col.content, { ALLOWED_TAGS: ['p','br'] }) }</code></pre>` }}
                                            />

                                            {/* <SyntaxHighlighter language="ts" style={materialDark}>
                                                { JSON.stringify(col.content) }
                                            </SyntaxHighlighter> */}
                                        </section>
                                    </Fragment>
                                ) : "" }
                            </section>
                        )}
                    </section>                
                )}
            </section>
        </article>
    )
}

const Action = ({ id }: { id: string }) => {
    const {
        rows,
        copiedBlock,
        selectedPosition,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteRow,
        copyBlock,
        pasteBlock,
        selectBlock,
    } = useBlockStore();
    const { pushToUrl } = useNavigate();

    return (
        <article className='flex'>
            <UI.Button
                className="w-full h-full p-[1.6rem] bg-[#dd4f1b] font-bold text-white text-[1.8rem]"
                onClick={() => console.log("rows", rows)}
            >
                생성하기
            </UI.Button>
            
            <UI.Button
                className="w-full h-full font-bold p-[1.6rem] bg-[#000000] text-white text-[1.8rem]"
                onClick={() => {
                    pushToUrl(`/post/${id}/modify`)
                }}
            >
                수정하기
            </UI.Button>
        </article>
    )
}

export default ListSection