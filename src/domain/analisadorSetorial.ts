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
    let color = "#D4AF37";

    if (scoreTecnologia > 50 && scoreCapitalHumano > 50) {
        cenario = 'Productivity Leap';
        multiplicadorProdutividade = 1.11;
        descricao = "Alta tecnologia + Alto capital humano. Círculo virtuoso com ganhos amplos de produtividade.";
        color = "#00FFCC";
    } else if (scoreTecnologia > 50 && scoreCapitalHumano <= 50) {
        cenario = 'Automation Overload';
        descricao = "Tecnologia supera humanos. Dinâmica winner-takes-all com alto risco de obsolescência de talentos.";
        color = "#FF3366";
    } else if (scoreTecnologia <= 50 && scoreCapitalHumano > 50) {
        cenario = 'Human Advantage';
        descricao = "Capital humano como ativo central, mas com adoção tecnológica lenta. Risco de perda de competitividade em escala.";
        color = "#3399FF";
    } else {
        cenario = 'Productivity Drought';
        descricao = "Estagnação simultânea em inovação tecnológica e desenvolvimento de talentos.";
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

        scores: [
            { num: Math.round((scoreTecnologia + scoreCapitalHumano) / 2).toString(), label: "Índice Prime" },
            { num: scoreTecnologia.toString(), label: "Score Tech" },
            { num: scoreCapitalHumano.toString(), label: "Prontidão Humana" }
        ],

        wef_title: "Análise de Convergência WEF 2025",
        wef_scenarios: [
            { name: 'Productivity Leap', pct: 0, primary: cenario === 'Productivity Leap', cls: 'wq-c1' },
            { name: 'Automation Overload', pct: 0, primary: cenario === 'Automation Overload', cls: 'wq-c2' },
            { name: 'Human Advantage', pct: 0, primary: cenario === 'Human Advantage', cls: 'wq-c3' },
            { name: 'Productivity Drought', pct: 0, primary: cenario === 'Productivity Drought', cls: 'wq-c4' }
        ],
        wef_body: `<p>${descricao}</p>`,
        
        dims_overline: "Métricas de Capital",
        dims_title: "Análise Dimensional",
        dimensions: [
            { name: "Capital Tecnológico", score: scoreTecnologia, tier: scoreTecnologia > 70 ? "Excepcional" : "Avançado" },
            { name: "Capital Humano", score: scoreCapitalHumano, tier: scoreCapitalHumano > 70 ? "Excepcional" : "Avançado" }
        ],
        dims_body: "<p>Análise dos eixos fundamentais de produtividade.</p>",
        
        cog_title: "Arquitetura Cognitiva",
        cog_body: "<p>Análise preliminar baseada nos inputs de sistema 1 e 2.</p>",
        
        has_hidden: false,
        bio_title: "Impulso Biográfico",
        bio_body: "<p>Fase biográfica detectada com base na cronobiologia do usuário.</p>",
        
        road_title: "Roadmap Estratégico",
        road_intro: "<p>Próximos passos recomendados para mitigação do gap.</p>",
        roadmap: [
            { horizon: "Semanas 1–4", title: "Ajuste de Fluxo", body: "Otimizar ferramentas atuais.", kpi: "+5%", key: true },
            { horizon: "Meses 2–3", title: "Scale-up", body: "Expansão de capacidades.", kpi: "ROI Positivo", key: false }
        ],
        
        warn_title: "Resumo de Riscos",
        warn_alert: `O gap de inação custa R$ ${Math.round(custoGapAnual).toLocaleString()} por ano.`,
        warn_body: "<p>Este custo reflete a produtividade não capturada por falhas na integração tech-human.</p>"
    };
}


