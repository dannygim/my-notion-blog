// deno-lint-ignore-file no-explicit-any
import BlockRichText from "$/components/BlockRichText.tsx";

export default function BlockHeading({ level = "1", richTexts }: { level?: "1" | "2" | "3", richTexts: any[]; }) {
  switch (level) {
    case "2":
      return (<h2 class="my-4 text-3xl font-bold"><BlockRichText richTexts={richTexts} /></h2>);
    case "3":
      return (<h3 class="my-4 text-2xl font-bold"><BlockRichText richTexts={richTexts} /></h3>);
    default:
      return (<h1 class="my-4 text-4xl font-bold"><BlockRichText richTexts={richTexts} /></h1>);
  }
}
