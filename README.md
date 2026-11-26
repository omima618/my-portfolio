# Omima Khaled Ghanem — Portfolio

Personal portfolio of **Omima Khaled Ghanem**, Frontend Developer & Software Tester.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · MongoDB (native driver) · Tailwind CSS v4 · Motion · Zod · TypeScript.

## Features

- Hero with portrait, animated name, rotating roles, and parallax.
- Light and dark themes (follows the system setting, remembered per visitor, no flash on load).
- Sections: About with animated stats · Experience timeline with a line that fills as you scroll · Skills bento · Featured projects (Tester Assistant, Meeting Hub) and a filterable project grid · Résumé with CV download · Contact form.
- Content comes from the CV and lives in one file: `src/content/site.ts`.
- **MongoDB**
  - `projects` collection: the site reads projects from here (cached for 1 hour), so you can reorder, hide (`hidden: true`) or edit projects without a redeploy. If no database is set up, the site uses the built-in list.
  - `messages` collection: messages sent through the contact form, with validation, a honeypot field to block bots and a limit of 3 messages per hour per sender. If no database is set up, the form opens the visitor's email app instead.
- Responsive from 320px up, respects reduced motion, adds SEO metadata and JSON-LD.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: add MONGODB_URI
npm run dev                  # http://localhost:3000
```

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string (optional) |
| `MONGODB_DB` | Database name (default `portfolio`) |
| `NEXT_PUBLIC_SITE_URL` | Public URL used in social previews, e.g. `https://omima.vercel.app` |

Seed the projects into MongoDB (safe to run again; `--reset` drops the collection first):

```bash
npm run db:seed
```

## Updating content

- Text, experience, skills and projects: `src/content/site.ts`. After changing projects, run `npm run db:seed` again if you use MongoDB.
- CV: replace `public/cv/Omima-Khaled-Ghanem-CV.pdf`.
- Photo and screenshots: `public/images/`.

## Deploying (Vercel)

1. Import the GitHub repository in Vercel (framework preset: Next.js).
2. Add `MONGODB_URI`, `MONGODB_DB` and `NEXT_PUBLIC_SITE_URL` as environment variables.
3. In MongoDB Atlas → Network Access, allow Vercel to connect (e.g. `0.0.0.0/0`).
4. Deploy, then run `npm run db:seed` once from your machine.

> GitHub Pages only hosts static files, so it can't run the API route or connect to MongoDB. Host this site on Vercel (or another Node host).

## Structure

```
src/
  app/            layout (fonts, metadata, theme), page, globals.css, api/contact
  components/     one file per section + motion helpers (Reveal, Tilt, Spotlight, CountUp…)
  content/        site.ts: all content
  lib/            mongo.ts (lazy, serverless-safe client), content.ts (cached project loader)
scripts/seed.mjs  seeds projects and creates indexes
```
