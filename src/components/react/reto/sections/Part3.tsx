import { motion } from 'framer-motion';
import { SectionTitle, NumberedTitle, TextInput, RadioGroup, TextArea } from '../FormElements';
import type { WorkbookData } from '../../../../hooks/useWorkbook';

const GENRES = [
  'Acción', 'Cine de Intriga', 'De época', 'Deporte', 'Documental',
  'Drama', 'Fantasía', 'Fé y Espiritualidad', 'Cine Independiente',
  'Humor', 'Musical', 'Romance', 'Ciencia Ficción', 'Terror', 'Policial', 'Otro'
];

type Props = {
  data: WorkbookData;
  update: (field: keyof WorkbookData, value: string) => void;
};

export const Part3 = ({ data, update }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl py-8 space-y-16">
      <SectionTitle subtitle="La película que comienza hoy.">Parte 3: Construcción del Nuevo Personaje</SectionTitle>

      <div className="space-y-12">
        <section>
          <NumberedTitle num={1} title="Título de mi nueva película" />
          <TextInput
            value={data.newMovieTitle}
            onChange={(e) => update('newMovieTitle', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={2} title="Nuevo Género" />
          <RadioGroup
            options={GENRES}
            columns
            value={data.newGenre}
            onChange={(val) => update('newGenre', val)}
          />
        </section>

        <section>
          <NumberedTitle num={3} title="Construcción de Roles" />
          <blockquote className="border-l-4 border-[#C9111E] pl-4 italic text-slate-600 mb-6 font-medium">
            "Un personaje unidimensional no puede sostener una película interesante durante 10 años. Si tu vida es solo trabajo, tu closet será solo un uniforme."
          </blockquote>

          <div className="prose text-slate-900 max-w-none text-sm mb-10 space-y-4">
            <p>La desconexión con nuestra imagen suele ocurrir cuando un solo rol devora a los demás. Allí es donde el armario se vuelve aburrido: no falta ropa, faltan escenas donde usarla.</p>
            <p>Vamos a recuperar los roles olvidados para que tu imagen tenga matices, diversión y propósito.</p>

            <div className="mt-6 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h4 className="font-bold uppercase tracking-tight text-slate-900">A. EL ROL DE PAREJA / ROMANCE</h4>
                <p className="text-slate-500 font-medium">(No se trata de tener pareja, sino de conectar con tu energía magnética y sensual)</p>
                <ul className="list-disc pl-5 mt-2 text-slate-600">
                  <li>¿Cómo se viste tu Nuevo Personaje para una cita?</li>
                  <li>Intención: ¿Qué quieres provocar? (Misterio, cercanía, pasión)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-tight text-slate-900">B. EL ROL SOCIAL Y AMIGOS</h4>
                <p className="text-slate-500 font-medium">(La vida fuera de la productividad y el dinero. El espacio de la risa y la tribu)</p>
                <ul className="list-disc pl-5 mt-2 text-slate-600">
                  <li>Ante una invitación inesperada que te saque de lo profesional, ¿qué usa tu personaje?</li>
                  <li>Ocasión de uso: define una actividad (cena, viaje, fiesta) que hoy evitas por "no tener qué ponerte".</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-tight text-slate-900">C. EL ROL DE DISFRUTE Y HOBBIES</h4>
                <p className="text-slate-500 font-medium">(El tiempo que no vendes por dinero. Tu espacio de juego)</p>
                <ul className="list-disc pl-5 mt-2 text-slate-600">
                  <li>¿Cómo se ve tu personaje cuando está disfrutando puramente?</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#C9111E]/5 p-4 border border-[#C9111E]/20 rounded-xl">
              <strong className="text-[#C9111E] font-bold">EL COMPROMISO:</strong> Para que tu closet sea diverso, tu vida debe serlo. ¿Qué actividad recreativa requiere que diseñes un nuevo "vestuario" en tu vida real?
            </div>

            <p className="italic mt-4 text-slate-500 font-medium">"Tu película tiene muchas locaciones. No uses el mismo vestuario para todas."</p>
          </div>

          <div className="space-y-10 mt-12 border-t border-slate-200 pt-10">
            <TextArea
              label="ESCENA 1:"
              hint="EL LEGADO (Rol Profesional / Misión)"
              value={data.scene1}
              onChange={(e) => update('scene1', e.target.value)}
            />
            <TextArea
              label="ESCENA 2:"
              hint="LA INTIMIDAD (Rol Pareja / Magnetismo)"
              value={data.scene2}
              onChange={(e) => update('scene2', e.target.value)}
            />
            <TextArea
              label="ESCENA 3:"
              hint="LA TRIBU (Rol Social / Amigos)"
              value={data.scene3}
              onChange={(e) => update('scene3', e.target.value)}
            />
            <TextArea
              label="ESCENA 4:"
              hint="EL RECREO (Rol Hobbies / Yo conmigo)"
              value={data.scene4}
              onChange={(e) => update('scene4', e.target.value)}
            />
            <TextArea
              label="ESCENA 5:"
              hint="Describe otra escena importante de tu vida..."
              value={data.scene5}
              onChange={(e) => update('scene5', e.target.value)}
            />
            <TextArea
              label="ESCENA 6:"
              hint="Describe otra escena importante de tu vida..."
              value={data.scene6}
              onChange={(e) => update('scene6', e.target.value)}
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
};
