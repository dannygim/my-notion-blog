// deno-lint-ignore-file no-explicit-any
import { Client, isNotionClientError } from "@notionhq/client";
import { NOTION_TOKEN, NOTION_DATABASE_ID, PAGE_SIZE } from "$/lib/server/env.ts";
import { PostRepository } from "$/domain/repository/post.ts";
import { Post } from "$/domain/model/post.ts";
import { getTitle, getDescription, getCoverUrl, getCreatedAt, getLastEditedAt } from "$/lib/server/notion.ts";

export class PostNotionRepository implements PostRepository {
  private notionClient: Client;

  constructor() {
    this.notionClient = new Client({ auth: NOTION_TOKEN });
  }

  async get(pageId: string): Promise<Post> {
    const [p, blocks] = await Promise.all([
      this.notionClient.pages.retrieve({ page_id: pageId }),
      this.getBlocks(pageId),
    ]);

    const post: Post = {
      id: p.id,
      title: getTitle(p),
      cover: getCoverUrl(p),
      createdAt: getCreatedAt(p),
      lastEditedAt: getLastEditedAt(p),
      blocks,
    };
    return post;
  }

  private async getBlocks(blockId: string): Promise<any[]> {
    const { results } = await this.notionClient.blocks.children.list({ block_id: blockId, page_size: 100 });

    const childBlocks = results.map(async (block: any) => {
      if (block.has_children) {
        const children = await this.getBlocks(block.id);
        return { ...block, children };
      }
      return block;
    });

    return await Promise.all(childBlocks);
  }

  async getList(): Promise<Post[]> {
    try {
      const response = await this.notionClient.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
          "property": "Tags",
          "multi_select": {
            "does_not_contain": "Draft",
          }
        },
        page_size: PAGE_SIZE,
        archived: false,
      });

      const posts = response.results
        .map(p => ({
          id: p.id,
          title: getTitle(p),
          description: getDescription(p),
          cover: getCoverUrl(p),
          createdAt: getCreatedAt(p),
          lastEditedAt: getLastEditedAt(p),
        }))
        .filter(p => !!p) as Post[];

      return posts;
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        console.error("Notion Error:", error);
      } else {
        console.error("Unknown Error:", error);
      }
      return [];
    }
  }
}
