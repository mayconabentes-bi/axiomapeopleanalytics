import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVENTARIO_LENTES } from '../data/inventarioLentes';
import { LenteAxioma, PerguntaAxioma, ResultadoDiagnostico } from '../types/contratos';
import { calcularDiagnosticoCompleto } from '../domain/analisadorSetorial';
import { calcularScoresGerais } from '../domain/calculadoraScores';
import { processarLenteXI } from '../domain/motorRessonancia';
import { processarLenteXII } from '../domain/motorNarrativa';
import { processarLenteXIII } from '../domain/motorSombra';
import { processarLenteXIV } from '../domain/motorArquivo';
import { trackEvent } from '../utils/analytics';

/**
 * FluxoAvaliacao: Gerenciador dinâmico das 10 Lentes Axioma.
 * Suporta múltiplos tipos de input (Range, Choice, Matrix) e navegação entre estágios.
 */
export const FluxoAvaliacao: React.FC<{ onFinalize?: (resultado: ResultadoDiagnostico) => void }> = ({ onFinalize }) => {
  const [lenteIdx, setLenteIdx] = useState(0);
  const [perguntaIdx, setPerguntaIdx] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState(0); // Para animações

  const lenteAtual = INVENTARIO_LENTES[lenteIdx];
  const perguntaAtual = lenteAtual.questions[perguntaIdx];
  
  const totalPerguntasTotal = INVENTARIO_LENTES.reduce((acc, l) => acc + l.questions.length, 0);
  const perguntasConcluidas = INVENTARIO_LENTES.slice(0, lenteIdx).reduce((acc, l) => acc + l.questions.length, 0) + perguntaIdx;
  const progresso = ((perguntasConcluidas + 1) / totalPerguntasTotal) * 100;

  const registrarResposta = (valor: any) => {
    setRespostas(prev => ({ ...prev, [perguntaAtual.id]: valor }));
    avancar();
  };

  const avancar = () => {
    setDirection(1);
    if (perguntaIdx < lenteAtual.questions.length - 1) {
      setPerguntaIdx(perguntaIdx + 1);
    } else if (lenteIdx < INVENTARIO_LENTES.length - 1) {
      setLenteIdx(lenteIdx + 1);
      setPerguntaIdx(0);
    } else {
      finalizar();
    }
  };

  const finalizar = () => {
    // Calcular scores determinísticos locais para as 10 lentes
    const scoresLentes = calcularScoresGerais(respostas);

    // Mapear scores para os eixos principais (Média simples para o MVP)
    const scoreTecTotal = Math.round((scoresLentes['wef'] + scoresLentes['tech'] + (scoresLentes['fore'] || 0)) / (scoresLentes['fore'] ? 3 : 2));
    const scoreHumTotal = Math.round((scoresLentes['cogn'] + scoresLentes['bio'] + scoresLentes['anti'] + scoresLentes['social'] + scoresLentes['sys'] + (scoresLentes['kegan'] || 0)) / (scoresLentes['kegan'] ? 6 : 5));

    const resultadoBase = calcularDiagnosticoCompleto({
      scoreTecnologia: scoreTecTotal || 70,
      scoreCapitalHumano: scoreHumTotal || 65,
      numeroColaboradores: 100,
      salarioMedio: 5000
    });

    // Injetar os scores reais das lentes no resultado
    const resultado: ResultadoDiagnostico = {
      ...resultadoBase,
      scoresLentes,
      ressonancia: processarLenteXI(respostas),
      narrativa: processarLenteXII(respostas),
      sombra: processarLenteXIII(respostas),
      arquivo: processarLenteXIV(respostas['email'] || 'anon', { ...resultadoBase, scoresLentes }),
      idade: respostas['bio0'] || 35
    };

    trackEvent('survey_complete', { planId: resultado.id, cenario: resultado.cenario });

    if (onFinalize) onFinalize(resultado);
  };

  const processarRespostasEixo = (lenteId: string): number => {
    // Lógica para converter respostas em scores (simplificada)
    return 75; 
  };

  return (
    <div className="min-h-screen bg-[#050611] text-zinc-100 font-sans relative overflow-hidden flex flex-col items-center justify-center py-20 px-6">
      
      {/* Barra de Progresso Luxo */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-zinc-900 z-50">
        <motion.div 
          animate={{ width: `${progresso}%` }}
          className="h-full bg-gradient-to-r from-[#8A6E2F] via-[#D4AF37] to-[#8A6E2F] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[150px] rounded-full" />

      <main className="max-w-4xl w-full z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${lenteIdx}-${perguntaIdx}`}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            {/* Header da Lente */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="w-12 h-[1px] bg-zinc-800"></span>
                <span className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-[10px]">
                  Lente {lenteAtual.num} • {lenteAtual.name}
                </span>
                <span className="w-12 h-[1px] bg-zinc-800"></span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4 text-white leading-tight">
                {perguntaAtual.text}
              </h1>
              {perguntaAtual.sub && (
                <p className="text-zinc-500 text-lg italic">{perguntaAtual.sub}</p>
              )}
            </div>

            {/* Renderizar Inputs Dinamicamente */}
            <div className="mt-8">
              {perguntaAtual.type === 'choice' && (
                <div className="grid gap-4 md:grid-cols-2">
                  {perguntaAtual.opts?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => registrarResposta(i)}
                      className="text-left p-6 bg-zinc-900/40 border border-zinc-800 hover:border-[#D4AF37]/50 hover:bg-zinc-900/60 transition-all group"
                    >
                      <h4 className="text-white font-serif text-xl mb-1 group-hover:text-[#D4AF37] transition-colors">{opt.t}</h4>
                      <p className="text-xs text-zinc-500">{opt.d}</p>
                    </button>
                  ))}
                </div>
              )}

              {perguntaAtual.type === 'spec' && (
                <div className="py-12 px-8">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-600 mb-6">
                    <span>{perguntaAtual.left}</span>
                    <span>{perguntaAtual.right}</span>
                  </div>
                  <input 
                    type="range" 
                    min="21"
                    max="75"
                    defaultValue={perguntaAtual.val || 35}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                    id={`range-${perguntaAtual.id}`}
                  />
                  <div className="mt-12 text-center">
                    <button 
                      onClick={() => {
                        const val = (document.getElementById(`range-${perguntaAtual.id}`) as HTMLInputElement).value;
                        registrarResposta(parseInt(val));
                      }}
                      className="px-10 py-3 bg-[#D4AF37] text-black text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all"
                    >
                      Confirmar Valor
                    </button>
                  </div>
                </div>
              )}

              {perguntaAtual.type === 'matrix' && (
                <div className={`grid gap-4 grid-cols-1 md:grid-cols-${perguntaAtual.cols || 2}`}>
                  {perguntaAtual.opts?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => registrarResposta(i)}
                      className="p-4 bg-zinc-900/20 border border-zinc-800 text-center hover:border-[#D4AF37] hover:bg-zinc-900/40 transition-all"
                    >
                      <h5 className="text-zinc-200 text-sm font-bold uppercase tracking-widest">{opt.t}</h5>
                      <p className="text-[10px] text-zinc-600 mt-1">{opt.d}</p>
                    </button>
                  ))}
                </div>
              )}

              {perguntaAtual.type === 'freq' && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {perguntaAtual.opts?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => registrarResposta(i)}
                      className="p-4 bg-zinc-900/40 border border-zinc-800 text-center hover:border-[#D4AF37] hover:bg-zinc-900/60 transition-all"
                    >
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Passo {i+1}</span>
                      <h5 className="text-zinc-100 text-xs font-serif">{opt.t}</h5>
                    </button>
                  ))}
                </div>
              )}

              {perguntaAtual.type === 'txt' && (
                <div className="space-y-6">
                  <textarea 
                    id={`txt-${perguntaAtual.id}`}
                    className="w-full h-40 bg-zinc-900/40 border border-zinc-800 p-6 text-zinc-100 placeholder:text-zinc-700 focus:border-[#D4AF37] outline-none font-sans"
                    placeholder={perguntaAtual.ph}
                    defaultValue={respostas[perguntaAtual.id] || ''}
                  />
                  <div className="text-right">
                    <button 
                      onClick={() => {
                        const val = (document.getElementById(`txt-${perguntaAtual.id}`) as HTMLTextAreaElement).value;
                        registrarResposta(val);
                      }}
                      className="px-12 py-3 bg-[#D4AF37] text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all"
                    >
                      Enviar Insight
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-10 w-full flex justify-center">
        <div className="flex items-center gap-8">
            <span className="text-[9px] text-zinc-700 uppercase tracking-widest">Axioma Framework: {lenteAtual.fw}</span>
            <span className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold">Axioma People Analytics © 2025</span>
        </div>
      </footer>
    </div>
  );
};

