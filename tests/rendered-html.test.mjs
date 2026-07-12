import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Vietnamese learning dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="vi">/);
  assert.match(html, /<title>B1 Boost — Luyện tiếng Anh mỗi ngày<\/title>/);
  assert.match(html, /KẾ HOẠCH HỌC HÔM NAY/);
  assert.match(html, /Ngữ pháp/);
  assert.match(html, /Từ vựng/);
  assert.match(html, /Tiến độ/);
  assert.match(html, /Bắt đầu bài tiếp theo/);
  assert.doesNotMatch(html, /Ngá»|Tiáº|Tá»|Ã´|Ä‘|Â·/);
});

test("keeps the complete learning content and responsive styles", async () => {
  const [page, content, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /grammarGoal: 5/);
  assert.match(page, /vocabGoal: 3/);
  assert.match(page, /SIUUU!/);
  assert.match(page, /lastGoalDate/);
  assert.match(page, /b1-boost-custom-questions/);
  assert.match(page, /Nạp thêm câu hỏi bằng file CSV/);
  assert.match(page, /parseCsv/);
  assert.match(content, /export const grammarUnits/);
  assert.match(content, /export const vocabTopics/);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /Khả năng đọc và độ tương phản/);
  assert.match(layout, /lang="vi"/);
});
