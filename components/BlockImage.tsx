// deno-lint-ignore-file no-explicit-any
export default function BlockImage({ value }: { value: any }) {
  const src = value.type === "external" ? value.external.url : value.file.url;
  const caption = value.caption?.at(0)?.plain_text ?? "";
  return (
    <figure class="max-w-lg mx-auto mt-2">
      <img src={src} alt={caption} class="h-auto max-w-full rounded-lg" />
      {caption && <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>}
    </figure>
  );
}
