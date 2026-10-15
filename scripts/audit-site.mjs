import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);
const files=walk(root).filter(f=>f.endsWith('.html'));
const failures=[];let internalLinks=0;let schemas=0;
const redirects=fs.readFileSync('public/_redirects','utf8').split(/\r?\n/).filter(x=>x.trim()&&!x.trim().startsWith('#')).map(x=>x.trim().split(/\s+/));
function resolveFile(url){const rel=decodeURIComponent(url.pathname).replace(/^\/+/, ''); const base=path.resolve(root,rel);if(!base.startsWith(root+path.sep)&&base!==root)return null;return [base,path.join(base,'index.html'),base+'.html'].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile())}
function redirectsTo(url){for(const [from,to,status] of redirects){const pattern='^'+from.split('*').map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('(.*)')+'$'; const match=url.pathname.match(new RegExp(pattern));if(match&&/^30[128]/.test(status||''))return new URL(to.replace(':splat',match[1]||''),'https://rogermurillo.co');}return null;}
for(const file of files){const html=fs.readFileSync(file,'utf8');const rel=path.relative(root,file).replaceAll('\\','/');const route='/'+rel.replace(/index\.html$/,'');const origin=new URL(route,'https://rogermurillo.co');
 if(!/http-equiv="refresh"/i.test(html) && (html.match(/<h1\b/g)||[]).length!==1)failures.push({page:route,issue:'h1 count',value:(html.match(/<h1\b/g)||[]).length});
 if(!/<link\b[^>]*rel="canonical"/.test(html))failures.push({page:route,issue:'canonical missing'});
 for(const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){try{JSON.parse(m[1]);schemas++}catch{failures.push({page:route,issue:'invalid schema JSON'})}}
 for(const m of html.matchAll(/\b(href|src)="([^"]+)"/g)){const raw=m[2].replaceAll('&amp;','&');if(!raw||/^(#|mailto:|tel:|data:|javascript:)/.test(raw))continue;let url;try{url=new URL(raw,origin)}catch{continue}if(url.origin!==origin.origin)continue;internalLinks++;let target=resolveFile(url);if(!target){const redir=redirectsTo(url);if(redir)target=resolveFile(redir)}if(!target)failures.push({page:route,issue:'missing internal target',url:url.pathname});}
}
const sitemap=fs.readFileSync(path.join(root,'sitemap-0.xml'),'utf8');const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
for(const loc of sitemapUrls){const file=resolveFile(new URL(loc));if(!file)failures.push({issue:'sitemap missing page',url:loc});else if(/name="robots" content="[^"]*noindex/.test(fs.readFileSync(file,'utf8')))failures.push({issue:'noindex in sitemap',url:loc});}
if(/^Disallow:\s*\/_astro/m.test(fs.readFileSync('public/robots.txt','utf8')))failures.push({issue:'Astro blocked'});
const unique=[...new Map(failures.map(x=>[JSON.stringify(x),x])).values()];
console.log(JSON.stringify({pages:files.length,sitemapUrls:sitemapUrls.length,internalLinks,schemas,failures:unique},null,2));
process.exitCode=unique.length?1:0;
