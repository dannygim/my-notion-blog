import { Post } from "$/domain/model/post.ts";
import { PostRepository } from "$/domain/repository/post.ts";

export class GetPostsUseCase {
  private repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Post[]> {
    return await this.repository.getList();
  }
}
