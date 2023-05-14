// deno-lint-ignore-file no-explicit-any
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "$/domain/model/post.ts";
import { GetPostUseCase } from "$/usecase/get_post.ts";
import { PostNotionRepository } from "$/infrastructure/post_notion_client.ts";

import BlockDivider from "$/components/BlockDivider.tsx";
import BlockHeading from "$/components/BlockHeading.tsx";
import BlockParagraph from "$/components/BlockParagraph.tsx";
import BlockImage from "$/components/BlockImage.tsx";
import BlockVideo from "$/components/BlockVideo.tsx";
import BlockBookmark from "$/islands/BlockBookmark.tsx";
import BlockCode from "$/islands/BlockCode.tsx";

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long', timeStyle: 'long' });

type Data = {
  post: Post;
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repository = new PostNotionRepository();
    const usecase = new GetPostUseCase(repository);
    const post = await usecase.execute(ctx.params.id);
    return ctx.render({ post });
  }
};

export default function Post({ data }: PageProps<Data>) {
  const { post } = data;
  const isIncludedCode = post.blocks.some((block: any) => block.type === "code");

  return <>
    <Head>
      {isIncludedCode && <link
        type="text/css"
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"
      />}
    </Head>
    <article class="max-w-3xl px-3 md:px-6 mx-auto">
      <img class="mb-4 object-cover object-center w-full h-screen-3/10 rounded-t-lg" src={post.cover ?? `./default_cover.jpg`} alt={post.title} />
      <div class="my-2 text-sm text-gray-500">Posted: {dateFormatter.format(new Date(post.createdAt))}</div>
      <div class="my-2 text-sm text-gray-500">Updated: {dateFormatter.format(new Date(post.lastEditedAt))}</div>
      <h1 class="my-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h1>
      {post.blocks.map((block) => <Block block={block} />)}
    </article>
  </>;
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
    case "paragraph": return <BlockParagraph richTexts={value.rich_text} />;
    case "heading_1": return <BlockHeading level="1" richTexts={value.rich_text} />;
    case "heading_2": return <BlockHeading level="2" richTexts={value.rich_text} />;
    case "heading_3": return <BlockHeading level="3" richTexts={value.rich_text} />;
    case "bookmark": return <BlockBookmark url={value.url} />;
    case "divider": return <BlockDivider />;
    case "video": return <BlockVideo url={value.external?.url ?? value.file.url} />;
    case "code": return <BlockCode language={value.language} richTexts={value.rich_text} caption={value.caption} />;
    case "breadcrumb": // TODO: implement
    case "bulleted_list_item": // TODO: implement
    case "callout": // TODO: implement
    case "child_database": // TODO: implement
    case "child_page": // TODO: implement
    case "column": // TODO: implement
    case "column_list": // TODO: implement
    case "embed": // TODO: implement
    case "equation": // TODO: implement
    case "file": // TODO: implement
    case "link_preview": // TODO: implement
    case "link_to_page": // TODO: implement
    case "numbered_list_item": // TODO: implement
    case "pdf": // TODO: implement
    case "quote": // TODO: implement
    case "synced_block": // TODO: implement
    case "table": // TODO: implement
    case "table_of_contents": // TODO: implement
    case "table_row": // TODO: implement
    case "template": // TODO: implement
    case "to_do": // TODO: implement
    case "toggle": // TODO: implement
    case "unsupported": // TODO: implement
    default:
      return <BlockUnsupported block={block} />;
  }
}

function BlockUnsupported({ block }: BlockProps) {
  return <div class="mt-2 text-xl text-gray-700 dark:text-gray-400 leading-6">Unsupported block type: {block.type}</div>;
}
