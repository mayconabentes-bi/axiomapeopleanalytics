import React from 'react';
import { MetricasAxioma } from '../types/contratos';
import { calcularPercentilSetorial } from '../domain/motorBenchmarking';
import { CardImpacto } from './AxiomaKit';

/**
 * DashboardBusiness: Interface avançada exclusiva para o plano Enterprise/Business.
 */
export const DashboardBusiness: React.FC<{ metricas: MetricasAxioma, setor: string }> = ({ metricas, setor }) => {
    const benchmark = calcularPercentilSetorial(metricas, setor);

    return (
        <div className="max-w-7xl mx-auto py-24 px-10 animate-in fade-in duration-1000 bg-zinc-950">
            <header className="mb-20">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.5em] mb-4 block">Business Intelligence Excellence</span>
                        <h1 className="font-serif text-6xl text-white mb-4">Painel de Liderança Setorial</h1>
                        <p className="text-zinc-500 font-sans max-w-2xl italic">
                            Análise comparativa de alta precisão baseada na elite de produtividade do World Economic Forum 2025.
                        </p>
                    </div>
                    <div className="bg-zinc-900 border border-[#D4AF37]/30 px-6 py-2 rounded-full">
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">Plano Business Ativo</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
                {/* Mapa de Calor de Competências (Simulado) */}
                <CardImpacto titulo="Mapa de Calor de Competências" destaque>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="aspect-square rounded-sm transition-all duration-700 hover:scale-110 cursor-help"
                                style={{ 
                                    backgroundColor: i % 7 === 0 ? '#D4AF37' : i % 3 === 0 ? '#27272a' : '#52525b',
                                    opacity: 0.3 + (Math.random() * 0.7)
                                }}
                                title={`Competência ID: ${i} - Nível: ${Math.round(Math.random() * 7)}`}
                            ></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6 text-[9px] uppercase tracking-widest text-zinc-600">
                        <span>Atrito Tecnológico</span>
                        <span>Sinergia Total</span>
                    </div>
                </CardImpacto>

                {/* Benchmarking Setorial */}
                <CardImpacto titulo="Benchmarking de Ecossistema">
                    <div className="space-y-10">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-xs text-zinc-400">Percentil Tecnológico</span>
                                <span className="text-white font-sans">{benchmark.percentilTecnologico}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-zinc-900">
                                <div className="h-full bg-zinc-600 transition-all duration-1000" style={{ width: `${benchmark.percentilTecnologico}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-xs text-zinc-400">Percentil Capital Humano</span>
                                <span className="text-white font-sans">{benchmark.percentilHumanCapital}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-zinc-900">
                                <div className="h-full bg-zinc-600 transition-all duration-1000" style={{ width: `${benchmark.percentilHumanCapital}%` }}></div>
                            </div>
                        </div>
                    </div>
                </CardImpacto>

                {/* Divergência de Produtividade */}
                <CardImpacto titulo="Divergência de Produtividade">
                    <div className="text-center py-6">
                        <div className="text-5xl font-serif text-[#D4AF37] mb-2">{benchmark.statusRelativo}</div>
                        <p className="text-xs text-zinc-500 px-4">
                            Em comparação com a "Elite de Produtividade" do setor {setor}.
                        </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-800">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600">Vantagem Competitiva</span>
                            <span className="text-white font-sans text-xl">{benchmark.indiceVantagemCompetitiva}%</span>
                        </div>
                    </div>
                </CardImpacto>
            </div>

            <footer className="flex justify-center border-t border-zinc-900 pt-16">
                 <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-700 font-sans">
                    Certificação de Governança LGPD Axioma People Analytics
                 </div>
            </footer>
        </div>
    );
};
