import React, { useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────

interface Option { label: string; value: number }
interface Question { dimension: number; text: string; options: Option[] }

// ── Questions ─────────────────────────────────────────────────────────────
// 5 dimensions × 3 questions. Options: A=4 B=3 C=2 D=1.
// Dimensions: 0=Autoridad 1=Confianza 2=Competencia 3=Presencia 4=Coherencia

const DIMENSIONS = ['Autoridad', 'Confianza', 'Competencia', 'Presencia', 'Coherencia'];
const DIMENSION_COLORS = ['#c0392b', '#2c3e50', '#7f8c8d', '#16a085', '#8e44ad'];

const QUESTIONS: Question[] = [
    // ── Autoridad ──────────────────────────────────────────────────────────
    {
        dimension: 0,
        text: 'Cuando entras a una sala de reuniones, ¿percibes que los presentes ajustan su atención o postura?',
        options: [
            { label: 'Siempre — hay un cambio visible y rápido', value: 4 },
            { label: 'Generalmente sí, aunque no siempre', value: 3 },
            { label: 'Raramente lo percibo', value: 2 },
            { label: 'Nunca lo he notado o no ocurre', value: 1 },
        ],
    },
    {
        dimension: 0,
        text: 'En reuniones de alto nivel, ¿tu paleta de colores está seleccionada para proyectar poder?',
        options: [
            { label: 'Sí — colores sólidos oscuros con un acento dominante, de forma consciente', value: 4 },
            { label: 'Generalmente neutros, aunque sin estrategia clara', value: 3 },
            { label: 'Uso colores que me gustan sin pensar en el mensaje', value: 2 },
            { label: 'No lo he considerado nunca', value: 1 },
        ],
    },
    {
        dimension: 0,
        text: '¿Tu indumentaria comunica jerarquía de forma visual antes de que abras la boca?',
        options: [
            { label: 'Sí — visto conscientemente para proyectar liderazgo', value: 4 },
            { label: 'Creo que sí, pero no lo he analizado formalmente', value: 3 },
            { label: 'Probablemente no, aunque tampoco genera conflictos', value: 2 },
            { label: 'No — mi ropa no está pensada para eso', value: 1 },
        ],
    },

    // ── Confianza ──────────────────────────────────────────────────────────
    {
        dimension: 1,
        text: 'Cuando recibes una crítica a tu imagen personal, ¿cuál es tu reacción más honesta?',
        options: [
            { label: 'La analizo objetivamente y la incorporo si es válida', value: 4 },
            { label: 'Me afecta un poco pero la proceso bien', value: 3 },
            { label: 'Me incomoda bastante aunque no lo muestre', value: 2 },
            { label: 'Genera inseguridad o defensividad notoria', value: 1 },
        ],
    },
    {
        dimension: 1,
        text: '¿Qué tan cómodo/a te sientes en entornos de alta exigencia visual (gala, TV, internacional)?',
        options: [
            { label: 'Completamente — es mi ambiente natural', value: 4 },
            { label: 'Bien, aunque con preparación previa', value: 3 },
            { label: 'Con ansiedad que intento disimular', value: 2 },
            { label: 'Los evito por inseguridad en mi imagen', value: 1 },
        ],
    },
    {
        dimension: 1,
        text: '¿Inviertes tiempo conscientemente en planificar tu imagen para presentaciones clave?',
        options: [
            { label: 'Siempre — es parte de mi preparación estratégica', value: 4 },
            { label: 'Para eventos muy importantes, sí', value: 3 },
            { label: 'Raramente — improviso la mayoría de las veces', value: 2 },
            { label: 'Nunca — me parece superficial', value: 1 },
        ],
    },

    // ── Competencia ────────────────────────────────────────────────────────
    {
        dimension: 2,
        text: '¿Cómo visten los referentes de tu sector que más admiras profesionalmente?',
        options: [
            { label: 'Lo sé exactamente y me inspiro en ellos conscientemente', value: 4 },
            { label: 'Tengo una idea general pero no lo analizo en detalle', value: 3 },
            { label: 'No lo he observado con atención', value: 2 },
            { label: 'No existe relación para mí entre imagen y competencia', value: 1 },
        ],
    },
    {
        dimension: 2,
        text: '¿Has recibido comentarios positivos específicos sobre tu imagen en los últimos 6 meses?',
        options: [
            { label: 'Sí, con frecuencia y de personas de alto nivel', value: 4 },
            { label: 'Algún que otro comentario positivo', value: 3 },
            { label: 'No recuerdo haber recibido ninguno', value: 2 },
            { label: 'Más críticas o silencio que elogios', value: 1 },
        ],
    },
    {
        dimension: 2,
        text: '¿Tu imagen refuerza o contradice tu área de expertise?',
        options: [
            { label: 'La refuerza con precisión — transmite exactamente quién soy', value: 4 },
            { label: 'La refuerza en general, con alguna inconsistencia', value: 3 },
            { label: 'Es neutral — no suma ni resta a mi marca', value: 2 },
            { label: 'Puede contradecir o confundir mi posicionamiento', value: 1 },
        ],
    },

    // ── Presencia ──────────────────────────────────────────────────────────
    {
        dimension: 3,
        text: 'Cuando te fotografían para contextos profesionales (LinkedIn, prensa, eventos), ¿qué tan satisfecho/a quedas?',
        options: [
            { label: 'Me representa muy bien y las uso con orgullo', value: 4 },
            { label: 'Algunas salen bien, otras no tanto', value: 3 },
            { label: 'Rara vez quedo conforme con los resultados', value: 2 },
            { label: 'Evito las fotos o no tengo imagen profesional actualizada', value: 1 },
        ],
    },
    {
        dimension: 3,
        text: '¿Cómo es tu postura y lenguaje corporal en situaciones de alta presión?',
        options: [
            { label: 'Expansivo y controlado — transmito poder incluso en silencio', value: 4 },
            { label: 'Generalmente seguro/a, con momentos de contracción', value: 3 },
            { label: 'Tiendo a contraerme o hacerme más pequeño/a', value: 2 },
            { label: 'Es un aspecto que claramente necesito trabajar', value: 1 },
        ],
    },
    {
        dimension: 3,
        text: '¿Tu voz, ritmo y dicción acompañan el nivel visual de tu imagen?',
        options: [
            { label: 'Sí — hay coherencia total entre imagen visual y comunicación verbal', value: 4 },
            { label: 'En general sí, aunque con margen de mejora', value: 3 },
            { label: 'Hay una brecha visible entre cómo me veo y cómo me comunico', value: 2 },
            { label: 'Mi comunicación verbal es el punto débil de mi presencia', value: 1 },
        ],
    },

    // ── Coherencia ─────────────────────────────────────────────────────────
    {
        dimension: 4,
        text: '¿Qué tan consistente es tu imagen entre digital (LinkedIn, video), formal e informal?',
        options: [
            { label: 'Muy consistente — quien me ve online me reconoce en persona', value: 4 },
            { label: 'Bastante consistente con variaciones menores', value: 3 },
            { label: 'Hay diferencias notables entre mis contextos', value: 2 },
            { label: 'Soy personas distintas en cada contexto', value: 1 },
        ],
    },
    {
        dimension: 4,
        text: '¿Tienes un sistema de vestimenta con paleta, siluetas y tejidos definidos?',
        options: [
            { label: 'Sí — sistema claro con paleta, siluetas y tejidos definidos', value: 4 },
            { label: 'Algunas reglas generales que sigo la mayoría del tiempo', value: 3 },
            { label: 'Improviso con lo que tengo disponible', value: 2 },
            { label: 'Cada día es una decisión nueva sin criterio definido', value: 1 },
        ],
    },
    {
        dimension: 4,
        text: '3 personas de contextos distintos (trabajo, networking, personal) describen tu imagen. ¿Qué dirían?',
        options: [
            { label: 'Descripciones muy similares — marca personal sólida y reconocible', value: 4 },
            { label: 'Parecidas aunque con matices distintos', value: 3 },
            { label: 'Bastante diferentes según el contexto', value: 2 },
            { label: 'Probablemente contradictorias', value: 1 },
        ],
    },
];

// ── Score levels ───────────────────────────────────────────────────────────

interface Level {
    label: string;
    description: string;
    cta: string;
    color: string;
    min: number; // percentage 0–100
}

const LEVELS: Level[] = [
    {
        label: 'Élite',
        description:
            'Tu imagen opera como un activo estratégico de primer nivel. Proyectas autoridad, coherencia y presencia antes de hablar. Estás en el 5% superior.',
        cta: 'Mantén la ventaja: sesión de refinamiento estratégico',
        color: '#c0392b',
        min: 90,
    },
    {
        label: 'Estratégico',
        description:
            'Tienes una base sólida y conciencia de la imagen como herramienta. Hay 1–2 dimensiones que, al activarse, catapultarán tu posicionamiento.',
        cta: 'Agenda una sesión de diagnóstico para cerrar las brechas',
        color: '#2c3e50',
        min: 75,
    },
    {
        label: 'Potencial',
        description:
            'Tu imagen comunica competencia pero no poder. Hay claridad parcial — el trabajo es pasar de "verte bien" a "proyectar autoridad".',
        cta: 'El Programa de Imagen Ejecutiva está diseñado exactamente para este nivel',
        color: '#7f8c8d',
        min: 60,
    },
    {
        label: 'En Construcción',
        description:
            'Tu imagen aún no trabaja para ti. Hay inconsistencias que generan fricción en tus interacciones de alto nivel. El potencial está — falta la estrategia.',
        cta: 'Inicia con la Asesoría Integral — transforma las brechas en fortalezas',
        color: '#e67e22',
        min: 45,
    },
    {
        label: 'Auditoría Urgente',
        description:
            'Tu imagen actualmente genera ruido. Puede estar restando autoridad, confianza y oportunidades de forma silenciosa. Es momento de intervención.',
        cta: 'Reserva una sesión de diagnóstico urgente — cada semana cuenta',
        color: '#95a5a6',
        min: 0,
    },
];

function getLevel(pct: number): Level {
    return LEVELS.find(l => pct >= l.min) ?? LEVELS[LEVELS.length - 1];
}

// ── Pentagon radar chart ───────────────────────────────────────────────────

function pentagon(cx: number, cy: number, r: number): string {
    return Array.from({ length: 5 }, (_, i) => {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');
}

function radarPolygon(scores: number[], cx: number, cy: number, maxR: number, maxScore: number): string {
    return scores
        .map((s, i) => {
            const r = (s / maxScore) * maxR;
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
        })
        .join(' ');
}

const LABEL_OFFSET = 22;
function labelPos(i: number, cx: number, cy: number, r: number): { x: number; y: number } {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    return {
        x: cx + (r + LABEL_OFFSET) * Math.cos(a),
        y: cy + (r + LABEL_OFFSET) * Math.sin(a),
    };
}

function RadarChart({ scores }: { scores: number[] }) {
    const cx = 150, cy = 150, maxR = 100;
    const MAX_SCORE = 12;

    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
            {/* Grid pentagons */}
            {gridLevels.map((level, idx) => (
                <polygon
                    key={idx}
                    points={pentagon(cx, cy, maxR * level)}
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="1"
                />
            ))}

            {/* Axis lines */}
            {Array.from({ length: 5 }, (_, i) => {
                const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                return (
                    <line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={cx + maxR * Math.cos(a)}
                        y2={cy + maxR * Math.sin(a)}
                        stroke="#e5e5e5"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Score polygon */}
            <polygon
                points={radarPolygon(scores, cx, cy, maxR, MAX_SCORE)}
                fill="#c0392b"
                fillOpacity="0.15"
                stroke="#c0392b"
                strokeWidth="2"
            />

            {/* Score dots */}
            {scores.map((s, i) => {
                const r = (s / MAX_SCORE) * maxR;
                const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                return (
                    <circle
                        key={i}
                        cx={cx + r * Math.cos(a)}
                        cy={cy + r * Math.sin(a)}
                        r="4"
                        fill="#c0392b"
                    />
                );
            })}

            {/* Labels */}
            {DIMENSIONS.map((dim, i) => {
                const pos = labelPos(i, cx, cy, maxR);
                return (
                    <text
                        key={i}
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fontWeight="600"
                        letterSpacing="1"
                        fill="#404040"
                        style={{ textTransform: 'uppercase' }}
                    >
                        {dim}
                    </text>
                );
            })}
        </svg>
    );
}

// ── Main component ─────────────────────────────────────────────────────────

const TOTAL_QS = QUESTIONS.length; // 15

export default function ImpactTest() {
    const [step, setStep] = useState(0); // 0 = intro, 1–15 = questions, 16 = result
    const [answers, setAnswers] = useState<number[]>([]);

    const questionIndex = step - 1; // 0-based index into QUESTIONS
    const currentQuestion = step >= 1 && step <= TOTAL_QS ? QUESTIONS[questionIndex] : null;
    const progress = step === 0 ? 0 : Math.round((step / TOTAL_QS) * 100);

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);
        setStep(s => s + 1);
    };

    const handleReset = () => {
        setAnswers([]);
        setStep(0);
    };

    // Compute scores when done
    const dimScores = DIMENSIONS.map((_, dIdx) =>
        QUESTIONS.reduce((sum, q, qIdx) => {
            if (q.dimension !== dIdx) return sum;
            return sum + (answers[qIdx] ?? 0);
        }, 0),
    ); // each 0–12
    const totalScore = dimScores.reduce((a, b) => a + b, 0); // 0–60
    const pct = Math.round((totalScore / 60) * 100);
    const level = getLevel(pct);

    // ── Intro ────────────────────────────────────────────────────────────
    if (step === 0) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-5 gap-2">
                    {DIMENSIONS.map((dim, i) => (
                        <div key={i} className="text-center">
                            <div
                                className="h-1.5 rounded-sm mb-2"
                                style={{ backgroundColor: DIMENSION_COLORS[i] }}
                            />
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400">{dim}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 text-sm text-neutral-500 font-light leading-relaxed">
                    <p>
                        <strong className="text-brand-black font-medium">15 preguntas.</strong> 5 dimensiones de impacto ejecutivo.
                        Sin filtros — responde con total honestidad para obtener un diagnóstico real.
                    </p>
                    <p>Cada respuesta es confidencial y el resultado personalizado aparece al finalizar.</p>
                </div>

                <div className="bg-neutral-50 border border-neutral-100 p-5 space-y-2">
                    {[
                        ['Autoridad', '¿Tu imagen comunica poder antes de hablar?'],
                        ['Confianza', '¿Proyectas seguridad en entornos de alta exigencia?'],
                        ['Competencia', '¿Tu imagen señala expertise de forma visual?'],
                        ['Presencia', '¿Tienes impacto físico y no verbal medible?'],
                        ['Coherencia', '¿Existe una marca personal consistente en todos tus contextos?'],
                    ].map(([dim, desc]) => (
                        <div key={dim} className="flex gap-3 items-start">
                            <span className="text-brand-primary text-xs mt-0.5">◆</span>
                            <p className="text-xs text-neutral-600">
                                <strong className="text-brand-black font-medium">{dim}:</strong> {desc}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setStep(1)}
                    className="w-full bg-brand-primary text-white py-4 text-xs font-medium uppercase tracking-[0.2em]
                               hover:bg-brand-black transition-colors duration-300"
                >
                    Iniciar Diagnóstico
                </button>

                <p className="text-[10px] text-neutral-400 text-center uppercase tracking-widest">
                    Tiempo estimado: 4 minutos
                </p>
            </div>
        );
    }

    // ── Result ────────────────────────────────────────────────────────────
    if (step > TOTAL_QS) {
        return (
            <div className="space-y-8">
                {/* Level badge */}
                <div className="text-center pb-6 border-b border-neutral-100">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-3">Nivel de Impacto</p>
                    <h3
                        className="font-serif text-4xl mb-2"
                        style={{ color: level.color }}
                    >
                        {level.label}
                    </h3>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest">{pct}% de impacto ejecutivo</p>
                </div>

                {/* Radar chart */}
                <RadarChart scores={dimScores} />

                {/* Dimension breakdown */}
                <div className="space-y-3">
                    {DIMENSIONS.map((dim, i) => {
                        const pctDim = Math.round((dimScores[i] / 12) * 100);
                        return (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-[10px] uppercase tracking-wider text-neutral-500 w-24 flex-shrink-0">{dim}</span>
                                <div className="flex-1 h-1.5 bg-neutral-100 rounded-sm overflow-hidden">
                                    <div
                                        className="h-full rounded-sm transition-all duration-700"
                                        style={{ width: `${pctDim}%`, backgroundColor: DIMENSION_COLORS[i] }}
                                    />
                                </div>
                                <span className="text-xs text-neutral-400 w-8 text-right">{pctDim}%</span>
                            </div>
                        );
                    })}
                </div>

                {/* Description */}
                <div className="bg-neutral-50 border-l-2 border-brand-primary pl-5 py-4 pr-4">
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">{level.description}</p>
                </div>

                {/* CTA */}
                <a
                    href="/contacto"
                    className="flex items-center justify-between px-6 py-4 bg-brand-primary text-white
                               text-xs uppercase tracking-[0.18em] hover:bg-brand-black transition-colors duration-300"
                >
                    <span>{level.cta}</span>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>

                <button
                    onClick={handleReset}
                    className="w-full text-xs text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest py-2"
                >
                    ← Hacer el test de nuevo
                </button>
            </div>
        );
    }

    // ── Question ──────────────────────────────────────────────────────────
    if (!currentQuestion) return null;
    const dimName = DIMENSIONS[currentQuestion.dimension];
    const dimColor = DIMENSION_COLORS[currentQuestion.dimension];

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                        Pregunta {step} de {TOTAL_QS}
                    </span>
                    <span
                        className="text-[10px] uppercase tracking-widest font-medium"
                        style={{ color: dimColor }}
                    >
                        {dimName}
                    </span>
                </div>
                <div className="h-0.5 bg-neutral-100 w-full">
                    <div
                        className="h-full bg-brand-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <p className="font-serif text-xl text-brand-black leading-snug pt-2">
                {currentQuestion.text}
            </p>

            {/* Options */}
            <div className="space-y-3">
                {currentQuestion.options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full text-left p-5 border border-neutral-200 bg-white
                                   hover:border-brand-primary hover:bg-red-50/20
                                   transition-all duration-200 group flex items-start gap-4"
                    >
                        <span
                            className="flex-shrink-0 w-6 h-6 border border-neutral-200 group-hover:border-brand-primary
                                       flex items-center justify-center text-[10px] font-medium text-neutral-400
                                       group-hover:text-brand-primary transition-colors duration-200 mt-0.5"
                        >
                            {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm text-neutral-600 group-hover:text-brand-black font-light leading-relaxed transition-colors duration-200">
                            {opt.label}
                        </span>
                    </button>
                ))}
            </div>

            {step > 1 && (
                <button
                    onClick={() => {
                        setAnswers(a => a.slice(0, -1));
                        setStep(s => s - 1);
                    }}
                    className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                    ← Pregunta anterior
                </button>
            )}
        </div>
    );
}
