import { Post } from "$/domain/model/post.ts";
import { PostRepository } from "$/domain/repository/post.ts";

export class GetPostsUseCase {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async execute(): Promise<Post[]> {
    return await this.postRepository.GetPosts();
  }
}
