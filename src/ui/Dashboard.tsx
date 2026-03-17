import React from 'react';
import { motion } from 'framer-motion';
import { ResultadoDiagnostico, Cenario2030 } from '../types/contratos';
import { getCoordenadasQuadrante, verificarAcessoROI, verificarAcessoHidden, getPlanoPorId } from '../domain/motorGating';
import { BotaoAxioma } from './AxiomaKit';
import { BioArc, UltradianWaves, TalebGauge } from './components/LuxuryVisuals';
import { ResonanceVisuals } from './components/ResonanceVisuals';
import { NarrativeVisuals } from './components/NarrativeVisuals';
import { ShadowVisuals } from './components/ShadowVisuals';
import { ArquivoVivoVisuals } from './components/ArquivoVivoVisuals';
import { calcularDadosBioArc, calcularDadosOndas, calcularDadosTaleb } from '../domain/motorVisualizacao';
import { TokenGenerator } from './components/TokenGenerator';

interface DashboardProps {
  selectedPlan: string | null;
  resultado: ResultadoDiagnostico | null;
  idade?: number;
  onOverrideResult?: (newRes: ResultadoDiagnostico) => void;
  onExit?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ selectedPlan, resultado, idade = 35, onOverrideResult, onExit }) => {
  const plano = getPlanoPorId(selectedPlan);
  const isElite = verificarAcessoROI(selectedPlan);
  const hasHidden = verificarAcessoHidden(selectedPlan);
  const isEnterprise = plano?.tier === 'enterprise';
  const [showAdminTool, setShowAdminTool] = React.useState(false);
  
  const isAdmin = selectedPlan === 'pf_elite' && window.location.pathname === '/axioma-dev-master';

  // Se não houver resultado E não for admin, não renderiza nada
  if (!resultado && !isAdmin) return null;

  // Cálculos de Visualização (Safe checks para quando não há resultado)
  const coords = resultado ? getCoordenadasQuadrante(resultado.cenario) : { x: '50%', y: '50%' };
  const idadeEfetiva = resultado?.idade || idade;
  const dadosBio = calcularDadosBioArc(idadeEfetiva);

  const scoreAnti = resultado?.scoresLentes?.['anti'] || 50;
  const statusIdx = scoreAnti > 80 ? 2 : (scoreAnti > 40 ? 1 : 0);
  const dadosTaleb = calcularDadosTaleb(statusIdx);

  const scoreEnergy = resultado?.scoresLentes?.['energy'] || 70;
  const windowIdx = scoreEnergy > 80 ? 2 : (scoreEnergy > 60 ? 1 : 4); 
  const dadosOndas = calcularDadosOndas(windowIdx);

  const brandColor = isEnterprise ? '#E5E4E2' : '#D4AF37';

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen ${isEnterprise ? 'bg-zinc-950' : 'bg-[#050611]'} text-zinc-100 font-sans py-20 px-6 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header de Inteligência (Suporte a White Label) */}
        <motion.header variants={itemVariants} className="mb-16 border-b border-zinc-900 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span style={{ color: brandColor }} className="font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
              {isEnterprise ? 'Intelligence Infrastructure • Global Enterprise' : 'Documento de Inteligência Reservado • Horizon 2030'}
            </span>
            <h1 className="font-serif text-6xl text-white mb-2">
              {isEnterprise ? 'Relatório Executivo de Produtividade' : 'Relatório de Produtividade Axioma'}
            </h1>
            <p className="text-zinc-500 italic">Análise de convergência tecnológica e capital humano.</p>
          </div>
          <div className="text-right">
             <div style={{ color: `${brandColor}CC` }} className="font-serif text-sm italic mb-1">Status: {resultado?.cenario || 'Acesso Direto'}</div>
             <p className="text-[10px] text-zinc-400 max-w-[300px] ml-auto mb-2 leading-tight uppercase tracking-widest">{resultado?.descricao || 'Painel de Controle de Inteligência'}</p>
             <div className="text-zinc-600 text-[9px] uppercase tracking-widest">
               {isEnterprise ? `Ref: ENT-${resultado?.id || 'ADM'}` : `Hash: AX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
             </div>
              {onExit && (
                <button 
                  onClick={onExit}
                  className="mt-4 px-6 py-2 border border-zinc-800 text-[10px] text-zinc-400 hover:border-red-900/50 hover:text-red-500 transition-all uppercase tracking-widest bg-zinc-950/50"
                >
                  Sair / Voltar ao Início
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={() => setShowAdminTool(!showAdminTool)}
                  className="mt-4 ml-0 md:ml-2 px-6 py-2 border border-amber-900/50 text-[10px] text-amber-500 hover:bg-amber-950/20 transition-all uppercase tracking-widest bg-black"
                >
                  {showAdminTool ? 'Fechar Gerador' : 'Gerar Acesso Temporário'}
                </button>
              )}
          </div>
        </motion.header>

        {showAdminTool && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-12 overflow-hidden">
            <TokenGenerator />
          </motion.div>
        )}

        {resultado ? (
          <>
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* Coluna 1: Matriz WEF */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-zinc-900/20 border border-zinc-800/50 p-8 relative overflow-hidden group">
            <h2 className="font-serif text-3xl mb-8 border-l pl-4 uppercase tracking-widest" style={{ borderColor: brandColor }}>Matriz WEF & ROI</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-square w-full relative border border-zinc-800 bg-black/40">
                <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-zinc-800" />
                <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-zinc-800" />
                
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ left: coords.x, top: coords.y }}
                  className="absolute w-4 h-4 -ml-2 -mt-2"
                >
                  <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: brandColor }} />
                  <div className="relative w-full h-full rounded-full shadow-xl" style={{ backgroundColor: brandColor }} />
                </motion.div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest text-zinc-600">Maturidade Digital</div>
                <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 text-[8px] uppercase tracking-widest text-zinc-600">Prontidão Humana</div>
              </div>

              <div className="space-y-8">
                 <div>
                    <div className="text-zinc-600 text-[10px] uppercase mb-2 tracking-widest">Sinergia Capturada</div>
                    <div className="text-5xl text-white font-light">{(resultado.multiplicadorProdutividade * 100 - 100).toFixed(1)}% <span style={{ color: brandColor }} className="text-sm">↑</span></div>
                    <p className="text-zinc-500 text-xs mt-4 italic leading-relaxed">
                      Líderes que integram talento e tech geram 11% mais produtividade (Accenture, 2024).
                    </p>
                 </div>
                 <div>
                    <div className="text-zinc-600 text-[10px] uppercase mb-2 tracking-widest">C Gap (Custo de Inação)</div>
                    <div className="text-5xl text-white font-light">
                      {isEnterprise ? `R$ ${Math.round(resultado.custoGapAnual / 1000000).toLocaleString()}M` : `R$ ${Math.round(resultado.custoGapAnual).toLocaleString()}`}
                    </div>
                    <p className="text-zinc-500 text-xs mt-4 italic leading-relaxed">
                      Perda financeira anual por desalinhamento com a fronteira produtiva.
                    </p>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-zinc-900/20 border border-zinc-800/50 p-8 flex flex-col gap-10">
            <section>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6">Arco de Sentênios</h3>
              <BioArc dados={dadosBio} />
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6">Ondas de Energia (24h)</h3>
              <UltradianWaves dados={dadosOndas} />
            </section>

            <section className="relative">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6">Gauge de Antifragilidade</h3>
              <div className={!isElite ? 'blur-md opacity-30 grayscale pointer-events-none' : ''}>
                <TalebGauge dados={dadosTaleb} />
              </div>
              {!isElite && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 border border-zinc-800 p-4 backdrop-blur-sm text-center">
                    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: brandColor }}>Conteúdo Elite</p>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-tighter mt-1 leading-none">Desbloqueie para ver sua convexidade</p>
                  </div>
                </div>
              )}
            </section>
          </motion.div>
        </div>

        {hasHidden && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="mb-8 p-10 bg-gradient-to-r from-zinc-900 to-black border relative overflow-hidden"
            style={{ borderColor: `${brandColor}33` }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="text-8xl font-serif">◈</span>
            </div>
            <span style={{ color: brandColor }} className="text-[10px] uppercase tracking-[0.6em] mb-4 block">Padrão Oculto Detectado</span>
            <h2 className="text-3xl font-serif text-white mb-4">Sincronicidade Biográfica e Capital Social</h2>
            <p className="max-w-3xl text-zinc-400 leading-relaxed italic">
              "A IA detectou um padrão entre seu sentênio atual e sua volatilidade de resposta: você está em uma rara janela de convexidade positiva, onde o risco de transição é superado pelo ganho de capital simbólico."
            </p>
          </motion.div>
        )}

        {/* LENTE XI: RESSONÂNCIA CIVILIZACIONAL (Elite/Enterprise) */}
        {resultado.ressonancia && (isElite || isEnterprise) && (
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-serif text-4xl uppercase tracking-widest text-white">Lente XI: Ressonância Civilizacional</h2>
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            <ResonanceVisuals dados={resultado.ressonancia} />
          </motion.div>
        )}

        {/* LENTE XII: IDENTIDADE NARRATIVA (Elite/Enterprise) */}
        {resultado.narrativa && (isElite || isEnterprise) && (
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-serif text-4xl uppercase tracking-widest text-white">Lente XII: Identidade Narrativa</h2>
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            <NarrativeVisuals data={resultado.narrativa} />
          </motion.div>
        )}

        {/* LENTE XIII: SOMBRA ESTRATÉGICA (Elite/Enterprise) */}
        {resultado.sombra && (isElite || isEnterprise) && (
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-serif text-4xl uppercase tracking-widest text-white">Lente XIII: Sombra Estratégica</h2>
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            <ShadowVisuals data={resultado.sombra} />
          </motion.div>
        )}

        {/* LENTE XIV: ARQUIVO VIVO (Elite/Enterprise) */}
        {resultado.arquivo && (isElite || isEnterprise) && (
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-serif text-4xl uppercase tracking-widest text-white">Lente XIV: Arquivo Vivo</h2>
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            <ArquivoVivoVisuals data={resultado.arquivo} />
            </motion.div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <div className="w-16 h-16 border-2 border-dashed border-zinc-700 rounded-full mb-6 animate-spin-slow" />
            <h3 className="font-serif text-xl mb-2">Aguardando Diagnóstico</h3>
            <p className="text-xs uppercase tracking-widest">Acesse os links para ver resultados reais</p>
          </div>
        )}

        <motion.footer variants={itemVariants} className="mt-12 flex justify-between items-center text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-bold">
           <span>{isEnterprise ? 'Corporate Intelligence Unit © 2025' : 'Axioma People Analytics © 2025'}</span>
           <span>World Economic Forum Intelligence Partner</span>
        </motion.footer>
      </div>
    </motion.div>
  );
};
