import React from 'react';
import { CategoriaSelo } from '../data/selosAxioma';
import { CertificadoGerado } from '../domain/motorCertificacao';
import { BotaoAxioma } from './AxiomaKit';

/**
 * CertificadoDinamico: Selo digital de autoridade com estética de alta joalharia.
 */
export const CertificadoDinamico: React.FC<{ certificado: CertificadoGerado, sentenio: string, cenario: string }> = ({ certificado, sentenio, cenario }) => {
    
    const estilosSelo = {
        [CategoriaSelo.SILVER]: "from-zinc-400 via-zinc-200 to-zinc-500",
        [CategoriaSelo.GOLD]: "from-yellow-600 via-yellow-200 to-yellow-700",
        [CategoriaSelo.DIAMOND]: "from-cyan-400 via-white to-blue-400"
    };

    const partilharLinkedIn = () => {
        const texto = `Concluí o diagnóstico Axioma People Analytics 2030. Alcancei o selo ${certificado.selo} com um Índice de Sinergia de ${(certificado.indiceSinergia * 100).toFixed(1)}%. Pronto para o futuro da produtividade! #Axioma2030 #WEF2025`;
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(texto)}`, '_blank');
    };

    return (
        <div className="max-w-2xl mx-auto py-24 text-center">
            <div className="relative inline-block group mb-16">
                {/* Efeito de Aura */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${estilosSelo[certificado.selo]} rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>
                
                {/* Selo Principal */}
                <div className="relative px-12 py-12 bg-zinc-950 rounded-full border border-zinc-900 flex flex-col items-center justify-center w-72 h-72">
                    <div className={`w-24 h-24 mb-4 bg-gradient-to-br ${estilosSelo[certificado.selo]} rounded-full shadow-2xl flex items-center justify-center`}>
                       <span className="text-zinc-950 font-serif text-4xl font-bold">A</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-1">Certificação</div>
                    <div className={`font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 uppercase tracking-widest`}>
                        {certificado.selo.split(' ')[1]}
                    </div>
                </div>
            </div>

            <div className="space-y-8 mb-16">
                <h2 className="font-serif text-5xl text-white">Selo de Prontidão 2030</h2>
                <div className="flex justify-center gap-12 text-zinc-500 font-sans text-[11px] uppercase tracking-widest border-t border-b border-zinc-900 py-6">
                    <div>
                        <div className="text-zinc-700 mb-1">Cenário</div>
                        <div className="text-white">{cenario}</div>
                    </div>
                    <div>
                        <div className="text-zinc-700 mb-1">Senténio</div>
                        <div className="text-white">{sentenio}</div>
                    </div>
                    <div>
                        <div className="text-zinc-700 mb-1">Sinergia</div>
                        <div className="text-[#D4AF37]">{(certificado.indiceSinergia * 100).toFixed(1)}%</div>
                    </div>
                </div>
            </div>

            <BotaoAxioma variant="gold" onClick={partilharLinkedIn}>
                Partilhar Autoridade no LinkedIn
            </BotaoAxioma>
            
            <p className="mt-8 text-zinc-700 text-[9px] uppercase tracking-widest">
                ID Verificação: {btoa(certificado.dataEmissao + certificado.selo).substring(0, 16)}
            </p>
        </div>
    );
};
