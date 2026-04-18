export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
};

// Medium's RSS feed is raw XML; rss2json converts it to JSON so we can
// consume it from a Server Component without pulling in an XML parser.
const FEED_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

export async function fetchMediumPosts(limit = 4): Promise<MediumPost[]> {
  const username = process.env.MEDIUM_USERNAME;
  // Gracefully hide the Writing section when the env var isn't configured,
  // instead of rendering an empty/broken block.
  if (!username) return [];

  const handle = username.startsWith("@") ? username.slice(1) : username;
  const feedUrl = `https://medium.com/feed/@${handle}`;

  try {
    // Cache the feed for an hour — Next's ISR keeps the page fast and avoids
    // hitting the proxy on every request.
    const res = await fetch(`${FEED_PROXY}${encodeURIComponent(feedUrl)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as { items?: Array<Record<string, string>> };
    const items = data.items ?? [];

    return items.slice(0, limit).map((item) => ({
      title: item.title ?? "Untitled",
      link: item.link ?? "#",
      pubDate: item.pubDate ?? "",
      excerpt: truncate(stripHtml(item.description ?? ""), 160),
    }));
  } catch {
    // Any network or parse failure is non-fatal — the section just hides.
    return [];
  }
}
