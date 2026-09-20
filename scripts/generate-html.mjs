import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

async function generateHtml() {
  const port = 3899;
  process.env.PORT = String(port);
  process.env.NODE_ENV = "production";

  await import("../.output/server/index.mjs");

  // Wait for server to start listening
  await new Promise((resolve) => setTimeout(resolve, 500));

  const html = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });

  if (!html || !html.includes("<html")) {
    throw new Error("Failed to render HTML: output did not contain <html>");
  }

  const distPath = path.resolve(process.cwd(), "dist");
  await fs.mkdir(distPath, { recursive: true });
  await fs.writeFile(path.join(distPath, "index.html"), html, "utf-8");
  console.log("Successfully generated dist/index.html (" + html.length + " bytes)");
  process.exit(0);
}

generateHtml().catch((err) => {
  console.error("Failed to generate static index.html:", err);
  process.exit(0); // non-fatal
});
