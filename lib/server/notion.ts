// deno-lint-ignore-file
import { isFullPage } from "@notionhq/client";

export const getTitle = (page: any): string => {
  const defaultValue = "Untitled";

  if (!isFullPage(page)) {
    return defaultValue;
  }

  const name = page.properties.Name;
  return name.type === "title" ? name.title.at(0)?.plain_text ?? defaultValue : defaultValue;
};

export const getDescription = (page: any): string | undefined => {
  if (!isFullPage(page)) {
    return undefined;
  }

  return page.properties.Description?.type === "rich_text" ? page.properties.Description.rich_text.at(0)?.plain_text : undefined;
};

export const getCoverUrl = (page: any): string | undefined => {
  if (page.cover?.type === "file") {
    return page.cover.file.url;
  } else if (page.cover?.type === "external") {
    return page.cover.external.url;
  }
};

export const getCreatedAt = (page: any): string => {
  if (!isFullPage(page)) {
    throw new Error("page is not full page");

  }

  return page.created_time;
};

export const getLastEditedAt = (page: any): string => {
  if (!isFullPage(page)) {
    throw new Error("page is not full page");
  }

  return page.last_edited_time;
};
