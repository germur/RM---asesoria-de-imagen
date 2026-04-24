import { motion } from 'framer-motion';
import { SectionTitle, NumberedTitle, TextArea } from '../FormElements';
import type { WorkbookData } from '../../../../hooks/useWorkbook';

type Props = {
  data: WorkbookData;
  update: (field: keyof WorkbookData, value: string) => void;
};

export const Part2 = ({ data, update }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl py-8 space-y-16">
      <SectionTitle>Parte 2: Decisión Creativa</SectionTitle>

      <div className="space-y-12">
        <section>
          <NumberedTitle num={1} title="Punto de quiebre" />
          <TextArea
            hint="¿Qué verdad ya no puedo ignorar?"
            value={data.breakingPoint}
            onChange={(e) => update('breakingPoint', e.target.value)}
          />
        </section>

        <section>
          <NumberedTitle num={2} title="Decisión" />
          <TextArea
            hint="Ya no quiero seguir interpretando este personaje porque..."
            value={data.creativeDecision}
            onChange={(e) => update('creativeDecision', e.target.value)}
          />
        </section>
      </div>
    </motion.div>
  );
};
