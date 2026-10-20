# Seguimiento centralizado en GTM

Cuenta: Calvo Creativo (roger@calvocreativo.com).
Contenedor: rogermurillo.co, GTM-5RH99FDW.
Enlace: https://tagmanager.google.com/?authuser=1#/container/accounts/6383757552/containers/267794122/workspaces/3

## Organización

- 01 - Analítica GA4: flujo existente G-8FCTXLT7Y2.
- 02 - Experiencia Clarity: plantilla oficial de Microsoft, proyecto z0qlvzzm3m.
- 03 - Eventos y parámetros: una etiqueta nativa de eventos GA4, un activador con 20 nombres permitidos y 13 variables de parámetros.

El respaldo importable es docs/gtm/GTM-5RH99FDW-organizado.json. Se generó a partir del respaldo real del contenedor con scripts/prepare-gtm.mjs. La importación conserva la plantilla oficial de Clarity. No importar encima de cambios futuros sin revisar diferencias.

## Integración del sitio

BaseHead carga un solo contenedor, exclusivamente en rogermurillo.co y www.rogermurillo.co, después de aceptar cookies de análisis. Las páginas de previsualización conservan una cola local para pruebas, sin cargar proveedores. No se añade un iframe noscript porque permitiría ejecutar medición al margen de la decisión gestionada con JavaScript.

La función gtag existente se conserva como adaptador de compatibilidad para formularios y herramientas. Convierte las interacciones en eventos de dataLayer; los productos y el envío de eventos se administran en GTM. Antes de cada evento se limpia rm_event para no arrastrar parámetros del evento anterior. Se elimina la carga directa y la configuración de GA4 del HTML para evitar vistas duplicadas.

CookieConsent comunica la aceptación al contenedor. El consentimiento publicitario permanece denegado. Clarity recibe Consent V2 para almacenamiento analítico y publicitario. LandingLayout también incluye el aviso. Si el almacenamiento del navegador está bloqueado, la aceptación permite medir esa página y se vuelve a solicitar en otra visita.

La configuración de Google desactiva la recopilación automática de datos proporcionados por el usuario (correo, teléfono y dirección). La detección automática de formularios se desactiva en este contenedor para usar los eventos existentes de inicio, avance, éxito y error. Se conserva form_contacto_enviado como evento clave ya configurado en Analytics; no se crea una segunda conversión.

Los formularios y las páginas de contacto, herramientas, resultados y reto llevan enmascarado de texto de Clarity. La política de privacidad identifica GA4, GTM y Clarity y refleja la aceptación previa de cookies de análisis.

## Eventos permitidos

contacto_whatsapp, contacto_telefono, contacto_email, click_agendar, click_comprar_curso, form_contacto_inicio, form_contacto_paso, form_contacto_enviado, form_contacto_error, test_colorimetria_inicio, test_colorimetria_paso, test_colorimetria_completado, herramienta_servicio_click, calculadora_cuerpo_inicio, calculadora_cuerpo_completado, calculadora_rostro_inicio, calculadora_rostro_completado, impacto_ejecutivo_inicio, impacto_ejecutivo_completado, pagina_no_encontrada.

Un clic en WhatsApp no confirma una conversación; un clic a Hotmart no confirma una compra. Las pruebas del formulario simulan su receptor y no crean consultas ficticias en producción.

## Verificación

npm run build: compilación de 100 páginas.
npm run test:release: auditoría de enlaces, navegación, formularios, servicios y medición.
scripts/test-analytics.mjs comprueba clasificación de CTA, aislamiento de parámetros, aceptación antes de cargar, carga única de GTM, exclusión de previsualizaciones, Clarity Consent V2 y lista de eventos permitidos.

Estado externo de publicación y comprobación: pendiente al redactar este documento; se actualizará al terminar la comprobación real.
