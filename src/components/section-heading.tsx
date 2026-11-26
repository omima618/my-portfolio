import { Reveal } from "./motion";

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <Reveal className={`mb-10 sm:mb-16 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      <p className={`mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase ${center ? "justify-center" : ""}`}>
        <span className="text-muted">{index}</span>
        <span className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="font-display text-[2.4rem] leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {title} {accent && <em className="text-gradient italic">{accent}</em>}
      </h2>
      {intro && <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty sm:mt-5 sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
