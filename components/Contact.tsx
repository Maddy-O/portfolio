import { profile } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="section border-t border-line/60" aria-labelledby="contact-heading">
      <div className="container-page">
        <p className="section-eyebrow">07 — Contact</p>
        <h2 id="contact-heading" className="section-title">Let&apos;s build something solid</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted leading-relaxed">
          Open to senior frontend roles and interesting consulting work. Drop a line — I reply within a day.
        </p>

        <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <ContactForm />

          <div className="space-y-3">
            <a href={`mailto:${profile.email}`} className="card flex items-center justify-between group">
              <div>
                <div className="text-xs font-mono text-ink-dim">Email</div>
                <div className="mt-1 text-ink group-hover:text-accent transition-colors">{profile.email}</div>
              </div>
              <span className="text-ink-dim group-hover:text-accent transition-colors">→</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="card flex items-center justify-between group">
              <div>
                <div className="text-xs font-mono text-ink-dim">LinkedIn</div>
                <div className="mt-1 text-ink group-hover:text-accent transition-colors">linkedin.com/in/maddy-o</div>
              </div>
              <span className="text-ink-dim group-hover:text-accent transition-colors">↗</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="card flex items-center justify-between group">
              <div>
                <div className="text-xs font-mono text-ink-dim">GitHub</div>
                <div className="mt-1 text-ink group-hover:text-accent transition-colors">github.com/Maddy-O</div>
              </div>
              <span className="text-ink-dim group-hover:text-accent transition-colors">↗</span>
            </a>
            <a href={`tel:${profile.phone}`} className="card flex items-center justify-between group">
              <div>
                <div className="text-xs font-mono text-ink-dim">Phone</div>
                <div className="mt-1 text-ink group-hover:text-accent transition-colors">{profile.phone}</div>
              </div>
              <span className="text-ink-dim group-hover:text-accent transition-colors">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
