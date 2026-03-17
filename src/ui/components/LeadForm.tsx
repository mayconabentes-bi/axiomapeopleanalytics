import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LeadData } from '../../types/contratos';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  brandColor?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, brandColor = '#D4AF37' }) => {
  const [formData, setFormData] = useState<LeadData>({
    nome: '',
    email: '',
    cargo: '',
    empresa: '',
    equipe: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-[#050611] text-zinc-100 flex items-center justify-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-950 border border-zinc-900 p-10 rounded-lg shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
        
        <header className="mb-10 text-center">
          <span style={{ color: brandColor }} className="text-[10px] uppercase tracking-[0.4em] mb-4 block">Captura de Inteligência</span>
          <h2 className="font-serif text-3xl text-white mb-2">Dados de Mercado</h2>
          <p className="text-zinc-500 text-[10px] italic leading-relaxed">
            Seus dados são protegidos por criptografia de ponta e usados apenas para fins estatísticos e personalização do diagnóstico.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-[#D4AF37] transition-colors">Nome Completo</label>
            <input 
              required
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-[#D4AF37] transition-all outline-none"
              placeholder="Ex: João Silva"
            />
          </div>

          <div className="group">
            <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-[#D4AF37] transition-colors">Email Corporativo</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-[#D4AF37] transition-all outline-none"
              placeholder="joao@empresa.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-[#D4AF37] transition-colors">Cargo</label>
              <input 
                required
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-[#D4AF37] transition-all outline-none"
                placeholder="CEO, VP, Gerente..."
              />
            </div>
            <div className="group">
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-[#D4AF37] transition-colors">Empresa</label>
              <input 
                required
                type="text"
                value={formData.empresa}
                onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-[#D4AF37] transition-all outline-none"
                placeholder="Nome da org."
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within:text-[#D4AF37] transition-colors">Tamanho da Equipe</label>
            <select 
              required
              value={formData.equipe}
              onChange={(e) => setFormData({...formData, equipe: e.target.value})}
              className="w-full bg-black border border-zinc-800 p-3 text-sm focus:border-[#D4AF37] transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="">Selecione...</option>
              <option value="1-10">1 a 10 pessoas</option>
              <option value="11-50">11 a 50 pessoas</option>
              <option value="51-200">51 a 200 pessoas</option>
              <option value="200+">Mais de 200 pessoas</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full py-4 mt-6 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] hover:text-black transition-all active:scale-[0.98]"
          >
            Iniciar Diagnóstico Prime
          </button>
        </form>
      </motion.div>
    </div>
  );
};
