import React, { useMemo } from 'react';
import { Cenario2030, MetricasAxioma } from '../types/contratos';
import { calcularPotencialProdutividade, identificarBarreiras } from '../domain/motorDiagnostico';
import { analisarExposicao } from '../domain/analisadorSetorial';
import { CardImpacto } from './AxiomaKit';
import { MATRIZ_IMPACTO_SETORIAL } from '../data/frameworkWEF';

/**
 * PainelCenario: Dashboard estratégico com foco em visualização premium e responsividade mobile.
 */
export const PainelCenario: React.FC<{ cenario: Cenario2030, metricas: MetricasAxioma, setor: string }> = ({ cenario, metricas, setor }) => {
    const sinergia = useMemo(() => calcularPotencialProdutividade(metricas.scoreTecnologico, metricas.scoreCapitalHumano), [metricas]);
    const barreiras = useMemo(() => identificarBarreiras(metricas), [metricas]);
    
    const exposicao = useMemo(() => {
        const matriz = MATRIZ_IMPACTO_SETORIAL.find(m => m.setor === setor) || MATRIZ_IMPACTO_SETORIAL[0];
        return analisarExposicao(cenario, matriz);
    }, [cenario, setor]);

    // Transição de cores baseada no cenário para "Vibe" polida
    const gradienteCenario = useMemo(() => {
        switch (cenario) {
            case Cenario2030.SALTO_PRODUTIVIDADE: return "from-amber-900/20 via-zinc-950 to-zinc-950 border-amber-900/30";
            case Cenario2030.SOBRECARGA_AUTOMACAO: return "from-blue-900/20 via-zinc-950 to-zinc-950 border-blue-900/30";
            case Cenario2030.VANTAGEM_HUMANA: return "from-emerald-900/20 via-zinc-950 to-zinc-950 border-emerald-900/30";
            default: return "from-zinc-900/20 via-zinc-950 to-zinc-950 border-zinc-900/30";
        }
    }, [cenario]);

    return (
        <div className={`p-6 md:p-12 bg-gradient-to-br ${gradienteCenario} border rounded-[2.5rem] transition-all duration-1000 ease-in-out`}>
            <header className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <span className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.4em] mb-3 block">Diagnóstico Estratégico WEF 2025</span>
                        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">{cenario}</h1>
                    </div>
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-6 rounded-2xl w-full md:w-auto">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Potencial de Sinergia</div>
                        <div className="text-4xl text-[#D4AF37] font-sans">{(sinergia * 100).toFixed(1)}%</div>
                        <p className="text-[9px] text-zinc-600 mt-2 italic font-bold">"Um ganho de elite citada pelo relatório."</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                    <CardImpacto titulo="O Quadrante de 2030" destaque>
                        <div className="space-y-6 mt-4">
                            <p className="text-zinc-400 text-sm leading-relaxed italic">
                                Sua organização está posicionada no ponto de inflexão tecnológico. A tese de complementaridade sugere um gap de execução de {(0.11 - sinergia).toFixed(3)}.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {barreiras.map((b, i) => (
                                    <span key={i} className="text-[9px] bg-red-950/30 text-red-500 border border-red-900/50 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                                        {b}
                                    </span>
                                ))}
                                {barreiras.length === 0 && (
                                    <span className="text-[9px] bg-emerald-950/30 text-emerald-500 border border-emerald-900/50 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                                        Vetor de Execução Limpo
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardImpacto>
                </div>

                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        <section className="space-y-8">
                            <h3 className="font-serif text-2xl text-zinc-300 border-l border-[#D4AF37] pl-4">Exposição Setorial: {setor}</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] mb-2 text-zinc-500 font-bold">
                                        <span>Indicador de Exposição</span>
                                        <span>{(exposicao.nivelExposicao * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="h-[1px] w-full bg-zinc-900 overflow-hidden relative">
                                        <div 
                                            className="h-full bg-[#D4AF37] transition-all duration-1000" 
                                            style={{ width: `${exposicao.nivelExposicao * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-zinc-900/20 rounded-xl border border-zinc-900">
                                        <div className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-2">Ventos Favoráveis (Tailwinds)</div>
                                        <ul className="text-[11px] text-zinc-400 space-y-1">
                                            {exposicao.propulsoresAtivos.map((f, i) => (
                                                <li key={i}>• {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-zinc-900/20 rounded-xl border border-zinc-900">
                                        <div className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2">Ventos Contrários (Headwinds)</div>
                                        <ul className="text-[11px] text-zinc-500 space-y-1">
                                            {exposicao.detratoresAtivos.map((f, i) => (
                                                <li key={i}>• {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-zinc-900/10 p-8 rounded-3xl border border-zinc-900/50 flex flex-col justify-center text-center">
                            <div className="text-[40px] font-serif text-white mb-2 leading-none">Global Future</div>
                            <div className="text-[10px] uppercase tracking-[0.6em] text-zinc-700 mb-6">Productivity Index</div>
                            <div className="space-y-4">
                                <p className="text-[11px] text-zinc-500 leading-relaxed max-w-xs mx-auto font-sans">
                                    "A elite de produtividade captura até <span className="text-[#D4AF37] font-bold">11% de ganhos anuais</span>, enquanto o gap para retardatários quase duplicou desde 2018."
                                </p>
                                <footer className="pt-4 border-t border-zinc-900/50">
                                     <cite className="text-[9px] text-zinc-700 uppercase tracking-widest not-italic font-bold">Fonte: World Economic Forum (Jan 2025)</cite>
                                </footer>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
