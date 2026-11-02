'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const https = require('node:https');
const {pipeline} = require('node:stream/promises');

const SOURCE = 'https://www.energy.gov/sites/default/files/2026-10/3.%20U.S.%20LNG%20Exports%20and%20Re-Exports%20Details%20%28Jan%202016%20-%20Aug%202026%29.xlsx';
const MAX_BYTES = 100 * 1024 * 1024;
const destination = process.argv[2];
if (!destination) { console.error('Usage: node scripts/fetch_europe_lng_doe_workbook_20261102.cjs <output.xlsx>'); process.exit(2); }

function permitted(raw) {
  const u = new URL(raw);
  if (u.protocol !== 'https:' || (u.hostname !== 'energy.gov' && !u.hostname.endsWith('.energy.gov'))) {
    throw new Error('Unexpected download host: ' + u.hostname);
  }
  return u;
}
function request(raw) {
  const u = permitted(raw);
  return new Promise((resolve, reject) => {
    const req = https.get(u, {headers: {'User-Agent': 'EPNewsResearch/1.0'}}, resolve);
    req.setTimeout(30000, () => req.destroy(new Error('DOE download timeout')));
    req.on('error', reject);
  });
}
async function acquire(raw, redirects = 0) {
  if (redirects > 3) throw new Error('Too many redirects');
  const res = await request(raw);
  if ([301, 302, 307, 308].includes(res.statusCode)) {
    const next = res.headers.location;
    res.resume();
    if (!next) throw new Error('Redirect missing Location');
    return acquire(new URL(next, raw).href, redirects + 1);
  }
  if (res.statusCode !== 200) { res.resume(); throw new Error('DOE HTTP ' + res.statusCode); }
  const len = Number(res.headers['content-length']);
  if (Number.isFinite(len) && len > MAX_BYTES) { res.destroy(); throw new Error('Workbook exceeds 100MB'); }
  let bytes = 0;
  const hash = crypto.createHash('sha256');
  const chunks = [];
  for await (const chunk of res) {
    bytes += chunk.length;
    if (bytes > MAX_BYTES) { res.destroy(); throw new Error('Workbook exceeds 100MB'); }
    hash.update(chunk);
    chunks.push(chunk);
  }
  if (!res.complete) throw new Error('Incomplete DOE HTTP response');
  const data = Buffer.concat(chunks);
  if (data.subarray(0, 4).toString('hex') !== '504b0304') throw new Error('Not an XLSX ZIP file');
  return {data, manifest: {sourceUrl: SOURCE, finalUrl: raw, retrievedAt: new Date().toISOString(), sha256: hash.digest('hex'), bytes, reportingThrough: '2026-08', rowLevelAnalyzed: false}};
}
(async () => {
  if (fs.existsSync(destination) || fs.existsSync(destination + '.manifest.json')) throw new Error('Output already exists');
  const {data, manifest} = await acquire(SOURCE);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, data, {flag: 'wx'});
  try { fs.writeFileSync(destination + '.manifest.json', JSON.stringify(manifest, null, 2) + '\n', {flag: 'wx'}); }
  catch (err) { fs.unlinkSync(destination); throw err; }
  console.log(JSON.stringify(manifest));
})().catch(err => { console.error(err.message); process.exitCode = 1; });
