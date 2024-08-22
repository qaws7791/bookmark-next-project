import path from "node:path";
import ogs from "open-graph-scraper";

export async function scrapLinkInfo(url: string) {
  console.log("start scraping link -", url);
  // fetch link info
  const linkInfo = await ogs({
    url,
  });

  if (linkInfo.error) {
    return { error: linkInfo.error };
  }
  console.log("success scraping link -", url);
  const title =
    linkInfo.result.ogTitle ||
    linkInfo.result.twitterTitle ||
    new URL(url).origin;
  // 사용가능한 최대 해상도의 이미지를 가져옵니다
  const image = linkInfo.result.ogImage
    ? linkInfo.result.ogImage[0].url
    : linkInfo.result.twitterImage
      ? linkInfo.result.twitterImage[0].url
      : null;
  // favicon
  const favicon = linkInfo.result.favicon
    ? path.join(new URL(url).origin, linkInfo.result.favicon)
    : null;
  return {
    title: title,
    description: linkInfo.result.ogDescription,
    image: image,
    url: linkInfo.result.requestUrl,
    favicon: favicon,
  };
}

export async function downloadImage(url: string) {
  try {
    console.log("start downloading image -", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Image download failed");
    }

    const contentType = response.headers.get("content-type");

    return {
      image: response.arrayBuffer(),
      contentType,
    };
  } catch (error) {
    console.error(`Image download failed(URL:${url})`, error);
    return {
      error: String(error),
    };
  }
}
