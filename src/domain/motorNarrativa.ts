import { ResultadoNarrativa, ArcoNarrativo, DimensaoNarrativa } from '../types/contratos';

/**
 * Motor de processamento para a Lente XII — Identidade Narrativa (McAdams).
 * Analisa a estrutura das histórias contadas pelo usuário.
 */
export function processarLenteXII(respostas: any): ResultadoNarrativa {
  const narr1 = respostas['narr1'] || ''; // Texto do evento
  const narr2 = respostas['narr2'];      // Escolha do padrão (0: Redenção, 1: Crescimento, 2: Contaminação, 3: Sem narrativa)
  const narr3 = respostas['narr3'] || 50; // Spec Agente vs Reativo
  const narr4 = respostas['narr4'];      // Antagonista

  // 1. Análise de Arcos (Simulada via respostas e keywords simples)
  const arcs: ArcoNarrativo[] = [
    { 
      name: 'Arco de Redenção', 
      score: narr2 === 0 ? 85 : narr2 === 1 ? 60 : 30,
      desc: 'Capacidade de converter dor em sabedoria.',
      dominant: narr2 === 0
    },
    { 
      name: 'Arco de Contaminação', 
      score: narr2 === 2 ? 80 : 20,
      desc: 'Tendência de ver o positivo sendo corrompido.',
      dominant: narr2 === 2
    },
    { 
      name: 'Agência Narrativa', 
      score: narr3,
      desc: 'O quanto você se vê como autor da própria história.',
      dominant: narr3 >= 70
    },
    { 
      name: 'Densidade de Significado', 
      score: narr1.length > 200 ? 90 : narr1.length > 100 ? 65 : 40,
      desc: 'Complexidade e reflexão na narrativa.',
      dominant: narr1.length > 150
    }
  ];

  // 2. Dimensões Analíticas
  const dimensions: DimensaoNarrativa[] = [
    { 
      name: 'Protagonismo', 
      score: narr3, 
      tier: narr3 > 80 ? 'Herói consciente' : narr3 > 60 ? 'Protagonista' : 'Agente reativo' 
    },
    { 
      name: 'Resiliência Narrativa', 
      score: (arcs[0].score + arcs[2].score) / 2, 
      tier: narr2 === 0 ? 'Excepcional' : 'Competente' 
    },
    { 
      name: 'Coerência de Arco', 
      score: narr4 !== undefined ? 75 : 50, 
      tier: 'Em desenvolvimento' 
    }
  ];

  // 3. Resumo da História (Padrão detectado)
  const storySummary = narr2 === 0 
    ? "Sua narrativa é marcada por um forte vetor de redenção, onde crises são vistas como portais de evolução."
    : narr2 === 2 
    ? "Há sinais de contaminação narrativa, indicando que eventos negativos passados ainda drenam agência do presente."
    : "Sua história profissional está em fase de integração, com foco em crescimento gradual e funcional.";

  return {
    narr_title: "A Arquitetura da sua Identidade Narrativa",
    narr_intro: "Segundo Dan McAdams, a história que você conta sobre si mesmo não apenas descreve sua vida — ela a molda. Analisamos os arcos de sentido que você utiliza para processar sua trajetória.",
    narr_arcs: arcs,
    narr_arc_analysis: "Seu padrão dominante revela como você projeta o futuro baseado na integração do passado. Agentes com alta agência narrativa tendem a performar melhor em ambientes de alta incerteza.",
    narr_story_summary: storySummary,
    narr_dimensions: dimensions,
    narr_body: "A identidade narrativa é o preditor mais confiável de resiliência a longo prazo. Indivíduos que constroem 'arcos de redenção' conseguem manter a integridade cognitiva durante colapsos sistêmicos ou crises organizacionais profundas."
  };
}
