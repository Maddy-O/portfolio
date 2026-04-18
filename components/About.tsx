import { summary } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-page">
        <p className="section-eyebrow">01 — About</p>
        <h2 id="about-heading" className="section-title">What I do</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-10">
          <p className="md:col-span-2 text-lg text-ink-muted leading-relaxed">{summary}</p>
          <ul className="space-y-3 text-sm text-ink-muted">
            <li className="flex gap-3">
              <span className="text-accent font-mono">→</span>
              Render-budget thinking: virtualization, memoization, and code splitting applied where they actually move the needle.
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-mono">→</span>
              Type safety as a design tool, not paperwork.
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-mono">→</span>
              Tests that catch real regressions, not coverage theater.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
