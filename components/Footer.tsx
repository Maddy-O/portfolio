import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line/60 py-10">
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-dim font-mono">
        <div>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js + Tailwind.
        </div>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
