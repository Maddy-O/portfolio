import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="work" className="section border-t border-line/60" aria-labelledby="work-heading">
      <div className="container-page">
        <p className="section-eyebrow">02 — Experience</p>
        <h2 id="work-heading" className="section-title">Where I&apos;ve shipped</h2>

        <div className="mt-12 space-y-12">
          {experience.map((job) => (
            <article key={job.company} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-12">
              <div>
                <div className="text-xs font-mono text-ink-dim">{job.period}</div>
                <h3 className="mt-1 text-lg font-semibold text-ink">{job.company}</h3>
                <div className="text-sm text-ink-muted">{job.title}</div>
                <div className="mt-1 text-xs text-ink-dim">{job.location}</div>
              </div>
              <ul className="space-y-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-ink-muted leading-relaxed">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
