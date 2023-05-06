import { Page } from "$/domain/model/page.ts";

export interface PageRepository {
  GetPage(pageId: string): Promise<Page>;
}
