import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {sha256} from './validate-publication-package.mjs';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ep-approval-'));
try {
 const slug='isolated-preflight-test-fixture',article='STORIES.push({});\n',hash='a'.repeat(64);
 const p={slug,publisher_approved:false,article,evidence:{slug,publisher_approved:false,article_sha256:sha256(article),image:{publisher_approved:false,sha256:hash}},image_import:{sha256:hash}};
 const file=path.join(dir,'review.json'),out=path.join(dir,'approved.json');
 const bytes=JSON.stringify(p);fs.writeFileSync(file,bytes);
 const run=(digest,mode)=>spawnSync(process.execPath,['scripts/approve-prepared-package.mjs',file,digest,slug,mode,out]);
 assert.notEqual(run('0'.repeat(64),'test').status,0);
 assert.notEqual(run(sha256(bytes),'production').status,0);
 assert.equal(run(sha256(bytes),'test').status,0);
 const a=JSON.parse(fs.readFileSync(out));assert.equal(a.article,article);assert.equal(a.dry_run,true);assert.equal(a.publisher_approved,true);assert.equal(a.evidence.image.publisher_approved,true);
 console.log('Approval bridge tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
