import { ArrowUp } from "lucide-react";
import { nav, profile } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative border-t border-line pt-16 pb-10 sm:pt-20">
      <div className="container-x">
        <a href="#contact" className="group block w-fit" aria-label="Say hello — go to the contact form">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Have an idea?</p>
          <p className="mt-4 font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
            Say <em className="text-gradient italic">hello</em>
            <span className="ml-2 inline-block text-accent transition-transform duration-500 group-hover:translate-x-3">→</span>
          </p>
        </a>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-fg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent">
              <GithubIcon className="size-4" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent">
              <LinkedinIcon className="size-4" />
            </a>
            <a href="#top" aria-label="Back to top" className="grid size-10 place-items-center rounded-full bg-fg text-bg transition hover:-translate-y-0.5">
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
