"use client";

import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { profile } from "@/content/site";
import { isStaticSite, withBase } from "@/lib/paths";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./motion";
import { SectionHeading } from "./section-heading";

type Status = "idle" | "sending" | "sent" | "ready" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string[]>>;
type Draft = { name: string; email: string; subject: string; message: string };

const emptyDraft: Draft = { name: "", email: "", subject: "", message: "" };

/** Compose links for the common web mail apps plus the device's own mail app. */
function composeLinks(subject = "", body = "") {
  const to = profile.email;
  const q = (v: string) => encodeURIComponent(v);
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(to)}&su=${q(subject)}&body=${q(body)}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${q(to)}&subject=${q(subject)}&body=${q(body)}`,
    mailto: `mailto:${to}?subject=${q(subject)}&body=${q(body)}`,
  };
}

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  // Fallback for older browsers / non-secure contexts.
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.append(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  return Promise.resolve();
}

/**
 * "mailto:" alone does nothing on computers without a desktop mail app, so
 * every email action offers Gmail, Outlook, the device's mail app, and copy.
 */
function EmailOptions({ subject, body, copyText, copyLabel }: { subject?: string; body?: string; copyText: string; copyLabel: string }) {
  const links = composeLinks(subject, body);
  const [copied, setCopied] = useState(false);
  const item =
    "flex items-center justify-center gap-2 rounded-2xl border border-line bg-bg/40 px-3 py-3 text-sm font-medium whitespace-nowrap transition hover:border-accent hover:text-accent";
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <a href={links.gmail} target="_blank" rel="noreferrer" className={item}>
        <GmailMark /> Gmail
      </a>
      <a href={links.outlook} target="_blank" rel="noreferrer" className={item}>
        <OutlookMark /> Outlook
      </a>
      <a href={links.mailto} className={item}>
        <Mail className="size-4" /> Email app
      </a>
      <button
        type="button"
        className={item}
        onClick={() =>
          copyToClipboard(copyText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
        }
      >
        {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
        {copied ? "Copied!" : copyLabel}
      </button>
    </div>
  );
}

function GmailMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M2 6.5v11A1.5 1.5 0 0 0 3.5 19H6V9.8l-4-3.3Z" />
      <path fill="#34A853" d="M18 19h2.5a1.5 1.5 0 0 0 1.5-1.5v-11l-4 3.3V19Z" />
      <path fill="#FBBC04" d="M18 5v4.8l4-3.3V5.6c0-1.3-1.5-2-2.5-1.2L18 5Z" />
      <path fill="#EA4335" d="M6 9.8V5l6 4.6L18 5v4.8l-6 4.6-6-4.6Z" />
      <path fill="#C5221F" d="M2 5.6v.9l4 3.3V5L4.5 4.4C3.5 3.6 2 4.3 2 5.6Z" />
    </svg>
  );
}

function OutlookMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <rect x="9" y="5" width="13" height="14" rx="1.5" fill="#28A8EA" />
      <path fill="#0078D4" d="M9 9.5 15.5 13 22 9.5V8l-6.5 3.6L9 8Z" opacity=".9" />
      <rect x="2" y="6.5" width="10" height="11" rx="1.5" fill="#0364B8" />
      <ellipse cx="7" cy="12" rx="2.4" ry="2.9" fill="none" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function ChannelCard({ icon, label, value, href, children }: { icon: ReactNode; label: string; value: string; href?: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const body = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent sm:size-12">{icon}</span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[11px] tracking-wider text-muted uppercase sm:text-xs">{label}</span>
        <span className="block truncate text-[15px] font-medium transition-colors group-hover:text-accent sm:text-base">{value}</span>
      </span>
    </>
  );
  const shell = "group flex w-full items-center gap-3.5 p-4 sm:gap-4 sm:p-5";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-line-strong sm:rounded-3xl">
      {children ? (
        <>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className={shell}>
            {body}
            <ChevronDown className={`size-5 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">{children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={shell}>
          {body}
          <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </a>
      )}
    </div>
  );
}

function validate(data: Draft): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = ["Please enter your name"];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = ["Please enter a valid email"];
  if (data.message.trim().length < 10) errors.message = ["Message is a little short"];
  return errors;
}

const messageOf = (d: Draft) => ({
  subject: d.subject.trim() || `Hello from ${d.name.trim()}`,
  body: `${d.message.trim()}\n\n— ${d.name.trim()} (${d.email.trim()})`,
});

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Draft = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    setDraft(data);
    setError("");

    const errors = validate(data);
    setFields(errors);
    if (Object.keys(errors).length) return;

    // Static hosting (GitHub Pages) has no server: let the visitor pick how to send it.
    if (isStaticSite) {
      setStatus("ready");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(withBase("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: String(form.get("company") ?? "") }),
      });
      if (res.ok) {
        setStatus("sent");
        setDraft(emptyDraft);
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (res.status === 422) {
        setFields(body.fields ?? {});
        setStatus("idle");
        return;
      }
      if (res.status === 503) {
        setStatus("ready"); // no database — fall back to sending by email
        return;
      }
      throw new Error(body.error || "Something went wrong");
    } catch (err) {
      setError((err as Error).message || "Something went wrong — please email me directly.");
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-2xl border border-line bg-bg/50 px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent-soft sm:py-3.5 sm:text-base";
  const msg = messageOf(draft);

  return (
    <section id="contact" className="relative overflow-hidden bg-bg-soft/40 py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="aurora bottom-[-30%] left-[-10%] size-[32rem] bg-[var(--glow-1)] opacity-60" />
      <div className="container-x relative">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's build something"
          accent="reliable."
          intro="Have a role, a project or a product that needs both careful building and careful testing? I'd love to hear about it."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0 space-y-3">
            <Reveal>
              <ChannelCard icon={<Mail className="size-5" />} label="Email" value={profile.email}>
                <EmailOptions copyText={profile.email} copyLabel="Copy address" />
              </ChannelCard>
            </Reveal>
            <Reveal delay={0.06}>
              <ChannelCard icon={<Phone className="size-5" />} label="Phone / WhatsApp" value={profile.phoneDisplay} href={`tel:${profile.phone}`} />
            </Reveal>
            <Reveal delay={0.12}>
              <ChannelCard icon={<LinkedinIcon className="size-5" />} label="LinkedIn" value="omima-khaled-frontend-dev" href={profile.links.linkedin} />
            </Reveal>
            <Reveal delay={0.18}>
              <ChannelCard icon={<GithubIcon className="size-5" />} label="GitHub" value="omima618" href={profile.links.github} />
            </Reveal>
            <Reveal delay={0.24}>
              <p className="flex items-center gap-2 px-2 pt-2 text-sm text-muted">
                <MapPin className="size-4 shrink-0 text-accent" /> {profile.location} · {profile.timezone}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <div className="relative rounded-3xl border border-line bg-card p-5 shadow-soft sm:rounded-[2rem] sm:p-9">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[22rem] flex-col items-center justify-center text-center sm:min-h-[26rem]"
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
                ) : status === "ready" ? (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[22rem] flex-col justify-center sm:min-h-[26rem]"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-accent to-gold text-bg">
                      <Send className="size-5" />
                    </span>
                    <p className="mt-5 font-display text-3xl">Your message is ready</p>
                    <p className="mt-2 text-[15px] text-muted">Choose how you&apos;d like to send it — everything is already filled in.</p>

                    <div className="mt-5 rounded-2xl border border-line bg-bg/40 p-4 text-sm">
                      <p className="truncate text-muted">
                        <span className="text-fg-soft">To:</span> {profile.email}
                      </p>
                      <p className="mt-1 truncate text-muted">
                        <span className="text-fg-soft">Subject:</span> {msg.subject}
                      </p>
                      <p className="mt-2 line-clamp-3 whitespace-pre-line text-fg-soft">{draft.message.trim()}</p>
                    </div>

                    <div className="mt-5">
                      <EmailOptions subject={msg.subject} body={msg.body} copyText={`To: ${profile.email}\nSubject: ${msg.subject}\n\n${msg.body}`} copyLabel="Copy text" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm text-muted transition hover:text-accent"
                    >
                      <ArrowLeft className="size-4" /> Edit message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <label className="grid gap-2 text-sm">
                      <span className="text-fg-soft">Your name</span>
                      <input name="name" defaultValue={draft.name} maxLength={80} autoComplete="name" placeholder="Jane Doe" className={input} aria-invalid={!!fields.name} />
                      {fields.name && <span className="text-xs text-accent">{fields.name[0]}</span>}
                    </label>
                    <label className="grid gap-2 text-sm">
                      <span className="text-fg-soft">Email</span>
                      <input name="email" type="email" defaultValue={draft.email} maxLength={120} autoComplete="email" placeholder="jane@company.com" className={input} aria-invalid={!!fields.email} />
                      {fields.email && <span className="text-xs text-accent">{fields.email[0]}</span>}
                    </label>
                    <label className="grid gap-2 text-sm sm:col-span-2">
                      <span className="text-fg-soft">
                        Subject <span className="text-muted">(optional)</span>
                      </span>
                      <input name="subject" defaultValue={draft.subject} maxLength={120} placeholder="Frontend role / QA project / collaboration" className={input} />
                    </label>
                    <label className="grid gap-2 text-sm sm:col-span-2">
                      <span className="text-fg-soft">Message</span>
                      <textarea
                        name="message"
                        defaultValue={draft.message}
                        maxLength={4000}
                        rows={5}
                        placeholder="Tell me a little about it…"
                        className={`${input} resize-y`}
                        aria-invalid={!!fields.message}
                      />
                      {fields.message && <span className="text-xs text-accent">{fields.message[0]}</span>}
                    </label>
                    {/* honeypot */}
                    <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                    <div className="flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted" role="status">
                        {status === "error" ? <span className="text-accent">{error}</span> : "I usually reply within a day or two."}
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-gold px-7 py-3.5 font-medium text-bg shadow-soft transition disabled:opacity-60 sm:w-auto"
                      >
                        {status === "sending" ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                        {status === "sending" ? "Sending…" : "Send message"}
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
