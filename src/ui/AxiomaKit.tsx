import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * AxiomaKit: Biblioteca de componentes visuais de alta performance.
 * Estética: Ardósia (Slate) e Ouro (#D4AF37).
 */

// Botão com estética Ouro e Ardósia
export const BotaoAxioma: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'gold' }> = ({ children, variant = 'primary', ...props }) => {
  const baseStyles = "px-10 py-4 transition-all duration-500 font-sans tracking-[0.2em] uppercase text-[11px] font-semibold border relative overflow-hidden group";
  
  const variants = {
    primary: "bg-zinc-900 text-white border-zinc-700 hover:border-white",
    secondary: "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600",
    gold: "bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-transparent hover:text-[#D4AF37]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${props.className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Card de Impacto com acentos em Ouro
export const CardImpacto: React.FC<{ titulo: string; children: React.ReactNode; destaque?: boolean }> = ({ titulo, children, destaque }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-xl border ${destaque ? 'border-[#D4AF37]/30' : 'border-zinc-800'} p-10 relative group`}>
    {destaque && <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37]/5 blur-3xl rounded-full"></div>}
    <h3 className={`font-serif text-2xl mb-6 ${destaque ? 'text-[#D4AF37]' : 'text-zinc-100'}`}>{titulo}</h3>
    <div className="font-sans text-zinc-400 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

// Input elegante para seleção e texto
export const InputElegante: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-12">
    <label className="block font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">{label}</label>
    <div className="relative">
      {children}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-800 group-focus-within:bg-[#D4AF37] transition-colors"></div>
    </div>
  </div>
);

// Slider de precisão Axioma
export const SliderAxioma: React.FC<{ label: string; valor: number; onChange: (v: number) => void }> = ({ label, valor, onChange }) => (
  <div className="mb-14 group">
    <div className="flex justify-between mb-6 items-end">
      <label className="font-serif text-2xl text-zinc-100 group-hover:text-[#D4AF37] transition-colors">{label}</label>
      <div className="flex flex-col items-end">
        <span className="font-sans text-5xl font-extralight text-white leading-none">{valor}</span>
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Escala WEF</span>
      </div>
    </div>
    <input 
      type="range" 
      min="1" 
      max="7" 
      step="1"
      value={valor}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-[2px] bg-zinc-800 appearance-none cursor-pointer accent-[#D4AF37]"
    />
  </div>
);

// Seletor de Setor de Elite (Custom Dropdown)
export const SeletorSetorElite: React.FC<{ 
  opcoes: string[]; 
  valor: string; 
  onChange: (v: string) => void 
}> = ({ opcoes, valor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 px-6 py-4 rounded-xl transition-all duration-300 hover:border-amber-500/50 group"
      >
        <span className="font-serif text-xl text-zinc-100">{valor}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-zinc-500 group-hover:text-amber-500 transition-colors"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[100] mt-2 w-full bg-[#0a0a0a] border border-amber-600/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-2xl"
          >
            <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-600/20">
              {opcoes.map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => {
                    onChange(opcao);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-6 py-4 transition-all duration-300 font-sans text-xs uppercase tracking-widest border-b border-white/5 last:border-none ${
                    valor === opcao 
                      ? "bg-amber-500 text-black font-bold" 
                      : "text-zinc-400 hover:bg-amber-500 hover:text-black"
                  }`}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Seletor de Indústria (Legado - Mantendo por compatibilidade se necessário em outros lugares)
export const SeletorIndustria: React.FC<{ opcoes: string[]; valor: string; onChange: (v: string) => void }> = ({ opcoes, valor, onChange }) => (
  <select 
    value={valor}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-transparent border-none text-zinc-200 font-serif text-3xl py-4 focus:ring-0 cursor-pointer appearance-none"
  >
    {opcoes.map(op => <option key={op} value={op} className="bg-zinc-950 text-white">{op}</option>)}
  </select>
);
