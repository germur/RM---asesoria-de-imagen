import { motion } from 'framer-motion';

export default function PaletteViewer({ colors, names, avoid }) {
    return (
        <div className="grid md:grid-cols-2 gap-12 my-16">

            {/* Columna: Tus Aliados (Poder) */}
            <div className="bg-white p-8 border-l-4 border-brand-black shadow-lg relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-brand-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">Usar</span>

                <h3 className="font-serif text-2xl text-brand-black mb-8 flex items-center gap-3">
                    Tus Colores de Poder
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    {colors.map((color, i) => (
                        <motion.div
                            key={color}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            <div
                                className="h-24 w-full rounded-sm shadow-md transition-transform transform group-hover:scale-105 border border-gray-100"
                                style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-3 block font-bold uppercase tracking-wide">{names[i]}</span>
                        </motion.div>
                    ))}
                </div>
                <p className="text-sm text-gray-400 mt-8 italic border-t border-gray-100 pt-4">
                    * Úsalos en reuniones de directorio, negociaciones y presentaciones clave para maximizar tu autoridad.
                </p>
            </div>

            {/* Columna: Tu Kryptonita (Evitar) */}
            <div className="bg-brand-gray p-8 border-l-4 border-brand-primary/50 relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-brand-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">Evitar</span>

                <h3 className="font-serif text-2xl text-brand-black/70 mb-8 flex items-center gap-3">
                    Tu Kryptonita Visual
                </h3>

                <div className="grid grid-cols-2 gap-6 opacity-80">
                    {avoid.map((color, i) => (
                        <div key={color} className="relative group">
                            <div
                                className="h-16 w-full rounded-sm mx-auto mb-2 border border-gray-200 shadow-inner relative overflow-hidden"
                                style={{ backgroundColor: color }}
                            >
                                {/* La X roja sobre el color */}
                                <div className="absolute inset-0 flex items-center justify-center bg-white/20 group-hover:bg-white/0 transition-colors">
                                    <span className="text-brand-primary text-4xl font-bold opacity-80">×</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-brand-primary mt-8 font-medium">
                    ⚠️ Precaución: Estos tonos cerca del rostro resaltan ojeras, líneas de expresión y proyectan falta de energía.
                </p>
            </div>

        </div>
    );
}
