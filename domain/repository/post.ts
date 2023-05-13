import { Post } from "$/domain/model/post.ts";

export interface PostRepository {
  get(pageId: string): Promise<Post>;
  getList(): Promise<Post[]>;
}
