import { caseStudies } from "@/lib/content";

export function CaseStudies() {
  return (
    <section id="case-studies" className="section border-t border-line/60" aria-labelledby="case-studies-heading">
      <div className="container-page">
        <p className="section-eyebrow">03 — Case Studies</p>
        <h2 id="case-studies-heading" className="section-title">Selected work, in depth</h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          Real problems I&apos;ve owned in production — how I framed them, what I tried, and what actually shipped.
        </p>

        <div className="mt-12 space-y-6">
          {caseStudies.map((cs, idx) => (
            <article key={cs.slug} className="card group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-ink-dim">Case study {String(idx + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-ink group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-dim font-mono">Problem</div>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{cs.problem}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-dim font-mono">Approach</div>
                  <ul className="mt-2 space-y-2">
                    {cs.approach.map((a, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-muted leading-relaxed">
                        <span className="text-accent font-mono shrink-0">→</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-dim font-mono">Outcome</div>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{cs.outcome}</p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
