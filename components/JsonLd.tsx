import { profile, site, skills, experience } from "@/lib/content";

// Emits three schema.org JSON-LD blocks that Google, Bing, and LinkedIn
// read to build the rich knowledge panel for this site and my name.
export function JsonLd() {
  // Flatten skill groups into a single deduped list for `knowsAbout`.
  const knows = Array.from(new Set(skills.flatMap((g) => g.items)));

  // Person: who I am — name, avatar, contact, employer, education.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.handle,
    url: site.url,
    image: `${site.url}${profile.avatarHref}`,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    sameAs: [profile.linkedin, profile.github, profile.medium].filter(Boolean),
    knowsAbout: knows,
    worksFor: {
      "@type": "Organization",
      name: experience[0]?.company,
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Maharshi Dayanand University, Rohtak" },
      { "@type": "EducationalOrganization", name: "Masai School, Bengaluru" },
    ],
  };

  // WebSite: tells search engines what this site is and who authored it.
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: site.url,
    inLanguage: "en",
    author: { "@type": "Person", name: profile.name },
  };

  // ProfessionalService: signals I offer paid frontend work — helps the
  // site show up for service-intent searches.
  const professional = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${profile.name} — ${profile.role}`,
    url: site.url,
    description:
      "Senior frontend engineering services: React, TypeScript, Next.js, performance optimization, and design-system architecture.",
    areaServed: "Worldwide",
    provider: { "@type": "Person", name: profile.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professional) }}
      />
    </>
  );
}
