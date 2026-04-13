import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ColorTest() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({ temp: 0, contrast: 0, vein: 0 });
    const [isProcessing, setIsProcessing] = useState(false);
    const [processText, setProcessText] = useState('');
    const [showEmailGate, setShowEmailGate] = useState(false);

    // Preguntas diseñadas para segmentar por Temperatura y Contraste
    const questions = [
        {
            id: 'veins',
            category: 'temp',
            question: "Observa las venas de tu muñeca bajo luz natural.",
            options: [
                { label: "Se ven Azules o Moradas", value: "cool", icon: "🔹" },
                { label: "Se ven Verdosas", value: "warm", icon: "🌿" },
                { label: "Es difícil distinguir / Mezcla", value: "neutral", icon: "✨" }
            ]
        },
        {
            id: 'metal',
            category: 'temp',
            question: "¿Qué metal ilumina mejor tu rostro (sin verte pálido/a)?",
            options: [
                { label: "Plata / Oro Blanco", value: "cool", icon: "💍" },
                { label: "Oro Amarillo", value: "warm", icon: "👑" },
                { label: "Ambos me quedan bien", value: "neutral", icon: "⚖️" }
            ]
        },
        {
            id: 'contrast',
            category: 'contrast',
            question: "¿Cuál es el contraste entre tu piel, ojos y cabello?",
            options: [
                { label: "Alto: Piel muy clara y cabello muy oscuro (o viceversa)", value: "high", icon: "⚫⚪" },
                { label: "Medio: Hay diferencia, pero no extrema", value: "medium", icon: "🟤⚪" },
                { label: "Bajo: Todo tiene una intensidad similar (suave)", value: "low", icon: "🟤🟤" }
            ]
        }
    ];

    const handleSelect = (category, value) => {
        // Guardamos respuesta
        setAnswers(prev => ({ ...prev, [category]: value }));

        // Avanzamos o Procesamos
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            startSimulation();
        }
    };

    // La "Magia" del Vibecoding: Simulación de Análisis Técnico (Labor Illusion)
    const startSimulation = () => {
        setIsProcessing(true);
        const stages = [
            "Analizando temperatura de la piel...",
            "Calculando nivel de contraste...",
            "Cruzando datos con 12 estaciones...",
            "Generando perfil ejecutivo..."
        ];

        let currentStage = 0;
        setProcessText(stages[0]);

        const interval = setInterval(() => {
            currentStage++;
            if (currentStage < stages.length) {
                setProcessText(stages[currentStage]);
            } else {
                clearInterval(interval);
                setIsProcessing(false);
                setShowEmailGate(true); // Mostramos el formulario final
            }
        }, 1500); // 1.5 segundos por fase
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica simplificada de redirección (MVP)
        // En producción, aquí se enviaría el lead al CRM antes de redirigir
        // Algoritmo básico para demo:
        let resultSlug = 'invierno-profundo'; // Default

        // Si eligió cálido -> Otoño (ejemplo simple)
        if (answers.temp === 'warm') resultSlug = 'otono-calido';
        // Si eligió neutro -> Verano
        if (answers.temp === 'neutral') resultSlug = 'verano-suave';

        window.location.href = `/resultados/${resultSlug}`;
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white border-t-4 border-brand-primary shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative rounded-sm">

            {/* Barra de Progreso Superior */}
            {!showEmailGate && (
                <div className="w-full h-1 bg-neutral-100">
                    <motion.div
                        className="h-full bg-brand-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                </div>
            )}

            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <AnimatePresence mode='wait'>

                    {/* FASE 1: PREGUNTAS */}
                    {!isProcessing && !showEmailGate && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-xs font-bold text-brand-primary tracking-widest uppercase block mb-4">
                                Paso {step + 1} de {questions.length}
                            </span>
                            <h3 className="font-serif text-3xl text-brand-black mb-8 leading-tight">
                                {questions[step].question}
                            </h3>
                            <div className="space-y-3">
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(questions[step].category, opt.value)}
                                        className="w-full text-left p-6 border border-neutral-200 hover:border-brand-primary hover:bg-red-50/10 transition-all duration-300 group flex items-center justify-between rounded-sm"
                                    >
                                        <span className="font-sans text-lg text-neutral-700 group-hover:text-brand-black font-medium">
                                            {opt.label}
                                        </span>
                                        <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-200">
                                            {opt.icon}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* FASE 2: SIMULACIÓN DE ANÁLISIS */}
                    {isProcessing && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <div className="inline-block w-16 h-16 border-4 border-gray-100 border-t-brand-primary rounded-full animate-spin mb-6"></div>
                            <h3 className="font-serif text-2xl text-brand-black animate-pulse mb-2">
                                {processText}
                            </h3>
                            <p className="text-sm text-neutral-400 font-light uppercase tracking-widest">
                                No cierres esta ventana
                            </p>
                        </motion.div>
                    )}

                    {/* FASE 3: EMAIL GATE (Lead Gen) */}
                    {showEmailGate && (
                        <motion.div
                            key="gate"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                ✓
                            </div>
                            <h3 className="font-serif text-3xl text-brand-black mb-4">
                                Diagnóstico Completado
                            </h3>
                            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                                Hemos identificado tu estación y tus colores de poder. Ingresa tu correo para desbloquear tu <strong>Informe Ejecutivo Personalizado</strong>.
                            </p>

                            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                                <input
                                    type="text"
                                    placeholder="Tu Nombre"
                                    required
                                    className="w-full p-4 bg-neutral-50 border-b-2 border-neutral-200 focus:border-brand-primary outline-none transition-colors placeholder:text-neutral-400"
                                />
                                <input
                                    type="email"
                                    placeholder="Tu Correo Corporativo"
                                    required
                                    className="w-full p-4 bg-neutral-50 border-b-2 border-neutral-200 focus:border-brand-primary outline-none transition-colors placeholder:text-neutral-400"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest py-4 hover:bg-brand-secondary transition-all duration-300 shadow-xl hover:shadow-red-900/20"
                                >
                                    Ver mis Resultados
                                </button>
                                <p className="text-[10px] text-neutral-400 mt-4 uppercase tracking-widest">
                                    Respetamos tu privacidad. Tus datos están encriptados.
                                </p>
                            </form>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
