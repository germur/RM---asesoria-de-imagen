export interface Estacion {
    nombre: string;
    slug: string;
    descripcion: string;
    colores_poder: string[];
    colores_evitar: string[];
    mensaje_venta: string;
    guia_id: string;
}

export const estaciones: Record<string, Estacion> = {
    "invierno-profundo": {
        nombre: "Invierno Profundo (Deep Winter)",
        slug: "invierno-profundo",
        descripcion: "Tu imagen proyecta autoridad natural y contraste. Eres la estación de los líderes por excelencia. Tienes un alto contraste y oscuridad en tus rasgos.",
        colores_poder: ["#000000", "#FFFFFF", "#800020", "#191970", "#008080"], // Negro, Blanco, Borgoña, Azul Medianoche, Verde Azulado
        colores_evitar: ["#D2691E", "#DAA520", "#F4A460", "#FFD700"], // Tonos cálidos terrosos
        mensaje_venta: "¿Sabías que el beige te hace lucir cansado/a? Domina el contraste para proyectar poder. El negro es tu mejor amigo.",
        guia_id: "guia_invierno_profundo_v1"
    },
    "invierno-verdadero": {
        nombre: "Invierno Verdadero (True Winter)",
        slug: "invierno-verdadero",
        descripcion: "Eres la definición de 'frío'. Tu piel parece de porcelana o muy fría y los colores cálidos te apagan.",
        colores_poder: ["#0000FF", "#DC143C", "#00CED1", "#800080", "#2E8B57"], // Azul Puro, Carmesí, Turquesa Oscuro, Púrpura, Verde Mar
        colores_evitar: ["#FFA500", "#FFD700", "#8B4513", "#D2B48C"], // Naranja, Dorado, Marrón
        mensaje_venta: "Busca colores 'joya' puros y vibrantes. Evita los tonos tierra como la plaga.",
        guia_id: "guia_invierno_verdadero_v1"
    },
    "invierno-brillante": {
        nombre: "Invierno Brillante (Bright Winter)",
        slug: "invierno-brillante",
        descripcion: "Tienes un brillo especial. Tus ojos suelen destacar muchísimo y puedes llevar colores neón que a otros intimidan.",
        colores_poder: ["#FF00FF", "#00FF00", "#FFFF00", "#1E90FF", "#FF1493"], // Fucsia, CIan, Amarillo Neón
        colores_evitar: ["#808080", "#F5DEB3", "#A9A9A9", "#BC8F8F"], // Grises apagados, Beige
        mensaje_venta: "No tengas miedo al color. El contraste alto es vital para ti.",
        guia_id: "guia_invierno_brillante_v1"
    },
    "verano-claro": {
        nombre: "Verano Claro (Light Summer)",
        slug: "verano-claro",
        descripcion: "Tu imagen es suave, etérea y luminosa. Los colores oscuros te hacen ver cansada.",
        colores_poder: ["#B0E0E6", "#FFB6C1", "#E6E6FA", "#98FB98", "#87CEEB"], // Pasteles fríos
        colores_evitar: ["#000000", "#800000", "#FF4500", "#006400"], // Negro, Oscuros cálidos
        mensaje_venta: "Mantén todo claro y fresco. Evita el negro cerca de la cara, opta por gris claro o azul cielo.",
        guia_id: "guia_verano_claro_v1"
    },
    "verano-verdadero": {
        nombre: "Verano Verdadero (True Summer)",
        slug: "verano-verdadero",
        descripcion: "La elegancia clásica. Todo en ti es frío y suave, sin contrastes duros.",
        colores_poder: ["#6495ED", "#DB7093", "#4682B4", "#D8BFD8", "#00CED1"], // Azules agrisados, Rosas fríos
        colores_evitar: ["#FFA500", "#FFFF00", "#FFD700", "#A0522D"], // Naranjas, Dorados
        mensaje_venta: "Los azules y rosas fríos son tu base de poder. Nada de naranja.",
        guia_id: "guia_verano_verdadero_v1"
    },
    "verano-suave": {
        nombre: "Verano Suave (Soft Summer)",
        slug: "verano-suave",
        descripcion: "Elegancia, sutileza y misterio. Tu imagen brilla con tonos ahumados y frescos.",
        colores_poder: ["#BC8F8F", "#708090", "#6A5ACD", "#2E8B57", "#5F9EA0"], // Malva, Gris Pizarra, Lavanda
        colores_evitar: ["#FF0000", "#000000", "#FFFF00", "#0000CD"], // Colores chillones, Negro puro
        mensaje_venta: "El contraste alto te sobrepasa. Descubre cómo la monocromía es tu mejor aliada ejecutiva. El gris marengo es tu nuevo negro.",
        guia_id: "guia_verano_suave_v1"
    },
    "otono-suave": {
        nombre: "Otoño Suave (Soft Autumn)",
        slug: "otono-suave",
        descripcion: "Cálida pero suave. Eres la transición entre el verano y el otoño, tierra y sol bajo.",
        colores_poder: ["#D2B48C", "#556B2F", "#CD5C5C", "#DAA520", "#8FBC8F"], // Beige, Verde Oliva, Terracota suave
        colores_evitar: ["#000000", "#FF00FF", "#0000FF", "#FFFFFF"], // Negro, Fucsia, Azul Eléctrico
        mensaje_venta: "Tonos tierra suaves y verdes oliva te hacen brillar. Aléjate de los contrastes duros.",
        guia_id: "guia_otono_suave_v1"
    },
    "otono-verdadero": {
        nombre: "Otoño Verdadero (True Autumn)",
        slug: "otono-verdadero",
        descripcion: "La calidez personificada. Dorada, rica y vibrante como un bosque en octubre.",
        colores_poder: ["#D2691E", "#FF8C00", "#006400", "#8B0000", "#DAA520"], // Calabaza, Verde Bosque, Rojo Óxido
        colores_evitar: ["#FF69B4", "#00BFFF", "#000000", "#808080"], // Rosa chicle, Azul cielo, Negro
        mensaje_venta: "Colores especia (mostaza, canela, teja) son imprescindibles en tu armario.",
        guia_id: "guia_otono_verdadero_v1"
    },
    "otono-calido": { // Mapped from "otono-verdadero" logic or distinct if existed, created as variant for naming consistency with user prompt if needed. Re-using otono-verdadero logic for 'otono-calido' is safer if strict mapping, but prompt implies specific keys.
        // User requested "otono-calido", but systems usually have True/Warm Autumn. I will add "otono-calido" as an alias or specific entry if needed, but for 12 seasons "Warm Autumn" is often "True Autumn". 
        // Wait, the prompt lists "otono-calido". I will include it.
        nombre: "Otoño Cálido (Warm Autumn)",
        slug: "otono-calido",
        descripcion: "Tu presencia es rica, terrosa y envolvente. Proyectas confianza y accesibilidad.",
        colores_poder: ["#556B2F", "#8B4513", "#DAA520", "#CD5C5C", "#A0522D"],
        colores_evitar: ["#FF00FF", "#00FFFF", "#000000"],
        mensaje_venta: "El negro te apaga. Aprende a usar el café y el verde militar como tus nuevos neutros de poder.",
        guia_id: "guia_otono_calido_v1"
    },
    "otono-profundo": {
        nombre: "Otoño Profundo (Dark Autumn)",
        slug: "otono-profundo",
        descripcion: "Fuerte y cálida. Puedes tomar colores prestados del invierno, pero con un toque dorado.",
        colores_poder: ["#800000", "#006400", "#8B4513", "#FF4500", "#4B0082"], // Marrón Chocolate, Verde Oscuro
        colores_evitar: ["#E6E6FA", "#ADD8E6", "#FFC0CB", "#D3D3D3"], // Pasteles fríos
        mensaje_venta: "El negro te queda bien, pero el marrón chocolate es superior para tu autoridad.",
        guia_id: "guia_otono_profundo_v1"
    },
    "primavera-clara": {
        nombre: "Primavera Clara (Light Spring)",
        slug: "primavera-clara",
        descripcion: "Luz pura y calidez delicada. Pareces un día de sol en primavera.",
        colores_poder: ["#FF7F50", "#FFE4B5", "#98FB98", "#40E0D0", "#FF69B4"], // Coral, Melocotón, Verde Menta
        colores_evitar: ["#000000", "#800020", "#483D8B", "#2F4F4F"], // Colores oscuros y pesados
        mensaje_venta: "Evita colores oscuros y pesados. Busca corales y turquesas para iluminar tu rostro.",
        guia_id: "guia_primavera_clara_v1"
    },
    "primavera-verdadera": {
        nombre: "Primavera Verdadera (True Spring)",
        slug: "primavera-verdadera",
        descripcion: "Vibrante, fresca y cálida. Eres el 'splash' de color en una habitación.",
        colores_poder: ["#FFA500", "#32CD32", "#FFFF00", "#FF4500", "#00BFFF"], // Naranja, Verde Lima
        colores_evitar: ["#000000", "#A9A9A9", "#ADD8E6", "#D8BFD8"], // Grises, Negro
        mensaje_venta: "Tus colores deben tener vida y energía. El beige dorado es tu neutro.",
        guia_id: "guia_primavera_verdadera_v1"
    },
    "primavera-brillante": {
        nombre: "Primavera Brillante (Bright Spring)",
        slug: "primavera-brillante",
        descripcion: "Impactante. Tienes el contraste del invierno pero la calidez de la primavera.",
        colores_poder: ["#FF0000", "#00FF7F", "#FFD700", "#1E90FF", "#FF1493"], // Rojo Amapola, Verde Primavera
        colores_evitar: ["#D2B48C", "#808080", "#BC8F8F", "#778899"], // Tonos apagados/muted
        mensaje_venta: "El negro te queda bien. Combínalo con colores saturados para maximizar tu impacto.",
        guia_id: "guia_primavera_brillante_v1"
    }
};
