import { ConfigPlano, TierAxioma, TipoPlano } from '../types/contratos';

/**
 * Inventário oficial de planos Axioma Prime.
 * Baseado na estrutura de 7 tiers do legado para PF e PJ.
 */
export const LISTA_PLANOS: ConfigPlano[] = [
    // --- PESSOA FÍSICA ---
    {
        id: 'pf_free', type: 'pf', name: 'Diagnóstico Axioma', tier: 'free', price: 'R$ 0', priceSub: 'Gratuito sempre',
        tagline: 'Mapeamento essencial de cenário WEF.',
        lenses: 2, hasHidden: false, hasKegan: false, hasRoadmapFull: false, hasPDF: false, color: '#666',
        features: ['Lente I: Cenários WEF', 'Lente II: Arq. Cognitiva', 'Dashboard Básico'],
        locked: ['Antifragilidade', 'Capital Social', 'Foresight', 'PDF']
    },
    {
        id: 'pf_traj', type: 'pf', name: 'Trajetória Axioma', tier: 'pro', price: 'R$ 197', priceSub: 'Pagamento único',
        tagline: 'O próximo passo na sua carreira.',
        lenses: 6, hasHidden: false, hasKegan: false, hasRoadmapFull: true, hasPDF: true, color: '#378ADD',
        features: ['6 Lentes Iniciais', 'Roadmap de Carreira', 'PDF Analítico', 'Antifragilidade'],
        locked: ['Lente Kegan', 'Foresight Direct', 'Sinais Fracos']
    },
    {
        id: 'pf_elite', type: 'pf', name: 'Cúpula Axioma', tier: 'elite', price: 'R$ 497', priceSub: 'Pagamento único',
        tagline: 'Alta performance e desenvolvimento vertical.',
        lenses: 10, hasHidden: true, hasKegan: true, hasRoadmapFull: true, hasPDF: true, color: '#D4AF37',
        features: ['Todas as 10 Lentes', 'Análise Vertical (Kegan)', 'Foresight Deep Tech', 'Certificado Elite'],
        locked: []
    },
    // --- PESSOA JURÍDICA ---
    {
        id: 'pj_rec', type: 'pj', name: 'Reconhecimento', tier: 'free', price: 'R$ 0', priceSub: 'Para 10 colaboradores',
        tagline: 'Mapeie o gap de produtividade inicial.',
        lenses: 2, hasHidden: false, hasKegan: false, hasRoadmapFull: false, hasPDF: false, color: '#666',
        features: ['Matriz WEF Coletiva', 'Score de Sobrevivência', 'Mapeamento de Gap'],
        locked: ['Insights Individuais', 'Análise Setorial']
    },
    {
        id: 'pj_str', type: 'pj', name: 'Estrutura PJ', tier: 'pro', price: 'R$ 2.490', priceSub: '/ano (até 50 pessoas)',
        tagline: 'Governança de capital humano para o futuro.',
        lenses: 6, hasHidden: false, hasKegan: false, hasRoadmapFull: true, hasPDF: true, color: '#378ADD',
        features: ['Dashboard de Gestão', 'Antifragilidade de Time', 'Foresight Setorial'],
        locked: ['Kegan Leadership', 'Custom Export']
    },
    {
        id: 'pj_cmd', type: 'pj', name: 'Comando PJ', tier: 'elite', price: 'R$ 5.900', priceSub: '/ano (até 150 pessoas)',
        tagline: 'Sincronização total entre estratégia e talento.',
        lenses: 10, hasHidden: true, hasKegan: true, hasRoadmapFull: true, hasPDF: true, color: '#D4AF37',
        features: ['Inteligência de Cúpula', 'Mapping Cross-Domain', 'API Integration'],
        locked: []
    },
    {
        id: 'pj_sup', type: 'pj', name: 'Supremacia PJ', tier: 'enterprise', price: 'Sob consulta', priceSub: 'Enterprise Custom',
        tagline: 'A infraestrutura definitiva para líderes globais.',
        lenses: 10, hasHidden: true, hasKegan: true, hasRoadmapFull: true, hasPDF: true, color: '#fff',
        features: ['White Label', 'Consultoria de Foresight', 'Full Stack Intelligence'],
        locked: []
    }
];
