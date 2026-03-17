import { ResultadoSombra, PontoCego } from '../types/contratos';

/**
 * Motor de processamento para a Lente XIII — Sombra Estratégica (Jung/Hollis).
 * Análise de pontos cegos e projeções baseados em respostas projetivas.
 */
export function processarLenteXIII(respostas: any): ResultadoSombra {
  const shad1 = respostas['shad1'] || ''; // Comportamento incomoda
  const shad2 = respostas['shad2'];      // Verdade desconfortável
  const shad3 = respostas['shad3'] || 50; // Spec Autocrítica vs Autocompaixão
  const shad4 = respostas['shad4'] || ''; // Ponto cego por outros

  // 1. Identificação de Pontos Cegos
  const blindspots: PontoCego[] = [];

  // Ponto Cego Crítico (baseado no incomodo desproporcional - Projeção)
  if (shad1.length > 10) {
    blindspots.push({
      type: 'critical',
      title: 'Projeção de Incompetência ou Oposição',
      desc: 'O incômodo intenso com terceiros indica uma qualidade negada em si mesmo que está sendo projetada externamente.',
      evidence: shad1.substring(0, 60) + "..."
    });
  }

  // Ponto Cego Moderado (baseado na autocrítica)
  if (shad3 < 40) {
    blindspots.push({
      type: 'moderate',
      title: 'Hiper-Vigilância Punitiva',
      desc: 'Sua sombra contém um "Juiz Interno" excessivamente rígido que sabota a experimentação por medo do erro.',
      evidence: "Padrão de autocrítica identificado como reflexo imediato à falha."
    });
  }

  // Sombra Dourada (Potencial não assumido)
  if (shad2 === 1 || shad4.length > 20) {
    blindspots.push({
      type: 'golden',
      title: 'Capacidade Reprimida de Impacto',
      desc: 'Qualidades que você admira mas julga inacessíveis são, na verdade, potenciais latentes na sua sombra.',
      evidence: shad4 ? `Detectado via perspectiva de terceiros: ${shad4.substring(0, 50)}` : "Admiração projetada como inacessibilidade."
    });
  }

  return {
    shadow_title: "O diagnóstico da sua Sombra Estratégica",
    shadow_warning: "Esta análise não é um julgamento moral. A sombra contém 60-70% do motor de decisão inconsciente. Integrá-la é o passo definitivo para a maestria executiva.",
    shadow_intro: "Baseado no framework de Carl Jung e James Hollis, identificamos padrões de comportamento que operam no seu 'ponto cego' estratégico.",
    shadow_blindspots: blindspots,
    shadow_body: "Integrar a sombra significa retirar a energia que hoje é gasta em negação e projeção, convertendo-a em clareza estratégica. Líderes que conhecem sua própria sombra são os menos manipuláveis e os mais antifrágeis diante de crises éticas ou operacionais."
  };
}
