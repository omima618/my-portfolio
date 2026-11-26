/**
 * Builds the static site and publishes ./out to the gh-pages branch, which
 * GitHub Pages serves at https://omima618.github.io/my-portfolio/.
 * Uses a temporary git worktree, so it pushes with this repo's own git setup.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const dir = ".gh-pages-worktree";

run("node scripts/build-pages.mjs");

const sha = execSync("git rev-parse --short HEAD").toString().trim();
run("git fetch origin gh-pages");
if (existsSync(dir)) run(`git worktree remove --force ${dir}`);
run(`git worktree add -f ${dir} origin/gh-pages --detach`);

try {
  for (const f of readdirSync(dir)) if (f !== ".git") rmSync(join(dir, f), { recursive: true, force: true });
  cpSync("out", dir, { recursive: true });
  run("git add -A", { cwd: dir });
  const changed = execSync("git status --porcelain", { cwd: dir }).toString().trim();
  if (!changed) {
    console.log("Nothing to deploy — the live site is already up to date.");
  } else {
    run(`git commit -m "Deploy ${sha}"`, { cwd: dir });
    run("git push origin HEAD:gh-pages", { cwd: dir });
    console.log("\nDeployed → https://omima618.github.io/my-portfolio/ (live in a minute or two)");
  }
} finally {
  run(`git worktree remove --force ${dir}`);
}
