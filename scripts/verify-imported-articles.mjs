import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

// Only strictly preflight article files changed on this feature branch.
// Historical articles are covered by the separate all-article integrity audit;
// older schema variations must not block a new article's image import.
const base=process.env.GITHUB_BASE_REF || 'main';
execFileSync('git',['fetch','--no-tags','origin',base],{stdio:'inherit'});
const changed=execFileSync('git',['diff','--name-only','origin/'+base+'...HEAD'],{encoding:'utf8'}).trim().split('\n').filter(p=>/^content\/[a-z0-9-]+\.js$/.test(p)&&!['content/editorial.js','content/stories.js'].includes(p));
let count=0;
for(const path of changed){
  if(!fs.existsSync(path))continue;
  execFileSync(process.execPath,['scripts/validate-editorial-evidence.mjs',path],{stdio:'inherit'});
  execFileSync(process.execPath,['--check',path],{stdio:'inherit'});
  execFileSync(process.execPath,['scripts/preflight-article.mjs',path],{stdio:'inherit'});
  count++;
}
console.log('Strictly verified '+count+' changed article package(s); historical articles covered by all-article audit');
