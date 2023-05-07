import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import { BASE_URL, BLOG_TITLE } from "$/lib/server/env.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>{BLOG_TITLE}</title>
        <link
          type="text/css"
          rel="stylesheet"
          href="/style.css"
        />
      </Head>
      <header>
        <nav class="fixed w-full bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-3xl">
            <a href={BASE_URL} class="flex items-center">
              <img src={`${BASE_URL}/logo.png`} class="mr-3 h-6 sm:h-9" alt={BLOG_TITLE} />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{BLOG_TITLE}</span>
            </a>
          </div>
        </nav>
      </header>
      <main class="min-h-screen pt-16 pb-16 lg:pb-24 bg-gray-50 dark:bg-gray-900">
        <Component />
      </main>
    </>
  );
}
