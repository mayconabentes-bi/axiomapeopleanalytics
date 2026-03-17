import React from 'react';
import { MetricasAxioma } from '../types/contratos';
import { analisarSentenioProfissional } from '../domain/motorBiografico';
import { projetarTrajetoria2030, calcularScoreSobrevivencia } from '../domain/motorPreditivo';
import { CardImpacto } from './AxiomaKit';

/**
 * AxiomaPulse: Dashboard dinâmico de ritmos biográficos e inteligência preditiva.
 */
export const AxiomaPulse: React.FC<{ metricas: MetricasAxioma, idade: number }> = ({ metricas, idade }) => {
    const perfil = analisarSentenioProfissional(idade);
    const probabilidade = projetarTrajetoria2030(metricas, metricas.scoreCapitalHumano);
    const sobrevivencia = calcularScoreSobrevivencia(metricas.scoreCapitalHumano);

    // Divergência simulada vs Elite de Produtividade
    const scoreElite = 88;
    const gapElite = scoreElite - sobrevivencia.score;

    return (
        <div className="max-w-6xl mx-auto py-24 px-10 animate-in fade-in duration-1000">
            <header className="mb-20">
                <span className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.6em] mb-4 block">Axioma Pulse Intelligence</span>
                <h1 className="font-serif text-7xl text-white mb-6">Mapa de Vida e Potencial</h1>
                <div className="h-[1px] w-48 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                {/* Coluna Biográfica */}
                <div className="lg:col-span-2 space-y-8">
                    <CardImpacto titulo="Vetor de Crescimento Biográfico" destaque>
                        <div className="mb-8">
                            <div className="text-[#D4AF37] text-sm uppercase tracking-widest mb-2 font-sans">{perfil.sentenio}</div>
                            <div className="text-4xl font-serif text-white">{perfil.foco}</div>
                        </div>
                        <p className="text-zinc-500 leading-relaxed mb-6">
                            "{perfil.recomendacao}"
                        </p>
                        <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600">Ponto de Inflexão Biográfica</span>
                            <span className="text-white text-xs px-3 py-1 bg-zinc-800 rounded-full font-sans uppercase">Sinergia Axiomática</span>
                        </div>
                    </CardImpacto>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <CardImpacto titulo="Probabilidade de Salto 2030">
                            <div className="text-6xl font-light text-white mb-4">{(probabilidade * 100).toFixed(0)}%</div>
                            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[#D4AF37] transition-all duration-1000" 
                                    style={{ width: `${probabilidade * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-4">Projeção a 24 meses</p>
                        </CardImpacto>

                        <CardImpacto titulo="Divergência vs Elite">
                            <div className="text-6xl font-light text-white mb-4">-{gapElite}pt</div>
                            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-red-900/50 transition-all duration-1000" 
                                    style={{ width: `${(gapElite / 50) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-4">Gap de Competitividade Global</p>
                        </CardImpacto>
                    </div>
                </div>

                {/* Coluna de Sobrevivência */}
                <div className="space-y-8">
                    <CardImpacto titulo="Score de Sobrevivência 2030">
                        <div className="text-center py-10">
                            <div className="relative inline-block">
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle className="text-zinc-900" strokeWidth="2" stroke="currentColor" fill="transparent" r="90" cx="96" cy="96" />
                                    <circle 
                                        className="text-[#D4AF37]" 
                                        strokeWidth="4" 
                                        strokeDasharray={565.48}
                                        strokeDashoffset={565.48 * (1 - sobrevivencia.score / 100)}
                                        strokeLinecap="round" 
                                        stroke="currentColor" 
                                        fill="transparent" 
                                        r="90" 
                                        cx="96" 
                                        cy="96" 
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-light text-white leading-none">{sobrevivencia.score}</span>
                                    <span className="text-[9px] uppercase tracking-widest text-zinc-600 mt-2">Prontidão Axioma</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs">
                                <span className="text-zinc-500">Taxa de Obsolescência Pessoal</span>
                                <span className="text-red-500 font-sans">{sobrevivencia.taxaObsolescencia}%</span>
                            </div>
                            <p className="text-[10px] text-zinc-700 leading-relaxed italic">
                                *Baseado na projeção WEF de que 44% das competências atuais serão irrelevantes até 2027.
                            </p>
                        </div>
                    </CardImpacto>
                </div>
            </div>

            <footer className="text-center pt-20 border-t border-zinc-900">
                <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-800 font-sans">
                    Axioma Foresight & Biographical Rhythms Integration
                </div>
            </footer>
        </div>
    );
};
