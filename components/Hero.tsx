import Image from "next/image";
import { profile, metrics } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="hero-glow relative">
      <div className="container-page pt-20 sm:pt-28 pb-16">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-10">
          <div className="flex-1">
            <p className="section-eyebrow animate-fade-up">Available for senior frontend roles</p>
            <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] animate-fade-up">
              {profile.name}.
              <br />
              <span className="text-ink-muted">{profile.role}.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed animate-fade-up">
              {profile.tagline}.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
              <a href="#contact" className="btn-primary">
                Get in touch →
              </a>
              <a href="#case-studies" className="btn-ghost">
                See case studies
              </a>
            </div>
          </div>

          <div className="mb-10 md:mb-0 shrink-0 animate-fade-up">
            <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full overflow-hidden ring-1 ring-line shadow-xl">
              {/* The avatar is the page's LCP candidate on mobile — `priority` skips lazy-loading so it paints ASAP. */}
              <Image
                src={profile.avatarHref}
                alt={`${profile.name} — ${profile.role}`}
                fill
                priority
                sizes="(min-width: 768px) 14rem, 10rem"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="card animate-fade-up">
              <div className="text-3xl font-semibold tracking-tight text-ink">{m.value}</div>
              <div className="mt-2 text-sm text-ink">{m.label}</div>
              <div className="mt-1 text-xs text-ink-dim font-mono">{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
