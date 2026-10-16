import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('src/pages/contacto.astro','utf8');
const script=[...source.matchAll(/<script is:inline>([\s\S]*?)<\/script>/g)].at(-1)[1];
const goalValues=[...source.matchAll(/type="checkbox"[^>]*value="([^"]+)"/g)].map(m=>m[1]).filter(v=>v!=='aceptado');
function harness(interest,tool=""){
 const classes=()=>{const values=new Set();return{add:x=>values.add(x),remove:x=>values.delete(x),contains:x=>values.has(x),toggle:(x,on)=>on?values.add(x):values.delete(x)}};
 const el=(id='')=>({id,value:'',checked:false,style:{},classList:classes(),dataset:{},listeners:{},textContent:'',innerHTML:'Enviar',disabled:false,addEventListener(type,fn){this.listeners[type]=fn},checkValidity(){return !this.invalid},reportValidity(){this.reported=true}});
 const ids=Object.fromEntries(['rm-form','f-goals-hidden','f-slot-hidden','f-entry-hidden','f-referrer-hidden','f-interest-hidden','f-tool-hidden','course-inquiry','form-success-message'].map(x=>[x,el(x)]));
 const name=el('name'), email=el('email'), terms=el('terms');name.invalid=true;email.invalid=true;terms.invalid=true;
 const steps=[1,2,3,4].map(n=>({...el(),dataset:{step:String(n)}}));
 const inputs=goalValues.map(v=>({...el(),value:v}));
 const chips=inputs.map(input=>({...el(),querySelector:()=>input}));
 const buttons=[2,3].map(to=>{const b=el();b.dataset.to=String(to);b.classList.add('next-btn');return b});
 const submit=el();ids['rm-form'].querySelector=()=>submit;
 const events=[],posts=[];let ok=false;
 const context={document:{getElementById:id=>ids[id],querySelectorAll:s=>{
  if(s==='.form-step')return steps;if(s==='.step-indicator')return[];if(s==='.next-btn,.prev-btn')return buttons;if(s==='.goal-chip')return chips;if(s==='#slots .time-slot')return[];if(s==='#goals input:checked')return inputs.filter(x=>x.checked);
  if(s.includes('.form-step[data-step=')){const n=s.match(/data-step="(\d)"/)[1];return n==='1'?[name,email]:n==='3'?[terms]:[];}throw Error('unexpected selector '+s);
 },querySelector:s=>s==='#slots .time-slot.selected'?null:null},location:{search:'?interes='+interest+'&herramienta='+tool,pathname:'/contacto/'},sessionStorage:{getItem:()=>JSON.stringify({entry:'/servicios/peluqueria/',referrer:'chatgpt.com'})},URLSearchParams,gtag:(...x)=>events.push(x),fetch:async(_,options)=>{posts.push(new URLSearchParams(options.body));return{ok,status:ok?200:500}},FormData:class{constructor(){return[['form-name','contacto'],['objetivos',ids['f-goals-hidden'].value],['horario',ids['f-slot-hidden'].value],['pagina_entrada',ids['f-entry-hidden'].value],['referente',ids['f-referrer-hidden'].value]]}},alert:()=>{}};
 vm.runInNewContext(script,context);
 return{ids,inputs,buttons,name,email,terms,posts,events,submit,ok:()=>{ok=true},send:()=>ids['rm-form'].listeners.submit({preventDefault(){}})};
}
for(const [interest,expected] of [['fondo-armario','Fondo de armario y personal shopper'],['peluqueria','Peluquería'],['integral','Asesoría integral'],['ejecutiva','Imagen ejecutiva'],['colorimetria','Colorimetría'],['colorimetria-digital','Colorimetría digital'],['colorimetria-presencial','Colorimetría presencial'],['visagismo','Visagismo y corte'],['automaquillaje','Curso de automaquillaje'],['curso-colorimetria-profesional','Curso de colorimetría profesional']]){
 const h=harness(interest);assert.equal(h.inputs.find(x=>x.value===expected).checked,true);assert.equal(h.ids['f-entry-hidden'].value,'/servicios/peluqueria/');assert.equal(h.ids['f-referrer-hidden'].value,'chatgpt.com');
 h.ids['rm-form'].listeners.input();h.ids['rm-form'].listeners.input();assert.equal(h.events.filter(x=>x[1]==='form_contacto_inicio').length,1);
 h.buttons[0].listeners.click();assert.equal(h.name.reported,true);assert.equal(h.events.filter(x=>x[1]==='form_contacto_paso').length,0);
 h.name.invalid=false;h.email.invalid=false;h.buttons[0].listeners.click();h.buttons[1].listeners.click();
 await h.send();assert.equal(h.posts.length,0);h.terms.invalid=false;
 await h.send();assert.equal(h.posts.length,1);assert.equal(h.events.filter(x=>x[1]==='form_contacto_enviado').length,0);assert.equal(h.events.filter(x=>x[1]==='form_contacto_error').length,1);
 h.ok();await h.send();assert.equal(h.posts.length,2);assert.equal(h.posts[1].get('objetivos'),expected);assert.equal(h.posts[1].get('form-name'),'contacto');
 const success=h.events.filter(x=>x[1]==='form_contacto_enviado');assert.equal(success.length,1);assert.equal(success[0][2].tipo_solicitud,expected.startsWith('Curso ')?'curso':'servicio');
 await h.send();assert.equal(h.posts.length,2);
}
const unknown=harness('no-validado');assert.equal(unknown.inputs.some(x=>x.checked),false);
const mixed=harness('curso-colorimetria-profesional');mixed.inputs.find(x=>x.value==='Peluquería').checked=true;mixed.name.invalid=false;mixed.email.invalid=false;mixed.terms.invalid=false;mixed.ok();await mixed.send();assert.equal(mixed.events.find(x=>x[1]==='form_contacto_enviado')[2].tipo_solicitud,'mixta');
console.log('PASS: 10 inquiry contexts, unknown context, mixed inquiry, attribution, validation, failure/retry, successful submission and duplicate prevention.');

for(const [tool,interest] of [['colorimetria','colorimetria'],['rostro','visagismo'],['cuerpo','fondo-armario'],['impacto','ejecutiva'],['reto','integral']]){
 const h=harness(interest,tool);assert.equal(h.ids['f-tool-hidden'].value,tool);assert.match(h.ids['course-inquiry'].textContent,/Vienes de:/);h.name.invalid=false;h.email.invalid=false;h.terms.invalid=false;h.ok();await h.send();assert.equal(h.events.find(x=>x[1]==='form_contacto_enviado')[2].herramienta,tool);
}
assert.equal(harness('colorimetria','unknown').ids['f-tool-hidden'].value,'');
console.log('PASS: five tool origins preserved in contact and successful submission analytics; unknown origins rejected.');
