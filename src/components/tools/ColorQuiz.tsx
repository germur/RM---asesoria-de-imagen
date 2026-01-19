import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { determineSeason } from '../../utils/calculateSeason';

// Definimos los tipos para las respuestas
type QuizState = {
    step: number;
    answers: {
        undertone: 'cool' | 'warm' | 'neutral' | null;
        contrast: 'high' | 'medium' | 'low' | null;
        hairColor: 'dark' | 'light' | null;
    };
    email: string;
};

export default function ColorQuiz() {
    const [state, setState] = useState<QuizState>({
        step: 0,
        answers: { undertone: null, contrast: null, hairColor: null },
        email: '',
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Manejador de selección de opciones
    const handleSelect = (key: keyof typeof state.answers, value: any) => {
        setState(prev => ({
            ...prev,
            answers: { ...prev.answers, [key]: value },
            step: prev.step + 1
        }));
    };

    // Manejador final (Cálculo y Redirección)
    const handleFinish = async () => {
        setIsAnalyzing(true);

        // 1. Simulamos "Análisis con IA" para dar valor percibido (UX)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 2. Calculamos la estación usando tu "Cerebro" del Sprint 2
        // Aseguramos que los valores no sean null (en producción validar mejor)
        const resultSlug = determineSeason({
            undertone: state.answers.undertone!,
            contrast: state.answers.contrast!,
            hairColor: state.answers.hairColor!
        });

        // 3. Redirección a la URL Programática (Silo 2)
        window.location.href = `/resultados/${resultSlug}`;
    };

    // Variantes de animación para Framer Motion
    const slideIn = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm border border-stone-200 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative">

            {/* Barra de Progreso Superior */}
            <div className="w-full h-1 bg-stone-100">
                <motion.div
                    className="h-full bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: `${(state.step / 4) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* STEP 0: INTRO */}
                    {state.step === 0 && (
                        <motion.div key="intro" variants={slideIn} initial="hidden" animate="visible" exit="exit" className="text-center">
                            <div className="mx-auto w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                <Sparkles size={32} />
                            </div>
                            <h2 className="text-3xl font-serif font-bold mb-4 text-stone-900">Descubre tu Estación Cromática</h2>
                            <p className="text-stone-600 mb-8 text-lg">En menos de 2 minutos analizaremos tu piel, ojos y contraste para revelarte la paleta de colores que te hace brillar.</p>
                            <Button size="lg" onClick={() => setState(s => ({ ...s, step: 1 }))} className="px-8 text-lg">
                                Iniciar Análisis
                            </Button>
                        </motion.div>
                    )}

                    {/* STEP 1: UNDERTONE (Temperatura) */}
                    {state.step === 1 && (
                        <motion.div key="step1" variants={slideIn} initial="hidden" animate="visible" exit="exit">
                            <h3 className="text-2xl font-serif mb-8 text-center">¿Cómo reacciona tu piel al sol sin protección?</h3>
                            <div className="grid gap-4">
                                <OptionCard
                                    title="Me quemo fácilmente"
                                    desc="Me pongo roja y rara vez me bronceo. (Subtono Frío)"
                                    onClick={() => handleSelect('undertone', 'cool')}
                                />
                                <OptionCard
                                    title="Me bronceo gradualmente"
                                    desc="Tomo un color dorado sin quemarme mucho. (Subtono Cálido)"
                                    onClick={() => handleSelect('undertone', 'warm')}
                                />
                                <OptionCard
                                    title="Depende / No estoy segura"
                                    desc="A veces me quemo, a veces me bronceo. (Neutro)"
                                    onClick={() => handleSelect('undertone', 'neutral')}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: CONTRASTE */}
                    {state.step === 2 && (
                        <motion.div key="step2" variants={slideIn} initial="hidden" animate="visible" exit="exit">
                            <h3 className="text-2xl font-serif mb-8 text-center">Mira tu rostro en blanco y negro...</h3>
                            <p className="text-stone-500 text-center mb-6 -mt-6">¿Qué tanta diferencia de oscuridad hay entre tu cabello, ojos y piel?</p>
                            <div className="grid gap-4">
                                <OptionCard
                                    title="Alto Contraste"
                                    desc="Piel muy clara y cabello muy oscuro (o viceversa)."
                                    onClick={() => handleSelect('contrast', 'high')}
                                />
                                <OptionCard
                                    title="Contraste Medio"
                                    desc="Todo se mezcla un poco, pero hay definición."
                                    onClick={() => handleSelect('contrast', 'medium')}
                                />
                                <OptionCard
                                    title="Bajo Contraste / Suave"
                                    desc="Todo tiene una intensidad similar (muy claro o muy oscuro)."
                                    onClick={() => handleSelect('contrast', 'low')}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: CABELLO (Factor Determinante) */}
                    {state.step === 3 && (
                        <motion.div key="step3" variants={slideIn} initial="hidden" animate="visible" exit="exit">
                            <h3 className="text-2xl font-serif mb-8 text-center">¿Cuál es tu color de cabello natural?</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="cursor-pointer hover:scale-105 transition-transform p-6 bg-stone-900 text-white rounded-xl text-center"
                                    onClick={() => handleSelect('hairColor', 'dark')}
                                >
                                    Oscuro / Negro / Castaño Profundo
                                </div>
                                <div
                                    className="cursor-pointer hover:scale-105 transition-transform p-6 bg-[#eec591] text-stone-900 rounded-xl text-center border border-stone-300"
                                    onClick={() => handleSelect('hairColor', 'light')}
                                >
                                    Rubio / Castaño Claro / Pelirrojo
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: EMAIL GATE + LOADING */}
                    {state.step === 4 && (
                        <motion.div key="step4" variants={slideIn} initial="hidden" animate="visible" exit="exit" className="text-center">
                            {!isAnalyzing ? (
                                <>
                                    <h3 className="text-2xl font-serif mb-4">¡Tu resultado está listo!</h3>
                                    <p className="text-stone-600 mb-8">Ingresa tu correo para ver tu paleta personalizada y recibir la guía de estilo.</p>
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="w-full p-4 border border-stone-300 rounded-lg mb-4 focus:ring-2 focus:ring-black outline-none"
                                        value={state.email}
                                        onChange={(e) => setState(s => ({ ...s, email: e.target.value }))}
                                    />
                                    <Button size="lg" className="w-full" onClick={handleFinish} disabled={!state.email.includes('@')}>
                                        Revelar Mi Estación <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <p className="text-xs text-stone-400 mt-4">Respetamos tu privacidad. Cero spam.</p>
                                </>
                            ) : (
                                <div className="flex flex-col items-center py-10">
                                    <div className="w-12 h-12 border-4 border-stone-200 border-t-black rounded-full animate-spin mb-6"></div>
                                    <h3 className="text-xl font-serif animate-pulse">Analizando morfología y color...</h3>
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

// Subcomponente de Tarjeta de Opción (Reutilizable)
function OptionCard({ title, desc, onClick }: { title: string, desc: string, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group p-6 border border-stone-200 rounded-xl hover:border-black hover:bg-stone-50 cursor-pointer transition-all flex items-center justify-between text-left"
        >
            <div>
                <h4 className="font-semibold text-lg text-stone-900">{title}</h4>
                <p className="text-sm text-stone-500">{desc}</p>
            </div>
            <div className="h-6 w-6 rounded-full border border-stone-300 group-hover:border-black group-hover:bg-black transition-colors" />
        </div>
    );
}
