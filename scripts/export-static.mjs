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

await mkdir(resolve(root, "dist/client"), { recursive: true });
await writeFile(clientIndex, await response.text(), "utf8");
await writeFile(
  serverEntry,
  `export default {\n  async fetch(request, env) {\n    const url = new URL(request.url);\n    if (url.pathname === "/") {\n      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));\n    }\n    return env.ASSETS.fetch(request);\n  }\n};\n`,
  "utf8",
);

console.log("Static site export complete.");
