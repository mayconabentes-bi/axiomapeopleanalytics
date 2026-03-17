import React from 'react';
import { motion } from 'framer-motion';
import { ResultadoSombra } from '../../types/contratos';

interface Props {
  data: ResultadoSombra;
}

export const ShadowVisuals: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Header Analítico */}
      <div className="border-l-2 border-[#b85555] pl-6 py-2">
        <h3 className="font-serif text-2xl text-white mb-2">{data.shadow_title}</h3>
        <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">{data.shadow_intro}</p>
      </div>

      {/* Warning Box */}
      <div className="bg-[#b85555]/5 border border-[#b85555]/20 p-6">
         <p className="text-[9px] uppercase tracking-widest text-[#b85555] font-bold mb-2">Nota de Interpretação</p>
         <p className="text-sm text-zinc-400 leading-relaxed">{data.shadow_warning}</p>
      </div>

      {/* Blindspots List */}
      <div className="space-y-4">
        {data.shadow_blindspots.map((spot, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`p-6 border ${
              spot.type === 'critical' ? 'border-[#b85555]/30 bg-zinc-950' : 
              spot.type === 'moderate' ? 'border-[#D4AF37]/30 bg-zinc-950' : 
              'border-[#3d9e88]/30 bg-zinc-950'
            } relative overflow-hidden`}
          >
            {/* Indicador Lateral */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              spot.type === 'critical' ? 'bg-[#b85555]' : 
              spot.type === 'moderate' ? 'bg-[#D4AF37]' : 
              'bg-[#3d9e88]'
            }`} />

            <div className="flex justify-between items-start mb-4">
               <span className={`text-[9px] uppercase tracking-widest font-bold ${
                 spot.type === 'critical' ? 'text-[#b85555]' : 
                 spot.type === 'moderate' ? 'text-[#D4AF37]' : 
                 'text-[#3d9e88]'
               }`}>
                 {spot.type === 'critical' ? 'Ponto Cego Crítico' : 
                  spot.type === 'moderate' ? 'Ponto Cego Moderado' : 
                  'Sombra Dourada'}
               </span>
            </div>

            <h4 className="text-white font-serif text-xl mb-2">{spot.title}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">{spot.desc}</p>

            {spot.evidence && (
              <div className="pt-4 border-top border-zinc-900">
                <p className="text-[10px] text-zinc-600 italic uppercase tracking-widest mb-1">Evidência Detectada</p>
                <p className="text-[11px] text-zinc-500 italic">"{spot.evidence}"</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-950/40 p-6 border border-zinc-900">
         <p className="text-[13px] text-zinc-400 leading-relaxed">{data.shadow_body}</p>
      </div>
    </div>
  );
};
