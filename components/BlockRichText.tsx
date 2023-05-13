// deno-lint-ignore-file no-explicit-any
export default function BlockRichText({ richTexts }: { richTexts: any[]; }) {
  if (!richTexts) {
    return null;
  }

  return (<>
    {richTexts.map((richText: any) => {
      const {
        annotations: { bold, code, color, italic, strikethrough, underline },
        text,
      } = richText;
      return <span
        key={text.content}
        class={`text-gray-700 dark:text-gray-400 leading-relaxed
          ${bold ? "font-bold" : ""}
          ${code ? "font-mono" : ""}
          ${italic ? "italic" : ""}
          ${strikethrough ? "line-through" : ""}
          ${underline ? "underline" : ""}
        `}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    })}
  </>);
}
