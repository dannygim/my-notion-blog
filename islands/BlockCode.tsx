// deno-lint-ignore-file no-explicit-any
import { useEffect } from "preact/hooks";
import hljs from "highlight.js";

export default function BlockCode({ language, richTexts, caption }: { language: string; richTexts: any[]; caption?: any; }) {
  if (!richTexts || richTexts.length === 0) {
    return null;
  }

  const languageClass = generateLanguageClass(language);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return <figure class="my-4 bg-white border border-gray-100 dark:border-gray-700 rounded-lg shadow">
    {caption?.length > 0 && <figcaption class="mt-2 pl-4 text-sm text-gray-500 dark:text-gray-400">{caption[0].text.content}</figcaption>}
    <pre><code class={`${languageClass} hljs`}>{richTexts[0].plain_text}</code></pre>
  </figure>;
}

function generateLanguageClass(language: string) {
  switch (language) {
    case "bash":
      return "language-bash"
    case "c":
      return "language-c"
    case "c++":
      return "language-cpp"
    case "c#":
      return "language-csharp"
    case "css":
      return "language-css"
    case "diff":
      return "language-diff"
    case "go":
      return "language-go"
    case "graphql":
      return "language-graphql"
    case "json":
      return "language-json"
    case "java":
      return "language-java"
    case "javascript":
      return "language-javascript"
    case "kotlin":
      return "language-kotlin"
    case "less":
      return "language-less"
    case "lua":
      return "language-lua"
    case "makefile":
      return "language-makefile"
    case "markdown":
      return "language-markdown"
    case "objective-c":
      return "language-objectivec"
    case "php":
      return "language-php"
    case "perl":
      return "language-perl"
    case "python":
      return "language-python"
    case "r":
      return "language-r"
    case "ruby":
      return "language-ruby"
    case "rust":
      return "language-rust"
    case "scss":
      return "language-scss"
    case "sql":
      return "language-sql"
    case "shell":
      return "language-shell"
    case "swift":
      return "language-swift"
    case "typescript":
      return "language-typescript"
    case "visual basic":
    case "vb.net":
      return "language-vbnet"
    case "webassembly":
      return "language-wasm"
    case "yaml":
      return "language-yaml"
    case "html":
    case "xml":
      return "language-xml"
    default:
      return "language-plaintext"
  }
}
