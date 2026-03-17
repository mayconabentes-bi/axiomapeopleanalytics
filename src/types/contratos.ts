/**
 * Definem os cenários projetados pelo World Economic Forum para a produtividade em 2030.
 */
export enum Cenario2030 {
    SALTO_PRODUTIVIDADE = 'Productivity Leap',
    SOBRECARGA_AUTOMACAO = 'Automation Overload',
    VANTAGEM_HUMANA = 'Human Advantage',
    SECA_PRODUTIVIDADE = 'Productivity Drought'
}

/**
 * Principais métricas utilizadas para o diagnóstico Axioma.
 */
export interface MetricasAxioma {
    /** Pontuação tecnológica (0 a 100) */
    scoreTecnologico: number;
    /** Pontuação de capital humano (0 a 100) */
    scoreCapitalHumano: number;
    /** Índice de visão de liderança (0 a 100) */
    indiceVisaoLideranca: number;
}

/**
 * Resultado completo do motor analítico Axioma Prime.
 * Combina métricas determinísticas e dados para renderização de luxo.
 */
export interface ResultadoDiagnostico {
    id: string;
    timestamp: string;
    headline: string;
    subtext: string;
    
    // Métricas Core (ROI e Cenário)
    cenario: Cenario2030;
    multiplicadorProdutividade: number;
    custoGapAnual: number;
    percentualPerda: number;
    descricao: string; // Sumário analítico para teasers
    
    scores: { num: string; label: string }[];
    scoresLentes?: ScoresLentes; 

    // Estrutura para Visualizações de Luxo
    wef_title: string;
    wef_scenarios: {
        name: string;
        pct: number;
        primary: boolean;
        cls: string;
    }[];
    wef_body: string;
    
    dims_overline: string;
    dims_title: string;
    dimensions: {
        name: string;
        score: number;
        tier: string;
    }[];
    dims_body: string;
    
    cog_title: string;
    cog_body: string;
    
    has_hidden: boolean;
    hidden_title?: string | null;
    hidden_insight?: string | null;
    hidden_body?: string | null;
    
    bio_title: string;
    bio_body: string;
    
    road_title: string;
    road_intro: string;
    roadmap: {
        horizon: string;
        title: string;
        body: string;
        kpi: string;
        key: boolean;
        locked?: boolean;
    }[];
    
    warn_title: string;
    warn_alert: string;
    warn_body: string;

    // Lente XI (Elite/Enterprise)
    ressonancia?: ResultadoRessonancia;

    // Lente XII (Elite/Enterprise)
    narrativa?: ResultadoNarrativa;

    // Lente XIII (Elite/Enterprise)
    sombra?: ResultadoSombra;

    // Lente XIV (Elite/Enterprise)
    arquivo?: ResultadoArquivo;

    // Metadados Biográficos
    idade?: number;
    strategicInsight?: string;
    leadData?: LeadData;
}

/**
 * Dados de captura para inteligência de mercado e estatística.
 */
export interface LeadData {
    nome: string;
    email: string;
    cargo: string;
    empresa: string;
    equipe: string;
}

/**
 * Mapeia os fatores que impulsionam ou dificultam a produtividade por setor.
 */
export interface MatrizImpacto {
    setor: string;
    ventosFavoraveis: string[]; // Tailwinds
    ventosContrarios: string[]; // Headwinds
}

/**
 * Perfil biográfico baseado na Teoria dos Senténios.
 * Define o foco estratégico de cada fase da vida profissional.
 */
export interface PerfilBiografico {
    sentenio: string;
    foco: string;
    alertaCenario: Cenario2030;
    recomendacao: string;
}

/**
 * Recomendação estratégica gerada pelo Motor de Foresight.
 * Inspirado no Capítulo 4 do WEF: 'Strategies for the Future'.
 */
export interface RecomendacaoForesight {
    pilar: string;
    acao: string;
    justificativa: string;
    impactoEsperado: string;
}

// --- NOVOS CONTRATOS PARA ALTA FIDELIDADE ---

/** Tipos de input suportados nas lentes de avaliação */
export type TipoPergunta = 'spec' | 'choice' | 'matrix' | 'freq' | 'txt' | 'range';

/** Opção dentro de uma pergunta do tipo choice, matrix ou freq */
export interface OpcaoPergunta {
    t: string;       // Título/Label
    d?: string;      // Descrição/Detalhe (opcional)
    valor?: number;  // Valor numérico associado (opcional)
}

/**
 * Scores calculados localmente para cada lente.
 */
export interface ScoresLentes {
    [lenteId: string]: number; // Score de 0 a 100
}

/** Definição de uma pergunta dentro de uma lente */
export interface PerguntaAxioma {
    id: string;
    type: TipoPergunta;
    text: string;
    sub?: string;
    opts?: OpcaoPergunta[];
    cols?: number;      // Para layouts de grid/matrix
    multi?: boolean;    // Se permite múltiplas seleções
    left?: string;      // Label esquerda para spectrum/range
    right?: string;     // Label direita para spectrum/range
    val?: number;       // Valor default
    ph?: string;        // Placeholder para textos
}

/** Definição de uma Lente de avaliação (ex: WEF, Taleb, Kegan) */
export interface LenteAxioma {
    id: string;
    num: string;        // Algarismo romano (I, II, IX...)
    name: string;
    sub: string;
    minPlan: 1 | 2 | 3; // Nível de acesso (free=1, pro=2, elite=3)
    title: string;
    desc: string;
    fw: string;         // Framework acadêmico de referência
    questions: PerguntaAxioma[];
}

/** Estrutura de precificação e gating por plano */
export type TierAxioma = 'free' | 'pro' | 'pro2' | 'elite' | 'enterprise';
export type TipoPlano = 'pf' | 'pj';

export interface ConfigPlano {
    id: string;
    type: TipoPlano;
    name: string;
    tier: TierAxioma;
    price: string;
    priceSub: string;
    tagline: string;
    lenses: number;
    features: string[];
    locked: string[];
    hasHidden: boolean;
    hasKegan: boolean;
    hasRoadmapFull: boolean;
    hasPDF: boolean;
    color: string;
}

// --- VISUALIZAÇÕES DE LUXO ---

/** Dados para renderizar o Arco de Sentênios */
export interface DadosBioArc {
    cx: number;
    cy: number;
    fase: 'Afirmação' | 'Consolidação' | 'Liderança';
    angulo: number;
}

/** Dados para o Gráfico de Ondas Ultradianas */
export interface DadosOndas {
    path: string;       // SVG path d attribute
    picoX: number;
    picoTexto: string;
    agoraX: number;
}

/** Dados para o Gauge de Antifragilidade */
export interface DadosTaleb {
    angulo: number;
    status: 'Frágil' | 'Robusto' | 'Antifrágil';
    convexidade: string;
}

// --- LENTE XI: RESSONÂNCIA CIVILIZACIONAL ---

export interface PrecedenteHistorico {
    year: string;
    name: string;
    what: string;
    lesson: string;
    key: boolean;
}

export interface ResultadoRessonancia {
    res_title: string;
    res_intro: string;
    res_phase: string;
    res_phase_desc: string;
    res_resonance_type: string;
    res_resonance_desc: string;
    res_archetype: string;
    res_archetype_desc: string;
    res_sync_score: number;
    res_sync_desc: string;
    res_analysis: string;
    res_precedents: PrecedenteHistorico[];
    res_kairos: string;
    res_window: string;
}
// --- LENTE XII: IDENTIDADE NARRATIVA ---

export interface ArcoNarrativo {
    name: string;
    score: number;
    desc: string;
    dominant: boolean;
}

export interface DimensaoNarrativa {
    name: string;
    score: number;
    tier: string;
}

export interface ResultadoNarrativa {
    narr_title: string;
    narr_intro: string;
    narr_arcs: ArcoNarrativo[];
    narr_arc_analysis: string;
    narr_story_summary?: string;
    narr_dimensions: DimensaoNarrativa[];
    narr_body: string;
}

// --- LENTE XIII: SOMBRA ESTRATÉGICA ---

export interface PontoCego {
    type: 'critical' | 'moderate' | 'golden';
    title: string;
    desc: string;
    evidence?: string;
}

export interface ResultadoSombra {
    shadow_title: string;
    shadow_warning: string;
    shadow_intro: string;
    shadow_blindspots: PontoCego[];
    shadow_body: string;
}

// --- LENTE XIV: ARQUIVO VIVO ---

export interface EntradaHistorico {
    date: string;
    ts: string;
    scores: { [lenteId: string]: number };
    scenario: string;
    kegan: string;
    prime_score: number | string;
}

export interface ResultadoArquivo {
    assess_num: number;
    is_first: boolean;
    history: EntradaHistorico[];
    arquivo_body: string;
    arquivo_inflexao?: string | null;
}
