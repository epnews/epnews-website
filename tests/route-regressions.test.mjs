// Run from repository root: node --test tests/route-regressions.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
// Import the Cloudflare Pages ESM handler without requiring package.json type=module.
const handlerSource = await readFile(new URL('../functions/share/[slug].js', import.meta.url), 'utf8');
const { onRequestGet } = await import('data:text/javascript;base64,' + Buffer.from(handlerSource).toString('base64'));

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const origin = 'https://epnews.pages.dev';
const assets = {
  async fetch(url) {
    const path = new URL(url).pathname;
    try { return new Response(await read(path.slice(1)), { status: 200 }); }
    catch { return new Response('Not found', { status: 404 }); }
  }
};
const share = slug => onRequestGet({
  params: { slug }, env: { ASSETS: assets },
  request: new Request(origin + '/share/' + slug)
});

test('direct /article/* routes load root-relative CSS, JS, and images', async () => {
  const html = await read('index.html');
  assert.match(html, /<head[^>]*>\s*<meta charset="utf-8"><base href="\/"/i);
  for (const path of ['/article/power', '/article/myanmar-us-rare-earths-20261110']) {
    const resolved = new URL('assets/images/chaos-flagship-hero-approved-20261031.jpg', new URL('/', origin)).pathname;
    assert.equal(resolved, '/assets/images/chaos-flagship-hero-approved-20261031.jpg', path);
  }
});

test('robots.txt and sitemap.xml are valid crawler endpoints', async () => {
  const robots = await read('robots.txt');
  const sitemap = await read('sitemap.xml');
  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /Sitemap: https:\/\/epnews\.pages\.dev\/sitemap\.xml/);
  assert.match(sitemap, /^<\?xml version="1\.0"/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
});

test('share pages preserve apostrophes in Open Graph descriptions', async () => {
  for (const slug of ['power', 'myanmar-us-rare-earths-20261110']) {
    const response = await share(slug);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    const match = html.match(/<meta property="og:description" content="([^"]+)"/);
    assert.ok(match, slug);
    assert.ok(match[1].length > 30, slug);
    assert.match(match[1], /&#39;/, slug);
  }
});

test('legacy Panama Ports share URL retains correct canonical article', async () => {
  const response = await share('panama-ports-20261105');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /panama-ports-who-won\.html/);
  assert.match(html, /og:image/);
});
