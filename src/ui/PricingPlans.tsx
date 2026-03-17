import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Zap, Clock, Users, Building, ChevronDown, Monitor } from 'lucide-react';
import './PricingPlans.css';

interface PricingPlansProps {
  onSelectPlan: (planId: string) => void;
  onBack?: () => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan, onBack }) => {
  const [tab, setTab] = useState<'pf' | 'pj'>('pf');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  
  // Scarcity Timer
  const [vagas, setVagas] = useState(6);
  useEffect(() => {
    const timer = setInterval(() => {
      setVagas(v => (v > 2 ? v - (Math.random() > 0.8 ? 1 : 0) : v));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // ROI Calculator State
  const [roiTeam, setRoiTeam] = useState(80);
  const [roiSalary, setRoiSalary] = useState(15000);
  const [roiLoss, setRoiLoss] = useState(12);

  const roiResults = useMemo(() => {
    const monthly = Math.round(roiTeam * roiSalary * (roiLoss / 100));
    const annual = monthly * 12;
    const planCost = 29000;
    const ratio = Math.round(annual / planCost);
    return { monthly, annual, ratio };
  }, [roiTeam, roiSalary, roiLoss]);

  const fmt = (n: number) => n.toLocaleString('pt-BR');

  return (
    <div className="pricing-container-v2">
      {/* HERO */}
      <section className="pricing-hero-v2">
        <div className="ph-grid-v2"></div>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          {onBack && (
            <button 
              onClick={onBack}
              className="absolute top-8 left-8 z-[50] text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2 border border-zinc-800/50 px-4 py-2 bg-black/40 tracking-widest text-[10px] uppercase"
            >
              ← Voltar a Tela Inicial
            </button>
          )}
          <p className="ph-eyebrow-v2">Planos & Investimento</p>
          <h1 className="ph-title-v2">Escolha o nível de<br/><em>clareza estratégica</em><br/>que você precisa</h1>
          <p className="ph-sub-v2">Do diagnóstico inicial gratuito à parceria estratégica completa — cada plano foi desenhado para maximizar o retorno sobre o seu maior ativo.</p>
          
          <div className="tab-switch-v2">
            <button className={`tab-btn-v2 ${tab === 'pf' ? 'active' : ''}`} onClick={() => setTab('pf')}>Pessoa Física</button>
            <button className={`tab-btn-v2 ${tab === 'pj' ? 'active' : ''}`} onClick={() => setTab('pj')}>Pessoa Jurídica</button>
          </div>

          <div className="billing-wrap-v2">
            <span className={`billing-label-v2 ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>Mensal</span>
            <div className={`toggle-track-v2 ${billing === 'annual' ? 'annual' : ''}`} onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}>
              <div className="toggle-thumb-v2"></div>
            </div>
            <span className={`billing-label-v2 ${billing === 'annual' ? 'active' : ''}`} onClick={() => setBilling('annual')}>Anual</span>
            <span className="billing-badge-v2">Economize 20%</span>
          </div>
        </motion.div>
      </section>

      {/* PLANS GRID */}
      <section className="plans-section-v2">
        <AnimatePresence mode="wait">
          <motion.div 
            key={tab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`plans-grid ${tab === 'pf' ? 'plans-grid-pf' : 'plans-grid-pj'}`}
          >
            {tab === 'pf' ? (
              <>
                {/* PF: DIAGNOSTICO */}
                <div className="plan-card-v2">
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2 tag-free">Grátis para sempre</span>
                    <h3 className="plan-name-v2">Diagnóstico</h3>
                    <p className="plan-desc-v2">O primeiro passo para entender onde você está — e para onde pode ir.</p>
                    <div className="price-display-v2">
                      <span className="currency-v2">R$</span>
                      <span className="amount-v2">0</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Check size={16} className="text-teal-600" /> 1 diagnóstico com IA</div>
                    <div className="feature-item-v2"><Check size={16} className="text-teal-600" /> Cenários WEF 2025</div>
                    <div className="feature-item-v2"><Check size={16} className="text-teal-600" /> 3 Dimensões de Capital</div>
                  </div>
                  <button className="btn-plan-v2" onClick={() => onSelectPlan('pf_free')}>Começar Grátis</button>
                </div>

                {/* PF: TRAJETORIA (ELITE) */}
                <div className="plan-card-v2 featured">
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2 tag-popular">Mais Popular</span>
                    <h3 className="plan-name-v2">Trajetória</h3>
                    <p className="plan-desc-v2">Para o profissional que quer ser a pessoa mais preparada na sala — em qualquer cenário.</p>
                    <div className="price-display-v2">
                      <span className="currency-v2">R$</span>
                      <span className="amount-v2">{billing === 'annual' ? '158' : '197'}</span>
                      <span className="period-v2">/mês</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Check size={16} className="text-[#d4b07a]" /> Diagnósticos ilimitados</div>
                    <div className="feature-item-v2"><Check size={16} className="text-[#d4b07a]" /> 6 Dimensões de Capital</div>
                    <div className="feature-item-v2"><Check size={16} className="text-[#d4b07a]" /> Roadmap 12 meses</div>
                    <div className="feature-item-v2"><Check size={16} className="text-[#d4b07a]" /> Ritmos Biográficos</div>
                  </div>
                  <button className="btn-plan-v2" onClick={() => onSelectPlan('pf_traj')}>Solicitar Liberação</button>
                </div>

                {/* PF: CUPULA (BUSINESS MAPPED) */}
                <div className="plan-card-v2" style={{ background: '#0a0a0a', color: 'white', borderRight: 'none' }}>
                  <div className="scarcity-v2">
                    <div className="scarcity-dot-v2"></div>
                    <span className="scarcity-text-v2">Apenas {vagas} vagas disponíveis para março</span>
                  </div>
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2 tag-elite">Acesso Especial</span>
                    <h3 className="plan-name-v2" style={{ color: '#d4b07a' }}>Cúpula</h3>
                    <p className="plan-desc-v2">Inteligência estratégica de elite com mentoria direta dos curadores Axioma.</p>
                    <div className="price-display-v2">
                      <span className="currency-v2">R$</span>
                      <span className="amount-v2" style={{ color: '#d4b07a' }}>{billing === 'annual' ? '398' : '497'}</span>
                      <span className="period-v2">/mês</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Zap size={16} className="text-[#d4b07a]" /> Sessão 1:1 mensal</div>
                    <div className="feature-item-v2"><Zap size={16} className="text-[#d4b07a]" /> Rede de Executivos</div>
                    <div className="feature-item-v2"><Zap size={16} className="text-[#d4b07a]" /> Relatórios Impressos</div>
                  </div>
                  <button className="btn-plan-v2" style={{ borderColor: '#D4AF37', color: '#D4AF37' }} onClick={() => onSelectPlan('pf_elite')}>Falar com Especialistas</button>
                </div>
              </>
            ) : (
              <>
                {/* PJ: RECONHECIMENTO */}
                <div className="plan-card-v2">
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2 tag-free">Grátis · 30 dias</span>
                    <h3 className="plan-name-v2">Reconhecimento</h3>
                    <p className="plan-desc-v2">Para líderes que querem ver o diagnóstico funcionando na equipe.</p>
                    <div className="price-display-v2">
                      <span className="currency-v2">R$</span>
                      <span className="amount-v2">0</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Users size={16} /> Até 3 colaboradores</div>
                    <div className="feature-item-v2"><Check size={16} /> PDF Introdutório</div>
                  </div>
                  <button className="btn-plan-v2" onClick={() => onSelectPlan('pj_rec')}>Ativar Teste</button>
                </div>

                {/* PJ: ESTRUTURA */}
                <div className="plan-card-v2 featured">
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2 tag-popular">Recomendado</span>
                    <h3 className="plan-name-v2">Estrutura</h3>
                    <p className="plan-desc-v2">Visibilidade real do capital humano para organizações em escala.</p>
                    <div className="price-display-v2">
                      <span className="currency-v2">R$</span>
                      <span className="amount-v2">{billing === 'annual' ? '2.320' : '2.900'}</span>
                      <span className="period-v2">/mês</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Check size={16} /> Até 50 colaboradores</div>
                    <div className="feature-item-v2"><Check size={16} /> Dashboard de Equipe</div>
                    <div className="feature-item-v2"><Check size={16} /> Analytics Coletivo</div>
                  </div>
                  <button className="btn-plan-v2" onClick={() => onSelectPlan('pj_str')}>Solicitar Liberação</button>
                </div>

                {/* PJ: COMANDO */}
                <div className="plan-card-v2">
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2" style={{ background: '#f0f0F0', color: '#333'}}>Advanced</span>
                    <h3 className="plan-name-v2">Comando</h3>
                    <p className="plan-desc-v2">Transformação acelerada com integração total de sistemas de RH.</p>
                    <div className="price-display-v2">
                      <span className="currency-v2">R$</span>
                      <span className="amount-v2">{billing === 'annual' ? '6.320' : '7.900'}</span>
                      <span className="period-v2">/mês</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Building size={16} /> Até 200 colaboradores</div>
                    <div className="feature-item-v2"><Zap size={16} /> Integração HRIS/API</div>
                    <div className="feature-item-v2"><Zap size={16} /> Consultor Dedicado</div>
                  </div>
                  <button className="btn-plan-v2" onClick={() => onSelectPlan('pj_cmd')}>Solicitar Liberação</button>
                </div>

                {/* PJ: SUPREMACIA */}
                <div className="plan-card-v2" style={{ background: '#050505', color: 'white' }}>
                  <div className="plan-header-v2">
                    <span className="plan-tag-v2 tag-elite">Enterprise</span>
                    <h3 className="plan-name-v2">Supremacia</h3>
                    <p className="plan-desc-v2">Parceria estratégica full-service e white-label.</p>
                    <div className="price-display-v2">
                      <span className="amount-v2" style={{ fontSize: '28px', color: '#d4b07a' }}>Sob Consulta</span>
                    </div>
                  </div>
                  <div className="features-list-v2">
                    <div className="feature-item-v2"><Zap size={16} /> Ilimitado</div>
                    <div className="feature-item-v2"><Zap size={16} /> White Label</div>
                    <div className="feature-item-v2"><Zap size={16} /> Treinamento Presencial</div>
                  </div>
                  <button className="btn-plan-v2" style={{ borderColor: '#d4b07a', color: '#d4b07a' }} onClick={() => onSelectPlan('pj_sup')}>Falar com Especialista</button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ROI CALCULATOR */}
      <section className="roi-section-v2">
        <div style={{ maxWidth: '600px' }}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#b8965a] mb-4 font-bold">Inteligência Financeira</p>
          <h2 className="ph-title-v2" style={{ color: '#0d0e0f', textAlign: 'left' }}>Quanto custa <em>NÃO investir</em>?</h2>
          <p className="plan-desc-v2">A inação tem um preço oculto. Calcule o impacto financeiro dos gaps de produtividade não identificados na sua operação.</p>
        </div>

        <div className="roi-grid-v2">
          <div className="roi-input-group-v2">
            <div className="roi-field-v2">
              <label>Colaboradores na Equipe</label>
              <input type="range" min="10" max="1000" step="10" value={roiTeam} onChange={(e) => setRoiTeam(+e.target.value)} />
              <div className="roi-display-v2"><span>{roiTeam}</span> <span className="text-xs text-zinc-400">pessoas</span></div>
            </div>
            <div className="roi-field-v2">
              <label>Salário Médio (R$)</label>
              <input type="range" min="3000" max="50000" step="500" value={roiSalary} onChange={(e) => setRoiSalary(+e.target.value)} />
              <div className="roi-display-v2"><span>R$ {fmt(roiSalary)}</span> <span className="text-xs text-zinc-400">p/mês</span></div>
            </div>
            <div className="roi-field-v2">
              <label>Gap de Produtividade (%)</label>
              <input type="range" min="5" max="35" step="1" value={roiLoss} onChange={(e) => setRoiLoss(+e.target.value)} />
              <div className="roi-display-v2"><span>{roiLoss}%</span> <span className="text-xs text-zinc-400">Ref. WEF: 12%</span></div>
            </div>
          </div>

          <div className="roi-card-v2">
            <div>
              <p className="roi-res-label-v2">Custo Mensal do Gap</p>
              <p className="roi-res-val-v2">R$ {fmt(roiResults.monthly)}</p>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div className="roi-ratio-v2">
              O investimento no Axioma Estrutura é de R$ 29k/ano.<br/> 
              Este gap gera uma perda de <strong>R$ {fmt(roiResults.annual)}</strong>/ano. <br/>
              O retorno sobre o investimento é de <strong>{roiResults.ratio}x</strong>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
