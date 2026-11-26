/**
 * Seeds the `projects` collection from src/content/site.ts and creates indexes.
 *   npm run db:seed            upsert all projects (keeps edits to other fields)
 *   npm run db:seed -- --reset drop the collection first
 */
import { MongoClient } from "mongodb";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Set MONGODB_URI in .env.local first");

// Load the TypeScript content module without a build step.
const source = await readFile(new URL("../src/content/site.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { projects } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "portfolio");
const col = db.collection("projects");

if (process.argv.includes("--reset")) await col.drop().catch(() => {});
await col.createIndex({ slug: 1 }, { unique: true });
await col.createIndex({ order: 1 });
await db.collection("messages").createIndex({ email: 1, createdAt: -1 });
await db.collection("messages").createIndex({ createdAt: -1 });

for (const p of projects) {
  await col.updateOne({ slug: p.slug }, { $set: { ...p, updatedAt: new Date() } }, { upsert: true });
}
console.log(`Seeded ${projects.length} projects into "${db.databaseName}".`);
await client.close();
