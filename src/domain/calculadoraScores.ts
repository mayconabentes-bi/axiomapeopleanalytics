import { ScoresLentes } from '../types/contratos';

/**
 * Motor de Scoring Determinístico Axioma Prime.
 * Transforma respostas brutas em scores de 0-100 baseados em frameworks acadêmicos.
 */

/**
 * Calcula os scores para todas as lentes respondidas.
 */
export function calcularScoresGerais(respostas: Record<string, any>): ScoresLentes {
  const scores: ScoresLentes = {};

  // Lente I: WEF (Cenários 2030)
  scores['wef'] = calcularWEF(respostas['wef1'], respostas['wef2']);

  // Lente II: Cognitiva
  scores['cogn'] = calcularCognitiva(respostas['cog1'], respostas['cog2']);

  // Lente III: Biográfico
  scores['bio'] = calcularBiografico(respostas['bio1'], respostas['bio2']);

  // Lente IV: Antifragilidade
  scores['anti'] = calcularAntifragilidade(respostas['anti1'], respostas['anti2']);

  // Lente V: Metabolismo Tech
  scores['tech'] = calcularTech(respostas['tech1'], respostas['tech2']);

  // Lente VI: Capital Social
  scores['social'] = calcularSocial(respostas['soc1'], respostas['soc2']);

  // Lente VII: Acuidade Sistêmica
  scores['sys'] = calcularSistemica(respostas['sys1'], respostas['sys2']);

  // Lente VIII: Kegan (Desenvolvimento Adulto)
  scores['kegan'] = calcularKegan(respostas['keg1'], respostas['keg2']);

  // Lente IX: Energia (Cronobiologia)
  scores['energy'] = calcularEnergia(respostas['ene1'], respostas['ene2']);

  // Lente X: Visão Prospectiva
  scores['fore'] = calcularForesight(respostas['fore1'], respostas['fore2']);

  // Lente XI: Ressonância Civilizacional
  scores['ressonancia'] = typeof respostas['civ4'] === 'number' ? respostas['civ4'] : 50;

  // Lente XII: Identidade Narrativa
  scores['narrativa'] = typeof respostas['narr3'] === 'number' ? respostas['narr3'] : 50;

  // Lente XIII: Sombra Estratégica
  scores['sombra'] = 100 - (typeof respostas['shad3'] === 'number' ? respostas['shad3'] : 50);

  return scores;
}

// --- Funções Auxiliares de Cálculo ---

function calcularWEF(q1: any, q2: any): number {
  const s1 = typeof q1 === 'number' ? q1 : 50;
  // q2: choice (0=Aceleração, 1=Crescimento, 2=Estabilidade, 3=Lacuna)
  const pesos = [100, 70, 40, 10];
  const s2 = (typeof q2 === 'number' && pesos[q2] !== undefined) ? pesos[q2] : 40;
  return Math.round((s1 + s2) / 2);
}

function calcularCognitiva(q1: any, q2: any): number {
  const s1 = typeof q1 === 'number' ? q1 : 50;
  // q2: matrix (qualquer escolha indica algum nível de acuidade)
  const s2 = q2 !== undefined ? 80 : 50;
  return Math.round((s1 * 0.6) + (s2 * 0.4));
}

function calcularBiografico(q1: any, q2: any): number {
  // q1: choice (construção, consolidação...) - todos são válidos, mas "Construção" e "Renovação" pontuam mais em "Impulso"
  const impulsos = [100, 80, 50, 90];
  const s1 = (typeof q1 === 'number' && impulsos[q1] !== undefined) ? impulsos[q1] : 70;
  // q2: freq (Raramente=20, ..., Consistentemente=100)
  const s2 = (typeof q2 === 'number') ? (q2 + 1) * 20 : 50;
  return Math.round((s1 + s2) / 2);
}

function calcularAntifragilidade(q1: any, q2: any): number {
  // q1: choice (Crescimento por ruptura=100, Resiliente=70, Lenta=40, Processando=20)
  const pesos = [100, 70, 40, 20];
  const s1 = (typeof q1 === 'number' && pesos[q1] !== undefined) ? pesos[q1] : 50;
  const s2 = typeof q2 === 'number' ? q2 : 50;
  return Math.round((s1 * 0.7) + (s2 * 0.3));
}

function calcularTech(q1: any, q2: any): number {
  // q1: matrix multi (cada item vale ~15 pontos, max 90)
  const s1 = Array.isArray(q1) ? Math.min(q1.length * 15, 90) : 0;
  const s2 = typeof q2 === 'number' ? q2 : 50;
  return Math.round((s1 + (s2 * 0.4)));
}

function calcularSocial(q1: any, q2: any): number {
  // q1: choice (Conector=100, Núcleo=80, Periférico=60, Construção=40)
  const pesos = [100, 80, 60, 40];
  const s1 = (typeof q1 === 'number' && pesos[q1] !== undefined) ? pesos[q1] : 50;
  const s2 = typeof q2 === 'number' ? q2 : 50;
  return Math.round((s1 + s2) / 2);
}

function calcularSistemica(q1: any, q2: any): number {
  // q1: choice (Direto=30, Reações=60, Loops=85, Evolução=100)
  const pesos = [30, 60, 85, 100];
  const s1 = (typeof q1 === 'number' && pesos[q1] !== undefined) ? pesos[q1] : 50;
  const s2 = (typeof q2 === 'number') ? (q2 + 1) * 20 : 50;
  return Math.round((s1 + s2) / 2);
}

function calcularKegan(q1: any, q2: any): number {
  // q1: choice (Selecionar=40, Síntese=70, Tensão=90, Contexto=100)
  const pesos = [40, 70, 90, 100];
  const s1 = (typeof q1 === 'number' && pesos[q1] !== undefined) ? pesos[q1] : 50;
  const s2 = typeof q2 === 'number' ? q2 : 50;
  return Math.round((s1 * 0.8) + (s2 * 0.2));
}

function calcularEnergia(q1: any, q2: any): number {
  // q1: matrix (pico sugerido) - puramente qualitativo para o gráfico, mas pontuamos presença de resposta
  const s1 = q1 !== undefined ? 80 : 0;
  // q2: choice (Intencional=100, Reativa=60, Déficit=30, Construção=70)
  const pesos = [100, 60, 30, 70];
  const s2 = (typeof q2 === 'number' && pesos[q2] !== undefined) ? pesos[q2] : 50;
  return Math.round((s1 * 0.3) + (s2 * 0.7));
}

function calcularForesight(q1: any, q2: any): number {
  const s1 = typeof q1 === 'number' ? q1 : 30;
  // q2: choice (Sistemática=100, Intuitiva=75, Reativa=50, Construção=30)
  const pesos = [100, 75, 50, 30];
  const s2 = (typeof q2 === 'number' && pesos[q2] !== undefined) ? pesos[q2] : 40;
  return Math.round((s1 + s2) / 2);
}
