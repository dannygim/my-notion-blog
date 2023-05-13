import { Post } from "$/domain/model/post.ts";
import { PostRepository } from "$/domain/repository/post.ts";

export class GetPostUseCase {
  private repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  async execute(pageId: string): Promise<Post> {
    return await this.repository.get(pageId);
  }
}
