export const primaryNavigation = [
    { label: 'Servicios', href: '/servicios/', key: 'servicios' },
    { label: 'La Firma', href: '/nosotros/' },
    { label: 'Casos de Éxito', href: '/casos-de-exito/' },
    { label: 'Academia', href: '/academia/', key: 'academia' },
    { label: 'Herramientas', href: '/herramientas/', key: 'herramientas' },
];

export const navigationPanels = [
    {
        key: 'servicios', label: 'Servicios', eyebrow: 'Atención personal / Bogotá y a distancia',
        title: 'Un cambio empieza por una necesidad.',
        description: 'Cabello, color, vestuario o un proceso completo. Elige por lo que quieres resolver.',
        image: '/images/roger-portrait-bw.webp', imageAlt: 'Roger Murillo, asesor de imagen',
        href: '/servicios/', action: 'Comparar todos los servicios',
        links: [
            { title: 'Colorimetría personal', description: 'Informe digital o sesión con textiles en el estudio.', detail: 'Desde $150.000 COP', href: '/servicios/colorimetria-bogota/' },
            { title: 'Fondo de armario para hombres', description: 'Revisión a domicilio, inventario y personal shopper.', detail: '$1.600.000 COP', href: '/servicios/asesoria-imagen-hombres-bogota/' },
            { title: 'Cabello y visagismo', description: 'Corte, color y peinado según tu rostro y tu rutina.', detail: 'Estudio / Cita previa', href: '/servicios/peluqueria/' },
            { title: 'Asesoría integral', description: 'Color, armario y acompañamiento por fases.', detail: 'USD 1.650', href: '/servicios/asesoria-integral-imagen/' },
            { title: 'Imagen ejecutiva', description: 'Tu presencia y vestuario en el contexto profesional.', detail: 'Consulta personalizada', href: '/servicios/imagen-ejecutiva-autoridad/' },
        ],
        extraLabel: 'Antes de elegir',
        extras: [
            { title: 'Alcance y precios', href: '/blog/cuanto-cuesta-asesoria-imagen-bogota/' },
            { title: 'Historias reales', href: '/casos-de-exito/' },
            { title: 'Consultar con el equipo', href: '/contacto/' },
        ],
    },
    {
        key: 'academia', label: 'Academia', eyebrow: 'Aprendizaje / Imagen personal',
        title: 'Mirar distinto también se aprende.',
        description: 'Explora cursos, lecturas y formación. Consulta modalidad y disponibilidad en cada programa.',
        image: '/images/course-destaca.webp', imageAlt: 'Fotografía editorial de la academia Roger Murillo',
        href: '/academia/', action: 'Explorar toda la academia',
        links: [
            { title: 'Descúbrete', description: 'Identidad e imagen personal como punto de partida.', detail: 'Curso online', href: '/academia/curso-descubrete/' },
            { title: 'Diseñate', description: 'Estilo y construcción de tu lenguaje visual.', detail: 'Curso online', href: '/academia/crea-tu-iconologia/' },
            { title: 'Conquista', description: 'Voz y comunicación en tu contexto personal.', detail: 'Curso online', href: '/academia/disena-tu-voz/' },
            { title: 'Destaca', description: 'El uso del color en tus decisiones de imagen.', detail: 'Curso online', href: '/academia/el-correcto-uso-del-color/' },
            { title: 'Revoluciona tu Imagen', description: 'El libro de Roger Murillo.', detail: 'Lectura', href: '/libro/' },
        ],
        extraLabel: 'Con el equipo',
        extras: [
            { title: 'Automaquillaje', href: '/academia/curso-automaquillaje/' },
            { title: 'Reto presencial', href: '/academia/reto-presencial/' },
            { title: 'Colorimetría profesional', href: '/academia/curso-colorimetria-profesional/' },
            { title: 'Programa para colegios', href: '/academia/reto-colegios/' },
        ],
    },
    {
        key: 'herramientas', label: 'Herramientas', eyebrow: 'Laboratorio / Gratuito',
        title: 'Empieza por una buena pregunta.',
        description: 'Cuestionarios y medidas para explorar. Sus resultados orientan; no sustituyen una asesoría personal.',
        image: '', imageAlt: '', href: '/herramientas/', action: 'Elegir una herramienta',
        links: [
            { title: 'Test de colorimetría', description: 'Una orientación inicial de tu estación de color.', detail: 'Cuestionario', href: '/herramientas/test-colorimetria-online/' },
            { title: 'Calculadora de rostro', description: 'Explora tus proporciones para preparar una consulta.', detail: 'Medidas', href: '/herramientas/calculadora-rostro/' },
            { title: 'Calculadora de cuerpo', description: 'Una referencia de silueta para el vestuario.', detail: 'Medidas', href: '/herramientas/calculadora-tipo-cuerpo/' },
            { title: 'Impacto ejecutivo', description: 'Reflexiona sobre tu imagen en el trabajo.', detail: 'Autoevaluación', href: '/herramientas/test-impacto-ejecutivo/' },
            { title: 'Revoluciona tu imagen', description: 'Ejercicios de identidad e imagen personal.', detail: 'Recorrido guiado', href: '/herramientas/reto-revoluciona-tu-imagen/' },
        ],
        extraLabel: 'Para profundizar',
        extras: [
            { title: 'Atlas de las doce estaciones', href: '/colorimetria/estaciones/' },
            { title: 'Guía de visagismo', href: '/blog/guia-visagismo/' },
            { title: 'Journal de imagen personal', href: '/blog/' },
        ],
    },
];
