import React from 'react';
import { Cenario2030, MetricasAxioma } from '../types/contratos';
import { gerarPlanoAcao, RecomendacaoForesight } from '../domain/motorForesight';
import { CardImpacto } from './AxiomaKit';

/**
 * RelatorioEstrategico: Componente de elite para apresentação do plano de ação.
 */
export const RelatorioEstrategico: React.FC<{ cenario: Cenario2030, metricas: MetricasAxioma, setor: string }> = ({ cenario, metricas, setor }) => {
    const planoAcao = gerarPlanoAcao(cenario, metricas);

    return (
        <div className="bg-zinc-950 text-white min-h-screen py-24 px-12 animate-in fade-in duration-1000">
            <header className="max-w-5xl mx-auto mb-24 flex justify-between items-end border-b border-zinc-900 pb-12">
                <div>
                    <span className="text-[#D4AF37] font-sans text-xs uppercase tracking-[0.4em] mb-4 block">Foresight Strategic Report</span>
                    <h1 className="font-serif text-6xl leading-tight">Plano de Direcionamento<br/>Axioma 2030</h1>
                </div>
                <div className="text-right">
                    <div className="text-zinc-600 font-sans text-[10px] uppercase tracking-widest">Setor Identificado</div>
                    <div className="font-serif text-2xl text-zinc-300">{setor}</div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto">
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-24">
                    <div className="lg:col-span-1">
                        <h2 className="font-serif text-3xl mb-4">Exposição ao Risco Setorial</h2>
                        <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                            Baseado na página 18 do relatório 'Global Economic Futures', sua exposição é calculada pelo cruzamento da prontidão interna com ventos de mercado.
                        </p>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="flex flex-col gap-6">
                            {[
                                { label: "Risco Tecnológico", valor: 65, cor: "bg-[#D4AF37]" },
                                { label: "Obsolescência Humana", valor: 42, cor: "bg-zinc-700" },
                                { label: "Barreira de Liderança", valor: 58, cor: "bg-zinc-800" }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] mb-3 text-zinc-400">
                                        <span>{item.label}</span>
                                        <span>{item.valor}%</span>
                                    </div>
                                    <div className="h-[1px] w-full bg-zinc-900 relative overflow-hidden">
                                        <div 
                                            className={`h-full ${item.cor} transition-all duration-1000 delay-300`} 
                                            style={{ width: `${item.valor}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="font-serif text-4xl mb-12 border-l-2 border-[#D4AF37] pl-8">Recomendações Práticas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {planoAcao.map((rec, i) => (
                            <CardImpacto key={i} titulo={rec.pilar} destaque={i === 0}>
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Ação Sugerida</div>
                                        <p className="text-white text-base">{rec.acao}</p>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Justificativa Técnica</div>
                                        <p className="italic text-zinc-400">{rec.justificativa}</p>
                                    </div>
                                    <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                                        <div className="w-1 h-1 bg-[#D4AF37] rounded-full"></div>
                                        <span className="text-[11px] text-[#D4AF37] uppercase tracking-widest">Impacto: {rec.impactoEsperado}</span>
                                    </div>
                                </div>
                            </CardImpacto>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="max-w-5xl mx-auto mt-32 text-center border-t border-zinc-900 pt-12">
                <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em]">Axioma People Analytics © 2025 - Inteligência WEF</p>
            </footer>
        </div>
    );
};
