import { Client, isNotionClientError } from "@notionhq/client";
import { NOTION_TOKEN, NOTION_DATABASE_ID, PAGE_SIZE } from "$/lib/server/env.ts";
import { PostRepository } from "$/domain/repository/post.ts";
import { Post } from "$/domain/model/post.ts";
import { getTitle, getDescription, getCoverUrl, getCreatedAt, getLastEditedAt } from "$/lib/server/notion.ts";

export class PostNotionClient implements PostRepository {
  private notionClient: Client;

  constructor() {
    this.notionClient = new Client({ auth: NOTION_TOKEN });
  }

  async GetPosts(): Promise<Post[]> {
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
