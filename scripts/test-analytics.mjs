import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const script = fs.readFileSync('src/components/seo/BaseHead.astro', 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function harness(host, accepted = false, storageBlocked = false) {
  const listeners = {}, assets = [], saved = new Map();
  const ctx = { URL, Date, location: { hostname: host, pathname: '/servicios/peluqueria/', origin: 'https://' + host },
    localStorage: { getItem() { if (storageBlocked) throw new Error('blocked'); return accepted ? 'true' : null; } },
    sessionStorage: { getItem: k => saved.get(k), setItem: (k, v) => saved.set(k, v) },
    addEventListener: (n, f) => listeners[n] = f,
    document: { referrer: 'https://example.com/article?private=exclude', createElement: () => ({}),
      head: { appendChild: s => assets.push(s) }, addEventListener: (n, f) => listeners[n] = f } };
  ctx.window = ctx;
  vm.runInNewContext(script, ctx);
  return { ctx, assets, saved, accept: () => listeners['rm:analytics-consent'](),
    click: (href, dataset = {}) => listeners.click({ target: { closest: () => ({ dataset, getAttribute: () => href }) } }) };
}
const local = harness('127.0.0.1');
assert.equal(local.assets.length, 0);
assert.deepEqual(JSON.parse(local.saved.get('rm_entry_context')), { entry: '/servicios/peluqueria/', referrer: 'example.com' });
for (const interest of ['peluqueria', 'integral', 'ejecutiva', 'colorimetria', 'colorimetria-digital', 'colorimetria-presencial', 'fondo-armario', 'visagismo', 'automaquillaje', 'curso-colorimetria-profesional']) {
  local.click('/contacto/?interes=' + interest + '#form');
  const e = local.ctx.dataLayer.at(-1);
  assert.equal(e.event, 'click_agendar'); assert.equal(e.rm_event.interes, interest);
}
local.click('/contacto/?interes=untrusted');
assert.equal(local.ctx.dataLayer.at(-1).rm_event.interes, 'general');
for (const [href, name] of [['https://wa.me/573214189010', 'contacto_whatsapp'], ['mailto:contacto@rogermurillo.co', 'contacto_email'], ['tel:+573214189010', 'contacto_telefono']]) {
  local.click(href); assert.equal(local.ctx.dataLayer.at(-1).event, name);
  assert.notEqual(name, 'form_contacto_enviado');
}
const production = harness('rogermurillo.co');
assert.equal(production.assets.length, 0, 'No analytics scripts before acceptance');
production.click('/contacto/');
assert.equal(production.ctx.dataLayer.filter(e => e.event === 'click_agendar').length, 0, 'Do not replay pre-consent clicks');
production.accept(); production.accept();
assert.equal(production.assets.length, 1, 'Repeated consent cannot load two containers');
assert.match(production.assets[0].src, /gtm\.js\?id=GTM-5RH99FDW$/);
assert.equal(production.ctx.dataLayer.filter(e => e.event === 'gtm.js').length, 1);
production.click('/contacto/');
assert.equal(production.ctx.dataLayer.at(-1).event, 'click_agendar');
assert.equal(harness('www.rogermurillo.co', true).assets.length, 1);
assert.equal(harness('preview.example.com', true).assets.length, 0);
assert.equal(harness('rogermurillo.co', false, true).assets.length, 0);
const clarity = production.ctx.clarity.q.at(-1);
assert.equal(clarity[0], 'consentv2');
assert.equal(clarity[1].analytics_Storage, 'granted');
assert.equal(clarity[1].ad_Storage, 'denied');
local.click('/contacto/?interes=visagismo&herramienta=rostro#form', { toolFunnel: 'rostro', toolService: 'visagismo' });
const events = local.ctx.dataLayer.filter(e => e.event);
assert.equal(events.at(-2).event, 'herramienta_servicio_click');
assert.equal(events.at(-2).rm_event.herramienta, 'rostro');
assert.equal(events.at(-1).event, 'click_agendar');
assert.equal(local.ctx.dataLayer.at(-2).rm_event, null, 'Clear prior parameters before every event');
const bundle = JSON.parse(fs.readFileSync('docs/gtm/GTM-5RH99FDW-organizado.json', 'utf8')).containerVersion;
const triggerRegex = new RegExp(bundle.trigger[0].customEventFilter[0].parameter[1].value);
for (const name of ['form_contacto_enviado', 'form_contacto_error', 'pagina_no_encontrada', 'impacto_ejecutivo_completado']) assert.ok(triggerRegex.test(name));
assert.equal(triggerRegex.test('unknown_event'), false);
assert.equal(bundle.tag.filter(t => t.type === 'dest_ga').length, 1);
assert.equal(bundle.tag.filter(t => t.type === 'gaawe').length, 1);
assert.ok(bundle.tag.every(t => t.parentFolderId));
console.log('PASS: CTA classification, GTM events and parameter isolation, consent before loading, one container, no preview tracking, Clarity Consent V2 and GTM event allowlist.');
