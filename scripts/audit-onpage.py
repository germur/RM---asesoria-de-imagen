import sys,json,re,time,urllib.request,urllib.error,concurrent.futures,collections
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
SITE='https://rogermurillo.co'
class Page(HTMLParser):
 def __init__(self):
  super().__init__(convert_charrefs=True);self.title='';self.desc=[];self.canon=[];self.robots=[];self.headings=[];self.main=False;self.heading=None;self.title_on=False;self.schema_on=False;self.schema_text='';self.schemas=[];self.links=[];self.ids=set();self.images=[];self.redirect=False
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if t=='a' and 'name' in a:self.ids.add(a['name'])
  if t=='main':self.main=True
  if t=='title':self.title_on=True
  if t=='meta' and a.get('http-equiv','').lower()=='refresh':self.redirect=True
  if t=='meta' and a.get('name')=='description':self.desc.append(a.get('content',''))
  if t=='meta' and a.get('name')=='robots':self.robots.append(a.get('content',''))
  if t=='link' and a.get('rel')=='canonical':self.canon.append(a.get('href',''))
  if re.fullmatch('h[1-6]',t) and self.main:self.heading=[int(t[1]),'']
  if t=='a' and 'href' in a:self.links.append(a['href'])
  if t=='img':self.images.append(a)
  if t=='script' and a.get('type')=='application/ld+json':self.schema_on=True;self.schema_text=''
 def handle_data(self,d):
  if self.title_on:self.title+=d
  if self.heading is not None:self.heading[1]+=d
  if self.schema_on:self.schema_text+=d
 def handle_endtag(self,t):
  if t=='title':self.title_on=False
  if t=='main':self.main=False
  if re.fullmatch('h[1-6]',t) and self.heading is not None:self.headings.append([self.heading[0],' '.join(self.heading[1].split())]);self.heading=None
  if t=='script' and self.schema_on:
   self.schema_on=False
   try:self.schemas.append(json.loads(self.schema_text))
   except ValueError:self.schemas.append({'invalid_json':True})
def fetch(route):
 start=time.time();url=urljoin(SITE,route)
 try:
  if '--local' in sys.argv:
   file=Path('dist')/route.lstrip('/');file=file if file.suffix=='.html' else file/'index.html'
   text=file.read_text(encoding='utf-8');status=200;final_url=url
  else:
   with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'RM-Onpage-Verification/1.0'}),timeout=30) as r:
    text=r.read().decode('utf-8');status=r.status;final_url=r.url
  p=Page();p.feed(text);return route,{'status':status,'final_url':final_url,'redirect_document':p.redirect,'seconds':round(time.time()-start,2),'title':p.title.strip(),'descriptions':p.desc,'canonicals':p.canon,'robots':p.robots,'headings':p.headings,'schemas':p.schemas,'links':p.links,'ids':sorted(p.ids),'images_missing_alt':[x.get('src') for x in p.images if 'alt' not in x]}

 except urllib.error.HTTPError as e:return route,{'status':e.code,'error':str(e)}
 except Exception as e:return route,{'status':None,'error':str(e)}
root=Path('dist');routes=['/'+str(f.relative_to(root)).replace('\\','/').replace('/index.html','/').replace('index.html','') for f in root.rglob('*.html')]
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:pages=dict(pool.map(fetch,routes))
issues=[];warnings=[];dups={};description_dups={};all_links=set();checked_anchors=0
for route,p in pages.items():
 if p['status']!=200:issues.append({'page':route,'issue':'HTTP','value':p['status']});continue
 if p.get('final_url')!=urljoin(SITE,route):warnings.append({'page':route,'issue':'redirect','value':p['final_url']})
 if p.get('redirect_document'):continue
 if not p.get('title'):issues.append({'page':route,'issue':'missing_title'})
 if len(p.get('descriptions',[]))!=1 or not p['descriptions'][0]:issues.append({'page':route,'issue':'description_count'})
 if len(p.get('canonicals',[]))!=1:issues.append({'page':route,'issue':'canonical_count'})
 indexable=not any('noindex' in x for x in p.get('robots',[]))
 if indexable:
  dups.setdefault(p['title'],[]).append(route)
  if p['descriptions']:description_dups.setdefault(p['descriptions'][0],[]).append(route)
  if p.get('canonicals')!=[urljoin(SITE,route)]:issues.append({'page':route,'issue':'canonical_mismatch','value':p.get('canonicals')})
  for key,value in [('title',p['title']),('description',p['descriptions'][0] if p['descriptions'] else '')]:
   if len(value)>(75 if key=='title' else 180) or len(value)<(20 if key=='title' else 65):warnings.append({'page':route,'issue':key+'_length','length':len(value),'value':value})
 hs=p.get('headings',[])
 if sum(h[0]==1 for h in hs)!=1 and route!='/404.html':issues.append({'page':route,'issue':'main_h1_count','value':hs})
 prev=0
 for level,text in hs:
  if not text:issues.append({'page':route,'issue':'empty_heading','level':level})
  if prev and level>prev+1:warnings.append({'page':route,'issue':'heading_skip','from':prev,'to':level,'text':text})
  prev=level
 for s in p.get('schemas',[]):
  if s.get('invalid_json'):issues.append({'page':route,'issue':'schema_json'})
  nodes=s.get('@graph',[s])
  for node in nodes:
   if node.get('@type')=='BreadcrumbList':
    items=node.get('itemListElement',[])
    if len(items)<2:issues.append({'page':route,'issue':'breadcrumb_too_short'})
    for i,item in enumerate(items):
     if item.get('position')!=i+1 or not item.get('name'):issues.append({'page':route,'issue':'breadcrumb_sequence_or_name'})
     if i<len(items)-1 and not item.get('item'):issues.append({'page':route,'issue':'breadcrumb_nonfinal_missing_item','name':item.get('name')})
 for href in p.get('links',[]):
  u=urlsplit(urljoin(urljoin(SITE,route),href))
  if u.netloc not in ['rogermurillo.co','www.rogermurillo.co'] or u.scheme not in ['http','https']:continue
  path=u.path or '/';all_links.add(path)
  if u.fragment and not u.fragment.startswith(':~:'):
   target=pages.get(path)
   if target and target.get('status')==200:
    checked_anchors+=1
    if unquote(u.fragment) not in target.get('ids',[]):issues.append({'page':route,'issue':'missing_anchor','link':href})
 for src in p.get('images_missing_alt',[]):warnings.append({'page':route,'issue':'image_missing_alt','src':src})
for title,rs in dups.items():
 if len(rs)>1:issues.append({'issue':'duplicate_indexable_title','pages':rs,'value':title})
for description,rs in description_dups.items():
 if len(rs)>1:issues.append({'issue':'duplicate_indexable_description','pages':rs})
missing=sorted(x for x in all_links if x not in pages and not re.search(r'\.(?:png|jpe?g|webp|svg|pdf|woff2?|ico)$',x,re.I))
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:extra=dict(pool.map(fetch,missing))
for route,p in extra.items():
 if p['status']!=200:issues.append({'page':route,'issue':'linked_destination_HTTP','value':p['status']})
inbound=collections.Counter();graph={}
for route,p in pages.items():
 dests={urlsplit(urljoin(SITE+route,h)).path or '/' for h in p.get('links',[]) if urlsplit(urljoin(SITE+route,h)).netloc=='rogermurillo.co'};graph[route]=dests
 for dest in dests:
  if dest!=route:inbound[dest]+=1
seen=set();todo=['/']
while todo:
 route=todo.pop()
 if route in seen:continue
 seen.add(route);todo.extend(graph.get(route,set())-seen)
orphaned=[route for route,p in pages.items() if p.get('status')==200 and not p.get('redirect_document') and not any('noindex' in x for x in p.get('robots',[])) and route not in seen]
report={'origin':SITE,'mode':'local' if '--local' in sys.argv else 'published','orphaned_indexable_pages':orphaned,'pages_crawled':len(pages),'linked_extra_destinations':len(extra),'unique_internal_link_paths':len(all_links),'anchor_checks':checked_anchors,'schema_blocks':sum(len(p.get('schemas',[])) for p in pages.values()),'issues':issues,'warnings':warnings,'pages':pages,'extra':extra}
out=Path('../analisis-seo');out.mkdir(exist_ok=True);(out/('auditoria-onpage-local.json' if '--local' in sys.argv else 'auditoria-onpage-publicada.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ['pages','extra']},ensure_ascii=False,indent=2))

if issues or orphaned: sys.exit(1)
