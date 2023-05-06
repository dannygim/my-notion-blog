import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import { BLOG_TITLE } from "$/lib/server/env.ts";

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
      <main class="min-h-screen pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gray-50 dark:bg-gray-900">
        <Component />
      </main>
    </>
  );
}
