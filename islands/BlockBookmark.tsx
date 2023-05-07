import { useEffect, useState } from "preact/hooks";

type State = {
  title: string;
  description: string;
  image?: string | null;
};

export default function BlockBookmark({ url }: { url: string }) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    fetchOgp(url);
  }, []);

  const fetchOgp = async (url: string) => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const metaTags = doc.querySelectorAll('meta[property^="og:"],meta[name^="og:"]');

    const ogpInfo: Record<string, string> = {};

    metaTags.forEach((metaTag) => {
      const property = metaTag.getAttribute("property") ?? metaTag.getAttribute("name");
      const content = metaTag.getAttribute("content");

      if (property && content) ogpInfo[property] = content;
    });

    setState({
      title: ogpInfo["og:title"] ?? "",
      description: ogpInfo["og:description"] ?? "",
      image: ogpInfo["og:image"],
    });
  };

  return (
    <div class="bookmark my-4">
      {!state && <a href={url} class="text-xl text-gray-700 dark:text-gray-400 italic">{url}</a>}
      {state && (<a href={url}><div class="flex h-28 rounded-lg shadow
      border border-gray-100 dark:border-gray-700
      bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div class="flex flex-col grow p-4 text-gray-600 dark:text-white">
          <h3 class="text-base font-bold grow">{state.title}</h3>
          <p class="text-sm">{state.description}</p>
          <p>{url}</p>
        </div>
        {state.image && <img src={state.image} alt={state.title} class="object-cover h-full" />}
      </div></a>)}
    </div>
  );
}
