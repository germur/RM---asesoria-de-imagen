export const toolFunnels = {
 colorimetria: { interest: 'colorimetria', label: 'Colorimetría personal', service: '/servicios/colorimetria-bogota/', title: 'De la orientación a tu paleta personal.', copy: 'Compara el informe digital y la sesión presencial. El equipo te ayuda a elegir la modalidad según lo que buscas.' },
 rostro: { interest: 'visagismo', label: 'Peluquería y visagismo', service: '/servicios/peluqueria/', title: 'Lleva estas proporciones a tu próximo corte.', copy: 'Consulta cómo trabajar corte, peinado o barba según tu cabello, tus preferencias y tu rutina.' },
 cuerpo: { interest: 'fondo-armario', label: 'Fondo de armario y personal shopper', service: '/servicios/asesoria-imagen-hombres-bogota/', title: 'Ahora, míralo en tu armario.', copy: 'El servicio de fondo de armario revisa tus prendas, identifica qué funciona y prepara una ruta de compras. Confirma el alcance para tu caso.' },
 impacto: { interest: 'ejecutiva', label: 'Asesoría de imagen ejecutiva', service: '/servicios/imagen-ejecutiva-autoridad/', title: 'Trabaja tu imagen en tus escenarios reales.', copy: 'Cuéntanos si estás preparando un nuevo cargo, reuniones o presentaciones. Acordamos contigo qué necesitas trabajar.' },
 reto: { interest: 'integral', label: 'Asesoría integral de imagen', service: '/servicios/asesoria-integral-imagen/', title: 'Convierte tus ideas en un proceso acompañado.', copy: 'Explora el programa integral para trabajar cabello, color, vestuario y ocasiones de uso con un acompañamiento personal.' },
} as const;
export type ToolId = keyof typeof toolFunnels;
export function toolContactUrl(tool: ToolId) {
 return `/contacto/?interes=${toolFunnels[tool].interest}&herramienta=${tool}#form`;
}
