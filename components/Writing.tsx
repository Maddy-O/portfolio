import { fetchMediumPosts } from "@/lib/medium";
import { profile } from "@/lib/content";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function Writing() {
  const posts = await fetchMediumPosts(4);
  // Hide the whole section (including its nav anchor) when no posts are
  // available — keeps the page clean if MEDIUM_USERNAME isn't set yet.
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="section border-t border-line/60" aria-labelledby="writing-heading">
      <div className="container-page">
        <p className="section-eyebrow">06 — Writing</p>
        <h2 id="writing-heading" className="section-title">From the blog</h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          Notes on React, performance, and the gnarlier corners of frontend engineering.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {posts.map((p) => (
            <a
              key={p.link}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group block"
            >
              <div className="text-xs font-mono text-ink-dim">{formatDate(p.pubDate)}</div>
              <h3 className="mt-2 text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              {p.excerpt && (
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.excerpt}</p>
              )}
              <div className="mt-4 text-xs font-mono text-ink-dim group-hover:text-accent transition-colors">
                Read on Medium ↗
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="link-underline text-sm">
            All posts on Medium ↗
          </a>
        </div>
      </div>
    </section>
  );
}
