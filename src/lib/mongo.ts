import "server-only";
import { attachDatabasePool } from "@vercel/functions";
import { MongoClient, type Db } from "mongodb";

/**
 * MongoDB is optional: without MONGODB_URI the site renders from
 * src/content/site.ts and the contact form falls back to email.
 *
 * The client connects lazily inside the request that needs it and is cached
 * on globalThis (survives hot reloads and warm serverless instances). A failed
 * connection is discarded so the next request retries with a fresh client.
 */

interface Connection {
  client: MongoClient;
  ready: Promise<MongoClient>;
}

const globalForMongo = globalThis as unknown as { __portfolioMongo?: Connection };

export const isDbConfigured = () => Boolean(process.env.MONGODB_URI);

function connect(uri: string): Connection {
  const client = new MongoClient(uri, {
    appName: "omima-portfolio",
    maxIdleTimeMS: 60_000,
    serverSelectionTimeoutMS: 8_000,
  });
  attachDatabasePool(client);

  const ready = client.connect().catch(async (err: unknown) => {
    console.error("[mongo] connection failed:", (err as Error)?.message);
    if (globalForMongo.__portfolioMongo?.client === client) globalForMongo.__portfolioMongo = undefined;
    await client.close().catch(() => {});
    throw err;
  });
  return { client, ready };
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  globalForMongo.__portfolioMongo ??= connect(uri);
  const client = await globalForMongo.__portfolioMongo.ready;
  return client.db(process.env.MONGODB_DB || "portfolio");
}
