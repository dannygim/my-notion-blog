import { Page } from "$/domain/model/page.ts";
import { PageRepository } from "$/domain/repository/page.ts";

export class GetPageUseCase {
  private pageRepository: PageRepository;

  constructor(pageRepository: PageRepository) {
    this.pageRepository = pageRepository;
  }

  async execute(pageId: string): Promise<Page> {
    return await this.pageRepository.GetPage(pageId);
  }
}
