import React from 'react';
import { motion } from 'framer-motion';
import { ResultadoRessonancia } from '../../types/contratos';

interface ResonanceProps {
    dados: ResultadoRessonancia;
}

export const ResonanceVisuals: React.FC<ResonanceProps> = ({ dados }) => {
    return (
        <div className="space-y-12">
            {/* 1. SECULAR PHASES (PhaseStrip) */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Ciclo Secular de Turchin</h3>
                    <span className="text-[9px] px-2 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-widest">
                        Ref: Princeton UP 2009
                    </span>
                </div>
                
                <div className="grid grid-cols-4 gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-sm overflow-hidden relative">
                    {['Ascensão', 'Pico', 'Fragmentação', 'Crise'].map((phase, idx) => {
                        const isCurrent = dados.res_phase.includes(phase);
                        return (
                            <div key={idx} className={`relative p-4 text-center transition-all ${isCurrent ? 'bg-zinc-800/50' : 'opacity-30'}`}>
                                {isCurrent && (
                                    <motion.div 
                                        layoutId="phaseActive"
                                        className="absolute inset-x-0 -top-1 h-1 bg-[#D4AF37]"
                                    />
                                )}
                                <p className={`text-[11px] font-serif mb-1 ${isCurrent ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>{phase}</p>
                                <div className={`w-1.5 h-1.5 mx-auto rounded-full ${isCurrent ? 'bg-[#D4AF37] animate-pulse' : 'bg-zinc-700'}`} />
                                {isCurrent && (
                                    <div className="absolute top-0 right-0 p-1">
                                        <span className="text-[8px] bg-[#D4AF37] text-black px-1 font-bold">POSIÇÃO ATUAL</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 2. RESULTS MATRIX */}
            <section className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-4xl font-serif">◈</span>
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2">Arquétipo Histórico</p>
                    <h4 className="text-xl font-serif text-[#D4AF37] mb-2">{dados.res_archetype}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed italic">"{dados.res_archetype_desc}"</p>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-6">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2">Tipo de Ressonância</p>
                    <h4 className="text-xl font-serif text-white mb-2">{dados.res_resonance_type}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{dados.res_resonance_desc}</p>
                </div>
            </section>

            {/* 3. ANALYSIS & PRECEDENTS */}
            <section className="bg-gradient-to-b from-zinc-900/20 to-transparent border-t border-zinc-800 pt-8">
                <div className="flex gap-8 flex-col lg:flex-row">
                    <div className="flex-1">
                        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Análise de Campo</h3>
                        <div className="text-sm text-zinc-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: dados.res_analysis }} />
                    </div>
                    
                    <div className="lg:w-1/3 space-y-6">
                        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500">Precedentes Auditados</h3>
                        <div className="space-y-4">
                            {dados.res_precedents.map((prec, i) => (
                                <div key={i} className={`p-4 border ${prec.key ? 'border-[#D4AF37]/30 bg-[#D4AF37]/5' : 'border-zinc-800'} relative`}>
                                    <span className="text-[9px] text-[#D4AF37] block mb-1">{prec.year}</span>
                                    <p className="text-xs font-bold text-white mb-1">{prec.name}</p>
                                    <p className="text-[10px] text-zinc-500 leading-snug">{prec.what}</p>
                                    <p className="text-[10px] text-[#D4AF37] italic mt-2 border-t border-zinc-800 pt-2">Lição: {prec.lesson}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. KAIROS WINDOW */}
            <section className="bg-[#D4AF37] p-8 text-black relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="text-9xl font-serif">⌛</span>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Janela de Kairos (Tempo Propício)</span>
                        <h3 className="text-2xl font-serif mb-4">Sua maior oportunidade de impacto sistêmico</h3>
                        <p className="text-sm leading-relaxed font-medium">
                            {dados.res_kairos}
                        </p>
                    </div>
                    <div className="text-center border-l border-black/20 pl-8">
                        <p className="text-[10px] uppercase font-bold tracking-widest mb-1">Duração Estimada</p>
                        <span className="text-4xl font-serif italic">{dados.res_window}</span>
                        <p className="text-[8px] uppercase tracking-tighter mt-2 opacity-60">Baseado no modelo de Princeton</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
