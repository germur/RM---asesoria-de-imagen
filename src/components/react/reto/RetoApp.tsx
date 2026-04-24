import { useState } from 'react';
import { Sidebar, MobileNav, SECTIONS } from './Sidebar';
import { Manifesto } from './sections/Manifesto';
import { Part1 } from './sections/Part1';
import { Part2 } from './sections/Part2';
import { Part3 } from './sections/Part3';
import { Part4 } from './sections/Part4';
import { Declaration } from './sections/Declaration';
import { useWorkbook } from '../../../hooks/useWorkbook';

export default function RetoApp() {
  const [currentSectionId, setCurrentSectionId] = useState('manifesto');
  const { data, updateField } = useWorkbook();

  const renderSection = () => {
    switch (currentSectionId) {
      case 'manifesto': return <Manifesto />;
      case 'part1': return <Part1 data={data} update={updateField} />;
      case 'part2': return <Part2 data={data} update={updateField} />;
      case 'part3': return <Part3 data={data} update={updateField} />;
      case 'part4': return <Part4 data={data} update={updateField} />;
      case 'declaration': return <Declaration data={data} update={updateField} />;
      default: return <Manifesto />;
    }
  };

  const currentIndex = SECTIONS.findIndex(s => s.id === currentSectionId);

  const prevSection = () => {
    if (currentIndex > 0) {
      setCurrentSectionId(SECTIONS[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextSection = () => {
    if (currentIndex < SECTIONS.length - 1) {
      setCurrentSectionId(SECTIONS[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-slate-50 font-sans text-slate-900">
      <MobileNav currentSection={currentSectionId} onSelect={setCurrentSectionId} />
      <Sidebar currentSection={currentSectionId} onSelect={setCurrentSectionId} />

      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-12 md:py-16">
          {renderSection()}

          {/* Navigation footer */}
          <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8 pb-16">
            <button
              onClick={prevSection}
              disabled={currentIndex === 0}
              className={`px-6 py-2.5 border rounded-xl font-medium transition-colors ${
                currentIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              Anterior
            </button>
            <span className="text-xs text-slate-400 uppercase tracking-widest hidden md:block">
              {currentIndex + 1} / {SECTIONS.length}
            </span>
            <button
              onClick={nextSection}
              disabled={currentIndex === SECTIONS.length - 1}
              className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
                currentIndex === SECTIONS.length - 1
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-[#C9111E] text-white hover:bg-[#a80e18]'
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
