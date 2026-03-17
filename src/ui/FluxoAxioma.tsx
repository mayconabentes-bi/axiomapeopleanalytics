import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotaoAxioma, SliderAxioma, SeletorIndustria, InputElegante } from './AxiomaKit';
import { MetricasAxioma } from '../types/contratos';
import { INDUSTRIAS_WEF } from '../data/frameworkWEF';

/**
 * Fluxo Axioma: Stepper avançado para entrada de dados diagnósticos com estética de luxo.
 */
export const FluxoAxioma: React.FC<{ 
  setorInicial?: string; 
  selectedPlan: 'free' | 'elite' | 'business' | null;
  onFinalize?: () => void 
}> = ({ setorInicial, selectedPlan, onFinalize }) => {
  const [passo, setPasso] = useState(0);
  
  // Lógica de Gating: Plano Essencial (free) vê apenas 3 passos (Setor, Tech, Humano).
  // Elite e Business desbloqueiam Visão de Liderança e Biografia (mais tarde).
  const totalPassos = selectedPlan === 'free' ? 3 : 4;
  
  const [setor, setSetor] = useState(setorInicial || INDUSTRIAS_WEF[0]);
  const [metricas, setMetricas] = useState<MetricasAxioma>({
    scoreTecnologico: 4,
    scoreCapitalHumano: 4,
    indiceVisaoLideranca: 4
  });

  const proximo = () => setPasso(p => p + 1);
  const anterior = () => setPasso(p => p - 1);

  if (passo === totalPassos) {
    if (onFinalize) onFinalize();
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto min-h-screen flex flex-col justify-center py-20 px-10 relative">
      {/* Barra de Progresso Superior Dourada */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-900 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#b8965a] to-[#d4b07a] shadow-[0_0_15px_rgba(212,175,55,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${((passo + 1) / totalPassos) * 100}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />
      </div>

      <div className="mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] mb-2 block font-bold"
        >
          Diagnóstico de Infraestrutura Cognitiva
        </motion.span>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={passo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            {passo === 0 && (
              <div className="py-4">
                <h2 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight">Privilégio <br /> <span className="italic">Setorial</span></h2>
                <InputElegante label="Indústria Econômica">
                  <SeletorIndustria 
                    opcoes={INDUSTRIAS_WEF} 
                    valor={setor} 
                    onChange={setSetor} 
                  />
                </InputElegante>
              </div>
            )}

            {passo === 1 && (
              <div className="py-4">
                <h2 className="font-serif text-5xl md:text-6xl text-white mb-12">Capacidade <br /> <span className="italic">Digital</span></h2>
                <SliderAxioma 
                  label="Intensidade de Adoção Digital" 
                  valor={metricas.scoreTecnologico} 
                  onChange={(v) => setMetricas({...metricas, scoreTecnologico: v})} 
                />
              </div>
            )}

            {passo === 2 && (
              <div className="py-4">
                <h2 className="font-serif text-5xl md:text-6xl text-white mb-12">Equilíbrio <br /> <span className="italic">Humano</span></h2>
                <SliderAxioma 
                  label="Eficiência de Capital Humano" 
                  valor={metricas.scoreCapitalHumano} 
                  onChange={(v) => setMetricas({...metricas, scoreCapitalHumano: v})} 
                />
              </div>
            )}

            {passo === 3 && (
              <div className="py-4">
                <h2 className="font-serif text-5xl md:text-6xl text-white mb-12">Visão de <br /> <span className="italic">Liderança</span></h2>
                <SliderAxioma 
                  label="Clareza Estratégica da Gestão" 
                  valor={metricas.indiceVisaoLideranca} 
                  onChange={(v) => setMetricas({...metricas, indiceVisaoLideranca: v})} 
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-20">
        {passo > 0 ? (
          <button 
            onClick={anterior} 
            className="text-zinc-600 hover:text-[#D4AF37] uppercase text-[10px] tracking-widest transition-colors font-bold"
          >
            Anterior
          </button>
        ) : <div />}
        
        <BotaoAxioma variant="gold" onClick={proximo}>
          {passo === totalPassos - 1 ? "Finalizar Consultoria" : "Próximo Passo"}
        </BotaoAxioma>
      </div>
    </div>
  );
};
