import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "$/domain/model/post.ts";
import { GetPostsUseCase } from "$/usecase/get_posts.ts";
import { PostNotionRepository } from "$/infrastructure/post_notion_client.ts";

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'medium' });

type Data = {
  posts: Post[];
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repository = new PostNotionRepository();
    const usecase = new GetPostsUseCase(repository);
    const posts = await usecase.execute();
    return ctx.render({ posts });
  }
};

export default function Page({ data }: PageProps<Data>) {
  return (
    <div class="max-w-3xl mx-auto px-3 md:px-6 grid md:grid-cols-2 gap-4 lg:gap-6">
      {data.posts.map((post) => {
        return (
          <a title={post.title} href={`/${post.id}`}>
            <article
              key={post.id}
              class="p-4 block border border-gray-100 dark:border-gray-700 rounded-lg shadow
                bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700
                transition duration-150 ease-in-out hover:scale-105">
              <img class="object-cover object-center w-full h-60 rounded-lg" src={post.cover ?? `./default_cover.jpg`} alt={post.title} />
              <div class="mb-2 mt-4 text-sm text-gray-700 dark:text-gray-300">{dateFormatter.format(new Date(post.createdAt))}</div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
            </article>
          </a>
        );
      })}
    </div>
  );
}
