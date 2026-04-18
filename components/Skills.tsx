import { skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="section border-t border-line/60" aria-labelledby="skills-heading">
      <div className="container-page">
        <p className="section-eyebrow">04 — Stack</p>
        <h2 id="skills-heading" className="section-title">Tools I reach for</h2>

        <div className="mt-10 grid sm:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="text-sm font-medium text-ink mb-3">{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
