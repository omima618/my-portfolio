"use client";

import { ArrowUpRight, Check, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { profile } from "@/content/site";
import { isStaticSite, withBase } from "@/lib/paths";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./motion";
import { SectionHeading } from "./section-heading";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string[]>>;

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: true },
  { icon: Phone, label: "Phone / WhatsApp", value: profile.phoneDisplay, href: `tel:${profile.phone}` },
  { icon: LinkedinIcon, label: "LinkedIn", value: "omima-khaled-frontend-dev", href: profile.links.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "omima618", href: profile.links.github },
];

function validate(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  if ((data.name ?? "").trim().length < 2) errors.name = ["Please enter your name"];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email ?? "").trim())) errors.email = ["Please enter a valid email"];
  if ((data.message ?? "").trim().length < 10) errors.message = ["Message is a little short"];
  return errors;
}

function openMail(data: Record<string, string>) {
  const subject = data.subject?.trim() || `Hello from ${data.name}`;
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setError("");
    setFields({});

    if (isStaticSite) {
      // Static hosting (GitHub Pages) has no server: check the fields here,
      // then hand the message to the visitor's email app.
      const errors = validate(data);
      if (Object.keys(errors).length) {
        setFields(errors);
        return;
      }
      openMail(data);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(withBase("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (res.status === 422) {
        setFields(body.fields ?? {});
        setStatus("idle");
        return;
      }
      if (res.status === 503) {
        // No database available — hand the message to the visitor's mail app instead.
        openMail(data);
        setStatus("idle");
        return;
      }
      throw new Error(body.error || "Something went wrong");
    } catch (err) {
      setError((err as Error).message || "Something went wrong — please email me directly.");
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-2xl border border-line bg-bg/50 px-4 py-3.5 text-fg placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent-soft";

  return (
    <section id="contact" className="relative overflow-hidden bg-bg-soft/40 py-24 sm:py-32">
      <div aria-hidden className="aurora bottom-[-30%] left-[-10%] size-[32rem] bg-[var(--glow-1)] opacity-60" />
      <div className="container-x relative">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's build something"
          accent="reliable."
          intro="Have a role, a project or a product that needs both careful building and careful testing? I'd love to hear about it."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="space-y-3">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <div className="group flex items-center gap-4 rounded-3xl border border-line bg-card p-4 transition-colors hover:border-line-strong sm:p-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <c.icon className="size-5" />
                  </span>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="min-w-0 flex-1">
                    <p className="text-xs tracking-wider text-muted uppercase">{c.label}</p>
                    <p className="truncate font-medium transition-colors group-hover:text-accent">{c.value}</p>
                  </a>
                  {c.copy ? (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(c.value).then(() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1800);
                        });
                      }}
                      aria-label="Copy email address"
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:text-accent"
                    >
                      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                    </button>
                  ) : (
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="flex items-center gap-2 px-2 pt-2 text-sm text-muted">
                <MapPin className="size-4 text-accent" /> {profile.location} · {profile.timezone}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative rounded-[2rem] border border-line bg-card p-6 shadow-soft sm:p-9">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                      className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-accent to-gold text-bg"
                    >
                      <Check className="size-8" />
                    </motion.span>
                    <p className="mt-6 font-display text-3xl">Thank you!</p>
                    <p className="mt-2 max-w-xs text-muted">Your message is in. I&apos;ll get back to you as soon as I can.</p>
                    <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-accent underline-offset-4 hover:underline">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm">
                      <span className="text-fg-soft">Your name</span>
                      <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Jane Doe" className={input} aria-invalid={!!fields.name} />
                      {fields.name && <span className="text-xs text-accent">{fields.name[0]}</span>}
                    </label>
                    <label className="grid gap-2 text-sm">
                      <span className="text-fg-soft">Email</span>
                      <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="jane@company.com" className={input} aria-invalid={!!fields.email} />
                      {fields.email && <span className="text-xs text-accent">{fields.email[0]}</span>}
                    </label>
                    <label className="grid gap-2 text-sm sm:col-span-2">
                      <span className="text-fg-soft">Subject <span className="text-muted">(optional)</span></span>
                      <input name="subject" maxLength={120} placeholder="Frontend role / QA project / collaboration" className={input} />
                    </label>
                    <label className="grid gap-2 text-sm sm:col-span-2">
                      <span className="text-fg-soft">Message</span>
                      <textarea name="message" required minLength={10} maxLength={4000} rows={6} placeholder="Tell me a little about it…" className={`${input} resize-y`} aria-invalid={!!fields.message} />
                      {fields.message && <span className="text-xs text-accent">{fields.message[0]}</span>}
                    </label>
                    {/* honeypot */}
                    <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                    <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                      <p className="text-xs text-muted" role="status">
                        {status === "error" ? <span className="text-accent">{error}</span> : "I usually reply within a day or two."}
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-gold px-7 py-3.5 font-medium text-bg shadow-soft transition disabled:opacity-60"
                      >
                        {status === "sending" ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                        {status === "sending" ? "Sending…" : isStaticSite ? "Send via email" : "Send message"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
