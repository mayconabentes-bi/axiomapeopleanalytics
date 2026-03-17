import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAxiomaProps {
  onComplete: () => void;
  setor?: string; // Mantido por compatibilidade, mas não utilizado nas novas mensagens
}

/**
 * LoadingAxioma: Componente de processamento cognitivo.
 * Estética 'Dark Observatory' com mensagens dinâmicas WEF 2025.
 */
export const LoadingAxioma: React.FC<LoadingAxiomaProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  const mensagens = [
    'Sincronizando vetores organizacionais com o Framework WEF 2025...',
    'Analisando gaps de produtividade contra o diferencial das Frontier Firms...',
    'Cruzando maturidade de IA com índice de obsolescência de competências...',
    'Calibrando trajetória biográfica para o horizonte de 2030...',
    'Finalizando relatório de inteligência estratégica...'
  ];

  useEffect(() => {
    // Muda a mensagem a cada 1.2 segundos
    const messageInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < mensagens.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    // Finaliza o loading após ~6 segundos (tempo total para todas as mensagens + respiro final)
    const timeout = setTimeout(() => {
      onComplete();
    }, 6200);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050611] z-[500] flex flex-col items-center justify-center p-12 overflow-hidden">
      
      {/* Luz Radial Dourada Central (Suave) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 flex flex-col items-center">
        
        {/* Mensagens de Calibração */}
        <div className="h-24 flex items-center justify-center mb-16 px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-amber-500/80 italic text-center leading-relaxed"
            >
              {mensagens[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Linha de Progresso Ultra-fina (1px) */}
        <div className="w-full h-[1px] bg-zinc-900 overflow-hidden relative">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute top-0 left-0 h-full bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.3)]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="mt-10 flex flex-col items-center text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-700 font-bold mb-2">
            Axioma Cognitive Engine
          </span>
          <div className="flex gap-2">
             <div className="w-[3px] h-[3px] bg-zinc-800 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
             <div className="w-[3px] h-[3px] bg-zinc-800 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
             <div className="w-[3px] h-[3px] bg-zinc-800 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

