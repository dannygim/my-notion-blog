import { Post } from "$/domain/model/post.ts";

export interface PostRepository {
  GetPosts(): Promise<Post[]>;
}
