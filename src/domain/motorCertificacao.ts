import { CategoriaSelo, REQUISITOS_SELOS } from "../data/selosAxioma";
import { calcularPotencialProdutividade } from "./motorDiagnostico";
import { MetricasAxioma } from "../types/contratos";

/**
 * Motor de Certificação: Valida a aptidão de elite do utilizador.
 */

export interface CertificadoGerado {
    selo: CategoriaSelo;
    indiceSinergia: number;
    valido: boolean;
    dataEmissao: string;
}

/**
 * Valida a aptidão e atribui a categoria de selo correspondente.
 */
export function validarAptidaoElite(metricas: MetricasAxioma): CertificadoGerado {
    const sinergia = calcularPotencialProdutividade(metricas.scoreTecnologico, metricas.scoreCapitalHumano);
    
    let selo = CategoriaSelo.SILVER;

    if (sinergia >= REQUISITOS_SELOS[CategoriaSelo.DIAMOND].minSinergia) {
        selo = CategoriaSelo.DIAMOND;
    } else if (sinergia >= REQUISITOS_SELOS[CategoriaSelo.GOLD].minSinergia) {
        selo = CategoriaSelo.GOLD;
    }

    return {
        selo,
        indiceSinergia: sinergia,
        valido: true,
        dataEmissao: new Date().toLocaleDateString('pt-BR')
    };
}
