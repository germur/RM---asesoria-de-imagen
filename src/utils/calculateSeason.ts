export interface UserAnswers {
    undertone: 'warm' | 'cool' | 'neutral';
    contrast: 'high' | 'medium' | 'low';
    hairColor: 'dark' | 'light';
}

export function determineSeason(answers: UserAnswers): string {
    const { undertone, contrast, hairColor } = answers;

    // --- LOGICA DE PROCESAMIENTO (Árbol de Decisión) ---

    // 1. RAMA FRÍA (Cool)
    if (undertone === 'cool') {
        // High Contrast + Dark Hair = INVIERNO (Winter)
        if (contrast === 'high' || hairColor === 'dark') {
            return 'invierno-profundo';
        }

        // Low Contrast + Light Hair = VERANO (Summer)
        return 'verano-suave';
    }

    // 2. RAMA CÁLIDA (Warm)
    if (undertone === 'warm') {
        // Medium/Low Contrast + Light Hair = PRIMAVERA (Spring)
        // Spring is clear, warm, and light.
        if (hairColor === 'light' || contrast === 'low') {
            return 'primavera-calida';
        }

        // Higher Contrast + Darker features = OTOÑO (Autumn)
        return 'otono-calido';
    }

    // 3. RAMA NEUTRA (Neutral Fallback)
    // Si la persona no está segura (Neutral), usamos el contraste como guía principal.
    if (contrast === 'high') return 'invierno-profundo'; // Deep Winter flows into autumn but is high contrast
    if (contrast === 'low') return 'verano-suave'; // Soft Summer flows into autumn
    if (hairColor === 'light') return 'primavera-calida';

    return 'otono-calido'; // Safe bet for medium contrast/neutral
}
