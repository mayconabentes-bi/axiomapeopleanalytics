import React from 'react';
import { useAxioma } from './hooks/useAxioma';
import { SliderAxioma } from './AxiomaKit';

/**
 * SimuladorImpacto: Interface reativa para exploração de futuros.
 * Envolvido em React.memo para evitar re-renderizações desnecessárias.
 */
export const SimuladorImpacto: React.FC = React.memo(() => {
    const { simulacao, atualizarSimulacao, resultadoSimulacao } = useAxioma();
    const gapSinergia = 0.11 - resultadoSimulacao.sinergia;

    return (
        <section className="bg-zinc-950 p-6 md:p-12 rounded-3xl border border-zinc-900 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <header className="mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">Simulador de Impacto 2030</h2>
                <p className="text-zinc-500 font-sans text-sm">
                    Ajuste os vetores de investimento para visualizar o ponto de inflexão da sinergia.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                <div className="space-y-10">
                    <SliderAxioma 
                        label="Intensidade de Adoção de IA"
                        valor={simulacao.intensidadeIA}
                        onChange={(v) => atualizarSimulacao('intensidadeIA', v)}
                    />
                    <SliderAxioma 
                        label="Esforço de Reskilling / Upskilling"
                        valor={simulacao.esforçoReskilling}
                        onChange={(v) => atualizarSimulacao('esforçoReskilling', v)}
                    />
                    <SliderAxioma 
                        label="Clareza da Visão de Liderança"
                        valor={simulacao.clarezaLiderança}
                        onChange={(v) => atualizarSimulacao('clarezaLiderança', v)}
                    />
                </div>

                <div className="flex flex-col justify-center items-center bg-zinc-900/30 rounded-2xl p-8 md:p-10 border border-zinc-800/50">
                    <div className="text-center mb-8">
                        <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2 font-sans font-bold italic">Cenário Projetado</div>
                        <div className="font-serif text-4xl md:text-5xl text-white">{resultadoSimulacao.cenario}</div>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                            <span>Gap de Sinergia</span>
                            <span className={gapSinergia > 0.02 ? 'text-red-500' : 'text-green-500'}>
                                {(gapSinergia * 100).toFixed(1)}%
                            </span>
                        </div>
                        <div className="h-[2px] w-full bg-zinc-800">
                            <div 
                                className="h-full bg-[#D4AF37] transition-all duration-700 ease-out" 
                                style={{ width: `${(resultadoSimulacao.sinergia / 0.11) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-zinc-600 leading-relaxed italic text-center px-4 mt-4">
                            "Para cada 1% de gap fechado, o retorno sobre o capital humano cresce exponencialmente."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});
