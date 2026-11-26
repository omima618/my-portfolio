"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/content/site";
import { withBase } from "@/lib/paths";
import { GithubIcon } from "./icons";
import { Reveal, Spotlight, Tilt } from "./motion";
import { SectionHeading } from "./section-heading";

function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function BrowserFrame({ project, priority = false, sizes }: { project: Project; priority?: boolean; sizes: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-soft">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-bg-soft px-3 py-0.5 font-mono text-[11px] text-muted">{hostOf(project.demo ?? project.repo)}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={withBase(project.image)}
          alt={`${project.title} screenshot`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="group/l inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
        >
          Live demo
          <ArrowUpRight className="size-4 transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          <GithubIcon className="size-4" /> Source
        </a>
      )}
    </div>
  );
}

function Featured({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <Tilt className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`} max={4}>
          <div className="relative">
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--glow-1)] via-transparent to-[var(--glow-2)] opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
            <BrowserFrame project={project} priority={index === 0} sizes="(max-width: 1024px) 100vw, 680px" />
          </div>
        </Tilt>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Featured · 0{index + 1}
          </p>
          <h3 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{project.title}</h3>
          <p className="mt-3 text-lg text-fg-soft italic">{project.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          {project.highlights && (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-fg-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Links project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Card({ project }: { project: Project }) {
  return (
    <Spotlight className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={withBase(project.image)}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] tracking-wider text-fg-soft uppercase backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10.5px] text-fg-soft">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-sm">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-accent">
              Visit <ArrowUpRight className="size-4" />
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
              <GithubIcon className="size-4" /> Code
            </a>
          )}
        </div>
      </div>
    </Spotlight>
  );
}

const filters = [
  { id: "all", label: "All" },
  { id: "work", label: "Product & client" },
  { id: "Personal", label: "Personal" },
] as const;
type Filter = (typeof filters)[number]["id"];

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [filter, setFilter] = useState<Filter>("all");
  const shown = rest.filter((p) => filter === "all" || (filter === "work" ? p.category !== "Personal" : p.category === filter));

  return (
    <section id="projects" className="relative overflow-x-clip bg-bg-soft/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title="Things I've built"
          accent="with care."
          intro="Two full-stack tools I designed and built around real QA and team needs, followed by product, client and personal work."
        />

        <div className="space-y-24 sm:space-y-32">
          {featured.map((p, i) => (
            <Featured key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-28 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h3 className="font-display text-3xl sm:text-4xl">
              More <em className="text-gradient italic">projects</em>
            </h3>
          </Reveal>
          <div role="tablist" aria-label="Filter projects" className="isolate flex flex-wrap gap-1 rounded-full border border-line bg-card p-1">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${filter === f.id ? "text-bg" : "text-muted hover:text-fg"}`}
              >
                {filter === f.id && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
