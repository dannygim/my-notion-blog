import { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "$/domain/model/page.ts";
import { GetPageUseCase } from "$/usecase/get_page.ts";
import { PageNotionClient } from "$/infrastructure/page_notion_client.ts";

import BlockRichText from "$/components/BlockRichText.tsx";
import BlockBookmark from "$/islands/BlockBookmark.tsx";

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long', timeStyle: 'long' });

type Data = {
  page: Page;
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repository = new PageNotionClient();
    const usecase = new GetPageUseCase(repository);
    const page = await usecase.execute(ctx.params.id);
    return ctx.render({ page });
  }
};

export default function Greet({ data }: PageProps<Data>) {
  const { page } = data;

  return (
    <article class="max-w-3xl px-3 md:px-6 mx-auto">
      <img class="mb-4 object-cover object-center w-full h-screen-3/10 rounded-t-lg" src={page.cover ?? `./default_cover.jpg`} alt={page.title} />
      <div class="my-2 text-sm text-gray-500">Posted: {dateFormatter.format(new Date(page.createdAt))}</div>
      <div class="my-2 text-sm text-gray-500">Updated: {dateFormatter.format(new Date(page.lastEditedAt))}</div>
      <h1 class="my-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{page.title}</h1>
      {page.blocks.map((block) => <Block block={block} />)}
    </article>
  );
}

type BlockProps = {
  block: any;
};

function Block({ block }: BlockProps) {
  const { type, id } = block;
  const value = block[type];

  // https://developers.notion.com/reference/block#keys
  switch (type) {
    case "image": return <BlockImage value={value} />;
    case "paragraph": return (<p class="my-4 text-xl"><BlockRichText richTexts={value.rich_text} /></p>);
    case "heading_1": return (<h1 class="my-4 text-4xl font-bold"><BlockRichText richTexts={value.rich_text} /></h1>);
    case "heading_2": return (<h2 class="my-4 text-3xl font-bold"><BlockRichText richTexts={value.rich_text} /></h2>);
    case "heading_3": return (<h3 class="my-4 text-2xl font-bold"><BlockRichText richTexts={value.rich_text} /></h3>);
    case "bookmark": return <BlockBookmark url={value.url} />;
    case "breadcrumb":
    case "bulleted_list_item":
    case "callout":
    case "child_database":
    case "child_page":
    case "column":
    case "column_list":
    case "divider":
    case "embed":
    case "equation":
    case "file":
    case "link_preview":
    case "link_to_page":
    case "numbered_list_item":
    case "pdf":
    case "quote":
    case "synced_block":
    case "table":
    case "table_of_contents":
    case "table_row":
    case "template":
    case "to_do":
    case "toggle":
    case "video":
    case "unsupported":
    default:
      return <BlockUnsupported block={block} />;
  }
}

function BlockUnsupported({ block }: BlockProps) {
  console.log("block:", block);
  return (<div class="mt-2 text-xl text-gray-700 dark:text-gray-400 leading-6">Unsupported block type: {block.type}</div>);
}

function BlockImage({ value }: { value: any }) {
  const src = value.type === "external" ? value.external.url : value.file.url;
  const caption = value.caption?.at(0)?.plain_text ?? "";
  return (
    <figure class="max-w-lg mx-auto mt-2">
      <img src={src} alt={caption} class="h-auto max-w-full rounded-lg" />
      {caption && <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>}
    </figure>
  );
}
