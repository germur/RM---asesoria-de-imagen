import { motion } from 'framer-motion';
import { SectionTitle, TextInput, TextArea } from '../FormElements';
import type { WorkbookData } from '../../../../hooks/useWorkbook';

type Props = {
  data: WorkbookData;
  update: (field: keyof WorkbookData, value: string) => void;
};

export const Part4 = ({ data, update }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl py-8 space-y-16">
      <SectionTitle>Parte 4: Proyección a 10 Años</SectionTitle>

      <blockquote className="border-l-4 border-[#C9111E] pl-4 italic text-slate-600 mb-10 font-medium text-lg">
        "Un sueño sin estrategia es solo una fantasía. Un guion sin plan de rodaje nunca llega al cine. Aquí es donde convertimos tu 'algún día' en una fecha de estreno."
      </blockquote>

      <div className="space-y-14">
        <section>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Nivel 1: Propósito y Trascendencia (El Mensaje de Película)</h3>
          <div className="prose text-sm text-slate-600 mb-6">
            <p>Más allá de ti. ¿Para qué existe este personaje en el mundo?</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>La Premisa:</strong> En 10 años, mi vida no se trata solo de mí. Mi imagen y mi presencia están al servicio de una causa, una familia o una misión mayor. ¿A quién sirvo e inspiro cuando me convierto en mi mejor versión?</li>
              <li>(Ojo: Si la respuesta es "para que me envidien" o "para que me acepten", borra y empieza de nuevo. Busca el servicio, el amor o el legado).</li>
            </ul>
          </div>
          <TextArea
            placeholder="Escribe tu propósito..."
            value={data.level1Purpose}
            onChange={(e) => update('level1Purpose', e.target.value)}
          />
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Nivel 2: Identidad (El Protagonista)</h3>
          <p className="text-sm text-slate-600 mb-6">¿Quién ERES, más allá de lo que HACES?</p>
          <p className="text-sm text-slate-600 mb-6"><strong>La definición del SER:</strong> Completa esta frase usando metáforas o arquetipos, no cargos laborales. (Ej: "Soy una creadora de belleza", "Soy un puerto seguro", "Soy la fuerza que abre caminos").</p>

          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight text-slate-900 shrink-0">YO SOY:</span>
            <TextInput
              placeholder="..."
              className="flex-1 text-lg"
              value={data.level2Identity}
              onChange={(e) => update('level2Identity', e.target.value)}
            />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Nivel 3: Creencias y Valores (El Subtexto)</h3>
          <div className="prose text-sm text-slate-600 mb-6">
            <p>El sistema operativo del personaje. ¿Por qué haces lo que haces?</p>
            <p><strong>Check de Realidad:</strong> Muchas veces nos saboteamos porque intentamos vivir un guion ajeno.</p>
          </div>

          <TextArea
            label="Lo que creo sobre mí:"
            hint="¿Me creo merecedora de esa vida en 10 años? (Sí/No y por qué):"
            className="mb-8"
            value={data.level3Beliefs}
            onChange={(e) => update('level3Beliefs', e.target.value)}
          />

          <p className="text-sm text-slate-600 mb-4"><strong>Mis innegociables:</strong> ¿Qué valor guiará mis decisiones? (Ej: Libertad, Coherencia, Paz, Audacia). Si una propuesta va en contra de esto, mi personaje dice "NO".</p>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold tracking-tight text-slate-900 shrink-0">VALOR GUÍA:</span>
            <TextInput
              placeholder="..."
              className="flex-1 text-lg"
              value={data.level3ValueGuide}
              onChange={(e) => update('level3ValueGuide', e.target.value)}
            />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Nivel 4: Capacidades y Habilidades (Las Herramientas)</h3>
          <p className="text-sm text-slate-600 mb-6">¿Qué necesita aprender el personaje para sostener ese éxito?</p>
          <p className="text-sm text-slate-600 mb-6"><strong>El Entrenamiento:</strong> Para ser esa persona en 10 años, ¿qué habilidades (emocionales, intelectuales o de imagen) debo empezar a cultivar HOY? (Ej: Aprender a decir no, aprender de estilo, oratoria, gestión financiera).</p>
          <TextArea
            value={data.level4Skills}
            onChange={(e) => update('level4Skills', e.target.value)}
          />
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Nivel 5: Comportamiento (La Acción en Pantalla)</h3>
          <p className="text-sm text-slate-600 mb-6">Lo que el público ve. ¿Qué hace el personaje concretamente?</p>
          <p className="text-sm text-slate-600 mb-6"><strong>La Puesta en Escena:</strong> Si te viéramos en una cámara oculta un martes cualquiera dentro de 10 años...</p>

          <div className="space-y-6">
            <TextArea
              label="¿Cómo saludas?"
              value={data.level5Greet}
              onChange={(e) => update('level5Greet', e.target.value)}
            />
            <TextArea
              label="¿De qué hablas?"
              value={data.level5Talk}
              onChange={(e) => update('level5Talk', e.target.value)}
            />
            <TextArea
              label="¿Qué hábitos tiene ese personaje que tú hoy no tienes?"
              value={data.level5Habits}
              onChange={(e) => update('level5Habits', e.target.value)}
            />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Nivel 6: Entorno (El Set de Rodaje)</h3>
          <div className="prose text-sm text-slate-600 mb-6 space-y-2">
            <p>Dónde, Cuándo y Con Quién.</p>
            <p><strong>La Escenografía:</strong> Describe el entorno físico que rodea a esa identidad. (Tu casa, tu oficina, tu ciudad, las personas que te rodean).</p>
            <p className="text-[#C9111E] uppercase font-semibold text-xs tracking-wider">NOTA: El entorno llega porque tú cambiaste (Nivel 1 al 5), no al revés.</p>
          </div>
          <TextArea
            label="Descripción:"
            value={data.level6Environment}
            onChange={(e) => update('level6Environment', e.target.value)}
          />
        </section>
      </div>
    </motion.div>
  );
};
