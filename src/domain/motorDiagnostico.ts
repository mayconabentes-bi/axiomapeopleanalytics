import { Cenario2030, MetricasAxioma } from "../types/contratos";
import { TESE_COMPLEMENTARIDADE } from "../data/frameworkWEF";

/**
 * Motor lógico para classificação de cenários e cálculo de potencial.
 * Baseado no relatório 'Global Economic Futures: Productivity in 2030'.
 */

/**
 * Classifica a organização em um dos 4 cenários do WEF com base em seus scores.
 * 
 * Lógica:
 * - Scores >= 5 são considerados 'Altos'.
 * - Salto de Produtividade: Alta Tecnologia AND Alto Capital Humano.
 * - Sobrecarga de Automação: Alta Tecnologia AND Baixo Capital Humano.
 * - Vantagem Humana: Baixa Tecnologia AND Alto Capital Humano.
 * - Seca de Produtividade: Baixa Tecnologia AND Baixo Capital Humano.
 * 
 * @param scoreTecnologico Proporção de adoção e infraestrutura.
 * @param scoreCapitalHumano Proporção de habilidades e prontidão.
 * @returns Cenario2030 correspondente.
 */
export function classificarCenario(scoreTecnologico: number, scoreCapitalHumano: number): Cenario2030 {
    const altoTech = scoreTecnologico >= 5;
    const altoHumano = scoreCapitalHumano >= 5;

    if (altoTech && altoHumano) return Cenario2030.SALTO_PRODUTIVIDADE;
    if (altoTech && !altoHumano) return Cenario2030.SOBRECARGA_AUTOMACAO;
    if (!altoTech && altoHumano) return Cenario2030.VANTAGEM_HUMANA;
    return Cenario2030.SECA_PRODUTIVIDADE;
}

/**
 * Calcula o ganho projetado de produtividade baseado na tese de complementaridade.
 * 
 * Regra: Empresas que unem tecnologia e talento podem saltar de 4% para 11% de ganho.
 * 
 * @param scoreTecnologico Nível de maturidade tecnológica.
 * @param scoreCapitalHumano Nível de maturidade do capital humano.
 * @returns Multiplicador de ganho (ex: 0.11 para 11%).
 */
export function calcularPotencialProdutividade(scoreTecnologico: number, scoreCapitalHumano: number): number {
    const { ganhoBase, ganhoOtimo } = TESE_COMPLEMENTARIDADE;
    
    // Média ponderada simples para demonstração da curva de ganho
    const mediaMaturidade = (scoreTecnologico + scoreCapitalHumano) / 14; // Normaliza 1-7 para 0-1
    
    // Escala linear entre 4% e 11%
    const ganhoCalculado = ganhoBase + (mediaMaturidade * (ganhoOtimo - ganhoBase));
    
    return Math.min(Math.max(ganhoCalculado, ganhoBase), ganhoOtimo);
}

/**
 * Identifica obstáculos críticos baseados nas métricas fornecidas.
 * 
 * @param metricas Objeto contendo os scores de diagnóstico.
 * @returns Lista de strings detalhando as barreiras encontradas.
 */
export function identificarBarreiras(metricas: MetricasAxioma): string[] {
    const barreiras: string[] = [];

    // Barreira citada por 43% dos executivos
    if (metricas.indiceVisaoLideranca < 5) {
        barreiras.push("Falta de Visão Estratégica");
    }

    // Barreira de impacto de 48% (skills mismatch)
    if (metricas.scoreCapitalHumano < 4) {
        barreiras.push("Lacuna de Competências");
    }

    return barreiras;
}
