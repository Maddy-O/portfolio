// Single source of truth for all user-visible copy and identity on the site.
// Components are pure renderers — editing content should not require touching a component.

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maddy-portfolio-site.netlify.app",
  locale: "en_US",
};

// `name` is the formal identity used by SEO, JSON-LD, and hero/footer.
// `handle` is the brand wordmark shown in the nav and OG card (cm monogram).
export const profile = {
  name: "Madan Mohan",
  handle: "codemaddy",
  role: "Frontend Engineer",
  tagline: "React + TypeScript • 3+ years shipping fintech and enterprise platforms",
  location: "Noida, India",
  email: "madandoor7s@gmail.com",
  phone: "+91-9971501423",
  linkedin: "https://www.linkedin.com/in/maddy-o/",
  github: "https://github.com/Maddy-O",
  medium: process.env.NEXT_PUBLIC_MEDIUM_URL ?? "https://medium.com/@madandoor7s",
  resumeHref: "/MadanMohan_SoftwareEngineer.pdf",
  avatarHref: "/profile.jpg",
};

export const seo = {
  keywords: [
    "Madan Mohan",
    "codemaddy",
    "Frontend Engineer",
    "React Developer",
    "TypeScript Developer",
    "Next.js Developer",
    "Senior Frontend Engineer India",
    "AG Grid Performance",
    "Redux Toolkit",
    "Jest React Testing Library",
    "Fintech Frontend Engineer",
  ],
};

export const summary =
  "I build performant, well-tested React interfaces — from 200K-row trading grids at Indus Valley Partners to reusable component systems at Onetick. I care about render budgets, type safety, and shipping code that other engineers can extend without fear.";

export const metrics = [
  { value: "60%", label: "Render perf gain", detail: "AG Grid · 200K rows" },
  { value: "0 → 90%", label: "Test coverage", detail: "Jest + RTL migration" },
  { value: "100+", label: "SonarQube violations resolved", detail: "Production hardening" },
  { value: "30%", label: "Tech debt reduction", detail: "Legacy → React + TS" },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    group: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Styled Components",
      "AG Grid",
      "Webpack",
      "Babel",
    ],
  },
  {
    group: "Performance",
    items: [
      "Code splitting",
      "Lazy loading",
      "Memoization",
      "Virtualization",
      "Tree shaking",
    ],
  },
  {
    group: "Testing & Quality",
    items: ["Jest", "React Testing Library", "Component testing", "SonarQube"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Express.js", "REST APIs", "Axios", "PostgreSQL", "MongoDB"],
  },
  {
    group: "Tooling",
    items: ["Git", "GitHub", "CI/CD", "Docker", "Azure Boards", "Figma", "AWS (EC2, S3, IAM)"],
  },
];

export type Experience = {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Onetick Technologies",
    title: "Software Engineer",
    period: "Sep 2025 — Present",
    location: "Noida, India",
    bullets: [
      "Contributing to Bima Sugam — a government-backed insurance distribution initiative — building the React/TypeScript front end with a strong emphasis on compliance, accessibility, and performance.",
      "Designed a configurable component library with strict TypeScript interfaces — cut duplicated UI code by 25% and unblocked feature delivery across teams.",
      "Built a centralized REST layer with retries, error normalization, and edge-case validation — measurably fewer regressions per release.",
      "Tuned hot paths with memoization, lazy loading, and code splitting; established Jest + RTL from zero, reaching 80% coverage and a 35% drop in production defects.",
      "Resolved 20+ critical SonarQube findings to harden security and maintainability.",
    ],
  },
  {
    company: "Indus Valley Partners",
    title: "Associate Software Engineer",
    period: "Dec 2022 — Apr 2025",
    location: "Noida, India",
    bullets: [
      "Led the legacy → React + TypeScript migration across the platform, reducing tech debt by 30% via modular components.",
      "Drove Redux Toolkit adoption, cutting state-management complexity by 40%; scaled coverage from 0% to 90% with Jest/RTL.",
      "Engineered a virtualized AG Grid for 200K+ row datasets — 60% render performance improvement under production load.",
      "Centralized API logic via Axios interceptors, eliminating ~25% of redundant calls and standardizing error handling.",
      "Closed 100+ SonarQube findings and cut code duplication by 35%.",
      "Translated Figma designs into pixel-perfect responsive UIs; shipped 100+ PRs across sprint cycles on Azure Boards.",
    ],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  problem: string;
  approach: string[];
  outcome: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pics-prison-voice-monitoring",
    title: "PICS — real-time voice monitoring with role-scoped compliance",
    problem:
      "Facilities needed a compliant way to monitor and audit prisoner calls in real time, with strict separation between Super Admin, Admin, and Prisoner roles — and reliable reporting for regulators.",
    approach: [
      "Architected a multi-role platform on Next.js App Router with Server Components + SSR so first paint stays fast on the low-end devices used in the field.",
      "Streamed calls live over WebSockets with Twilio voice integration; every action (call, role change, export) flows through an audit log.",
      "Built an RBAC engine with granular permissions behind a JWT-secured REST API, with media on AWS S3 backed by MongoDB.",
      "Designed accessible analytics dashboards with Recharts — date-range filtering, per-role views, and xlsx export for compliance reporting.",
    ],
    outcome:
      "Shipped a production-ready system with end-to-end TypeScript, audited access paths, and compliance-first UX — role separation, reporting, and real-time monitoring all in one surface.",
    stack: ["Next.js (App Router)", "React 19", "TypeScript", "WebSockets", "Twilio", "Node.js", "MongoDB", "AWS S3", "Recharts"],
  },
  {
    slug: "ag-grid-200k",
    title: "Rendering 200K rows without dropping a frame",
    problem:
      "Analysts at IVP needed to scroll, sort, and filter 200K+ trading records in real time. The legacy grid stalled the main thread for seconds and made bulk edits impractical.",
    approach: [
      "Switched to AG Grid with row + column virtualization tuned to viewport height, not row count.",
      "Pushed cell renderers behind React.memo and stable key generation to stop avoidable re-renders.",
      "Moved derived calculations off the render path with useMemo + selector composition in Redux Toolkit.",
      "Replaced eager fetches with lazy/paginated loading and deferred non-visible column hydration.",
    ],
    outcome:
      "60% improvement in interactive render performance, scrolling stayed at 60fps under full data load, and analysts could finally edit at the speed they thought.",
    stack: ["React", "TypeScript", "AG Grid", "Redux Toolkit", "Webpack"],
  },
  {
    slug: "test-coverage-zero-to-90",
    title: "From 0% to 90% test coverage in a live codebase",
    problem:
      "The platform had no automated tests when I joined. Every release was a vibe-check, and refactors were avoided because nothing would catch a regression.",
    approach: [
      "Stood up Jest + React Testing Library and wired it into CI as a non-blocking signal first, then a gate.",
      "Wrote tests around the highest-traffic flows before touching low-risk code, so coverage growth tracked actual confidence.",
      "Built shared test utilities (render-with-providers, fixture factories) so new tests cost minutes, not hours.",
      "Coached the team via PR reviews to make tests a default, not a chore.",
    ],
    outcome:
      "Reached 90% coverage with the team, unlocked safe refactors, and visibly cut the regression-bug rate per release.",
    stack: ["Jest", "React Testing Library", "TypeScript", "CI/CD"],
  },
  {
    slug: "component-library",
    title: "A component library that teams actually adopt",
    problem:
      "Multiple product teams were rebuilding the same buttons, modals, and form primitives — slightly differently each time. Design drift and bug duplication followed.",
    approach: [
      "Defined strict TypeScript interfaces with discriminated unions so misuse fails at compile time, not runtime.",
      "Kept the API surface small; favored composition over a wall of props.",
      "Documented usage with copy-pasteable examples, not a 40-page wiki nobody reads.",
      "Set up SonarQube gates and Jest snapshots so regressions in shared components surface in one PR review, not three sprints later.",
    ],
    outcome:
      "25% less duplicated UI code across teams and noticeably faster feature delivery on shared primitives.",
    stack: ["React", "TypeScript", "Tailwind", "Jest", "SonarQube"],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
