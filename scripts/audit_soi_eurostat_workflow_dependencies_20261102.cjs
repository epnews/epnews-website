'use strict';
const fs=require('node:fs');const path=require('node:path');
const workflow='.github/workflows/soi-eurostat-hicp-official-verify.yml';
if(!fs.existsSync(workflow)){console.log('Eurostat workflow not merged yet; dependency gate will activate once present');process.exit(0)}
const y=fs.readFileSync(workflow,'utf8');
const refs=[...y.matchAll(/(?:run:\s*|\s)(?:node\s+)(scripts\/[\w./-]+\.cjs)/g)].map(x=>x[1]);
if(!refs.length)throw Error('Eurostat verification workflow must invoke local node scripts');
for(const script of refs){if(!fs.existsSync(script))throw Error('Missing workflow dependency: '+script+' (merge source PR before deploying verification workflow)');const source=fs.readFileSync(script,'utf8');if(!source.trim())throw Error('Empty workflow dependency: '+script);}
if(!y.includes('workflow_dispatch:'))throw Error('Missing manual dispatch trigger');
if(!y.includes('actions/upload-artifact@'))throw Error('Missing audit artifact retention');
console.log('Eurostat workflow dependency gate: '+refs.join(', '));
