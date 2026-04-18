import Link from "next/link";
import { navLinks, profile } from "@/lib/content";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-line/60">
      <div className="container-page flex items-center justify-between h-14">
        <Link href="#top" className="flex items-center gap-2 font-mono text-sm tracking-tight text-ink">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-bg text-accent text-[11px] font-bold tracking-tighter ring-1 ring-line/60"
          >
            cm
          </span>
          {profile.handle}
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm text-ink-muted">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={profile.resumeHref} className="btn-ghost text-xs py-1.5 px-3" target="_blank" rel="noopener noreferrer">
          Resume ↗
        </a>
      </div>
    </header>
  );
}
