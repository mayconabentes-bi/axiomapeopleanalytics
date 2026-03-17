import { Cenario2030, MetricasAxioma, RecomendacaoForesight } from "../types/contratos";

// Re-export para manter retrocompatibilidade de imports existentes
export type { RecomendacaoForesight } from "../types/contratos";

/**
 * Motor de recomendações inspirado no Capítulo 4 do WEF: 'Strategies for the Future'.
 */
export function gerarPlanoAcao(cenario: Cenario2030, metricas: MetricasAxioma): RecomendacaoForesight[] {
    const recomendacoes: RecomendacaoForesight[] = [];

    switch (cenario) {
        case Cenario2030.SALTO_PRODUTIVIDADE:
            recomendacoes.push({
                pilar: "Ética e Governança de IA",
                acao: "Implementar comitê de supervisão algorítmica e auditoria de vieses.",
                justificativa: "Para manter o ciclo virtuoso, a confiança na tecnologia é o diferencial competitivo.",
                impactoEsperado: "Redução de riscos regulatórios e aumento da aceitação interna."
            });
            recomendacoes.push({
                pilar: "Reskilling Contínuo",
                acao: "Criar trilhas de aprendizagem adaptativas (Learning Agility).",
                justificativa: "Em cenários de alto salto, a obsolescência de habilidades ocorre em ciclos mais curtos.",
                impactoEsperado: "Manutenção da liderança tecnológica via talento humano especializado."
            });
            break;

        case Cenario2030.SOBRECARGA_AUTOMACAO:
            recomendacoes.push({
                pilar: "Requalificação Acelerada",
                acao: "Investimento massivo em programas de 'Bridge Skills'.",
                justificativa: "A automação está à frente do talento. É urgente fechar o gap para evitar perda de produtividade.",
                impactoEsperado: "Retenção de talentos e transição suave para processos automatizados."
            });
            break;

        case Cenario2030.VANTAGEM_HUMANA:
            recomendacoes.push({
                pilar: "Augmentação Tecnológica",
                acao: "Focar em ferramentas que ampliem a criatividade e empatia humana.",
                justificativa: "Sua força está nas pessoas. A tecnologia deve ser o exoesqueleto da intuição humana.",
                impactoEsperado: "Diferenciação via serviços de alto valor agregado."
            });
            break;

        case Cenario2030.SECA_PRODUTIVIDADE:
            recomendacoes.push({
                pilar: "Alfabetização Digital Básica",
                acao: "Reformular a infraestrutura de dados e capacitar a base operacional.",
                justificativa: "Sem o básico digital, a organização não consegue nem iniciar a jornada de produtividade.",
                impactoEsperado: "Criação de fundação para futuras integrações tecnológicas."
            });
            recomendacoes.push({
                pilar: "Visão de Liderança",
                acao: "Workshop executivo sobre o relatório WEF 2030.",
                justificativa: "A falta de direção estratégica é a principal barreira identificada nos seus scores.",
                impactoEsperado: "Alinhamento do board para destravar investimentos em inovação."
            });
            break;
    }

    return recomendacoes;
}
