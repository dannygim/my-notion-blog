import { Client } from "@notionhq/client";
import { NOTION_TOKEN } from "$/lib/server/env.ts";

const notionClient = new Client({ auth: NOTION_TOKEN });

export async function getPage(pageId: string) {
  const res = await notionClient.pages.retrieve({ page_id: pageId });
  console.log("page:", res);
  return res;
}
