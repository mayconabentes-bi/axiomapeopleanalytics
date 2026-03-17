import React, { useState } from 'react';
import { generateToken } from '../../utils/accessUtils';
import { BotaoAxioma } from '../AxiomaKit';

/**
 * Ferramenta administrativa para geração de tokens de acesso temporário.
 */
export const TokenGenerator: React.FC = () => {
  const [planId, setPlanId] = useState('pf_traj');
  const [days, setDays] = useState(7);
  const [generatedLink, setGeneratedLink] = useState('');

  const plans = [
    { id: 'pf_traj', name: 'PF: Trajetória' },
    { id: 'pf_elite', name: 'PF: Cúpula' },
    { id: 'pj_str', name: 'PJ: Estrutura' },
    { id: 'pj_cmd', name: 'PJ: Comando' },
    { id: 'pj_sup', name: 'PJ: Supremacia' },
  ];

  const handleGenerate = () => {
    const token = generateToken(planId, days);
    const baseUrl = window.location.origin;
    setGeneratedLink(`${baseUrl}/?token=${token}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copiado para a área de transferência!");
  };

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl mx-auto my-10">
      <h2 className="font-serif text-2xl text-white mb-6">Gerador de Acessos Provisórios</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Selecionar Plano</label>
          <select 
            value={planId} 
            onChange={(e) => setPlanId(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-3 text-white rounded-xl focus:border-[#D4AF37] outline-none"
          >
            {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Validade (Dias)</label>
          <input 
            type="number" 
            value={days} 
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-full bg-black border border-zinc-800 p-3 text-white rounded-xl focus:border-[#D4AF37] outline-none"
          />
        </div>

        <BotaoAxioma variant="gold" onClick={handleGenerate} className="w-full">
          Gerar Link de Acesso
        </BotaoAxioma>

        {generatedLink && (
          <div className="mt-8 p-4 bg-black border border-[#D4AF37]/30 rounded-xl">
            <label className="block text-[9px] uppercase tracking-widest text-zinc-600 mb-2">Link Gerado (Expira em {days} dias)</label>
            <div className="flex gap-2">
              <input 
                readOnly 
                value={generatedLink} 
                className="flex-1 bg-transparent text-[11px] text-[#D4AF37] outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className="text-[10px] uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
