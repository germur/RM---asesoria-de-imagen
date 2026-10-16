# Herramientas → consulta de servicio

Cada resultado ofrece un CTA principal a contacto con servicio preseleccionado y herramienta identificada, más un enlace secundario al detalle del servicio. No se navega automáticamente ni se oculta el resultado tras un registro.

| Herramienta | Servicio | Interés de contacto |
| --- | --- | --- |
| Test de colorimetría | Colorimetría personal, modalidades digital y presencial | colorimetria |
| Calculadora de rostro | Peluquería y visagismo | visagismo |
| Calculadora de cuerpo | Fondo de armario y personal shopper | fondo-armario |
| Test de impacto ejecutivo | Imagen ejecutiva | ejecutiva |
| Reto de imagen | Asesoría integral | integral |

El campo `herramienta_origen` conserva uno de cinco identificadores cerrados en el envío del formulario. No se copian respuestas, puntuaciones, medidas, firma ni contenido del dossier al formulario o Analytics.

`herramienta_servicio_click` mide el clic del CTA; `herramienta_consulta_abierta` mide la llegada a contacto con un origen válido. Los eventos del formulario, incluido `form_contacto_enviado`, incorporan `herramienta`. No contar los clics o llegadas como leads adicionales. El evento clave existente sigue siendo el envío aceptado.

El parámetro herramienta requiere una dimensión personalizada de evento en GA4 para su desglose persistente en informes; esa configuración administrativa no se aplica solo publicando código. La comprobación real de eventos en producción sigue pendiente hasta desplegar y verificar.

Los botones de consulta solicitan disponibilidad; no confirman una cita, no cobran y permiten cambiar de servicio. El resultado de una herramienta orientativa no obliga a contratar un servicio ni confirma un diagnóstico profesional.

Las rutas antiguas de herramientas no terminadas siguen noindex y se presentan como en desarrollo. Se retiró la promesa de precisión del 98 % y el formulario que enviaba un correo en la URL; ahora llevan al catálogo disponible o a servicios.
