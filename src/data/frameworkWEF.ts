import { Cenario2030, MatrizImpacto } from "../types/contratos";

/**
 * Tese de Complementaridade:
 * Empresas que unem tecnologia e talento podem saltar de 4% para 11% de ganho de produtividade.
 */
export const TESE_COMPLEMENTARIDADE = {
    ganhoBase: 0.04,
    ganhoOtimo: 0.11,
    fatorDiferencial: "União de Tecnologia e Talento"
};

/**
 * As 12 indústrias e sua exposição aos cenários WEF 2030.
 */
export const INDUSTRIAS_WEF = [
    "Serviços Financeiros",
    "Tecnologia e Comunicação",
    "Manufatura e Produção",
    "Saúde e Cuidados",
    "Energia e Utilidades",
    "Varejo e Consumo",
    "Transporte e Logística",
    "Educação e Treinamento",
    "Agricultura e Alimentos",
    "Construção e Infraestrutura",
    "Serviços Profissionais",
    "Governo e Público"
];

/**
 * Gatilhos que definem cada cenário do relatório 'Global Economic Futures'.
 */
export const GATILHOS_CENARIO: Record<Cenario2030, string[]> = {
    'Productivity Leap': [
        "Investimento robusto em P&D (R&D spending)",
        "Integração bem-sucedida de IA e talento humano",
        "Infraestrutura digital globalizada"
    ],
    'Automation Overload': [
        "Deslocamento rápido de mão de obra",
        "Falta de políticas de requalificação (reskilling)",
        "Aumento da desigualdade produtiva"
    ],
    'Human Advantage': [
        "Valorização de habilidades socioemocionais",
        "Foco em serviços centrados no humano",
        "Regulação ética da tecnologia"
    ],
    'Productivity Drought': [
        "Incompatibilidade de habilidades (skills mismatch)",
        "Baixo investimento em inovação",
        "Envelhecimento da força de trabalho sem suporte tecnológico"
    ]
};

/**
 * Exemplo de Matriz de Impacto por setor (baseado no relatório).
 */
export const MATRIZ_IMPACTO_SETORIAL: MatrizImpacto[] = [
    {
        setor: "Tecnologia e Comunicação",
        ventosFavoraveis: ["IA Generativa", "Computação em Nuvem"],
        ventosContrarios: ["Escassez de talentos especializados", "Custo de infraestrutura"]
    },
    {
        setor: "Serviços Financeiros",
        ventosFavoraveis: ["Automação de processos", "Blockchain"],
        ventosContrarios: ["Regulação rigorosa", "Riscos de cibersegurança"]
    }
    // Outros setores seriam mapeados aqui conforme a evolução do sistema
];
