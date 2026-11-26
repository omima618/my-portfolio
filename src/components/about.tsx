import { Bot, Code2, ShieldCheck } from "lucide-react";
import { marquee, pillars, profile, stats } from "@/content/site";
import { CountUp, Reveal, Spotlight, Stagger, StaggerItem } from "./motion";
import { SectionHeading } from "./section-heading";

const pillarIcons = [Code2, ShieldCheck, Bot];

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee-mask overflow-hidden border-y border-line bg-bg-soft/50 py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl whitespace-nowrap text-muted italic sm:text-3xl">
            {m}
            <span className="text-base text-accent not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About me" title="Developer by craft," accent="tester by instinct." />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-fg-soft sm:text-lg">
            {profile.summary.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent" : ""}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Stagger className="grid content-start gap-4">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <StaggerItem key={p.title}>
                  <Spotlight className="group rounded-3xl border border-line bg-card p-6 transition-colors hover:border-line-strong">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-2xl">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                      </div>
                    </div>
                  </Spotlight>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Stagger className="mt-16 grid grid-cols-2 overflow-hidden rounded-3xl border border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              className={`bg-card p-6 sm:p-8 ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
            >
              <p className="font-display text-5xl text-gradient sm:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
