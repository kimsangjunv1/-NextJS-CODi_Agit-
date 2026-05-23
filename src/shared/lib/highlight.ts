// utils/highlight.ts
export const highlightCode = (rawHtml: string) => {
  const matches = rawHtml.match(/<p>(.*?)<\/p>/g) || [];

  const grayKeywords = ["function", "const", "let", "var", "return", "if", "else", "for", "while"];

  const codeLines = matches.map((pTag) => {
    let line = pTag.replace(/<p>|<\/p>/g, "").replace(/&nbsp;/g, " ");

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

    // JS 키워드 (회색)
    grayKeywords.forEach((kw) => {
      const reg = new RegExp(`\\b${kw}\\b`, "g");
      line = line.replace(reg, `<span class="keyword-gray">${kw}</span>`);
    });

    // 함수 이름 (const|let|var, function)
    line = line.replace(/\b(const|let|var)\s+([a-zA-Z0-9_]+)(?=\s*[:=])/g, `$1 <span class="function-name">$2</span>`);
    line = line.replace(/function\s+([a-zA-Z0-9_]+)/g, `function <span class="function-name">$1</span>`);

    // 타입 이름 (NextConfig, etc.)
    line = line.replace(/\b([A-Z][a-zA-Z0-9_]+)\b/g, `<span class="type-name">$1</span>`);

    return line;
  });

  return codeLines.join("<br>");
};