// deno-lint-ignore-file no-explicit-any
import { Client } from "@notionhq/client";
import { NOTION_TOKEN } from "$/lib/server/env.ts";
import { PageRepository } from "$/domain/repository/page.ts";
import { Page } from "$/domain/model/page.ts";
import { getTitle, getCoverUrl, getCreatedAt, getLastEditedAt } from "$/lib/server/notion.ts";

export class PageNotionClient implements PageRepository {
  private notionClient: Client;

  constructor() {
    this.notionClient = new Client({ auth: NOTION_TOKEN });
  }
  async GetPage(pageId: string): Promise<Page> {
    const [p, blocks] = await Promise.all([
      this.notionClient.pages.retrieve({ page_id: pageId }),
      this.GetBlocks(pageId),
    ]);

    const page: Page = {
      id: p.id,
      title: getTitle(p),
      cover: getCoverUrl(p),
      createdAt: getCreatedAt(p),
      lastEditedAt: getLastEditedAt(p),
      blocks,
    };
    return page;
  }

  async GetBlocks(blockId: string): Promise<any[]> {
    const { results } = await this.notionClient.blocks.children.list({ block_id: blockId, page_size: 100 });

    const childBlocks = results.map(async (block: any) => {
      if (block.has_children) {
        const children = await this.GetBlocks(block.id);
        return { ...block, children };
      }
      return block;
    });

    return await Promise.all(childBlocks);
  }
}
