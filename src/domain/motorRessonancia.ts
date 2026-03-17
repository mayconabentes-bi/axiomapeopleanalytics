import { ResultadoRessonancia, PrecedenteHistorico } from '../types/contratos';

/**
 * Motor de Ressonância Civilizacional: Processamento de ciclos históricos e biográficos.
 * Baseado em Peter Turchin (Secular Cycles) e Strauss-Howe.
 */

export function processarLenteXI(respostas: Record<string, any>): ResultadoRessonancia {
    const civ1 = respostas['civ1'] || 2; // Default: Fragmentação
    const civ2 = respostas['civ2'] || 1; // Default: Contrafase
    const civ3 = respostas['civ3'] || 0; // Default: Arquiteto
    const civ4 = respostas['civ4'] || 50;

    const phases = [
        { name: 'Ascensão e integração', desc: 'Fase de alta coesão social e expansão institucional.' },
        { name: 'Pico e tensão acumulada', desc: 'O sistema atinge o limite de sua capacidade de integração.' },
        { name: 'Fragmentação e turbulência', desc: 'Desconfiança institucional e polarização acelerada.' },
        { name: 'Crise e ruptura ativa', desc: 'Reorganização sistêmica forçada pelo colapso das velhas estruturas.' }
    ];

    const resonances = [
        { type: 'Alinhamento expansivo', desc: 'Sua energia interna está sincronizada com a maré do mundo.' },
        { type: 'Contrafase construtiva', desc: 'Seu crescimento individual ocorre contra o fluxo macro, forjando resiliência única.' },
        { type: 'Amplificação pelo caos', desc: 'A volatilidade externa serve como catalisador para sua evolução.' },
        { type: 'Fricção estratégica', desc: 'Exige gestão deliberada para evitar o esgotamento por dessincronia.' }
    ];

    const archetypes = [
        { name: 'O Arquiteto', desc: 'Constrói estruturas que resistem ao tempo e ao caos.' },
        { name: 'O Sentinela', desc: 'Vê as tendências invisíveis e alerta o sistema.' },
        { name: 'A Ponte', desc: 'Une fragmentos de conhecimento e redes em colapso.' },
        { name: 'O Guardião', desc: 'Protege o capital cultural essencial durante a transição.' },
        { name: 'O Transformador', desc: 'Usa a energia da crise para criar novos modelos.' },
        { name: 'O Testemunho', desc: 'Transforma a experiência da transição em sabedoria legada.' }
    ];

    const precedents: Record<number, PrecedenteHistorico[]> = {
        0: [ // Ascensão
            { year: '1945-1970', name: 'Plano Marshall / Adenauer', what: 'Reconstrução sobre ruínas.', lesson: 'A ordem emerge da visão clara no início do ciclo.', key: true }
        ],
        2: [ // Fragmentação
            { year: '445 a.C.', name: 'Neemias em Jerusalém', what: 'Reconstruiu infraestrutura em meio à fragmentação.', lesson: 'O vácuo de poder é a janela para o Arquiteto.', key: true },
            { year: '1914-1929', name: 'Entre-Guerras', what: 'Transformação radical de paradigmas sociais.', lesson: 'A agilidade é a única defesa contra a fragmentação.', key: false }
        ],
        3: [ // Crise
            { year: '476 d.C.', name: 'Boécio e os Monges', what: 'Preservação de conhecimento no colapso de Roma.', lesson: 'No fim do ciclo, o foco é o legado.', key: true }
        ]
    };

    return {
        res_title: 'Mapeamento de Ressonância Civilizacional',
        res_intro: 'Sua trajetória não ocorre no vácuo, mas na interseção de ciclos históricos longos.',
        res_phase: phases[civ1].name,
        res_phase_desc: phases[civ1].desc,
        res_resonance_type: resonances[civ2].type,
        res_resonance_desc: resonances[civ2].desc,
        res_archetype: archetypes[civ3].name,
        res_archetype_desc: archetypes[civ3].desc,
        res_sync_score: Math.round(civ4),
        res_sync_desc: civ4 > 70 ? 'Alta sincronia com o Zeitgeist.' : (civ4 < 40 ? 'Descompasso estratégico identificado.' : 'Sincronia moderada com o contexto.'),
        res_analysis: `A fase de ${phases[civ1].name} apresenta desafios estruturais que você processa como ${archetypes[civ3].name}. Historicamente, este padrão de ${resonances[civ2].type} precedeu grandes saltos de influência individual em tempos de turbulência.`,
        res_precedents: precedents[civ1] || [],
        res_kairos: 'Esta é sua melhor janela para consolidar autoridade simbólica antes da transição de fase.',
        res_window: civ1 === 2 ? '18-24 meses' : '36-48 meses'
    };
}
