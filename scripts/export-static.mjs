import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const serverEntry = resolve(root, "dist/server/index.js");
const clientIndex = resolve(root, "dist/client/index.html");

const built = await import(`${new URL(`file:///${serverEntry.replaceAll("\\", "/")}`).href}?t=${Date.now()}`);
const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  IMAGES: {
    input: () => ({
      transform: () => ({
        output: async () => ({ response: () => new Response("Image unavailable", { status: 404 }) }),
      }),
    }),
  },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };
const response = await built.default.fetch(new Request("https://b1-boost-daily-english.nguyendang13012007.chatgpt.site/"), env, ctx);
if (!response.ok) throw new Error(`Static export failed with ${response.status}`);

const pagesBase = "/b1-boost";
const html = (await response.text())
  .replaceAll('"/assets/', `"${pagesBase}/assets/`)
  .replaceAll('"/favicon.svg"', `"${pagesBase}/favicon.svg"`)
  .replaceAll('"/og.png"', `"${pagesBase}/og.png"`);
await mkdir(resolve(root, "dist/client"), { recursive: true });
await writeFile(clientIndex, html, "utf8");
await writeFile(
  serverEntry,
  `const INDEX_HTML = ${JSON.stringify(html)};\n\nexport default {\n  async fetch(request, env) {\n    const url = new URL(request.url);\n    if (url.pathname === "/" || url.pathname === "/index.html") {\n      return new Response(INDEX_HTML, {\n        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },\n      });\n    }\n    return env.ASSETS.fetch(request);\n  }\n};\n`,
  "utf8",
);

console.log("Static site export complete.");
