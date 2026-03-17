import { ResultadoArquivo, EntradaHistorico, ResultadoDiagnostico } from '../types/contratos';

/**
 * Motor de processamento para a Lente XIV — Arquivo Vivo.
 * Gerencia o registro longitudinal no localStorage.
 */
export function processarLenteXIV(email: string, resultadoAtual: any): ResultadoArquivo {
  const STORAGE_KEY = `axioma_arquivo_${email.replace(/[^a-z0-9]/gi, '_')}`;
  
  let history: EntradaHistorico[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) history = JSON.parse(raw);
  } catch (e) {
    console.warn("Erro ao ler Arquivo Vivo:", e);
  }

  const matches = (resultadoAtual.scoresLentes || {});
  
  const novaEntrada: EntradaHistorico = {
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    ts: new Date().toISOString(),
    scores: matches,
    scenario: resultadoAtual.cenario || 'Indefinido',
    kegan: resultadoAtual.cog_title || 'Nível Indetectado',
    prime_score: resultadoAtual.scores?.[0]?.num || 0
  };

  // Evitar duplicatas no mesmo minuto para testes
  const ultima = history[history.length - 1];
  if (!ultima || (ultima.ts.substring(0, 16) !== novaEntrada.ts.substring(0, 16))) {
    history.push(novaEntrada);
  }

  // Manter últimas 24 entradas
  if (history.length > 24) history = history.slice(-24);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Erro ao salvar Arquivo Vivo:", e);
  }

  const isFirst = history.length <= 1;
  
  // Detecção de Inflexão (Alerta se score Prime caiu ou subiu muito)
  let inflexao = null;
  if (!isFirst) {
    const penultima = history[history.length - 2];
    const diff = Number(novaEntrada.prime_score) - Number(penultima.prime_score);
    if (Math.abs(diff) > 15) {
      inflexao = diff > 0 
        ? "Detectada aceleração de desenvolvimento vertical acima da média histórica." 
        : "Alerta de estresse cognitivo ou desaceleração abrupta detectada.";
    }
  }

  return {
    assess_num: history.length,
    is_first: isFirst,
    history: history,
    arquivo_body: isFirst 
      ? "Sua jornada no Axioma começa hoje. O Arquivo Vivo capturou seu estado basal. O verdadeiro valor desta lente surge na segunda avaliação, quando curvas de aprendizado se tornam visíveis."
      : "Sua trajetória longitudinal revela padrões de consistência que uma avaliação única não pode capturar. O Arquivo Vivo é o seu registro definitivo de evolução cognitiva.",
    arquivo_inflexao: inflexao
  };
}
