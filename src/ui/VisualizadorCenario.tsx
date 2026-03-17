import React from 'react';
import { MetricasAxioma } from '../types/contratos';
import { classificarCenario, calcularPotencialProdutividade, identificarBarreiras } from '../domain/motorDiagnostico';
import { CardImpacto, BotaoAxioma } from './AxiomaKit';

/**
 * Visualizador de Resultados: Painel final que consome o domínio para exibir o diagnóstico.
 */
export const VisualizadorCenario: React.FC<{ metricas: MetricasAxioma; aoReiniciar: () => void }> = ({ metricas, aoReiniciar }) => {
  const cenario = classificarCenario(metricas.scoreTecnologico, metricas.scoreCapitalHumano);
  const ganho = calcularPotencialProdutividade(metricas.scoreTecnologico, metricas.scoreCapitalHumano);
  const barreiras = identificarBarreiras(metricas);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in duration-700">
      <header className="mb-16 text-center">
        <span className="text-zinc-600 uppercase tracking-widest text-xs font-sans mb-4 block">Diagnóstico Estratégico Axioma</span>
        <h1 className="font-serif text-7xl text-white mb-6 leading-tight">{cenario}</h1>
        <div className="h-px w-24 bg-zinc-800 mx-auto"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CardImpacto titulo="Índice de Sinergia">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-6xl font-light text-white">{(ganho * 100).toFixed(1)}%</span>
            <span className="text-zinc-500 uppercase text-[10px] tracking-widest">de ganho projetado</span>
          </div>
          <p className="text-sm">
            Fundamentado na tese de complementaridade tech-human do WEF. Empresas com seu perfil elevam a produtividade base de 4% para { (ganho * 100).toFixed(1) }%.
          </p>
        </CardImpacto>

        <CardImpacto titulo="Barreiras Detectadas">
          {barreiras.length > 0 ? (
            <ul className="space-y-4">
              {barreiras.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span>
                  {b}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 italic">Nenhum impedimento crítico detectado nos scores atuais.</p>
          )}
        </CardImpacto>
      </div>

      <div className="text-center">
        <BotaoAxioma onClick={aoReiniciar} variant="secondary">
          Nova Avaliação
        </BotaoAxioma>
      </div>
    </div>
  );
};
