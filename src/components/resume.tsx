"use client";

import { Download, Eye, GraduationCap, Languages } from "lucide-react";
import { motion } from "motion/react";
import { education, experience, languages, profile } from "@/content/site";
import { Magnetic, Reveal, Tilt } from "./motion";
import { SectionHeading } from "./section-heading";

/** A miniature, styled "paper" version of the CV's first page. */
function PaperPreview() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-2xl border border-line bg-bg-soft" />
      <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rotate-[1.5deg] rounded-2xl border border-line bg-bg-elev" />
      <div className="relative aspect-[1/1.414] overflow-hidden rounded-2xl border border-line-strong bg-[#fffdfb] p-6 text-[#1b2a4a] shadow-soft sm:p-7">
        <p className="font-serif text-xl leading-none font-semibold sm:text-2xl">{profile.name}</p>
        <p className="mt-1.5 text-[10px] sm:text-xs">Frontend Developer · Software Tester</p>
        <p className="mt-1 text-[8px] text-[#555] sm:text-[9px]">
          {profile.location} · {profile.email}
        </p>

        {["Profile", "Work experience"].map((h, s) => (
          <div key={h} className="mt-4">
            <p className="border-b border-[#bbb] pb-0.5 text-[8px] font-bold tracking-[0.14em] uppercase sm:text-[9px]">{h}</p>
            {s === 0 ? (
              <div className="mt-1.5 space-y-1">
                {[100, 96, 100, 70].map((w, i) => (
                  <span key={i} className="block h-[5px] rounded-full bg-[#1b2a4a]/12" style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : (
              experience.slice(0, 3).map((e) => (
                <div key={e.company} className="mt-2">
                  <div className="flex justify-between text-[8px] font-bold sm:text-[9px]">
                    <span className="truncate">
                      {e.role} – {e.company}
                    </span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {[92, 80].map((w, i) => (
                      <span key={i} className="block h-[4px] rounded-full bg-[#1b2a4a]/10" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fffdfb] to-transparent" />
        <span className="absolute right-4 bottom-4 rounded-md bg-[#1b2a4a] px-2 py-1 font-mono text-[9px] text-white">PDF · 1 page</span>
      </div>
    </div>
  );
}

export function Resume() {
  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Résumé" title="The full story," accent="on paper." />

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card p-8 sm:p-10">
              <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-[var(--glow-1)] blur-3xl" />
              <Tilt max={5}>
                <PaperPreview />
              </Tilt>
              <div className="relative mt-10 text-center">
                <p className="font-display text-2xl">Download my CV</p>
                <p className="mt-1 text-sm text-muted">Updated November 2026 · PDF</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Magnetic>
                    <a
                      href={profile.cv}
                      download
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-gold px-6 py-3 font-medium text-bg shadow-soft"
                    >
                      <Download className="size-4" /> Download PDF
                    </a>
                  </Magnetic>
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium transition hover:border-accent hover:text-accent"
                  >
                    <Eye className="size-4" /> View online
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-12">
            <div>
              <Reveal>
                <h3 className="mb-6 flex items-center gap-3 font-display text-3xl">
                  <GraduationCap className="size-6 text-accent" /> Education
                </h3>
              </Reveal>
              <div className="space-y-4">
                {education.map((e, i) => (
                  <Reveal key={e.title} delay={i * 0.08}>
                    <div className="rounded-3xl border border-line bg-card p-6 transition-colors hover:border-line-strong">
                      <p className="font-mono text-xs tracking-wider text-accent uppercase">{e.period}</p>
                      <p className="mt-2 text-lg font-semibold">{e.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {e.place} · {e.location}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h3 className="mb-6 flex items-center gap-3 font-display text-3xl">
                  <Languages className="size-6 text-accent" /> Languages
                </h3>
              </Reveal>
              <div className="space-y-5 rounded-3xl border border-line bg-card p-6">
                {languages.map((l, i) => (
                  <div key={l.name}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-sm text-muted">{l.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-gold"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
