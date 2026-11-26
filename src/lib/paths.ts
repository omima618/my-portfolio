/**
 * Prefixes a public asset path with the base path. On GitHub Pages the site
 * lives under /my-portfolio, and next/image and plain links don't add it.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const isStaticSite = process.env.NEXT_PUBLIC_STATIC_SITE === "true";
export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
