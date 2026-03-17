import React from 'react';
import { motion } from 'framer-motion';
import { ResultadoArquivo } from '../../types/contratos';

interface Props {
  data: ResultadoArquivo;
}

export const ArquivoVivoVisuals: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Header Analítico */}
      <div className="border-l-2 border-[#D4AF37] pl-6 py-2">
        <h3 className="font-serif text-2xl text-white mb-2">Arquivo Vivo: O Diagnóstico Longitudinal</h3>
        <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
           Acompanhamento temporal da sua evolução cognitiva e estratégica.
        </p>
      </div>

      {/* Status de Registro */}
      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-8 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
         <div className="text-5xl font-serif text-[#D4AF37] mb-2">{data.assess_num}</div>
         <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Avaliações Registradas</p>
         <p className="text-zinc-500 text-xs mt-4 max-w-md mx-auto leading-relaxed">{data.arquivo_body}</p>
      </div>

      {/* Inflexão Alerta */}
      {data.arquivo_inflexao && (
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-6 flex gap-6 items-center">
           <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center shrink-0">
              <span className="text-[#D4AF37] text-2xl">!</span>
           </div>
           <div>
              <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Alerta de Inflexão Detectada</p>
              <p className="text-zinc-200 text-sm italic">"{data.arquivo_inflexao}"</p>
           </div>
        </div>
      )}

      {/* Histórico Timeline */}
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-6">Histórico de Desenvolvimento</p>
        
        {data.is_first ? (
          <div className="p-12 border border-zinc-900 border-dashed text-center">
             <p className="text-zinc-600 text-sm font-serif italic">Seu histórico será populado a partir da próxima avaliação.</p>
          </div>
        ) : (
          <div className="relative border-l border-zinc-900 ml-4 pl-8 space-y-10 py-4">
            {data.history.slice().reverse().map((entry, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border border-[#D4AF37]/50 flex items-center justify-center">
                   <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div>
                      <p className="text-[10px] text-zinc-600 mb-1">{entry.date}</p>
                      <h4 className="text-white font-serif text-lg">Cenário {entry.scenario}</h4>
                   </div>
                   <div className="flex gap-2">
                      {Object.keys(entry.scores).slice(0, 3).map((lId, idx) => (
                        <div key={idx} className="bg-zinc-900 pointer-events-none px-3 py-1 border border-zinc-800">
                           <span className="text-[9px] text-[#D4AF37] uppercase">{lId}: {entry.scores[lId]}</span>
                        </div>
                      ))}
                      <div className="bg-[#D4AF37] px-3 py-1">
                         <span className="text-[9px] text-black font-bold uppercase">Prime: {entry.prime_score}</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-12 border-t border-zinc-900 flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-700">
         <span>Sistema Longitudinal v1.0</span>
         <span>Axioma People Analytics © 2025</span>
      </div>
    </div>
  );
};
