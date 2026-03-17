import React from 'react';
import { motion } from 'framer-motion';
import { ResultadoNarrativa } from '../../types/contratos';

interface Props {
  data: ResultadoNarrativa;
}

export const NarrativeVisuals: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Header Analítico */}
      <div className="border-l-2 border-[#D4AF37] pl-6 py-2">
        <h3 className="font-serif text-2xl text-white mb-2">{data.narr_title}</h3>
        <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">{data.narr_intro}</p>
      </div>

      {/* Arcos Narrativos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-zinc-900/40 border border-zinc-800">
        {data.narr_arcs.map((arc, i) => (
          <div key={i} className={`p-6 relative overflow-hidden ${arc.dominant ? 'bg-[#D4AF37]/5' : 'bg-zinc-950/20'}`}>
            {arc.dominant && (
              <span className="absolute top-4 right-4 text-[8px] uppercase tracking-widest bg-[#D4AF37] text-black px-2 py-0.5 font-bold">
                Dominante
              </span>
            )}
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2">{arc.name}</p>
            <div className="text-3xl font-serif text-white mb-2">{arc.score}</div>
            <p className="text-[11px] text-zinc-500 leading-snug">{arc.desc}</p>
            
            {/* Bar de progresso base */}
            <div className="mt-4 h-[1px] bg-zinc-800 w-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${arc.score}%` }}
                 transition={{ duration: 1.5, delay: i * 0.2 }}
                 className="h-full bg-[#D4AF37]"
               />
            </div>
          </div>
        ))}
      </div>

      {/* Story Summary Box */}
      {data.narr_story_summary && (
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 flex gap-8 items-center">
          <div className="w-16 h-16 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
             <div className="w-4 h-4 bg-[#D4AF37] rotate-45" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2 italic">A Narrativa Detectada</p>
            <p className="text-xl font-serif text-zinc-200 leading-relaxed italic">
               "{data.narr_story_summary}"
            </p>
          </div>
        </div>
      )}

      {/* Dimensões Narrativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.narr_dimensions.map((dim, i) => (
          <div key={i} className="space-y-3">
             <div className="flex justify-between items-end">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">{dim.name}</span>
                <span className="text-lg font-serif text-[#D4AF37]">{dim.score}</span>
             </div>
             <div className="h-[2px] bg-zinc-900 w-full relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${dim.score}%` }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-[#8A6E2F] to-[#D4AF37]"
                />
             </div>
             <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{dim.tier}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-950/40 p-6 border border-zinc-900">
         <p className="text-[13px] text-zinc-400 leading-relaxed">{data.narr_body}</p>
      </div>
    </div>
  );
};
