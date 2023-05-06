import { Client, isFullPage, isNotionClientError } from "@notionhq/client";
import { NOTION_TOKEN, NOTION_DATABASE_ID, PAGE_SIZE } from "$/lib/server/env.ts";
import { PostRepository } from "$/domain/repository/post.ts";
import { Post } from "$/domain/model/post.ts";

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
        .map(p => {
          if (!isFullPage(p)) {
            return null;
          }

          // title
          const name = p.properties.Name;
          const title = name.type === "title" ? name.title.at(0)?.plain_text ?? "Untitled" : "Untitled";

          // description
          const description = p.properties.Description?.type === "rich_text" ? p.properties.Description.rich_text.at(0)?.plain_text : undefined;

          // cover
          let cover: string | undefined;
          if (p.cover?.type === "file") {
            cover = p.cover.file.url;
          } else if (p.cover?.type === "external") {
            cover = p.cover.external.url;
          }

          return {
            id: p.id,
            title,
            description,
            cover,
            createdAt: p.created_time,
            lastEditedAt: p.last_edited_time,
          };
        })
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
