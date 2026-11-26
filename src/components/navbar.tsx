"use client";

import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, profile } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-gold" />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-soft" : "border border-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-accent to-gold font-display text-lg text-bg italic shadow-soft transition-transform duration-500 group-hover:rotate-[360deg]">
              O
            </span>
            <span className="hidden font-display text-xl tracking-tight sm:inline">
              Omima<span className="text-accent">.</span>
            </span>
          </a>

          <ul className="isolate hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === item.id ? "text-fg" : "text-muted hover:text-fg"}`}
                >
                  {active === item.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-accent-soft" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.cv}
              download
              className="hidden items-center gap-2 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-90 sm:inline-flex"
            >
              <Download className="size-4" /> CV
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex h-full flex-col py-6">
              <div className="flex justify-end">
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-10 place-items-center rounded-full border border-line">
                  <X className="size-4" />
                </button>
              </div>
              <ul className="mt-10 flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.li key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 font-display text-4xl">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href={profile.cv} download className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-4 font-medium text-bg">
                <Download className="size-4" /> Download my CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
