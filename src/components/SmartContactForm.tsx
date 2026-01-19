import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, GraduationCap, Mail } from 'lucide-react';

export default function SmartContactForm() {
    const [selectedIntention, setSelectedIntention] = useState<string | null>(null);

    const options = [
        {
            id: 'vip',
            icon: <MessageCircle className="w-6 h-6 mb-2 text-[#d4af37]" />,
            label: "Asesoría de Imagen Ejecutiva",
            desc: "Para CEOs y Líderes. Prioridad Alta.",
            action: "WhatsApp VIP"
        },
        {
            id: 'booking',
            icon: <Calendar className="w-6 h-6 mb-2 text-stone-600" />,
            label: "Cambio de Look / Visagismo",
            desc: "Cita presencial en estudio.",
            action: "Ir al Booking"
        },
        {
            id: 'student',
            icon: <GraduationCap className="w-6 h-6 mb-2 text-stone-600" />,
            label: "Alumno / Cursos",
            desc: "Dudas sobre academia.",
            action: "Ver Academia"
        },
        {
            id: 'press',
            icon: <Mail className="w-6 h-6 mb-2 text-stone-600" />,
            label: "Prensa / Conferencias",
            desc: "Colaboraciones.",
            action: "Enviar Email"
        }
    ];

    const handleAction = () => {
        if (!selectedIntention) return;

        // Lógica de redirección según selección
        if (selectedIntention === 'vip') window.location.href = "https://wa.me/57300XXXXXXX?text=Hola,%20soy%20un%20ejecutivo%20interesado%20en%20Asesoría";
        if (selectedIntention === 'booking') window.location.href = "/reserva-cita"; // O link de Calendly
        if (selectedIntention === 'student') window.location.href = "/academia";
        if (selectedIntention === 'press') window.location.href = "mailto:prensa@rogermurillo.co";
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl border border-stone-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-center mb-8">¿Cómo podemos ayudarte hoy?</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setSelectedIntention(opt.id)}
                        className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${selectedIntention === opt.id
                                ? 'border-[#d4af37] bg-stone-50 shadow-md'
                                : 'border-stone-100 hover:border-stone-300'
                            }`}
                    >
                        {opt.icon}
                        <div className="font-bold text-[#0c0a09]">{opt.label}</div>
                        <div className="text-xs text-stone-500 mt-1">{opt.desc}</div>
                    </button>
                ))}
            </div>

            <div className="text-center">
                <Button
                    size="lg"
                    onClick={handleAction}
                    disabled={!selectedIntention}
                    className={`w-full h-14 text-lg transition-all ${!selectedIntention ? 'opacity-50 cursor-not-allowed' : 'bg-[#0c0a09] hover:bg-[#d4af37] hover:text-black'
                        }`}
                >
                    {selectedIntention
                        ? `Continuar a ${options.find(o => o.id === selectedIntention)?.action}`
                        : "Selecciona una opción"}
                </Button>
            </div>
        </div>
    );
}
