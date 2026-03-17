import React, { useState } from 'react';
import { PainelCenario } from './PainelCenario';
import { SimuladorImpacto } from './SimuladorImpacto';
import { DashboardBusiness } from './DashboardBusiness';
import { AxiomaPulse } from './AxiomaPulse';
import { RelatorioEstrategico } from './RelatorioEstrategico';
import { CertificadoDinamico } from './CertificadoDinamico';
import { useAxioma } from './hooks/useAxioma';
import { BotaoAxioma } from './AxiomaKit';
import { validarAptidaoElite } from '../domain/motorCertificacao';

import { Sidebar } from './Sidebar';

/**
 * Centro de Comando Axioma: A interface central que unifica toda a inteligência do sistema.
 */
export const CentroComando: React.FC = () => {
  const { metricas, setor, resultadoSimulacao } = useAxioma();
  const [abaAtiva, setAbaAtiva] = useState<'radar' | 'laboratorio' | 'bi' | 'pulso' | 'estrategia' | 'elite'>('radar');

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col md:flex-row">
      <Sidebar 
        abaAtiva={abaAtiva} 
        setAbaAtiva={setAbaAtiva} 
        setor={setor} 
      />

      {/* Área de Conteúdo Dinâmica */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {abaAtiva === 'radar' && (
            <PainelCenario cenario={resultadoSimulacao.cenario} metricas={metricas} setor={setor} />
          )}
          
          {abaAtiva === 'laboratorio' && (
            <div className="space-y-12">
               <SimuladorImpacto />
            </div>
          )}

          {abaAtiva === 'bi' && (
            <DashboardBusiness 
              metricas={metricas} 
              setor={setor} 
            />
          )}

          {abaAtiva === 'pulso' && (
            <AxiomaPulse 
              metricas={metricas}
              idade={35} 
            />
          )}

          {abaAtiva === 'estrategia' && (
             <RelatorioEstrategico 
                cenario={resultadoSimulacao.cenario}
                metricas={metricas}
                setor={setor}
             />
          )}

          {abaAtiva === 'elite' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <CertificadoDinamico 
                certificado={validarAptidaoElite(metricas)}
                sentenio="35-42 (Liderança Autêntica)"
                cenario={resultadoSimulacao.cenario}
              />
              <div className="mt-12 max-w-md text-center">
                <p className="text-zinc-500 text-sm font-serif italic">
                  "Sua credencial valida sua prontidão para navegar na fronteira da produtividade global de 2030."
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
