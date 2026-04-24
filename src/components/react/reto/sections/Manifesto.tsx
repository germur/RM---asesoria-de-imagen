import { motion } from 'framer-motion';
import { SectionTitle } from '../FormElements';

export const Manifesto = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl py-8 space-y-10"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 mb-2">Reto</h1>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#C9111E]">Revoluciona</h1>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#C9111E] mb-8">Tu Imagen</h1>
        <p className="text-sm font-semibold tracking-widest uppercase text-slate-400">
          Dossier Cinematográfico<br />Construcción del Personaje
        </p>
      </div>

      <SectionTitle>Manifiesto</SectionTitle>

      <div className="text-lg text-slate-700">
        <blockquote className="border-l-4 border-[#C9111E] pl-6 italic text-slate-500 text-xl font-medium mb-10 py-2">
          "La imagen personal no comienza en la ropa.
          Comienza en la identidad."
        </blockquote>

        <div className="space-y-6 leading-relaxed">
          <p>
            Durante años hemos aprendido a proyectarnos hacia afuera:
            cómo vestirnos, cómo maquillarnos, cómo comportarnos.
            Pero pocas veces nos hemos detenido a definir quién queremos ser.
          </p>
          <p className="pl-6 border-l border-slate-200">
            <span className="block text-slate-900 font-medium mb-3">Cada persona interpreta un personaje en la película de su vida:</span>
            A veces por costumbre,<br />
            a veces por expectativas externas,<br />
            a veces por miedo a evolucionar.
          </p>
          <p>
            Sin embargo, cuando el personaje no es consciente,
            la imagen se vuelve improvisada.
          </p>
          <p>
            Este programa nace de una premisa clara:
            <strong className="text-slate-900 ml-1">la verdadera transformación ocurre cuando decidimos construirnos con intención.</strong>
          </p>
          <p>
            Aquí no trabajaremos únicamente apariencia.
            Trabajaremos narrativa, coherencia y presencia.
          </p>
          <p>
            Porque cuando el personaje es claro,
            la imagen se convierte en consecuencia.
          </p>

          <div className="pt-8 mb-8">
            <p className="text-2xl font-light tracking-tight text-slate-900">
              Hoy no comienzas un curso.<br />
              Comienzas una construcción consciente.
            </p>
            <p className="text-3xl font-bold tracking-tight text-[#C9111E] mt-4">
              Hoy comienza la revolución.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
