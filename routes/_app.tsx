import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import { BLOG_TITLE } from "$/lib/server/env.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>{BLOG_TITLE}</title>
      </Head>
      <Component />
    </>
  );
}
