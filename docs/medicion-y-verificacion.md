# Medición de contactos y herramientas

## Configuración aplicada en GA4 el 15 de octubre de 2026

Se activó `form_contacto_enviado` como evento clave en la propiedad Roger Murillo AI de la cuenta Calvo Creativo. Se guardaron las dimensiones de evento Tipo de solicitud (`tipo_solicitud`), Paso del recorrido (`paso`) y Resultado de colorimetría (`resultado`). El cambio se aplica a partir de su activación, no al histórico. La publicación de código por sí sola no configura Analytics.

No usar `click_agendar`, `form_contacto_inicio` ni `click_comprar_curso` como sustitutos de contactos o ventas. `contacto_whatsapp` registra la apertura del enlace, no una conversación confirmada. Para Ads, mantener las interacciones previas como secundarias y evitar duplicar el envío con otro evento primario.

La dimensión `tipo_solicitud` distingue `curso`, `servicio` y `mixta`. `paso` se interpreta junto al nombre del evento. No enviar nombre, correo, teléfono, mensajes ni respuestas personales a Analytics.

## Eventos

| Evento | Momento | Parámetros |
| --- | --- | --- |
| `form_contacto_inicio` | Primera modificación del formulario, una vez por carga | `form_id`, `tipo_solicitud` |
| `form_contacto_paso` | Avance después de validar el paso actual | `form_id`, `tipo_solicitud`, `paso` de destino |
| `form_contacto_enviado` | Respuesta HTTP exitosa del receptor del formulario, una vez por carga | `form_id`, `tipo_solicitud`, `objetivos`, `horario` |
| `form_contacto_error` | Fallo de la solicitud | `form_id`, `tipo_solicitud` |
| `test_colorimetria_inicio` | Inicio del cuestionario | — |
| `test_colorimetria_paso` | Respuesta a una pregunta | `paso` |
| `test_colorimetria_completado` | Resultado calculado, antes de navegar | `resultado` |

El evento automático `form_start` puede coexistir con el inicio personalizado. No sumar ambos como si fueran personas diferentes.

## Curso de colorimetría

El botón lleva a `/contacto/?interes=curso-colorimetria-profesional#form` y preselecciona el curso. Usa el formulario existente `contacto`, su campo `objetivos` y su receptor actual. No crea otra base de datos ni promete una inscripción confirmada. El cliente puede modificar la selección antes de enviar.

## Verificación después de publicar

1. Comprobar que `/robots.txt` permite los recursos de `/_astro/` y usar Inspección de URLs de Search Console para revisar la página renderizada.
2. Comprobar el enlace del curso y su objetivo preseleccionado.
3. Intentar avanzar con nombre vacío o correo inválido. Debe mantenerse el primer paso y no registrar un avance.
4. Seleccionar y deseleccionar objetivos, también usando teclado. Verificar que las opciones enviadas coinciden con las seleccionadas.
5. Coordinar un envío identificable de prueba con el propietario. Comprobar que aparece en el receptor y llega la notificación al correo. Una respuesta HTTP exitosa no demuestra entrega de correo ni calificación del contacto.
6. Revisar los eventos en DebugView/Realtime y después en informes. Probar un fallo de red y reintento sin registrar un envío exitoso falso.
7. Completar el test sin correo y comprobar el resultado, sus eventos y la URL final con barra.

Las verificaciones locales deben simular las respuestas del receptor para evitar crear contactos de prueba en producción. La integración real del formulario y la entrega de correo requieren la comprobación del punto 5.

## Siguientes tareas del diagnóstico

- Completar el portafolio con fotografías reales autorizadas y asociar casos con cada servicio.
- Mejorar las páginas comerciales y las consultas locales, sin inventar precios o servicios.
- Cruzar página no encontrada, ruta y referente para priorizar enlaces antiguos valiosos.
- Revisar formularios, citas y ventas por canal, incluyendo ChatGPT y Google Business Profile.
- Llevar un registro comercial de servicio, origen, fecha, contacto calificado, cita, venta y valor. El acceso a estos datos debe mantenerse fuera del repositorio público.

## Atribución y privacidad del formulario

El formulario incorpora `pagina_entrada` (solo ruta, sin consulta), `referente` (solo dominio) e `interes_origen` (lista cerrada de servicios). El contexto se conserva durante la sesión de la pestaña; no contiene identificadores de usuario. Nombres, correos, teléfonos, texto libre y medidas corporales o faciales no se envían en los eventos añadidos. Los parámetros `objetivos` y `horario` proceden de opciones controladas, no de texto libre.

Las vistas locales y los dominios de previsualización no cargan el tag de GA4. El código conserva los eventos en una cola local para pruebas, sin enviar visitas de desarrollo a la propiedad de producción.

## Pruebas repetibles

- `npm run build`: genera las páginas de producción.
- `npm run audit:site`: valida destinos de enlaces y recursos locales, JSON-LD, sitemap, canonical y encabezados de las páginas generadas. Reconoce las páginas de redirección estática.
- `npm run test:captacion`: ejecuta el código real del formulario en un entorno aislado con receptor simulado. Verifica siete contextos, desconocidos, solicitudes mixtas, atribución, validación, consentimiento, fallo/reintento y prevención de duplicados.

La ejecución aislada no sustituye la comprobación de entrega del correo en el receptor real. No se han enviado consultas ficticias al propietario.
