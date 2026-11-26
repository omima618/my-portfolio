"use client";

import { ArrowUpRight, Briefcase } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/site";
import { Reveal, Spotlight } from "./motion";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative bg-bg-soft/40 py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've been"
          accent="shipping."
          intro="Remote roles with teams in Turkey, Saudi Arabia and the UAE — building product features and owning their quality."
        />

        <ol ref={ref} className="relative ml-1.5 sm:ml-5">
          {/* track + animated progress line */}
          <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-line" />
          <motion.span aria-hidden style={{ scaleY: line }} className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-accent via-gold to-accent" />

          {experience.map((job, i) => (
            <li key={job.company + job.period} className="relative pb-6 pl-5 last:pb-0 sm:pb-10 sm:pl-14">
              <span aria-hidden className="absolute top-6 left-0 grid size-4 sm:top-7 -translate-x-1/2 place-items-center">
                <span className={`absolute size-4 rounded-full ${job.current ? "animate-ping bg-accent/40" : ""}`} />
                <span className="relative size-3 rounded-full border-2 border-accent bg-bg" />
              </span>

              <Reveal delay={i * 0.05}>
                <Spotlight className="rounded-2xl border border-line bg-card p-5 shadow-soft transition-colors hover:border-line-strong sm:rounded-3xl sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div>
                      <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider text-accent uppercase sm:text-xs">
                        <Briefcase className="size-3.5" />
                        {job.period}
                        {job.current && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px]">Current</span>}
                      </p>
                      <h3 className="mt-2.5 font-display text-[1.6rem] leading-tight sm:mt-3 sm:text-3xl">{job.role}</h3>
                      <p className="mt-1 text-fg-soft">
                        {job.companyUrl ? (
                          <a href={job.companyUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 font-semibold hover:text-accent">
                            {job.company}
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        ) : (
                          <span className="font-semibold">{job.company}</span>
                        )}
                      </p>
                    </div>
                    <p className="text-[13px] text-muted sm:text-right sm:text-sm">
                      {job.type}
                      <span className="sm:hidden"> · </span>
                      <br className="hidden sm:block" />
                      {job.location}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted sm:gap-3 sm:text-[15px]">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent/70" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-fg-soft sm:px-3 sm:py-1 sm:text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
