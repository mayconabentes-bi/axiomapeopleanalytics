import { MetricasAxioma } from "../types/contratos";
import { MATRIZ_IMPACTO_SETORIAL } from "../data/frameworkWEF";

/**
 * Motor de Benchmarking: Compara a organização com o ecossistema setorial.
 */

export interface ResultadoBenchmarking {
    percentilTecnologico: number;
    percentilHumanCapital: number;
    indiceVantagemCompetitiva: number;
    statusRelativo: string;
}

/**
 * Calcula o percentil setorial com base em médias históricas e do relatório 2025.
 */
export function calcularPercentilSetorial(metricas: MetricasAxioma, setor: string): ResultadoBenchmarking {
    // Médias hipotéticas baseadas nas tendências do relatório WEF por setor
    const mediasSetoriais: Record<string, { tech: number, human: number }> = {
        "Tecnologia e Comunicação": { tech: 5.5, human: 5.0 },
        "Manufatura e Produção": { tech: 4.8, human: 4.2 },
        "Serviços Financeiros": { tech: 5.2, human: 4.5 },
        "default": { tech: 4.0, human: 4.0 }
    };

    const media = mediasSetoriais[setor] || mediasSetoriais["default"];

    // Cálculo simplificado de percentil (0-100)
    const pTech = Math.min(Math.round((metricas.scoreTecnologico / media.tech) * 50), 99);
    const pHuman = Math.min(Math.round((metricas.scoreCapitalHumano / media.human) * 50), 99);

    // Índice de Vantagem Competitiva: Considera a sinergia acima da média do setor
    const matriz = MATRIZ_IMPACTO_SETORIAL.find(m => m.setor === setor);
    const bonusTailwinds = matriz ? matriz.ventosFavoraveis.length * 0.05 : 0;
    
    const vantagem = (metricas.scoreTecnologico + metricas.scoreCapitalHumano) / (media.tech + media.human) + bonusTailwinds;
    const percentilVantagem = Math.min(Math.round(vantagem * 50), 100);

    return {
        percentilTecnologico: pTech,
        percentilHumanCapital: pHuman,
        indiceVantagemCompetitiva: percentilVantagem,
        statusRelativo: percentilVantagem > 75 ? "Líder de Ecossistema" : percentilVantagem > 40 ? "Competidor Ativo" : "Risco de Obsolescência"
    };
}
