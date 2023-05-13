// deno-lint-ignore-file no-explicit-any
import BlockRichText from "$/components/BlockRichText.tsx";

export default function BlockParagraph({ richTexts }: { richTexts: any[]; }) {
  return (<p class="my-4 text-xl"><BlockRichText richTexts={richTexts} /></p>);
}
