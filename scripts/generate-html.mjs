import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Renders every route to a static HTML file under dist/.
 *
 * A static host has no server to hand an unknown path to, so each route needs
 * its own file: "/about" becomes dist/about/index.html. 404.html is a copy of
 * the "/" shell, which lets GitHub Pages fall back to the client router for
 * anything not prerendered (a checkout URL carrying a query string, say).
 */

// Keep in sync with src/routes/. A route listed here that does not exist will
// fail the build rather than ship a silently missing page.
const ROUTES = ["/", "/about", "/checkout", "/login", "/status"];

const PORT = 3899;
const BASE = (process.env.PAGES_BASE || "/").replace(/\/+$/, "");

function getOnce(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode, location: res.headers.location, body: data }),
        );
      })
      .on("error", reject);
  });
}

/**
 * Follows redirects. A route with default search params (checkout defaults to
 * `?cycle=annual`) answers the bare path with a 307 to the canonical URL, and
 * the prerendered file should hold what that URL renders.
 */
async function get(url, hops = 5) {
  let current = url;

  for (let i = 0; i <= hops; i++) {
    const res = await getOnce(current);
    if (res.status >= 300 && res.status < 400 && res.location) {
      current = new URL(res.location, current).toString();
      continue;
    }
    return res;
  }

  throw new Error(`Too many redirects starting at ${url}`);
}

async function generateHtml() {
  process.env.PORT = String(PORT);
  process.env.NODE_ENV = "production";

  await import("../.output/server/index.mjs");

  // Give the server a moment to bind before the first request.
  await new Promise((resolve) => setTimeout(resolve, 500));

  const distPath = path.resolve(process.cwd(), "dist");
  await fs.mkdir(distPath, { recursive: true });

  let rootHtml = "";

  for (const route of ROUTES) {
    const requestPath = `${BASE}${route}`.replace(/\/{2,}/g, "/") || "/";
    const { status, body } = await get(`http://localhost:${PORT}${requestPath}`);

    if (status !== 200 || !body.includes("<html")) {
      throw new Error(`Failed to prerender ${route}: HTTP ${status}, ${body.length} bytes`);
    }

    const outFile =
      route === "/" ? path.join(distPath, "index.html") : path.join(distPath, route, "index.html");

    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, body, "utf-8");
    console.log(`Prerendered ${route} -> ${path.relative(distPath, outFile)} (${body.length} b)`);

    if (route === "/") rootHtml = body;
  }

  // SPA fallback for paths with no prerendered file.
  await fs.writeFile(path.join(distPath, "404.html"), rootHtml, "utf-8");
  console.log("Wrote 404.html (client-router fallback)");

  // Stops Pages running the output through Jekyll, which would drop any
  // build asset whose name begins with an underscore.
  await fs.writeFile(path.join(distPath, ".nojekyll"), "", "utf-8");

  process.exit(0);
}

generateHtml().catch((err) => {
  console.error("Failed to generate static HTML:", err);
  process.exit(1);
});
