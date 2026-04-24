import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export const TextInput = ({ label, hint, className = '', ...props }: InputProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-lg font-bold tracking-tight text-slate-900">{label}</label>}
    {hint && <p className="text-sm font-medium text-slate-500">{hint}</p>}
    <input
      type="text"
      className="border-b-2 border-slate-200 bg-transparent px-0 py-2 font-sans text-slate-900 placeholder:text-slate-400 focus:border-[#C9111E] focus:outline-none focus:ring-0 transition-colors"
      {...props}
    />
  </div>
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export const TextArea = ({ label, hint, className = '', ...props }: TextAreaProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-lg font-bold tracking-tight text-slate-900">{label}</label>}
    {hint && <p className="text-sm font-medium text-slate-500">{hint}</p>}
    <textarea
      className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white p-4 font-sans text-slate-900 placeholder:text-slate-400 focus:border-[#C9111E] focus:outline-none focus:ring-1 focus:ring-[#C9111E]/20 transition-all resize-y shadow-sm hover:border-slate-300"
      {...props}
    />
  </div>
);

type RadioGroupProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
  columns?: boolean;
};

export const RadioGroup = ({ label, options, value, onChange, className = '', columns = false }: RadioGroupProps) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    {label && <label className="text-lg font-bold tracking-tight text-slate-900">{label}</label>}
    <div className={columns ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3' : 'flex flex-col gap-3'}>
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors ${
            value === opt
              ? 'border-[#C9111E] bg-[#C9111E]/5 shadow-lg'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`flex h-5 w-5 items-center justify-center rounded-full border flex-shrink-0 ${value === opt ? 'border-[#C9111E]' : 'border-slate-300'}`}>
            {value === opt && <div className="h-2.5 w-2.5 rounded-full bg-[#C9111E]" />}
          </div>
          <span className="font-sans font-medium text-slate-900 text-sm">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-8">
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{children}</h1>
    {subtitle && <p className="mt-2 text-lg font-medium text-slate-500">{subtitle}</p>}
  </div>
);

export const NumberedTitle = ({ num, title }: { num: string | number; title: string }) => (
  <h2 className="mb-4 flex items-baseline gap-2 text-2xl tracking-tight text-slate-900">
    <span className="font-bold text-[#C9111E]">{num}.</span>
    <span className="font-bold">{title}</span>
  </h2>
);
