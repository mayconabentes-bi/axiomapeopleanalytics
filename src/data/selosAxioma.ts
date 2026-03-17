/**
 * Requisitos e definições para os selos de autoridade Axioma.
 * Baseado nas barreiras de competências do WEF (48% gap).
 */

export enum CategoriaSelo {
    SILVER = "Axioma Silver",
    GOLD = "Axioma Gold",
    DIAMOND = "Axioma Diamond"
}

export interface RequisitosCertificacao {
    categoria: CategoriaSelo;
    minSinergia: number; // Índice de sinergia mínimo (0.04 a 0.11)
    competenciasChave: string[];
    descricao: string;
}

export const REQUISITOS_SELOS: Record<CategoriaSelo, RequisitosCertificacao> = {
    [CategoriaSelo.SILVER]: {
        categoria: CategoriaSelo.SILVER,
        minSinergia: 0.04,
        competenciasChave: ["Literacia Digital Básica", "Adaptabilidade"],
        descricao: "Validado em Vantagem Humana. Demonstra prontidão inicial para a transição de 2030."
    },
    [CategoriaSelo.GOLD]: {
        categoria: CategoriaSelo.GOLD,
        minSinergia: 0.08,
        competenciasChave: ["Gestão de Fluxos Híbridos", "Pensamento Analítico"],
        descricao: "Sinergia em Ascensão. A organização está em trajetória acelerada de complementaridade."
    },
    [CategoriaSelo.DIAMOND]: {
        categoria: CategoriaSelo.DIAMOND,
        minSinergia: 0.105,
        competenciasChave: ["Orquestração de Ecossistemas IA", "Liderança Futurista"],
        descricao: "Salto de Produtividade Pleno. Excelência máxima na união entre tecnologia e talento humano."
    }
};
