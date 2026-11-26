/**
 * All portfolio content in one place. Taken from the current CV
 * (public/cv/Omima-Khaled-Ghanem-CV.pdf). Projects are also seeded into
 * MongoDB (`npm run db:seed`); when a database is configured the site reads
 * them from there, otherwise it uses this file.
 */

export const profile = {
  name: "Omima Khaled Ghanem",
  shortName: "Omima Ghanem",
  firstName: "Omima",
  roles: ["Frontend Developer", "Software Tester", "Angular · React · Next.js", "AI-assisted QA"],
  headline: "I build interfaces people trust — and test them until they deserve it.",
  location: "Alexandria, Egypt",
  timezone: "GMT+2 · works remotely",
  email: "omima.khaled.330@gmail.com",
  phone: "+201064490256",
  phoneDisplay: "+20 106 449 0256",
  cv: "/cv/Omima-Khaled-Ghanem-CV.pdf",
  photo: "/images/omima.png",
  links: {
    github: "https://github.com/omima618",
    linkedin: "https://www.linkedin.com/in/omima-khaled-frontend-dev",
  },
  summary: [
    "Frontend developer with 4+ years of experience building web applications with Angular, React and Next.js, as well as native projects, and 3+ years of experience as a software tester across web and mobile platforms. I combine development and QA in one role: I build features, write test cases, run manual and automated tests (Cypress, Java), report bugs and verify fixes — so releases ship stable and reliable.",
    "I use AI professionally to raise the speed and quality of daily work: I build custom tools and AI agents that automate repetitive steps in the development and testing workflow — running test scenarios end to end, preparing test reports and keeping task tracking up to date — then verify their output so nothing ships unchecked.",
    "Experienced in remote, Agile teams across Saudi Arabia, Turkey and the UAE, with clear communication with developers, testers and team leads.",
  ],
} as const;

export const stats = [
  { value: 4, suffix: "+", label: "Years building for the web" },
  { value: 3, suffix: "+", label: "Years in software testing" },
  { value: 4, suffix: "", label: "Companies, all remote" },
  { value: 3, suffix: "", label: "Countries, one team spirit" },
] as const;

export const pillars = [
  {
    title: "Build",
    text: "Angular, React and Next.js interfaces with clean, maintainable code — responsive, accessible and fast.",
  },
  {
    title: "Test",
    text: "Test cases, manual and automated runs (Cypress, Playwright, Java), regression and release testing on web and mobile.",
  },
  {
    title: "Automate",
    text: "AI agents and custom tools that run use cases, write test reports and keep tracking up to date — always verified by hand.",
  },
] as const;

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  type: string;
  location: string;
  current?: boolean;
  points: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    role: "Frontend Developer & Software Tester",
    company: "Workiom",
    companyUrl: "https://www.workiom.com/",
    period: "Dec 2023 — Present",
    type: "Full-time",
    location: "Remote",
    current: true,
    points: [
      "Build and improve features of a no-code work-management platform using Angular, focusing on user experience, performance and maintainability.",
      "Test the product on both web and mobile: write test cases, run manual and automated tests before each release, report bugs and verify fixes.",
      "Built AI-powered QA tools and agents that run use cases in a headless browser, tick passed cases, produce release test reports and update task status — cutting the time of a release test cycle.",
      "Work in an Agile release cycle with product, development and QA teams to deliver stable, user-friendly releases.",
    ],
    tags: ["Angular", "TypeScript", "Release testing", "AI agents", "Playwright"],
  },
  {
    role: "Senior Frontend Developer",
    company: "Global Network Limited",
    companyUrl: "https://www.linkedin.com/company/global.network",
    period: "Jan 2026 — Apr 2026",
    type: "Part-time",
    location: "Remote",
    points: [
      "Built multiple permission-based dashboards using Angular with role-based access control, so each user sees only the pages, data and actions their role allows.",
      "Developed reusable, responsive UI components integrated with REST APIs, keeping the dashboards consistent and easy to maintain.",
      "Collaborated with the remote team to deliver reliable features on schedule.",
    ],
    tags: ["Angular", "RBAC", "REST APIs", "Dashboards"],
  },
  {
    role: "Senior Frontend Developer",
    company: "Mroonah",
    companyUrl: "https://www.linkedin.com/company/mroonah/",
    period: "Jun 2025 — Apr 2026",
    type: "Part-time",
    location: "Riyadh, Saudi Arabia · Remote",
    points: [
      "Built and maintained multiple healthcare websites and dashboards using Angular with clean code and best practices.",
      "Delivered secure, role-based dashboards for admins, healthcare providers and patients.",
      "Refactored and restructured legacy projects to improve speed, readability and scalability.",
    ],
    tags: ["Angular", "Healthcare", "Refactoring", "Role-based access"],
  },
  {
    role: "Frontend Developer",
    company: "Valinteca",
    companyUrl: "https://www.linkedin.com/company/valinteca/",
    period: "Dec 2022 — Dec 2023",
    type: "Full-time",
    location: "UAE · Remote",
    points: [
      "Developed and maintained responsive multi-vendor e-commerce websites and dashboards.",
      "Customized and enhanced Salla and other e-commerce themes to meet business needs.",
    ],
    tags: ["E-commerce", "Salla", "Responsive UI"],
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "code",
    items: ["Angular", "React.js", "Next.js", "TypeScript", "JavaScript", "NgRx", "RxJS", "Redux", "HTML", "CSS / SCSS", "Tailwind CSS", "Bootstrap 5", "Radix UI", "Responsive design"],
  },
  {
    title: "Testing & quality",
    icon: "shield",
    items: ["Manual testing", "Cypress", "Java automated tests", "Playwright", "Vitest", "Test case design", "Regression testing", "Release testing", "Web & mobile testing", "Bug reporting & verification"],
  },
  {
    title: "AI & automation",
    icon: "sparkles",
    items: ["AI-assisted development", "AI agents for dev & QA", "Custom workflow tools", "Prompt engineering", "AI output review"],
  },
  {
    title: "Backend & tools",
    icon: "server",
    items: ["Node.js", "MongoDB", "REST APIs", "Git & GitHub", "Azure DevOps", "Vercel", "Figma", "Adobe XD"],
  },
  {
    title: "Ways of working",
    icon: "users",
    items: ["Agile", "Remote collaboration", "Release cycles", "Clear technical communication"],
  },
] as const;

export const marquee = [
  "Angular", "React", "Next.js", "TypeScript", "RxJS", "NgRx", "Tailwind CSS", "MongoDB", "Node.js",
  "Cypress", "Playwright", "Vitest", "Release testing", "AI agents", "Figma", "Azure DevOps",
];

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights?: string[];
  tech: string[];
  image: string;
  demo?: string;
  repo?: string;
  featured?: boolean;
  category: "Product" | "Client" | "Personal";
  order: number;
}

export const projects: Project[] = [
  {
    slug: "tester-assistant",
    title: "Tester Assistant · Verity",
    tagline: "A workspace for QA engineers, built from my own testing needs.",
    description:
      "Tracks tasks from development through testing to deployment, logs issues that can be resolved, returned or cancelled, and follows releases with progress per version.",
    highlights: [
      "Drag-and-drop board with URL-synced filters",
      "Rich-text notes with autosave and file attachments",
      "Release tracking with progress per version",
      "Optimistic UI and six themes",
    ],
    tech: ["Next.js 16", "React 19", "MongoDB", "Better Auth", "Tailwind CSS", "Tiptap", "dnd-kit", "Zod"],
    image: "/images/projects/tester-assistant.png",
    demo: "https://tester-assistant.vercel.app/",
    featured: true,
    category: "Personal",
    order: 1,
  },
  {
    slug: "meeting-hub",
    title: "Meeting Hub",
    tagline: "Prepare meetings, run them, and capture what was decided.",
    description:
      "A meeting planner with an agenda and goals for every meeting, decisions and action items, an agenda list and month calendar, and live “now / starts in” status.",
    highlights: [
      "Overview KPIs and live meeting status",
      "Export minutes and calendar (.ics) files",
      "English / Arabic with full RTL support",
      "Unit-tested domain logic (Vitest)",
    ],
    tech: ["Next.js 16", "React 19", "MongoDB", "Better Auth", "Zod", "Vitest"],
    image: "/images/projects/meeting-hub.png",
    demo: "https://meeting-hub-lemon.vercel.app/",
    featured: true,
    category: "Personal",
    order: 2,
  },
  {
    slug: "workiom",
    title: "Workiom",
    tagline: "No-code work & workflow management platform.",
    description:
      "Cloud-based work and workflow management platform with customizable apps, automations and integrations with popular third-party tools, on web and mobile.",
    tech: ["Angular", "TypeScript", "RxJS", "QA"],
    image: "/images/projects/workiom.png",
    demo: "https://www.workiom.com/",
    category: "Product",
    order: 3,
  },
  {
    slug: "muslim-scholars",
    title: "Muslim Scholars Association",
    tagline: "Islamic scholarly content platform.",
    description:
      "Website offering comprehensive Islamic scholarly content: religious articles, fatwas, educational resources, a magazine section and events.",
    tech: ["Frontend", "Responsive UI", "Content"],
    image: "/images/projects/muslimc.png",
    demo: "https://muslimsc.net/",
    category: "Client",
    order: 4,
  },
  {
    slug: "movies-hub",
    title: "Movies Hub",
    tagline: "Movie discovery app.",
    description:
      "Explore popular movies, search by title and view ratings, release dates and descriptions in a simple, responsive layout.",
    tech: ["React", "REST API", "CSS"],
    image: "/images/projects/movies-hub.png",
    demo: "https://omima618.github.io/Movies-Hub/",
    repo: "https://github.com/omima618/Movies-Hub",
    category: "Personal",
    order: 5,
  },
  {
    slug: "rently",
    title: "Rently",
    tagline: "Rental property listings.",
    description:
      "Browse rental properties, view price, location and description, filter by preferences and add new properties.",
    tech: ["React", "Filtering", "Forms"],
    image: "/images/projects/rently.png",
    demo: "https://omima618.github.io/Rently/",
    repo: "https://github.com/omima618/Rently",
    category: "Personal",
    order: 6,
  },
  {
    slug: "youtube-channel-browse",
    title: "YouTube Channel Browse",
    tagline: "Watch, note and sort a channel's videos.",
    description: "Browse a YouTube channel's videos with the ability to watch, add notes and sort them.",
    tech: ["JavaScript", "YouTube API"],
    image: "/images/projects/youtube-channel-browse.png",
    demo: "https://omima618.github.io/Youtube-channel-browse/",
    repo: "https://github.com/omima618/Youtube-channel-browse",
    category: "Personal",
    order: 7,
  },
  {
    slug: "weather-app",
    title: "Weather App",
    tagline: "Local and searchable forecasts.",
    description: "Weather details for the current location, plus search for any other location.",
    tech: ["JavaScript", "Geolocation", "Weather API"],
    image: "/images/projects/weather-app.png",
    demo: "https://resilient-fairy-f0b8f0.netlify.app/",
    repo: "https://github.com/omima618/weather-app",
    category: "Personal",
    order: 8,
  },
  {
    slug: "mapty",
    title: "Mapty",
    tagline: "Log workouts on a map.",
    description: "Gets the current location and shows a map where the user can log their workouts.",
    tech: ["JavaScript", "Leaflet", "OOP"],
    image: "/images/projects/mapty-app.png",
    demo: "https://omima618.github.io/Mapty-application/",
    repo: "https://github.com/omima618/Mapty-application",
    category: "Personal",
    order: 9,
  },
  {
    slug: "nest-market",
    title: "Nest Market",
    tagline: "E-commerce theme.",
    description: "A clean, responsive grocery e-commerce theme with product listings and storefront pages.",
    tech: ["HTML", "SCSS", "Bootstrap"],
    image: "/images/projects/nest-market.png",
    demo: "https://omima618.github.io/Nest_Market/",
    repo: "https://github.com/omima618/Nest_Market",
    category: "Personal",
    order: 10,
  },
  {
    slug: "support-desk",
    title: "Support Desk",
    tagline: "Support ticket app.",
    description: "A support ticket system built with the MERN stack: open tickets, follow their status and add notes.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    image: "/images/projects/support-desk.png",
    repo: "https://github.com/omima618/support-disk",
    category: "Personal",
    order: 11,
  },
];

export const education = [
  {
    title: "Frontend Development — Intensive Code Camp (ICC)",
    place: "Information Technology Institute (ITI) — MCIT",
    period: "Aug 2022 — Nov 2022",
    location: "Alexandria, Egypt",
  },
  {
    title: "Bachelor of Agricultural Engineering",
    place: "Kafr El-Sheikh University",
    period: "2014 — 2018",
    location: "Egypt",
  },
] as const;

export const languages = [
  { name: "Arabic", level: "Native", value: 100 },
  { name: "English", level: "Professional", value: 85 },
  { name: "Spanish", level: "Beginner", value: 25 },
] as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
] as const;
