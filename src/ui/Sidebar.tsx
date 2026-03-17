import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  BarChart3, 
  Activity, 
  Compass, 
  Award,
  LogOut,
  RefreshCcw as UserRefresh
} from 'lucide-react';
import { storage } from '../config/storage';

interface SidebarProps {
  abaAtiva: string;
  setAbaAtiva: (aba: any) => void;
  setor: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ abaAtiva, setAbaAtiva, setor }) => {
  const abas = [
    { id: 'radar', nome: 'Radar 2030', icon: <LayoutDashboard size={20} /> },
    { id: 'laboratorio', nome: 'Laboratório', icon: <FlaskConical size={20} /> },
    { id: 'bi', nome: 'Business Intel', icon: <BarChart3 size={20} /> },
    { id: 'pulso', nome: 'Pulso Preditivo', icon: <Activity size={20} /> },
    { id: 'estrategia', nome: 'Estratégia', icon: <Compass size={20} /> },
    { id: 'elite', nome: 'Selo Elite', icon: <Award size={20} /> },
  ];

  const handleLogout = () => {
    storage.limparTudo();
    window.location.reload();
  };

  const handleSwitchUser = () => {
    // Para simplificar no MVP, o Trocar Usuário limpa dados e recarrega
    storage.limparTudo();
    window.location.reload();
  };

  return (
    <nav className="w-full md:w-80 bg-zinc-900/50 backdrop-blur-3xl border-b md:border-b-0 md:border-r border-zinc-900 p-8 flex flex-col z-50">
      <header className="mb-12">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-bold block mb-2">Axioma</span>
        <h2 className="font-serif text-3xl">Centro de Comando</h2>
      </header>

      <ul className="flex-1 space-y-2 flex flex-col">
        {abas.map((aba) => (
          <li key={aba.id}>
            <button
              onClick={() => setAbaAtiva(aba.id)}
              className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-500 border flex items-center gap-4 ${
                abaAtiva === aba.id 
                  ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]" 
                  : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              }`}
            >
              <span className={abaAtiva === aba.id ? "text-[#D4AF37]" : "text-zinc-500"}>
                {aba.icon}
              </span>
              <span className="uppercase text-[10px] tracking-widest font-bold">{aba.nome}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2">
        <button 
          onClick={handleSwitchUser}
          className="w-full text-left px-6 py-3 text-zinc-500 hover:text-zinc-300 flex items-center gap-4 transition-colors group"
        >
          <UserRefresh size={18} className="group-hover:text-[#D4AF37] transition-colors" />
          <span className="uppercase text-[9px] tracking-widest font-bold">Trocar Usuário</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full text-left px-6 py-3 text-zinc-500 hover:text-red-400 flex items-center gap-4 transition-colors group"
        >
          <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
          <span className="uppercase text-[9px] tracking-widest font-bold">Sair</span>
        </button>
      </div>

      <footer className="mt-8 pt-8 border-t border-zinc-800">
        <div className="flex items-center gap-4 p-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-zinc-600 flex items-center justify-center text-[10px] font-bold">AX</div>
          <div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1">Operador Elite</p>
            <p className="text-[11px] text-zinc-500 font-serif lowercase italic">{setor}</p>
          </div>
        </div>
      </footer>
    </nav>
  );
};
