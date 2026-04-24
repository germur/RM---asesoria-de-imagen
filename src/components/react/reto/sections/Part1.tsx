import { motion } from 'framer-motion';
import { SectionTitle, NumberedTitle, TextInput, TextArea, RadioGroup } from '../FormElements';
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

export const Part1 = ({ data, update }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl py-8 space-y-16">
      <SectionTitle subtitle="La película que estoy protagonizando hoy.">Parte 1: Diagnóstico de la Película Actual</SectionTitle>

      <div className="space-y-12">
        <section>
          <NumberedTitle num={1} title="Título de la película actual" />
          <TextInput
            hint="Si mi vida hoy fuera una película, se llamaría:"
            placeholder="Ej. El día de la marmota..."
            value={data.currentMovieTitle}
            onChange={(e) => update('currentMovieTitle', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={2} title="Género de la película" />
          <RadioGroup
            options={GENRES}
            columns
            value={data.currentGenre}
            onChange={(val) => update('currentGenre', val)}
          />
        </section>

        <section>
          <NumberedTitle num={3} title="Audiencia de tu película" />
          <p className="text-sm text-gray-500 mb-4">(Antes de elegir revisa el contenido sexual, lenguaje inapropiado y violencia)</p>
          <RadioGroup
            options={['Apta para todo público', '+7', '+13', '+16', 'Solo Adultos']}
            value={data.audience}
            onChange={(val) => update('audience', val)}
          />
        </section>

        <section>
          <NumberedTitle num={4} title="El personaje que interpreto hoy" />
          <TextInput
            label="Nombre simbólico del personaje:"
            placeholder="Ej. La salvadora, La invisible..."
            className="mb-8"
            value={data.currentCharacterName}
            onChange={(e) => update('currentCharacterName', e.target.value)}
          />
          <TextArea
            label="ESTE PERSONAJE"
            hint="¿Cómo vive? ¿Cómo se muestra? ¿Qué energía proyecta?"
            placeholder="Escribe aquí los detalles..."
            value={data.currentCharacterDesc}
            onChange={(e) => update('currentCharacterDesc', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={5} title="Valor cinematográfico del personaje" />
          <p className="text-sm text-slate-500 mb-6">(Este ejercicio no habla de dinero literal. Habla de percepción, posicionamiento, impacto y coherencia.)</p>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-xl font-bold text-slate-900">US$</span>
            <TextInput
              placeholder="0.00"
              className="flex-1"
              value={data.cinematicValue}
              onChange={(e) => update('cinematicValue', e.target.value)}
            />
          </div>

          <TextArea
            label="¿Por qué le asignaste este valor?"
            className="mb-8"
            value={data.cinematicValueReason}
            onChange={(e) => update('cinematicValueReason', e.target.value)}
          />

          <TextArea
            label="¿Qué tendría que cambiar para que su valor se duplicara o triplicara?"
            value={data.cinematicValueChange}
            onChange={(e) => update('cinematicValueChange', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={6} title="Roles que protagonizo" />
          <p className="text-sm text-slate-500 mb-6">Evalúa el personaje que interpretas en cada rol de tu vida. Responde con toda honestidad y sin juicios.</p>

          <div className="grid gap-8 md:grid-cols-2">
            <TextArea label="FAMILIA" hint="¿Qué personaje soy aquí?" value={data.roleFamily} onChange={(e) => update('roleFamily', e.target.value)} />
            <TextArea label="TRABAJO" hint="¿Qué energía proyecto?" value={data.roleWork} onChange={(e) => update('roleWork', e.target.value)} />
            <TextArea label="PROFESIÓN" hint="¿Soy referente, aprendiz, invisible, indispensable?" value={data.roleProfession} onChange={(e) => update('roleProfession', e.target.value)} />
            <TextArea label="HOBBIES" hint="¿Tengo espacio para mi expresión personal?" value={data.roleHobbies} onChange={(e) => update('roleHobbies', e.target.value)} />
            <TextArea label="VIAJES" hint="¿Viajo para expandirme o solo por obligación?" value={data.roleTravel} onChange={(e) => update('roleTravel', e.target.value)} />
            <TextArea label="PAREJA" hint="¿Qué rol interpreto?" value={data.rolePartner} onChange={(e) => update('rolePartner', e.target.value)} />
            <TextArea label="ESPIRITUALIDAD" hint="¿Es parte visible del personaje o es privada y escondida?" value={data.roleSpirituality} onChange={(e) => update('roleSpirituality', e.target.value)} />
            <TextArea label="AMIGOS" hint="¿Soy auténtico/a o interpreto algo distinto?" value={data.roleFriends} onChange={(e) => update('roleFriends', e.target.value)} />
            <TextArea label="DIVERSIÓN" hint="¿Mi personaje sabe disfrutar?" value={data.roleFun} onChange={(e) => update('roleFun', e.target.value)} />
            <TextArea label="CRECIMIENTO PERSONAL" hint="¿Estoy evolucionando o sobreviviendo?" value={data.roleGrowth} onChange={(e) => update('roleGrowth', e.target.value)} />
            <TextArea label="EDUCACIÓN" hint="¿Estoy actualizándome acorde al personaje que quiero ser?" value={data.roleEducation} onChange={(e) => update('roleEducation', e.target.value)} />
          </div>
        </section>

        <section>
          <NumberedTitle num={7} title="Coherencia del Personaje" />
          <p className="text-base text-slate-700 mb-4">¿Mi imagen externa (ropa, maquillaje, accesorios, postura, presencia) es coherente con el personaje que interpreto en estas áreas?</p>
          <RadioGroup
            options={['Sí', 'No', 'Parcialmente']}
            className="mb-6"
            value={data.coherence}
            onChange={(val) => update('coherence', val)}
          />
          <TextArea
            label="Explica:"
            value={data.coherenceExplain}
            onChange={(e) => update('coherenceExplain', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={8} title="Lo que ya no me gusta de esta película" />
          <TextArea
            label="Escenas que no quiero repetir:"
            className="mb-8"
            value={data.dislikeScenes}
            onChange={(e) => update('dislikeScenes', e.target.value)}
          />
          <TextArea
            label="Actitudes que ya no me representan:"
            value={data.dislikeAttitudes}
            onChange={(e) => update('dislikeAttitudes', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={9} title="El costo de seguir interpretando este personaje 10 años más" />
          <TextArea
            hint="Si nada cambia, dentro de 10 años esta historia será..."
            value={data.costOf10Years}
            onChange={(e) => update('costOf10Years', e.target.value)}
          />
        </section>
      </div>
    </motion.div>
  );
};
