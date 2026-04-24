import { CheckCircle2, Circle } from 'lucide-react';

export const SECTIONS = [
  { id: 'manifesto', title: 'Manifiesto' },
  { id: 'part1', title: 'Parte 1: Diagnóstico' },
  { id: 'part2', title: 'Parte 2: Decisión Creativa' },
  { id: 'part3', title: 'Parte 3: Nuevo Personaje' },
  { id: 'part4', title: 'Parte 4: Proyección' },
  { id: 'declaration', title: 'Declaración Final' },
];

type SidebarProps = {
  currentSection: string;
  onSelect: (id: string) => void;
};

export const Sidebar = ({ currentSection, onSelect }: SidebarProps) => {
  return (
    <div className="w-full md:w-72 shrink-0 border-r border-slate-200 bg-white p-6 sticky top-0 h-screen overflow-y-auto hidden md:flex md:flex-col justify-between">
      <div>
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Reto</h2>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Revoluciona<br />Tu Imagen</h1>
          <div className="mt-4 w-8 h-0.5 bg-[#C9111E]"></div>
          <p className="mt-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">Dossier Cinematográfico</p>
        </div>

        <nav className="flex flex-col gap-1">
          {SECTIONS.map((section, idx) => {
            const isActive = currentSection === section.id;
            const isPast = SECTIONS.findIndex(s => s.id === currentSection) > idx;

            return (
              <button
                key={section.id}
                onClick={() => onSelect(section.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                  isActive
                    ? 'bg-[#C9111E]/8 text-[#C9111E] font-semibold shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="shrink-0">
                  {isPast ? (
                    <CheckCircle2 className={`h-5 w-5 ${isActive ? 'text-[#C9111E]' : 'text-slate-400'}`} />
                  ) : isActive ? (
                    <Circle className="h-5 w-5 fill-[#C9111E] text-[#C9111E]" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                </div>
                <span className="text-sm">{section.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 bg-slate-900 text-white p-6 rounded-2xl">
        <p className="text-xs font-medium text-slate-400 mb-1">PROGRESO DEL RETO</p>
        <p className="font-medium text-sm">Tu dossier se guarda automáticamente.</p>
      </div>
    </div>
  );
};

export const MobileNav = ({ currentSection, onSelect }: SidebarProps) => {
  return (
    <div className="md:hidden border-b border-slate-200 bg-white px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
      <h1 className="text-base font-bold tracking-tight text-slate-900">Revoluciona Tu Imagen</h1>
      <select
        value={currentSection}
        onChange={(e) => onSelect(e.target.value)}
        className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-sans text-slate-700 focus:ring-1 focus:ring-[#C9111E] outline-none"
      >
        {SECTIONS.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>
    </div>
  );
};
