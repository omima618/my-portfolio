import { Code2, Server, ShieldCheck, Sparkles, Users } from "lucide-react";
import { skillGroups } from "@/content/site";
import { Spotlight, Stagger, StaggerItem } from "./motion";
import { SectionHeading } from "./section-heading";

const icons = { code: Code2, shield: ShieldCheck, sparkles: Sparkles, server: Server, users: Users } as const;

// Bento layout: first two groups are the wide ones.
const spans = ["lg:col-span-4", "lg:col-span-2 lg:row-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-6"];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="A toolkit for building"
          accent="and breaking things."
          intro="The frameworks I build with, the tools I test with, and the AI workflows that tie them together."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <StaggerItem key={g.title} className={`${spans[i]} ${i === 4 ? "sm:col-span-2" : ""}`}>
                <Spotlight className="group h-full rounded-3xl border border-line bg-card p-6 transition-colors hover:border-line-strong sm:p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl sm:text-3xl">{g.title}</h3>
                    <span className="grid size-11 place-items-center rounded-2xl border border-line text-accent transition-all duration-500 group-hover:rotate-12 group-hover:bg-accent-soft">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line bg-bg/40 px-3.5 py-1.5 text-sm text-fg-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
