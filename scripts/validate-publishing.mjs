// EP News publishing integrity checks; no external dependencies.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const html = read('index.html');
const sitemap = read('sitemap.xml');
const scripts = new Set([...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)].map(x => x[1].split('?')[0].replace(/^\//, '')));
const recent = [...scripts].filter(p => { const m = p.match(/^content\/[a-z0-9-]+-(20\d{6})\.js$/); return m && m[1] >= '20261109'; });
if (recent.length < 5) failures.push('Expected recent published article scripts are missing from index.html');
for (const file of recent) {
  if (!exists(file)) { failures.push('Missing loaded article: ' + file); continue; }
  const content = read(file);
  const slug = path.basename(file, '.js');
  const field = name => new RegExp('(?:["\\x27]?' + name + '["\\x27]?)\\s*:\\s*["\\x27]').test(content);
  if (!new RegExp('(?:["\\x27]?status["\\x27]?)\\s*:\\s*["\\x27]published["\\x27]').test(content))
    failures.push(slug + ': missing published status');
  for (const name of ['title', 'deck']) if (!field(name)) failures.push(slug + ': missing ' + name);
  if (!sitemap.includes('https://epnews.pages.dev/article/' + slug + '</loc>'))
    failures.push(slug + ': missing from sitemap.xml');
  const image = content.match(/(?:["']?image["']?)\s*:\s*\{[^}]*?(?:["']?src["']?)\s*:\s*["']([^"']+)["']/s)?.[1];
  if (!image) failures.push(slug + ': no hero image src');
  else if (!/^https?:\/\//.test(image) && !exists(image.replace(/^\//, '')))
    failures.push(slug + ': missing local image ' + image);
}
if (failures.length) {
  console.error('Publishing integrity FAILED:\n' + failures.map(x => '- ' + x).join('\n'));
  process.exit(1);
}
console.log('Publishing integrity passed for ' + recent.length + ' recently published article entries.');
