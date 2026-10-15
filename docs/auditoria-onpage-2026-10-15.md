# Auditoría SEO on-page · 15 de octubre de 2026

## Alcance y método

Rastreo del HTML publicado de las 100 rutas generadas, incluidos documentos de redirección y páginas no indexables. Revisión de metadatos, encabezados del contenido principal, JSON-LD, destinos internos, fragmentos y accesibilidad de páginas desde la portada. La auditoría local posterior comprueba la versión corregida. Los resultados completos se guardan fuera del código del sitio en la carpeta de análisis SEO.

## Hallazgos y correcciones

- BreadcrumbList: 63 elementos intermedios sin `item` en 43 páginas. Se eliminaron del schema los agrupadores que no tienen página y se renumeraron los elementos. No se crearon URLs vacías para completar las migas.
- Títulos: se precisó la intención de inicio, servicios, peluquería, colorimetría, asesoría para hombres, La Firma, contacto y libro. Los cuatro cursos con nombres de marca ahora tienen metatítulos descriptivos sin cambiar sus nombres comerciales.
- Descripciones: se separó la descripción comercial larga de los cursos de su meta description; se resumieron las de La Firma, integral y automaquillaje. No se tratan los umbrales de longitud como límites rígidos de Google ni como factores de ranking.
- Encabezados: se corrigieron saltos en guías, libro, productos, páginas de confirmación y herramientas, manteniendo sus clases visuales. Se retiraron dos elementos `main` anidados. Un encabezado de resultado inicialmente vacío ahora contiene un texto de reserva descriptivo.
- Artículos: se añadió Article a cinco lecturas que no lo declaraban y a la guía revisada de color. Fechas solo donde ya existen en la fuente; sin inventar fechas ni adjudicar al fundador textos sin autoría individual confirmada.
- Libro: se retiró `aggregateRating` con 4,9 y 128 reseñas, sin evidencia visible que respalde esa valoración; se reconoció a ambos coautores y se normalizaron las URLs con barra.
- Colorimetría personal: se declararon las dos ofertas con los precios confirmados, diferenciando informe digital y sesión presencial.
- Arquitectura: se conectaron desde lecturas relacionadas dos páginas indexables sin recorrido desde la portada. La guía antigua de colores para negociar se revisó para eliminar afirmaciones universales sin respaldo y un botón de compra sin destino de un curso de USD 47 que no corresponde al catálogo enlazado. Conserva su URL.

## Resultado de las comprobaciones

- 100 rutas rastreadas; cuatro son documentos de redirección, no páginas de contenido sin H1 o descripción.
- 57 URLs en sitemap, sin páginas `noindex` incluidas.
- 96 destinos internos únicos de los enlaces HTML; sin destinos rotos detectados.
- 336 referencias a fragmentos comprobadas en la versión corregida.
- 226 bloques JSON-LD con JSON válido, frente a 220 antes de completar el marcado editorial.
- Sin metatítulos ni descripciones duplicadas en las páginas indexables.
- Sin saltos de encabezados, encabezados vacíos o páginas indexables huérfanas detectados en el contenido estático corregido.
- 13 enlaces externos HTML respondieron HTTP 200 en la revisión; esto comprueba accesibilidad, no pagos, disponibilidad comercial ni recepción de mensajes.
- Pasan compilación, auditoría general, navegación, servicios, formularios aislados y eventos de medición.

## Límites y seguimiento

No se equipara JSON válido con elegibilidad para resultados enriquecidos. Hay tipos válidos de Schema.org que Google no presenta como resultado enriquecido para este negocio. La inspección de Google y la indexación se revisan aparte. No se promete una mejora de ranking por cambiar encabezados o añadir schemas.

Se conserva la arquitectura de servicios, guías, herramientas y formación. No se modifica una URL que ya funciona solo para introducir otra keyword. La distribución real de consultas por URL y cualquier solapamiento se comprueban en Search Console, no se infieren únicamente de que dos páginas mencionen un término.

El rastreo de enlaces estáticos no equivale a probar cada interacción o confirmar entregas de correo. La prueba real del receptor del formulario y la conversión en Analytics sigue documentada en medicion-y-verificacion.md.

## Referencias oficiales

- BreadcrumbList: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Políticas generales de datos estructurados: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

## Repetir

Después de `npm run build`, ejecutar `npm run test:release` y `python scripts/audit-onpage.py --local`. Para rastrear el sitio público, ejecutar el mismo script sin `--local`. El rastreo requiere acceso a red y puede verse afectado por cambios o bloqueos externos.
