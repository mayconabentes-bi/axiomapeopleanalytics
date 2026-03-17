import { MetricasAxioma } from "../types/contratos";

/**
 * Motor Preditivo: Projeta trajetórias e calcula riscos de obsolescência para 2030.
 */

/**
 * Projeta a probabilidade de atingir o 'Salto de Produtividade' nos próximos 2 anos.
 * 
 * @param metricas Scores atuais do usuário.
 * @param taxaReskilling Nível de investimento em requalificação (1-7).
 * @returns Probabilidade (0-1).
 */
export function projetarTrajetoria2030(metricas: MetricasAxioma, taxaReskilling: number): number {
    const base = (metricas.scoreTecnologico + metricas.scoreCapitalHumano) / 14;
    const impulso = taxaReskilling / 7;
    
    // Projeção baseada na tese de complementaridade
    const probabilidade = (base * 0.4) + (impulso * 0.6);
    
    return Math.min(Math.max(probabilidade, 0), 1);
}

/**
 * Score de Sobrevivência 2030.
 * Baseado no dado de que 44% das competências serão obsoletas até 2027.
 */
export function calcularScoreSobrevivencia(scoreCapitalHumano: number): { score: number, taxaObsolescencia: number } {
    const taxaBaseWEF = 0.44; // 44%
    
    // Quanto maior o capital humano, menor a taxa de obsolescência percebida
    // pois a capacidade de adaptação compensa a perda.
    const mitigacao = (scoreCapitalHumano / 7) * 0.3;
    const taxaReal = Math.max(taxaBaseWEF - mitigacao, 0.1);
    
    // Score de 0 a 100
    const score = Math.round((1 - taxaReal) * 100);
    
    return {
        score,
        taxaObsolescencia: Math.round(taxaReal * 100)
    };
}
