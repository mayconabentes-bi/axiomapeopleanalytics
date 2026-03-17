import { Cenario2030, ResultadoDiagnostico } from "../types/contratos";

export interface DadosEntrada {
    scoreTecnologia: number;    // 0 a 100
    scoreCapitalHumano: number; // 0 a 100
    numeroColaboradores: number;
    salarioMedio: number;
}

/**
 * 11.8 pontos percentuais de gap entre líderes e retardatárias.
 * Referência: Accenture/WEF Global Productivity Report 2025.
 */
const MAX_GAP_PRODUTIVIDADE = 0.118; 

/**
 * Executa o diagnóstico completo de produtividade.
 * 
 * @param dados Dados de entrada da organização
 * @returns Resultado detalhado do diagnóstico
 */
export function calcularDiagnosticoCompleto(dados: DadosEntrada): ResultadoDiagnostico {
    const { scoreTecnologia, scoreCapitalHumano, numeroColaboradores, salarioMedio } = dados;

    let cenario: Cenario2030;
    let multiplicadorProdutividade = 1.04; 
    let descricao = "";
    let strategicInsight = "";
    let color = "#D4AF37";

    if (scoreTecnologia > 50 && scoreCapitalHumano > 50) {
        cenario = Cenario2030.SALTO_PRODUTIVIDADE;
        multiplicadorProdutividade = 1.118; // Gap máximo WEF 2025
        descricao = "Côncavo de Sinergia: Alta tecnologia integrada ao máximo potencial humano. Convergência Frontier.";
        strategicInsight = "Este é o quadrante de 'Productivity Leap' do WEF 2025. Organizações aqui capturam 11.8% a mais de produtividade. Sua vantagem competitiva reside na capacidade de usar IA para amplificar (e não substituir) o julgamento humano e a criatividade.";
        color = "#00FFCC";
    } else if (scoreTecnologia > 50 && scoreCapitalHumano <= 50) {
        cenario = Cenario2030.SOBRECARGA_AUTOMACAO;
        descricao = "Winner-Takes-All: Tecnologia disruptiva com capital humano obsoleto ou subutilizado.";
        strategicInsight = "Cenário 'Automation Overload'. Alto risco de geoeconomia fragmentada. Embora a produtividade técnica suba, o engajamento e a resiliência organizacional caem. O WEF alerta que 44% das habilidades básicas mudarão; sem upskilling humano, sua infraestrutura tecnológica será um custo fixo sem retorno elástico.";
        color = "#FF3366";
    } else if (scoreTecnologia <= 50 && scoreCapitalHumano > 50) {
        cenario = Cenario2030.VANTAGEM_HUMANA;
        descricao = "Resiliência Orgânica: Talentos excepcionais operando com infraestrutura técnica legada ou insuficiente.";
        strategicInsight = "Cenário 'Human Advantage'. Você possui o ativo mais raro de 2025: capital humano resiliente. No entanto, o custo de oportunidade (C-Gap) é alto por falta de ferramentas. A convergência entre pensamento analítico e tecnologia é seu próximo passo obrigatório para não ser engolido por concorrentes 'Frontier'.";
        color = "#3399FF";
    } else {
        cenario = Cenario2030.SECA_PRODUTIVIDADE;
        descricao = "Estagnação Estrutural: Risco crítico de irrelevância competitiva por gap duplo (Tech + Talento).";
        strategicInsight = "Cenário 'Productivity Drought'. Este é o maior risco apontado pelo relatório de 2025. A inatividade aqui custa caro: perda de relevância setorial e fuga de talentos. É necessário um 'Big Bang' de transformação: adoção agressiva de IA e reestruturação total do desenvolvimento de pessoas.";
        color = "#666666";
    }

    const distanciaFrontier = ((100 - scoreTecnologia) + (100 - scoreCapitalHumano)) / 200;
    const percentualPerda = distanciaFrontier * MAX_GAP_PRODUTIVIDADE;
    const custoGapAnual = numeroColaboradores * salarioMedio * percentualPerda * 12;

    // Retornar objeto completo compatível com a interface de Alta Fidelidade
    return {
        id: `DIAG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        headline: `Cenário Identificado: ${cenario}`,
        subtext: descricao,
        
        cenario,
        multiplicadorProdutividade,
        custoGapAnual,
        percentualPerda,
        descricao,
        strategicInsight,

        scores: [
            { num: Math.round((scoreTecnologia + scoreCapitalHumano) / 2).toString(), label: "Índice Prime" },
            { num: scoreTecnologia.toString(), label: "Score Tech" },
            { num: scoreCapitalHumano.toString(), label: "Prontidão Humana" }
        ],

        wef_title: "Análise de Convergência WEF 2025/2030",
        wef_scenarios: [
            { name: Cenario2030.SALTO_PRODUTIVIDADE, pct: cenario === Cenario2030.SALTO_PRODUTIVIDADE ? 100 : 0, primary: cenario === Cenario2030.SALTO_PRODUTIVIDADE, cls: 'wq-c1' },
            { name: Cenario2030.SOBRECARGA_AUTOMACAO, pct: cenario === Cenario2030.SOBRECARGA_AUTOMACAO ? 100 : 0, primary: cenario === Cenario2030.SOBRECARGA_AUTOMACAO, cls: 'wq-c2' },
            { name: Cenario2030.VANTAGEM_HUMANA, pct: cenario === Cenario2030.VANTAGEM_HUMANA ? 100 : 0, primary: cenario === Cenario2030.VANTAGEM_HUMANA, cls: 'wq-c3' },
            { name: Cenario2030.SECA_PRODUTIVIDADE, pct: cenario === Cenario2030.SECA_PRODUTIVIDADE ? 100 : 0, primary: cenario === Cenario2030.SECA_PRODUTIVIDADE, cls: 'wq-c4' }
        ],
        wef_body: `<p>${strategicInsight}</p>`,
        
        dims_overline: "Métricas de Capital Frontier",
        dims_title: "Análise Dimensional Estratégica",
        dimensions: [
            { name: "Sinergia IA-Humana", score: Math.round((scoreTecnologia + scoreCapitalHumano) / 2), tier: scoreTecnologia > 70 ? "Frontier" : "Emergente" },
            { name: "Resiliência Adaptativa", score: scoreCapitalHumano, tier: scoreCapitalHumano > 80 ? "Elite" : "Standard" }
        ],
        dims_body: `<p>Com base nos estudos WEF 2025, sua organização apresenta um score de sinergia de ${Math.round((scoreTecnologia + scoreCapitalHumano) / 2)}%. Organizações líderes buscam scores acima de 85% para mitigar a geoeconomia fragmentada.</p>`,
        
        cog_title: "Arquitetura Cognitiva 2030",
        cog_body: `<p>A análise detectou um padrão de pensamento ${(scoreCapitalHumano > 70 ? "convergente e estratégico" : "operacional")}. Para o cenário de 2030, a prioridade deve ser o desenvolvimento de curiosidade e aprendizado ao longo da vida (lifelong learning).</p>`,
        
        has_hidden: scoreCapitalHumano > 80,
        bio_title: "Impulso Biográfico e Cronobiologia",
        bio_body: `<p>Sua fase biográfica permite uma ${scoreCapitalHumano > 60 ? "janela de expansão de capital simbólico" : "fase de consolidação técnica"}. Alinhar o trabalho aos seus ritmos de energia pode elevar sua performance individual em até 22% (Deloitte 2025).</p>`,
        
        road_title: "Roadmap Estratégico Axioma",
        road_intro: `<p>Passos mandatórios para capturar os ${Math.round(MAX_GAP_PRODUTIVIDADE * 100)}% de produtividade adicional previstos pela Accenture/WEF.</p>`,
        roadmap: [
            { horizon: "Curto Prazo (90 dias)", title: "Alfabetização em IA", body: "Desenvolver fluência tecnológica em todas as camadas de liderança.", kpi: "Score Tech +15%", key: true },
            { horizon: "Médio Prazo (1 ano)", title: "Rebranding de Talentos", body: "Reequipar a força de trabalho para os 170 milhões de novos papéis projetados até 2030.", kpi: "Retenção de Elite", key: false }
        ],
        
        warn_title: "Análise de Risco de Inação",
        warn_alert: `O C-Gap (Custo de Inação) é de R$ ${Math.round(custoGapAnual).toLocaleString()} anuais.`,
        warn_body: "<p>Este valor representa a produtividade que sua empresa está deixando de faturar por não integrar talendo e tech no nível ótimo exigido pelo mercado atual.</p>"
    };
}
/**
 * Analisa a exposição setorial com base no cenário e matriz do WEF.
 */
export function analisarExposicao(cenario: Cenario2030, matriz: any) {
    const nivelExposicao = cenario === Cenario2030.SALTO_PRODUTIVIDADE ? 0.85 : 0.45;
    return {
        nivelExposicao,
        propulsoresAtivos: matriz.ventosFavoraveis || [],
        detratoresAtivos: matriz.ventosContrarios || []
    };
}
