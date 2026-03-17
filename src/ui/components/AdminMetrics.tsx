import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getLogs, AxiomaEvent } from '../../utils/analytics';

/**
 * Componente de visualização de métricas administrativas.
 * Processa os logs de telemetria locais para exibir os indicadores solicitados.
 */
export const AdminMetrics: React.FC = () => {
  const logs = useMemo(() => getLogs(), []);

  // 1. Links Gerados
  const linksGerados = logs.filter(l => l.type === 'link_generated').length;

  // 2. Quem Acessou (Sessões Únicas)
  const sessoesUnicas = new Set(logs.map(l => l.sessionId)).size;

  // 3. Acessos por Link
  const acessosPorLink = useMemo(() => {
    const stats: Record<string, number> = {};
    logs.filter(l => l.type === 'survey_start' && l.data.token).forEach(l => {
      const token = l.data.token.substr(0, 10) + '...';
      stats[token] = (stats[token] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [logs]);

  // 5. Avaliações Geradas
  const avaliacoesConcluidas = logs.filter(l => l.type === 'survey_complete').length;

  // 6. Downloads de PDF
  const pdfDownloads = logs.filter(l => l.type === 'pdf_download').length;

  // 7. Abandonos (Acessaram mas não iniciaram pesquisa)
  const totalSessoes = new Set(logs.filter(l => l.type === 'session_start').map(l => l.sessionId)).size;
  const iniciaramPesquisa = new Set(logs.filter(l => l.type === 'survey_start').map(l => l.sessionId)).size;
  const abandonos = totalSessoes - iniciaramPesquisa;

  // 8. Tempo de Permanência (Estimativa simplificada por sessão)
  const tempoMedio = useMemo(() => {
    const sessoes: Record<string, { start: number; end: number }> = {};
    logs.forEach(l => {
      const ts = new Date(l.timestamp).getTime();
      if (!sessoes[l.sessionId]) {
        sessoes[l.sessionId] = { start: ts, end: ts };
      } else {
        sessoes[l.sessionId].end = Math.max(sessoes[l.sessionId].end, ts);
      }
    });
    const durations = Object.values(sessoes).map(s => s.end - s.start).filter(d => d > 0);
    if (durations.length === 0) return 0;
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    return Math.round(avg / 1000 / 60); // Minutos
  }, [logs]);

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl mt-12">
      <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="font-serif text-3xl text-white">Indicadores de Performance</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mt-2">Visão Geral de Telemetria e Conversão</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
          <span className="text-amber-500 text-[9px] font-bold uppercase tracking-widest">Modo Monitoramento Ativo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Links */}
        <MetricCard 
          label="Links de Acesso" 
          value={linksGerados} 
          sub={`${acessosPorLink.length} links ativos detectados`} 
          icon="🔗"
        />
        {/* Card 2: Acessos */}
        <MetricCard 
          label="Sessões Totais" 
          value={sessoesUnicas} 
          sub={`Permanência média: ${tempoMedio} min`} 
          icon="👥"
        />
        {/* Card 3: Conversão */}
        <MetricCard 
          label="Pesquisas Finalizadas" 
          value={avaliacoesConcluidas} 
          sub={`Taxa de conclusão: ${totalSessoes > 0 ? Math.round((avaliacoesConcluidas/totalSessoes) * 100) : 0}%`} 
          icon="📊"
        />
        {/* Card 4: Downloads */}
        <MetricCard 
          label="Relatórios PDF" 
          value={pdfDownloads} 
          sub="Documentos exportados" 
          icon="📄"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Detalhes de Acessos */}
        <div className="lg:col-span-2 bg-black/40 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-6">Logs de Atividade Recente</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
            {logs.slice(-10).reverse().map((log, i) => (
              <div key={i} className="flex justify-between items-center text-[11px] border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 font-mono">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span className="text-zinc-300 uppercase tracking-tighter">{log.type.replace('_', ' ')}</span>
                </div>
                <div className="text-zinc-500 italic max-w-[200px] truncate">
                  ID: {log.sessionId}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funil Simplicado */}
        <div className="bg-black/40 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-6">Funil de Conversão</h3>
          <div className="space-y-6">
            <FunnelStep label="Acessos Totais" value={totalSessoes} total={totalSessoes} color="#zinc-500" />
            <FunnelStep label="Iniciaram Pesquisa" value={iniciaramPesquisa} total={totalSessoes} color="#D4AF37" />
            <FunnelStep label="Concluíram" value={avaliacoesConcluidas} total={totalSessoes} color="#D4AF37" />
            <div className="mt-8 pt-6 border-t border-zinc-900">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase text-zinc-600">Abandonos</span>
                  <span className="text-red-900 font-bold">{abandonos}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, sub, icon }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 text-2xl opacity-10 group-hover:opacity-30 transition-opacity">{icon}</div>
    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
    <div className="text-4xl font-light text-white mb-2">{value}</div>
    <p className="text-[10px] text-zinc-600 italic">{sub}</p>
  </motion.div>
);

const FunnelStep = ({ label, value, total, color }: any) => (
  <div>
    <div className="flex justify-between text-[10px] uppercase tracking-tighter mb-2">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${total > 0 ? (value/total)*100 : 0}%` }}
        className="h-full bg-zinc-500"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);
