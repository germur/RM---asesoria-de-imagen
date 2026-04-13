import { useState } from 'react';
import { motion } from 'framer-motion';

export default function QualificationForm() {
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        interes: '',
        objetivo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulación de envío (Aquí conectarías con tu backend/API)
        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-black text-white p-12 text-center border-t-4 border-brand-primary h-full flex flex-col justify-center items-center shadow-2xl"
            >
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mb-6 text-4xl">✨</div>
                <h3 className="font-serif text-3xl mb-4">Solicitud Recibida</h3>
                <p className="text-neutral-300 mb-8 max-w-sm mx-auto leading-relaxed">
                    Gracias, {formData.nombre}. Hemos recibido tu perfil.
                    Nuestro equipo de concierge revisará tu solicitud y te contactará en menos de 24 horas para coordinar tu cita.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-white transition-colors border-b border-brand-primary pb-1"
                >
                    Volver al formulario
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 shadow-2xl relative border-t-4 border-brand-primary"
        >

            {/* Encabezado */}
            <div className="mb-10">
                <span className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-2 block">Paso 1</span>
                <h3 className="font-serif text-3xl md:text-4xl text-brand-black mb-4">Aplica para una Sesión</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Completa los campos para asegurar que Roger o Adriana sean los especialistas adecuados para tu objetivo actual.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Grid de Datos Personales */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                        <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-widest text-brand-black group-focus-within:text-brand-primary transition-colors">Nombre Completo</label>
                        <input
                            type="text"
                            name="nombre"
                            required
                            className="w-full border-b border-neutral-200 py-3 focus:border-brand-primary outline-none transition-colors bg-transparent placeholder-neutral-300 text-brand-black"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label htmlFor="telefono" className="text-xs font-bold uppercase tracking-widest text-brand-black group-focus-within:text-brand-primary transition-colors">WhatsApp / Móvil</label>
                        <input
                            type="tel"
                            name="telefono"
                            required
                            className="w-full border-b border-neutral-200 py-3 focus:border-brand-primary outline-none transition-colors bg-transparent placeholder-neutral-300 text-brand-black"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-brand-black group-focus-within:text-brand-primary transition-colors">Correo Corporativo</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full border-b border-neutral-200 py-3 focus:border-brand-primary outline-none transition-colors bg-transparent placeholder-neutral-300 text-brand-black"
                        onChange={handleChange}
                    />
                </div>

                {/* Filtro de Servicio */}
                <div className="space-y-2 group">
                    <label htmlFor="interes" className="text-xs font-bold uppercase tracking-widest text-brand-black group-focus-within:text-brand-primary transition-colors">Servicio de Interés</label>
                    <div className="relative">
                        <select
                            name="interes"
                            required
                            className="w-full border-b border-neutral-200 py-3 focus:border-brand-primary outline-none bg-transparent appearance-none rounded-none cursor-pointer text-brand-black"
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>Selecciona una opción...</option>
                            <option value="consultoria">Consultoría Integral "A Puerta Cerrada"</option>
                            <option value="corte">Diseño de Corte y Visagismo</option>
                            <option value="color">Colorimetría y Salud Capilar</option>
                            <option value="corporativo">Charlas / Formación Corporativa</option>
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</div>
                    </div>
                </div>

                {/* Objetivo (Cualificación) */}
                <div className="space-y-2 group">
                    <label htmlFor="objetivo" className="text-xs font-bold uppercase tracking-widest text-brand-black group-focus-within:text-brand-primary transition-colors">Tu Objetivo Principal</label>
                    <textarea
                        name="objetivo"
                        rows="3"
                        placeholder="Ej: Tengo un ascenso pronto y necesito proyectar más autoridad..."
                        className="w-full border border-neutral-200 p-4 focus:border-brand-primary outline-none transition-colors resize-none bg-brand-gray/20 text-brand-black rounded-sm"
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Checkbox Legal */}
                <div className="flex items-start gap-3 mt-4">
                    <input type="checkbox" required id="privacy" className="mt-1 w-4 h-4 accent-brand-primary cursor-pointer" />
                    <label htmlFor="privacy" className="text-xs text-neutral-500 leading-relaxed cursor-pointer select-none">
                        He leído y acepto la <a href="/legales/privacidad" className="underline hover:text-brand-primary" target="_blank">política de tratamiento de datos</a>. Entiendo que este formulario es una solicitud sujeta a la disponibilidad de la agenda.
                    </label>
                </div>

                {/* Botón de Acción */}
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest py-5 hover:bg-brand-secondary transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-4 rounded-sm flex justify-center items-center gap-3"
                >
                    {status === 'submitting' ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Procesando...
                        </>
                    ) : (
                        'Solicitar Agendamiento'
                    )}
                </button>

            </form>
        </motion.div>
    );
}
