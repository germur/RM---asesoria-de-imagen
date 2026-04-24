import { motion } from 'framer-motion';
import { SectionTitle, TextInput } from '../FormElements';
import type { WorkbookData } from '../../../../hooks/useWorkbook';

type Props = {
  data: WorkbookData;
  update: (field: keyof WorkbookData, value: string) => void;
};

export const Declaration = ({ data, update }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl py-8 space-y-10">
      <div className="text-center">
        <SectionTitle>Declaración Final</SectionTitle>
      </div>

      <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-200 rounded-2xl space-y-6 text-slate-800 leading-relaxed text-lg">
        <p>Hoy dejo de vivir mi historia en automático.</p>

        <p>Reconozco el personaje que he interpretado hasta ahora — con sus luces y sus sombras — y asumo la responsabilidad de su evolución.</p>

        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>Decido dejar de repetir escenas que no me representan.</li>
          <li>Decido cuestionar los diálogos que me limitan.</li>
          <li>Decido elevar el estándar de mi propia narrativa.</li>
        </ul>

        <p>A partir de este momento, tomo el rol de director/a y protagonista de mi vida.</p>

        <p>Cada elección que haga — cómo pienso, cómo me presento, cómo me visto, cómo me relaciono — será coherente con la versión de mí que estoy construyendo.</p>

        <p>No estoy cambiando mi imagen.<br />Estoy redefiniendo mi personaje.</p>

        <p>Y me comprometo a sostener esta transformación más allá de este reto.</p>

        <p className="text-2xl font-bold tracking-tight text-center pt-8 text-[#C9111E]">Hoy comienza una nueva etapa de mi historia.</p>

        <div className="pt-16 pb-8 flex flex-col gap-8 max-w-sm mx-auto">
          <div className="flex items-end gap-4">
            <span className="text-xl font-bold tracking-tight text-slate-900">Firma:</span>
            <TextInput
              className="flex-1"
              value={data.signature}
              onChange={(e) => update('signature', e.target.value)}
              placeholder="Tu firma aquí"
            />
          </div>
          <div className="flex items-end gap-4">
            <span className="text-xl font-bold tracking-tight text-slate-900">Fecha:</span>
            <input
              type="date"
              className="flex-1 border-b-2 border-slate-200 bg-transparent py-2 text-slate-900 focus:border-[#C9111E] focus:outline-none"
              value={data.date}
              onChange={(e) => update('date', e.target.value)}
            />
          </div>
        </div>

        <p className="text-center italic text-slate-500 font-medium mt-8 pt-8 border-t border-slate-100">
          "No viniste a improvisar tu papel. Viniste a protagonizar tu propia obra maestra."
        </p>
      </div>

      <div className="flex justify-center mt-12 pb-12">
        <button
          className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium tracking-wide hover:bg-[#C9111E] transition-colors shadow-sm"
          onClick={() => window.print()}
        >
          Guardar / Imprimir mi Dossier
        </button>
      </div>
    </motion.div>
  );
};
