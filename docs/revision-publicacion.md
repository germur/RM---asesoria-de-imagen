# Candidato de publicación · 15 de octubre de 2026

## Alcance

Rediseño de navegación, servicios, La Firma, contacto y catálogos editoriales. Mantiene rojo y negro como identidad y conserva las rutas existentes. Incorpora páginas comerciales de colorimetría personal y asesoría para hombres, con las condiciones confirmadas por el propietario. El catálogo mantiene tanto peluquería como asesoría de imagen.

Distingue colorimetría personal de coloración capilar y formación profesional; conecta guías y herramientas con los servicios correspondientes. Usa los retratos y casos originales sin presentar ilustraciones como resultados de clientes.

## Validación local

`npm run build` seguido de `npm run test:release`. Incluye auditoría de HTML, recursos, enlaces, fragmentos, canonical, sitemap y JSON-LD; pruebas de los dos formularios con receptor simulado y de clasificación de eventos. Se revisaron los recorridos principales en escritorio y móvil. Los cambios visuales y de formularios más recientes se comprobaron a 320 y 390 px, además de escritorio.

## Comprobación después de publicar

1. Recorrer navegación y páginas principales en el dominio público, incluidos menú móvil y enlaces a contacto con servicio preseleccionado.
2. Confirmar que Netlify detecta el formulario `contacto` y sus campos, incluido `ciudad`. Los dos formularios usan ese mismo receptor.
3. Coordinar una consulta de prueba identificable con el propietario; verificar recepción en Netlify y correo. No se han enviado consultas ficticias a producción durante las pruebas locales.
4. Verificar `form_contacto_enviado` en GA4 después de que el receptor acepte el envío; mantener los clics como interacciones previas. El registro de configuración de GA4 está en medicion-y-verificacion.md.
5. Inspeccionar las URLs comerciales en Search Console y seguir consultas, páginas, leads calificados y ventas; el impacto SEO se mide después de publicar, no a partir de la vista local.

## Evidencia comercial pendiente

Ver contenido-comercial-y-evidencia-pendiente.md. No bloquear el diseño por materiales opcionales, pero no inventar un informe real, un caso, una fotografía del estudio, testimonios o condiciones comerciales para cubrir esas ausencias.
