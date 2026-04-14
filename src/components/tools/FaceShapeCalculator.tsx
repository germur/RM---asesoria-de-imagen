import React, { useState } from 'react';

// ── Face shape data ────────────────────────────────────────────────────────

interface ShapeData {
    name: string;
    description: string;
    svg: React.ReactNode;
    cortes: string[];
    cortesEvitar: string[];
    barba: string[];
    gafas: string[];
}

const SHAPES: Record<string, ShapeData> = {
    oval: {
        name: 'Oval',
        description:
            'El rostro más versátil. Tu longitud supera el ancho en proporción áurea, con los pómulos como punto más amplio y un contorno suave. Casi cualquier estilo funciona — los clásicos te hacen justicia total.',
        svg: (
            <ellipse cx="50" cy="50" rx="34" ry="44" fill="none" stroke="currentColor" strokeWidth="2.5" />
        ),
        cortes: ['Clásico lateral', 'Crew cut', 'Pompadour', 'Quiff', 'Undercut'],
        cortesEvitar: ['Muy largo y liso (alarga más el rostro)', 'Flequillo demasiado pesado'],
        barba: ['Barba corta perfilada', 'Barba de 3 días', 'Cualquier longitud funciona bien'],
        gafas: ['Cuadradas', 'Rectangulares', 'Aviador', 'Wayfarer'],
    },
    round: {
        name: 'Redondo',
        description:
            'Ancho y largo similares con mejillas plenas y mandíbula suave. El objetivo es crear ilusión óptica de longitud y ángulos para proyectar mayor autoridad.',
        svg: (
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2.5" />
        ),
        cortes: ['Alto y plano (volumen en la coronilla)', 'Flequillo lateral', 'Undercut alto', 'Pompadour alto'],
        cortesEvitar: ['Rapado total (resalta la redondez)', 'Flequillo recto y bajo', 'Lados muy voluminosos'],
        barba: ['Barba larga (alarga el rostro)', 'Perilla (crea vértice visual)', 'Barba con ángulos definidos'],
        gafas: ['Rectangulares', 'Cuadradas', 'Angulares', 'Evitar redondas u ovaladas'],
    },
    square: {
        name: 'Cuadrado',
        description:
            'Frente, pómulos y mandíbula en proporciones similares con ángulos pronunciados. Proyecta fuerza y carácter. El objetivo es suavizar la mandíbula con texturas y movimiento.',
        svg: (
            <rect x="16" y="16" width="68" height="68" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        ),
        cortes: ['Texturizado con movimiento lateral', 'Capas que suavicen la mandíbula', 'Flequillo con textura'],
        cortesEvitar: ['Línea de contorno muy marcada', 'Corte plano y recto', 'Muy corto (resalta ángulos)'],
        barba: ['Sin barba o sombra suave', 'Barba corta redondeada (suaviza ángulos)'],
        gafas: ['Redondas', 'Ovaladas', 'Sin montura', 'Aviador'],
    },
    rectangular: {
        name: 'Rectangular',
        description:
            'Largo y proporcionado con frente, pómulos y mandíbula de anchura similar. El objetivo es añadir anchura visual y romper la longitud vertical.',
        svg: (
            <rect x="22" y="8" width="56" height="84" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        ),
        cortes: ['Volumen a los lados', 'Flequillo que cubra parte de la frente', 'Pompadour con lados voluminosos'],
        cortesEvitar: ['Muy alto (alarga más)', 'Liso hacia arriba', 'Muy pegado a los lados'],
        barba: ['Barba de volumen en los lados', 'Bigote prominente (da anchura)', 'Barba completa y ancha'],
        gafas: ['Grandes y anchas', 'Con detalle en las sienes', 'Horizontalmente prominentes'],
    },
    diamond: {
        name: 'Diamante',
        description:
            'Pómulos amplios con frente y mandíbula más estrechas. Facciones angulares de alta intensidad. El objetivo es equilibrar añadiendo anchura visual arriba y abajo.',
        svg: (
            <polygon
                points="50,8 88,50 50,92 12,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
            />
        ),
        cortes: ['Volumen en la coronilla', 'Flequillo lateral que cubra parte de la frente', 'Anchura arriba'],
        cortesEvitar: ['Muy corto en las sienes (resalta el hueso cigomático)', 'Peinado plano hacia atrás'],
        barba: ['Barba larga en la barbilla (alarga la mandíbula)', 'Perilla prominente'],
        gafas: ['Ovaladas', 'Sin montura', 'Montura delgada', 'Evitar angulares extremas'],
    },
    corazon: {
        name: 'Corazón',
        description:
            'Frente amplia que se estrecha hacia una barbilla pronunciada. El objetivo es equilibrar la parte superior reduciendo el volumen arriba y ampliando la percepción abajo.',
        svg: (
            <path
                d="M50,88 L18,55 C10,42 14,22 28,18 C38,15 46,22 50,30 C54,22 62,15 72,18 C86,22 90,42 82,55 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
            />
        ),
        cortes: ['Volumen en las puntas', 'Bob con peso abajo', 'Flequillo lateral suave'],
        cortesEvitar: ['Muy corto en los lados arriba (resalta la frente)', 'Flequillo recto y cargado'],
        barba: ['Barba larga y llena (amplía la barbilla)', 'Barba completa', 'Evitar barba muy escasa'],
        gafas: ['Marco inferior grueso', 'Montura ancha abajo', 'Evitar cat-eye pronunciado'],
    },
    triangular: {
        name: 'Triangular',
        description:
            'Mandíbula más ancha que pómulos y frente estrecha. El objetivo es equilibrar añadiendo anchura visual en la parte superior del rostro.',
        svg: (
            <polygon
                points="50,10 80,30 86,70 82,88 18,88 14,70 20,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
            />
        ),
        cortes: ['Mucho volumen en la coronilla', 'Flequillo que agrande la frente', 'Capas altas'],
        cortesEvitar: ['Liso y pegado arriba', 'Muy corto en la coronilla'],
        barba: ['Sin barba o sombra muy ligera (no ampliar más la mandíbula)'],
        gafas: ['Marco superior prominente', 'Con decoración en las sienes superiores', 'Cat-eye'],
    },
};

// ── Classification algorithm ───────────────────────────────────────────────

function classify(f: number, c: number, j: number, l: number): string {
    const ratio = l / Math.max(f, c, j);

    // Jaw clearly widest → Triangular
    if (j > c * 1.06 && j > f * 1.06) return 'triangular';

    // Forehead widest and jaw significantly narrower → Heart
    if (f >= c * 0.96 && (f - j) / f >= 0.15) return 'corazon';

    // Cheekbones clearly widest, both forehead and jaw noticeably narrower → Diamond
    if (c >= f * 1.07 && c >= j * 1.07) return 'diamond';

    // Short ratio AND jaw prominent → Square
    if (ratio <= 1.22 && j / c >= 0.85 && f / c >= 0.85) return 'square';

    // Short ratio, cheekbones widest → Round
    if (ratio <= 1.12 && c >= f * 0.93 && c >= j * 0.93) return 'round';

    // Long AND widths relatively equal → Rectangular
    if (ratio >= 1.50 && Math.abs(f - j) / c < 0.20) return 'rectangular';

    // Default → Oval
    return 'oval';
}

// ── Component ──────────────────────────────────────────────────────────────

const inputCls =
    'block w-full bg-neutral-50 border border-neutral-200 focus:border-brand-primary outline-none transition-colors p-3.5 text-brand-black font-light text-sm placeholder:text-neutral-400';

export default function FaceShapeCalculator() {
    const [vals, setVals] = useState({ forehead: '', cheekbones: '', jawline: '', faceLength: '' });
    const [shapeKey, setShapeKey] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setVals(v => ({ ...v, [k]: e.target.value }));

    const handleCalculate = () => {
        const f = parseFloat(vals.forehead);
        const c = parseFloat(vals.cheekbones);
        const j = parseFloat(vals.jawline);
        const l = parseFloat(vals.faceLength);

        const errs: string[] = [];
        if (isNaN(f) || f <= 0) errs.push('Ingresa el ancho de frente.');
        if (isNaN(c) || c <= 0) errs.push('Ingresa el ancho de pómulos.');
        if (isNaN(j) || j <= 0) errs.push('Ingresa el ancho de mandíbula.');
        if (isNaN(l) || l <= 0) errs.push('Ingresa el largo del rostro.');
        if (errs.length) { setErrors(errs); return; }

        setErrors([]);
        setShapeKey(classify(f, c, j, l));
    };

    const reset = () => {
        setVals({ forehead: '', cheekbones: '', jawline: '', faceLength: '' });
        setShapeKey(null);
        setErrors([]);
    };

    const shape = shapeKey ? SHAPES[shapeKey] : null;

    if (shape && shapeKey) {
        return <Result shapeKey={shapeKey} shape={shape} onReset={reset} />;
    }

    return (
        <div className="space-y-5">
            {/* Guide illustration */}
            <div className="bg-neutral-50 border border-neutral-100 p-5 flex gap-5 items-start">
                <svg viewBox="0 0 100 130" className="w-20 flex-shrink-0 text-neutral-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Face outline */}
                    <ellipse cx="50" cy="60" rx="32" ry="44" />
                    {/* Forehead arrow */}
                    <line x1="18" y1="30" x2="82" y2="30" strokeDasharray="3 2" />
                    <text x="85" y="33" fontSize="7" fill="#737373" fontFamily="sans-serif">F</text>
                    {/* Cheekbones arrow */}
                    <line x1="18" y1="58" x2="82" y2="58" strokeDasharray="3 2" />
                    <text x="85" y="61" fontSize="7" fill="#737373" fontFamily="sans-serif">P</text>
                    {/* Jawline arrow */}
                    <line x1="24" y1="88" x2="76" y2="88" strokeDasharray="3 2" />
                    <text x="79" y="91" fontSize="7" fill="#737373" fontFamily="sans-serif">M</text>
                    {/* Length arrow */}
                    <line x1="92" y1="16" x2="92" y2="104" strokeDasharray="3 2" />
                    <text x="88" y="110" fontSize="7" fill="#737373" fontFamily="sans-serif">L</text>
                </svg>
                <div>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-widest mb-2">Cómo medir</p>
                    <ul className="text-xs text-neutral-400 space-y-1 font-light">
                        <li><span className="text-neutral-600 font-medium">F —</span> Frente: de sien a sien</li>
                        <li><span className="text-neutral-600 font-medium">P —</span> Pómulos: del pómulo más saliente</li>
                        <li><span className="text-neutral-600 font-medium">M —</span> Mandíbula: del ángulo al mentón × 2</li>
                        <li><span className="text-neutral-600 font-medium">L —</span> Largo: de la frente al mentón</li>
                    </ul>
                </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium block mb-1.5">Frente (cm)</span>
                    <input type="number" min="0" step="0.1" className={inputCls}
                        placeholder="Ej: 15.0" value={vals.forehead} onChange={set('forehead')} />
                </label>
                <label className="block">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium block mb-1.5">Pómulos (cm)</span>
                    <input type="number" min="0" step="0.1" className={inputCls}
                        placeholder="Ej: 16.0" value={vals.cheekbones} onChange={set('cheekbones')} />
                </label>
                <label className="block">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium block mb-1.5">Mandíbula (cm)</span>
                    <input type="number" min="0" step="0.1" className={inputCls}
                        placeholder="Ej: 14.0" value={vals.jawline} onChange={set('jawline')} />
                </label>
                <label className="block">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium block mb-1.5">Largo del Rostro (cm)</span>
                    <input type="number" min="0" step="0.1" className={inputCls}
                        placeholder="Ej: 22.0" value={vals.faceLength} onChange={set('faceLength')} />
                </label>
            </div>

            {errors.length > 0 && (
                <ul className="text-xs text-brand-primary space-y-0.5">
                    {errors.map((e, i) => <li key={i}>• {e}</li>)}
                </ul>
            )}

            <button
                onClick={handleCalculate}
                className="w-full bg-brand-primary text-white py-4 text-xs font-medium uppercase tracking-[0.2em]
                           hover:bg-brand-black transition-colors duration-300"
            >
                Calcular Geometría Facial
            </button>
        </div>
    );
}

// ── Result panel ───────────────────────────────────────────────────────────

function Result({ shapeKey, shape, onReset }: { shapeKey: string; shape: ShapeData; onReset: () => void }) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
                <svg viewBox="0 0 100 100" className="w-20 h-20 flex-shrink-0 text-brand-primary">
                    {shape.svg}
                </svg>
                <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-[0.3em] mb-1">Tu geometría facial</p>
                    <h3 className="font-serif text-3xl text-brand-black leading-tight">Rostro {shape.name}</h3>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-500 font-light leading-relaxed">{shape.description}</p>

            {/* Recommendations grid */}
            <div className="grid gap-5">
                <RecoBlock title="Cortes recomendados" items={shape.cortes} accent="border-brand-black" />
                <RecoBlock title="Estilos a evitar" items={shape.cortesEvitar} accent="border-brand-primary" muted />
                <RecoBlock title="Barba / afeitado" items={shape.barba} accent="border-neutral-400" />
                <RecoBlock title="Gafas ideales" items={shape.gafas} accent="border-neutral-400" />
            </div>

            {/* CTA */}
            <a
                href="/servicios/visagismo-corte"
                className="flex items-center justify-between px-6 py-4 bg-brand-black text-white
                           text-xs uppercase tracking-[0.18em] hover:bg-brand-primary transition-colors duration-300"
            >
                <span>Sesión profesional de visagismo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full text-xs text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest py-2"
            >
                ← Volver a calcular
            </button>
        </div>
    );
}

function RecoBlock({
    title,
    items,
    accent,
    muted = false,
}: {
    title: string;
    items: string[];
    accent: string;
    muted?: boolean;
}) {
    return (
        <div className={`border-l-2 ${accent} pl-4`}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">{title}</p>
            <ul className="space-y-1">
                {items.map((item, i) => (
                    <li key={i} className={`text-sm font-light ${muted ? 'text-neutral-400 line-through decoration-brand-primary/40' : 'text-neutral-600'}`}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
