/**
 * Static build for GitHub Pages → ./out
 * Sets GITHUB_PAGES=true (see next.config.ts) and adds .nojekyll so Pages
 * serves the _next/ folder.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://omima618.github.io/my-portfolio",
};
const res = spawnSync("npx", ["next", "build"], { stdio: "inherit", env, shell: true });
if (res.status !== 0) process.exit(res.status ?? 1);
writeFileSync("out/.nojekyll", "");
console.log("\nStatic site ready in ./out");
