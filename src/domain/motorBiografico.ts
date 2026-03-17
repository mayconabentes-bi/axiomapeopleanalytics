import { Cenario2030, PerfilBiografico } from "../types/contratos";

// Re-export para manter retrocompatibilidade de imports existentes
export type { PerfilBiografico } from "../types/contratos";

/**
 * Motor Biográfico: Implementa a lógica dos ritmos biográficos (Senténios)
 * integrados aos desafios de produtividade 2030.
 */
export function analisarSentenioProfissional(idade: number): PerfilBiografico {
    if (idade >= 21 && idade < 28) {
        return {
            sentenio: "21-28 anos (Especialização)",
            foco: "Base tecnológica e literacia digital",
            alertaCenario: Cenario2030.SECA_PRODUTIVIDADE,
            recomendacao: "Foque em construir uma fundação técnica robusta. Evite a estagnação digital inicial."
        };
    } else if (idade >= 28 && idade < 35) {
        return {
            sentenio: "28-35 anos (Organização / Crise de Sentido)",
            foco: "Busca pela Vantagem Humana",
            alertaCenario: Cenario2030.SOBRECARGA_AUTOMACAO,
            recomendacao: "Risco alto de ser substituído por automação. Desenvolva habilidades puramente humanas e sociais."
        };
    } else if (idade >= 35 && idade < 42) {
        return {
            sentenio: "35-42 anos (Liderança Autêntica)",
            foco: "Superação de Barreiras de Gestão",
            alertaCenario: Cenario2030.VANTAGEM_HUMANA,
            recomendacao: "A falta de visão (43%) é o seu maior inimigo. Torne-se um líder que conecta tech e pessoas."
        };
    } else if (idade >= 42 && idade < 49) {
        return {
            sentenio: "42-49 anos (Sabedoria / Altruísmo)",
            foco: "Salto de Produtividade Sinergético",
            alertaCenario: Cenario2030.SALTO_PRODUTIVIDADE,
            recomendacao: "Momento ideal para mentoria. Sua sabedoria deve catalisar o salto tecnológico da equipe."
        };
    }

    return {
        sentenio: "Fase de Excelência / Plenitude",
        foco: "Consolidação Axiomática",
        alertaCenario: Cenario2030.SALTO_PRODUTIVIDADE,
        recomendacao: "Aplique sua experiência para equilibrar os ritmos da organização."
    };
}
