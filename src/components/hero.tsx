"use client";

import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import { withBase } from "@/lib/paths";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Magnetic } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block h-[1.4em] min-w-[16ch] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="absolute inset-x-0 top-0 font-medium whitespace-nowrap text-fg"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Word({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pr-[0.06em] pb-[0.1em] align-bottom">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// Floating chips around the portrait (tablet and up). Offsets stay within the
// photo column's padding so they never run past the screen edge.
const chips = [
  { label: "4+ yrs", sub: "Frontend", className: "-left-6 top-[8%] lg:-left-8", delay: 1.1 },
  { label: "3+ yrs", sub: "Software testing", className: "-right-6 top-[52%] lg:-right-8", delay: 1.25 },
  { label: "AI agents", sub: "for QA workflows", className: "-left-2 -bottom-3 lg:left-0", delay: 1.4 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="aurora top-[-10%] left-[-10%] size-[36rem] bg-[var(--glow-1)]" />
        <div className="aurora top-[20%] right-[-15%] size-[30rem] bg-[var(--glow-2)] [animation-delay:-6s]" />
        <div className="aurora bottom-[-20%] left-[30%] size-[28rem] bg-[var(--glow-3)] [animation-delay:-12s]" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 min-w-0 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs text-muted backdrop-blur sm:mb-7"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <MapPin className="size-3.5" /> {profile.location} · Working remotely
          </motion.p>

          <h1 className="font-display text-[clamp(2.75rem,10.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em] md:text-[clamp(3.5rem,7.6vw,7.5rem)]">
            <Word text="Omima" delay={0.3} />
            <br />
            <Word text="Khaled" delay={0.42} className="text-gradient italic" /> <Word text="Ghanem" delay={0.54} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-5 flex flex-wrap items-center gap-x-2 text-lg leading-[1.4] text-muted sm:mt-7 sm:text-2xl"
          >
            <span>Hi, I&apos;m a</span>
            <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted text-pretty sm:mt-5 sm:text-lg"
          >
            {profile.headline} Angular, React and Next.js on the front — test cases, automation and AI agents behind every release.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-7 grid grid-cols-2 items-center gap-3 sm:mt-9 sm:flex sm:flex-wrap"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-gold px-4 py-3 text-[15px] font-medium whitespace-nowrap text-bg shadow-soft transition hover:shadow-lg sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
              >
                View my work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={withBase(profile.cv)}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-card px-4 py-3 text-[15px] font-medium whitespace-nowrap backdrop-blur transition hover:border-accent hover:text-accent sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
              >
                <Download className="size-4" /> Download CV
              </a>
            </Magnetic>
            <div className="col-span-2 flex items-center justify-center gap-1 sm:ml-1 sm:justify-start">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-accent-soft hover:text-accent">
                <GithubIcon className="size-5" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-accent-soft hover:text-accent">
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: photoY }} className="order-1 w-full md:order-2 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-[12.5rem] sm:max-w-[15rem] md:max-w-md"
          >
            <div className="absolute -inset-3 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--accent),transparent_30%,var(--gold),transparent_70%,var(--accent))] opacity-80 blur-[2px]" />
            <div className="absolute -inset-[7px] rounded-full bg-bg" />
            <svg className="absolute -inset-5 size-[calc(100%+2.5rem)] sm:-inset-8 sm:size-[calc(100%+4rem)] animate-[spin_40s_linear_infinite_reverse] text-line-strong" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 2.5" />
              <circle cx="50" cy="1" r="1.1" fill="var(--accent)" />
            </svg>
            <div className="relative size-full overflow-hidden rounded-full bg-gradient-to-b from-bg-soft to-bg-elev shadow-soft">
              <Image
                src={withBase(profile.photo)}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 448px"
                className="object-cover"
              />
            </div>

            {chips.map((c) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: c.delay, duration: 0.7, ease }}
                className={`absolute z-10 hidden lg:block ${c.className}`}
              >
                <div className="glass-strong animate-float rounded-2xl px-3.5 py-2 shadow-soft sm:px-4 sm:py-2.5" style={{ animationDelay: `${c.delay}s` }}>
                  <p className="font-display text-lg leading-none text-accent sm:text-xl">{c.label}</p>
                  <p className="mt-1 text-[10px] tracking-wide text-muted uppercase sm:text-[11px]">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden"
          >
            {chips.map((c) => (
              <li key={c.label} className="glass-strong rounded-full px-3 py-1.5 text-[11px] whitespace-nowrap text-muted">
                <span className="font-display text-sm text-accent">{c.label}</span> {c.sub}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.25em] text-muted uppercase sm:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
