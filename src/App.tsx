import React, { useState, useEffect } from 'react';
import { useAxioma } from './ui/hooks/useAxioma';
import { calcularDiagnosticoCompleto } from './domain/analisadorSetorial';
import { FluxoAvaliacao } from './ui/FluxoAvaliacao';
import ErrorBoundary from './ui/components/ErrorBoundary';
import * as storage from './config/storage';
import { validateToken } from './utils/accessUtils';

import { LandingPage } from './ui/LandingPage';
import { PricingPlans } from './ui/PricingPlans';

import { LoadingAxioma } from './ui/LoadingAxioma';
import { Dashboard } from './ui/Dashboard';
import { EngineerRoute } from './pages/EngineerRoute';

import { ResultadoDiagnostico } from './types/contratos';
import { trackEvent } from './utils/analytics';

/**
 * App Principal: Orquestra o ciclo de vida do Axioma People Analytics.
 */
function App() {
  type ViewState = 'landing' | 'planos' | 'diagnostico' | 'loading' | 'dashboard';
  const [view, setView] = useState<ViewState>('landing');
  const [setorInicial, setSetorInicial] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoDiagnostico | null>(null);
  const [isEngineerMode, setIsEngineerMode] = useState(false);
  
  const DEV_KEY = "AXIOMA-2030-MASTER";

  // Helper function to load diagnostic from storage
  const loadDiagnostic = () => {
    const salvo = storage.storage.carregarUltimoResultado();
    if (salvo) {
      return salvo.resultado;
    }
    return null;
  };

  useEffect(() => {
    // Detectar Rota de Engenharia
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname.replace(/\/$/, ""); // Remover barra final
    
    console.log("Axioma Debug - Path:", path);
    console.log("Axioma Debug - Params:", Object.fromEntries(params.entries()));

    // Telemetria: Início de Sessão
    trackEvent('session_start', { path, params: Object.fromEntries(params.entries()) });

    if (params.get('mode') === 'engineer') {
      setIsEngineerMode(true);
      return; 
    }

    if (path === '/axioma-dev-master' || params.get('admin') === 'true') {
      console.log("Axioma - Admin Mode Triggered");
      const key = window.prompt("ACESSO RESTRITO - CHAVE DE ENGENHARIA:");
      if (key === DEV_KEY) {
        setView('dashboard');
        setSelectedPlan('pf_elite'); 
        return;
      } else if (key !== null) {
        alert("Chave incorreta.");
        window.location.href = '/';
      }
    }

    // Regras de Liberação
    const planoLiberado = params.get('liberar');
    const tokenAcesso = params.get('token');

    if (tokenAcesso) {
      console.log("Axioma - Token Detected:", tokenAcesso);
      const { planId, valid, expired } = validateToken(tokenAcesso);
      if (valid && !expired) {
        console.log("Axioma - Token Valid for:", planId);
        trackEvent('survey_start', { method: 'token', planId, token: tokenAcesso });
        const prefixo = planId.split('_')[0]; 
        setSetorInicial(prefixo === 'pf' ? 'pessoa_fisica' : 'pessoa_juridica');
        setSelectedPlan(planId);
        setView('diagnostico');
        return;
      } else {
        console.error("Axioma - Token Invalid or Expired. Valid:", valid, "Expired:", expired);
        if (expired) alert("Este link de acesso temporário expirou.");
      }
    }

    if (planoLiberado) {
      console.log("Axioma - Plan Release Requested:", planoLiberado);
      const planosPagosPermitidos = ['pf_traj', 'pf_elite', 'pj_str', 'pj_cmd', 'pj_sup'];
      if (planosPagosPermitidos.includes(planoLiberado.toLowerCase())) {
        const prefixo = planoLiberado.toLowerCase().split('_')[0]; 
        setSetorInicial(prefixo === 'pf' ? 'pessoa_fisica' : 'pessoa_juridica');
        setSelectedPlan(planoLiberado.toLowerCase());
        setView('diagnostico');
        return;
      }
    }

    const salvo = loadDiagnostic();
    if (salvo && path !== '/axioma-dev-master' && params.get('admin') !== 'true') {
      setResultado(salvo);
      setView('dashboard');
      setSelectedPlan('pf_free'); 
    }
  }, []);

  const iniciarFluxo = (setor: string) => {
    setSetorInicial(setor);
    setView('planos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selecionarPlano = (planId: string) => {
    const planosDinheiro = ['pf_traj', 'pf_elite', 'pj_str', 'pj_cmd', 'pj_sup'];
    
    // Se for plano pago, direciona para o WhatsApp
    if (planosDinheiro.includes(planId)) {
      const whatsAppNumber = '5592984081956';
      
      // Mapeamento opcional do nome do plano se quiser enviar dinâmico no texto
      const planNames = {
        'pf_traj': 'Trajetória',
        'pf_elite': 'Cúpula',
        'pj_str': 'Estrutura PJ',
        'pj_cmd': 'Comando PJ',
        'pj_sup': 'Supremacia PJ'
      };
      
      const nomePlano = planNames[planId as keyof typeof planNames] || 'Premium';
      const text = encodeURIComponent(`Olá, tenho interesse em liberar o acesso ao plano ${nomePlano} do Axioma People Analytics.`);
      
      window.open(`https://wa.me/${whatsAppNumber}?text=${text}`, '_blank');
      return;
    }

    // Se for free ('pf_free' ou 'pj_rec'), prossegue normalmente
    setSelectedPlan(planId);
    setView('diagnostico');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalizarDiagnostico = (res: ResultadoDiagnostico) => {
    setResultado(res);
    storage.storage.salvarResultado(res, { scoreTecnologico: 0, scoreCapitalHumano: 0, indiceVisaoLideranca: 0 }, setorInicial);
    setView('loading');
  };

  const handleExit = () => {
    storage.storage.limparTudo();
    setResultado(null);
    setSelectedPlan(null);
    setSetorInicial("");
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isEngineerMode) {
    return <EngineerRoute />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-950">
        {view === 'landing' && (
          <LandingPage onStart={iniciarFluxo} />
        )}

        {view === 'planos' && (
          <PricingPlans 
            onSelectPlan={selecionarPlano} 
            onBack={() => {
              setView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        
        {view === 'diagnostico' && (
          <FluxoAvaliacao 
            onFinalize={finalizarDiagnostico} 
          />
        )}

        {view === 'loading' && (
          <LoadingAxioma 
            setor={setorInicial} 
            onComplete={() => setView('dashboard')} 
          />
        )}
        
        {view === 'dashboard' && (
          <Dashboard 
            selectedPlan={selectedPlan} 
            resultado={resultado} 
            onOverrideResult={setResultado}
            onExit={handleExit}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
