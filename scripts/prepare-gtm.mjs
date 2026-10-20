import fs from 'node:fs';
import path from 'node:path';

// Start from the actual UI export, retaining the official Microsoft template.
const source = process.argv[2];
if (!source) throw new Error('Pass the exported GTM workspace JSON path.');
const bundle = JSON.parse(fs.readFileSync(source, 'utf8'));
const cv = bundle.containerVersion;
if (cv.container.publicId !== 'GTM-5RH99FDW') throw new Error('Unexpected container');
// The new Google Analytics tag enables user-provided data by default. This site
// measures interactions only, without automatic email, phone or address collection.
for (const config of cv.gtagConfig || []) {
  for (const parameter of config.parameter || []) {
    if (config.type === 'ogt_1p_data_v2' && parameter.type === 'BOOLEAN') parameter.value = 'false';
    if (config.type === 'ogt_auto_events' && parameter.key === 'enableForm') parameter.value = 'false';
  }
}
const events = [
  'contacto_whatsapp', 'contacto_telefono', 'contacto_email', 'click_agendar', 'click_comprar_curso',
  'form_contacto_inicio', 'form_contacto_paso', 'form_contacto_enviado', 'form_contacto_error',
  'test_colorimetria_inicio', 'test_colorimetria_paso', 'test_colorimetria_completado',
  'herramienta_servicio_click', 'calculadora_cuerpo_inicio', 'calculadora_cuerpo_completado',
  'calculadora_rostro_inicio', 'calculadora_rostro_completado',
  'impacto_ejecutivo_inicio', 'impacto_ejecutivo_completado', 'pagina_no_encontrada',
];
const parameters = ['pagina', 'destino', 'interes', 'form_id', 'tipo_solicitud', 'herramienta',
  'modalidad', 'paso', 'objetivos', 'horario', 'resultado', 'servicio', 'ruta'];
const template = (key, value) => ({ type: 'TEMPLATE', key, value });
cv.folder = ['01 - Analítica GA4', '02 - Experiencia Clarity', '03 - Eventos y parámetros']
  .map((name, i) => ({ name, folderId: String(100 + i) }));
cv.tag[0].parentFolderId = '100';
cv.tag[1].parentFolderId = '101';
cv.variable = parameters.map((key, i) => ({
  variableId: String(200 + i), name: `DLV | ${key}`, type: 'v', parentFolderId: '102',
  parameter: [template('name', `rm_event.${key}`), { type: 'INTEGER', key: 'dataLayerVersion', value: '2' }],
}));
cv.trigger = [{ triggerId: '150', name: 'CE | Interacciones RM | Lista permitida', type: 'CUSTOM_EVENT',
  parentFolderId: '102', customEventFilter: [{ type: 'MATCH_REGEX', parameter: [
    template('arg0', '{{_event}}'), template('arg1', `^(${events.join('|')})$`),
  ] }],
}];
cv.tag.push({ tagId: '160', name: 'GA4 | Eventos RM | Formularios, contactos y herramientas',
  type: 'gaawe', parentFolderId: '102', tagFiringOption: 'ONCE_PER_EVENT', firingTriggerId: ['150'],
  parameter: [template('measurementIdOverride', 'G-8FCTXLT7Y2'), template('eventName', '{{Event}}'),
    { type: 'LIST', key: 'eventParameters', list: parameters.map(key => ({ type: 'MAP', map: [
      template('name', key), template('value', `{{DLV | ${key}}}`),
    ] })) }], consentSettings: { consentStatus: 'NOT_SET' },
});
fs.mkdirSync('docs/gtm', { recursive: true });
fs.writeFileSync(path.join('docs/gtm', 'GTM-5RH99FDW-organizado.json'), JSON.stringify(bundle, null, 2) + '\n');
console.log(`Prepared ${cv.tag.length} tags, ${events.length} events, ${parameters.length} parameters.`);
