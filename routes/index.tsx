import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "$/domain/model/post.ts";
import { GetPostsUserCase } from "$/usecase/get_posts.ts";
import { PostNotionClient } from "$/infrastructure/post_notion_client.ts";

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'medium' });

type Data = {
  posts: Post[];
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const repository = new PostNotionClient();
    const usecase = new GetPostsUserCase(repository);
    const posts = await usecase.execute();
    return ctx.render({ posts });
  }
};

export default function Page({ data }: PageProps<Data>) {
  return (
    <div class="container p-6 mx-auto grid grid-cols-2 gap-6">
      {data.posts.map((post) => {
        return (
          <a title={post.title} href={`/${post.id}`}>
            <article
              key={post.id}
              class="p-4 block bg-white border border-gray-200 rounded-lg shadow
                hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
                transition duration-150 ease-in-out hover:scale-105">
              <img class="object-cover object-center w-full h-60 rounded-lg" src={post.cover ? post.cover : `./default_cover.jpg`} alt={post.title} />
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
