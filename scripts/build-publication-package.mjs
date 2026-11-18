import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {validateDraft,sha256} from './validate-publication-package.mjs';
const [input,imageFile,output]=process.argv.slice(2);
const d=JSON.parse(fs.readFileSync(input,'utf8'));
const errors=validateDraft(d);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
const image=fs.readFileSync(imageFile);
const result=spawnSync('python3',['-c','from PIL import Image; import sys; im=Image.open(sys.argv[1]); im.load(); assert im.size==(1600,900), im.size',imageFile],{encoding:'utf8'});
if(result.status!==0)throw Error('Image dimensions/decode failed: '+result.stderr);
const article='STORIES.push('+JSON.stringify(d.story,null,2)+');\n';
const hash=sha256(image);
if(d.image_import.sha256 && d.image_import.sha256!==hash)throw Error('Image hash mismatch');
const p={slug:d.slug,publisher_approved:false,article,evidence:{...d.evidence,slug:d.slug,publisher_approved:false,article_sha256:sha256(article),image:{...d.evidence.image,path:d.image_import.path,sha256:hash,publisher_approved:false}},image_import:{path:d.image_import.path,url:d.image_import.url,sha256:hash}};
const bytes=JSON.stringify(p,null,2)+'\n';
fs.writeFileSync(output,bytes,{flag:'wx'});
console.log('Prepared unapproved package SHA256: '+sha256(bytes));
