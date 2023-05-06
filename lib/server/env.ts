import "std/dotenv/load.ts";

export const NOTION_TOKEN = Deno.env.get("NOTION_TOKEN") || "";
export const NOTION_DATABASE_ID = Deno.env.get("NOTION_DATABASE_ID") || "";
export const BASE_URL = Deno.env.get("BASE_URL") || "";
export const BLOG_TITLE = Deno.env.get("BLOG_TITLE") || "";
export const PAGE_SIZE = parseInt(Deno.env.get("PAGE_SIZE") || "10");
