# Criterio de diseño y revisión del sitio

Fecha: 15 de octubre de 2026. Estado: implementación local, pendiente de publicación.

## Criterio aplicado

Una página debe mostrar qué ofrece, para quién es y cuál es el siguiente paso. La fotografía, los diagramas y la tipografía deben ayudar a entender el contenido. Un módulo no se considera resuelto por poner texto dentro de un borde o por añadir una animación.

- Composiciones diferentes según tarea: explorador de servicios, catálogo filtrable, guía de lectura, atlas de paletas y formulario.
- Interacción con ratón, teclado y tacto; estado seleccionado visible; foco; reducción de movimiento.
- Jerarquía de título, alcance, precio y acción; enlaces de continuidad entre contenido y servicio.
- Fotografías y recursos existentes, sin inventar casos, resultados o condiciones comerciales.
- Espacio real para navegación y migas; ninguna promoción flotante encima del contenido.
- Preservar destinos, precios publicados, rutas e integración de contactos durante el cambio visual.

## Revisión por familia

| Familia | Problema observado | Implementación |
| --- | --- | --- |
| Navegación compartida | Migas debajo del menú; panel móvil oculto en tablet; navegación del mega-menú dependiente de hover | Separación de migas, temas claros correctos, breakpoint del menú, Escape, foco, inert al cerrar y ArrowDown en mega-menús |
| Portada | Entrada abstracta y centrada en test; servicio poco visible | Cabecera fotográfica con propuesta concreta, CTA comercial y explorador de necesidades a continuación |
| Servicios | Cuadrícula genérica repetida | Selector de necesidades, contenido y fotografía por servicio, estado seleccionado y acción de acceso |
| Colorimetría | Comparación de precios plana | Modalidades con selección, visual conceptual, entregables, precio y consulta específica |
| Hombres | Oferta sin fotografía ni recorrido | Cabecera, precio/cobertura, etapas, comparación con programa integral, preguntas y cierre |
| Peluquería | Seis bloques largos equivalentes | Menú desplegable de servicios, contexto de consulta y navegación de capítulos |
| Integral y ejecutiva | Lectura larga con poca orientación | Explorador compartido y navegación; se conserva la composición propia y el proceso publicado |
| Casos | Módulo compartido con cajas y enlace textual | Galería editorial con alturas diferentes y acceso claro a las historias originales |
| Nosotros y casos completos | Recorridos largos | Navegación por capítulos conservando su diseño fotográfico existente |
| Academia | Fichas de texto sin material visual | Catálogo con recursos existentes, filtros y precios/destinos preservados |
| Cursos de la plantilla compartida | Programa y preguntas difíciles de localizar | Accesos a destinatarios, programa, instructor y preguntas, preservando compra |
| Formación profesional | Cabecera centrada genérica | Presentación editorial, fotografía y consulta; contenido en dos columnas adaptables |
| Herramientas | Filas largas vacías; lenguaje de diagnóstico definitivo | Catálogo de herramientas con diagramas, filtros y alcance orientativo |
| Herramientas individuales | Tema de navegación incorrecto en algunas páginas claras | Contraste del menú, foco y navegación compartida; lógica conservada |
| Journal | Marcador “No Image”; guías fuera del índice | Listado editorial con arte por tema, filtros y guías comerciales incluidas |
| Artículos | Bloque estrecho sin navegación; estilos inconsistentes | Plantilla de lectura, índice de secciones, fecha de actualización y continuidad hacia servicios |
| Estaciones | Listas de enlaces y poco protagonismo del color | Atlas filtrable de doce paletas con muestras de los datos existentes |
| Paletas | Círculos pequeños y cabecera bajo el menú | Muestras grandes, jerarquía de lectura, espacio de migas y CTA comercial |
| Productos | Cabecera y filtros competían con menú fijo | Separación de cabecera y filtros; catálogo y acciones existentes conservados |
| Libro | Imagen desplazaba título y compra en móvil | Entrada editorial con título/acción antes del visual y navegación de capítulos |
| Contacto | Opciones ocultas también al teclado | Checkboxes visualmente ocultos pero focusables; diez contextos de consulta comprobados |
| Legales, resultados, recuperación y mapa | Temas claros y espaciados inconsistentes | Navegación compartida, foco y espacio de lectura; sin reescribir condiciones legales |
| Elementos flotantes | Cubo sobre contenido; aviso de cookies ocupaba ancho completo | Cubo retirado; aviso compacto con enlace de privacidad y acción existente |

## Verificación y límites

- Construcción y auditoría de todas las páginas generadas: enlaces y recursos locales, canonical, sitemap, encabezados y JSON-LD.
- Comprobación de geometría en navegador de 41 rutas a 390 px: desbordamiento, H1 y posición respecto al menú. Este control no equivale a una inspección visual de cada píxel de las 100 páginas.
- Revisión visual de las composiciones principales y comprobaciones de interacción: filtros, selectores, preguntas, capítulos y menú.
- Prueba aislada de diez contextos del formulario: validación, errores/reintento, éxito y duplicados.
- No hay nuevas fotografías de procesos específicos; los gráficos de informe y textiles se identifican como ilustraciones.
- Los archivos heredados llamados `book-cover-3d.webp` y `book-mockup-3d.webp` eran fotografías de una modelo, no cubiertas. Se retiró su uso como libro y se añadió una representación gráfica marcada explícitamente; falta la cubierta original para sustituirla.
- No se ha enviado un contacto real ni comprobado la recepción de correo. No se han efectuado compras.
- El cambio de diseño no demuestra mejoras de conversión o posicionamiento: requieren datos posteriores a publicación.

La coherencia visual es un criterio de mantenimiento. Los módulos nuevos deben reutilizar estos patrones o justificar una composición distinta para una tarea distinta, en lugar de volver a crear cajas de texto genéricas.

## Segunda revisión: navegación y destinos principales (15 de octubre)

- Navegación global sustituida por un explorador editorial con tres paneles, destinos directos, precios confirmados y menú móvil con acordeones.
- Servicios: entrada orientada a necesidades, explorador de cinco servicios, comparación y casos.
- La Firma: presentación de Roger y Adriana, retratos y navegación de capítulos corregida.
- Casos: nueva entrada, accesos a historias y comparadores antes/después con rango y botones accesibles. Las fotografías de Karen se presentan mediante ventanas SVG dentro de las láminas originales, sin alterar los archivos fuente.
- Los cinco destinos principales se comprobaron en escritorio y a 390 px: un H1, sin desbordamiento horizontal y migas por debajo del encabezado.
- Navbar comprobado a 320, 390, 820, 1120 y 1440 px; panel único, Escape, apertura por teclado, foco contenido en menú móvil y devolución del foco al cerrar.
- Construcción final: 100 páginas; auditoría de 10.893 referencias internas y 219 bloques JSON-LD sin fallos; 57 URLs en sitemap. Pruebas de captación superadas para diez contextos.
- Esta revisión está disponible en la vista previa local; aún no está publicada.


## Identidad de marca: criterio obligatorio

Rojo #C41230 y negro son los protagonistas, confirmado por el propietario del proyecto. El rojo se aplica a acciones, estados y énfasis; el negro a tipografía, estructura y superficies de contraste. Blancos y grises apoyan la lectura. No sustituir esta identidad por verdes, oliva o crema. Las muestras didácticas de colorimetría mantienen sus colores originales.
