// Esta es una versión simplificada de la lógica de flujo estacional
// Inputs esperados: temperatura (cálido/frío), valor (claro/oscuro), croma (suave/brillante)

interface UserAnswers {
    undertone: 'warm' | 'cool' | 'neutral';
    contrast: 'high' | 'medium' | 'low';
    hairColor: 'dark' | 'light';
}

export function determineSeason(answers: UserAnswers): string {
    // Lógica básica para mapear respuestas a los IDs del JSON

    if (answers.undertone === 'cool') {
        if (answers.contrast === 'high' && answers.hairColor === 'dark') {
            return 'invierno-profundo'; // ID del JSON
        }
        if (answers.contrast === 'low' && answers.hairColor === 'light') {
            return 'verano-suave';
        }
        // Default cool -> Invierno Verdadero (slug: invierno-frio)
        return 'invierno-frio';
    }

    if (answers.undertone === 'warm') {
        if (answers.contrast === 'medium') {
            return 'otono-calido'; // "Otoño Verdadero" en JSON
        }
        if (answers.hairColor === 'light') {
            return 'primavera-calida'; // "Primavera Verdadera" en JSON
        }
        // Default warm -> Otoño Verdadero (slug: otono-calido)
        return 'otono-calido';
    }

    // Fallback por defecto
    return 'invierno-profundo';
}
