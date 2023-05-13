import { JSX } from "preact/jsx-runtime";

export default function BlockVideo({ url }: { url: string; }) {
  try {
    const urlObj = new URL(url);

    // YouTube video
    let element = tryGenerateYouTubeEmbedCode(urlObj);
    if (element) return element;

    // Video file
    element = tryGenerateVideo(urlObj);
    if (element) return element;
  } catch (error) {
    return null;
  }

  return (<div class="italic text-xl text-gray-700 dark:text-gray-400 leading-relaxed"><a href={url}>{url}</a></div>);
}

function tryGenerateVideo(url: URL): JSX.Element | null {
  // https://developers.notion.com/reference/block#video
  if (/\.(avi|mov|mpeg|mpv|mp4|m4v|wmv)$/.test(url.pathname) === false) {
    return null;
  }

  return <div class="my-2 w-full flex justify-center items-center">
    <video class="w-full" controls>
      <source src={url.href} />
    </video>
  </div>;
}

function tryGenerateYouTubeEmbedCode(url: URL): JSX.Element | null {
  let videoId: string | null | undefined = undefined;

  // YouTube video
  if (url.hostname.includes("youtube.com")) {
    videoId = url.searchParams.get("v");
  } else if (url.hostname.includes("youtu.be")) {
    videoId = url.pathname.split("/").pop();
  }

  if (!videoId) {
    return null;
  }

  return <div class="my-2 w-full flex justify-center items-center">
    <iframe width="516" height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
  </div>;
}
