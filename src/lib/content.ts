import "server-only";
import { unstable_cache } from "next/cache";
import { projects as fallbackProjects, type Project } from "@/content/site";
import { getDb, isDbConfigured } from "./mongo";

/**
 * Projects come from MongoDB (`projects` collection, seeded with
 * `npm run db:seed`) and fall back to the built-in list if the database is not
 * configured, empty or unreachable — the page never breaks because of the DB.
 *
 * Server build: cached and refreshed at most once an hour.
 * GitHub Pages build: read once at build time and baked into the page.
 */
async function loadProjects(): Promise<Project[]> {
  if (!isDbConfigured()) return fallbackProjects;
  try {
    const db = await getDb();
    const docs = await db
      .collection<Project>("projects")
      .find({ hidden: { $ne: true } }, { projection: { _id: 0 } })
      .sort({ order: 1 })
      .toArray();
    return docs.length ? docs.map((d) => ({ ...d })) : fallbackProjects;
  } catch (err) {
    console.error("[content] using built-in projects:", (err as Error).message);
    return fallbackProjects;
  }
}

export const getProjects = unstable_cache(loadProjects, ["projects"], { revalidate: 3600, tags: ["projects"] });
