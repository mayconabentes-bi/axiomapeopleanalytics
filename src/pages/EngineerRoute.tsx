import React, { useState, useEffect } from 'react';
import { Dashboard } from '../ui/Dashboard';
import { ResultadoDiagnostico, Cenario2030 } from '../types/contratos';
import { calcularDiagnosticoCompleto } from '../domain/analisadorSetorial';

const SCENARIO_PRESETS = {
  LEAP: {
    label: 'LEAP',
    tec: 85,
    hum: 90,
    colab: 500,
    sal: 12000,
    veredicto: "Círculo Virtuoso: Sinergia de 11%. Alta tecnologia integrada ao talento elevando ganhos para a fronteira produtiva."
  },
  OVERLOAD: {
    label: 'OVERLOAD',
    tec: 90,
    hum: 30,
    colab: 500,
    sal: 12000,
    veredicto: "Falha da Automação: Skills Mismatch (46%). Tecnologia supera o capital humano, gerando ineficiência por subutilização."
  },
  ENTERPRISE: {
    label: 'STRESS-TEST',
    tec: 95,
    hum: 95,
    colab: 5400,
    sal: 15500,
    veredicto: "Supremacia Operacional: Escala Global. Integração total de sistemas com capital humano de elite em larga escala."
  },
  DROUGHT: {
    label: 'DROUGHT',
    tec: 20,
    hum: 20,
    colab: 500,
    sal: 12000,
    veredicto: "Arrasto de Eficiência: Déficit de Investimento (0,1% do PIB). Estagnação crítica em inovação e pessoas."
  }
};

export const EngineerRoute: React.FC = () => {
  const [planId, setPlanId] = useState<string>('pf_elite');
  const [res, setRes] = useState<ResultadoDiagnostico | null>(null);

  const injectScenario = (key: keyof typeof SCENARIO_PRESETS) => {
    const p = SCENARIO_PRESETS[key];
    const initialRes = calcularDiagnosticoCompleto({
      scoreTecnologia: p.tec,
      scoreCapitalHumano: p.hum,
      numeroColaboradores: p.colab,
      salarioMedio: p.sal
    });

    setRes({
      ...initialRes,
      descricao: p.veredicto
    });
  };

  useEffect(() => {
    injectScenario('LEAP');
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full bg-amber-600/10 border-b border-amber-600/30 text-[10px] text-amber-500 uppercase tracking-[0.5em] py-1 text-center font-bold z-[100] pointer-events-none">
        Axioma Dev Environment // Mode: Strategic Auditor Active
      </div>

      <div className="fixed top-12 right-4 z-[110] bg-black/90 border border-amber-600/30 p-5 w-64 shadow-2xl backdrop-blur-md">
        <h3 className="text-amber-500 text-[11px] uppercase tracking-widest mb-4 font-bold">Scenario Switcher</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-6">
          {(Object.keys(SCENARIO_PRESETS) as Array<keyof typeof SCENARIO_PRESETS>).map(key => (
            <button
              key={key}
              onClick={() => injectScenario(key)}
              className="px-2 py-3 border border-zinc-800 text-[10px] text-zinc-400 hover:border-amber-600 hover:text-white transition-all uppercase"
            >
              {SCENARIO_PRESETS[key].label}
            </button>
          ))}
        </div>

        <h3 className="text-amber-500 text-[11px] uppercase tracking-widest mb-3 font-bold">Access Tier</h3>
        <div className="grid grid-cols-1 gap-2">
          {['pf_free', 'pf_elite', 'pj_str', 'pj_sup'].map(id => (
            <button
              key={id}
              onClick={() => setPlanId(id)}
              className={`py-2 text-[9px] uppercase border ${planId === id ? 'bg-amber-600 border-amber-600 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
            >
              {id.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800">
          <p className="text-[9px] text-zinc-600 leading-relaxed italic">
            * Stress Test ativo para grandes organizações corporativas.
          </p>
        </div>
      </div>

      <Dashboard 
        selectedPlan={planId} 
        resultado={res} 
        onOverrideResult={setRes}
        onExit={() => window.location.reload()}
      />
    </div>
  );
};
