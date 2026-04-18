# Architecture

A single-page, server-rendered marketing/portfolio site for `codemaddy`.
Built on Next.js 14 App Router with a content-as-data pattern and a typed
Tailwind design system.

## Goals

- Fast first paint (SSR + self-hosted fonts + `priority` LCP image).
- Strong SEO (metadata API, JSON-LD, sitemap, robots, OG image).
- Zero backend to maintain — Medium posts fetched at build/ISR time,
  contact form submits via Formspree with a `mailto:` fallback.
- Keep content editing to one file so non-code changes are cheap.

## Stack

| Concern       | Tool                                               |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 14 (App Router, RSC by default)            |
| Language      | TypeScript (strict)                                |
| Styling       | Tailwind CSS + CSS custom properties via next/font |
| Fonts         | `next/font/google` (Inter, self-hosted)            |
| Icons / Brand | Inline SVG (`app/icon.svg`), dynamic OG image      |
| Forms         | Formspree (client) + `mailto:` fallback            |
| Blog feed     | Medium RSS via `api.rss2json.com` (ISR, 1 h)       |
| Hosting       | Netlify (`@netlify/plugin-nextjs`)                 |

## Folder structure

```
portfolio/
├── app/                     # Next.js App Router (routes, metadata, OG)
│   ├── layout.tsx           # Root layout: fonts, metadata, JSON-LD, skip link
│   ├── page.tsx             # Home — composes section components
│   ├── not-found.tsx        # 404 (Nav + message + Footer)
│   ├── globals.css          # Tailwind base + shared component classes
│   ├── icon.svg             # Favicon (auto-detected by Next.js)
│   ├── opengraph-image.tsx  # Dynamic 1200x630 OG card (Edge)
│   ├── sitemap.ts           # /sitemap.xml
│   └── robots.ts            # /robots.txt
├── components/              # Presentation components (all server by default)
│   ├── Nav.tsx              # Sticky top bar with brand monogram
│   ├── Hero.tsx             # Headline + avatar + metrics
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── CaseStudies.tsx
│   ├── Skills.tsx
│   ├── Writing.tsx          # async RSC — awaits Medium feed
│   ├── Contact.tsx
│   ├── ContactForm.tsx      # "use client" — only interactive piece
│   ├── Footer.tsx
│   └── JsonLd.tsx           # Person + WebSite + ProfessionalService schema
├── lib/
│   ├── content.ts           # Single source of truth for all site copy
│   └── medium.ts            # RSS → normalized MediumPost[]
├── public/
│   ├── profile.jpg          # Avatar (referenced via profile.avatarHref)
│   └── MadanMohan_SoftwareEngineer.pdf
├── tailwind.config.ts       # Theme tokens (bg/ink/accent/line)
├── next.config.mjs
├── netlify.toml
└── tsconfig.json
```

## Design patterns

### Content-as-data

All user-visible copy — profile, metrics, skills, experience, case studies,
nav links — lives in [lib/content.ts](lib/content.ts) as typed constants.
Components are pure renderers over this data. Editing content never requires
touching a component.

### Server Components first

Every component is a React Server Component except [ContactForm](components/ContactForm.tsx),
which opts in with `"use client"` because it owns local state and a fetch.
This keeps the JS bundle tiny — the form is the only meaningful client JS.

### Design tokens via Tailwind

Colors, max-widths, and fonts are defined once in [tailwind.config.ts](tailwind.config.ts)
(`bg`, `ink`, `accent`, `line`). Reusable component classes (`.card`,
`.chip`, `.btn-primary`, `.btn-ghost`, `.section-title`) live in
[app/globals.css](app/globals.css). Components compose these instead of
repeating utility chains.

### Metadata co-location

Each route owns its own metadata (`export const metadata`). The root layout
sets site-wide defaults (title template, OG, robots, JSON-LD). The OG image
is a React component (`app/opengraph-image.tsx`) rendered by Next to a PNG
on the edge.

## Data flow

```
lib/content.ts ──┬──► Nav, Hero, About, Experience, CaseStudies,
                 │    Skills, Contact, Footer, JsonLd
                 │
lib/medium.ts ───┴──► Writing (async RSC)
                      │
                      └──► rss2json → MediumPost[]

ContactForm (client) ──► Formspree  OR  mailto:
```

- All section components import directly from `lib/content.ts`.
- The Medium feed is fetched server-side with `next: { revalidate: 3600 }`;
  stale-while-revalidate means visitors never wait for the RSS call.
- The home page sets `revalidate = 3600`, so the Medium feed refreshes
  hourly.

## Branding

- **Display name:** `Madan Mohan` — used in hero, footer, JSON-LD, OG card,
  SEO title. This is what recruiters and search engines see.
- **Handle:** `codemaddy` — used in the nav wordmark, OG subdomain label,
  and `alternateName` in the Person schema. The favicon monogram (`cm`)
  is derived from it.

Both live in `profile` in [lib/content.ts](lib/content.ts). Never hardcode
either in a component.

## Accessibility

- Skip-to-content link in `layout.tsx` jumps to `#top`.
- Every section uses `aria-labelledby` pointing at its `h2`.
- The primary nav carries `aria-label="Primary"`.
- The contact form's status region is `aria-live="polite"`; the honeypot
  field is `aria-hidden` with `tabIndex={-1}`.
- Hero image has a meaningful `alt`, not decorative, because it conveys
  identity.

## Performance

- `next/font/google` self-hosts Inter — no render-blocking external CSS.
- Hero avatar uses `priority` + explicit `sizes` for LCP.
- `opengraph-image.tsx` runs on the Edge runtime, so OG generation is
  fast and cached by Next.
- No client-side data fetching on first render; everything hydrates with
  HTML already in place.

## Environment variables

| Name                       | Where        | Purpose                                         |
| -------------------------- | ------------ | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | layout, seo  | Canonical host; falls back to the Netlify URL.  |
| `NEXT_PUBLIC_MEDIUM_URL`   | profile      | "All posts" link in the Writing section.        |
| `NEXT_PUBLIC_FORMSPREE_ID` | ContactForm  | When unset, the form opens the user's mail app. |
| `MEDIUM_USERNAME`          | lib/medium   | Server-only; if unset the Writing section hides.|

## Extending

- **New section:** add a component in `components/`, slot it into
  [app/page.tsx](app/page.tsx), and use `.section` + `.section-title`
  + `.section-eyebrow` for visual consistency.
- **New content:** edit [lib/content.ts](lib/content.ts) — types will
  guide the shape.
- **New route:** create `app/<route>/page.tsx`. Metadata is per-route.
- **Brand rename:** update `profile.handle` and `app/icon.svg`; every
  consumer picks it up automatically.
