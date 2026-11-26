import { About, Marquee } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Resume } from "@/components/resume";
import { Skills } from "@/components/skills";
import { profile } from "@/content/site";
import { getProjects } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Frontend Developer & Software Tester",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Alexandria", addressCountry: "EG" },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: ["Angular", "React", "Next.js", "TypeScript", "Software Testing", "Cypress", "Playwright", "MongoDB"],
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Projects projects={projects} />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
