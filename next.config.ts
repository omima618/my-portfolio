import type { NextConfig } from "next";

/**
 * Two build targets:
 *
 * - default (`npm run build`): full Node.js site — contact form saved to
 *   MongoDB, projects read from MongoDB. Deploy on Vercel or any Node host.
 * - GitHub Pages (`npm run build:pages`, sets GITHUB_PAGES=true): static
 *   export under /my-portfolio. The API route (route.server.ts) is left out via
 *   pageExtensions, and the contact form opens the visitor's email app.
 *   If MONGODB_URI is set at build time, projects are read from MongoDB once
 *   and baked into the page.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/my-portfolio" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Load the MongoDB driver from node_modules instead of bundling it.
  serverExternalPackages: ["mongodb"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // `*.server.ts` files (the contact API) exist only in the server build.
  pageExtensions: isPages ? ["tsx", "ts"] : ["tsx", "ts", "server.ts"],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_SITE: isPages ? "true" : "",
  },
  ...(isPages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif" as const, "image/webp" as const] },
      }),
};

export default nextConfig;
