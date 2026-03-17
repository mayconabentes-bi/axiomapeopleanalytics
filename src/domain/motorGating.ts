import { Cenario2030, ConfigPlano } from "../types/contratos";
import { LISTA_PLANOS } from "../config/assinaturas";

/**
 * Motor de Gating: Lógica pura de permissões e posicionamento visual.
 * 
 * Agora utiliza o inventário centralizado de planos (LISTA_PLANOS)
 * para tomar decisões baseadas em propriedades reais, não strings fixas.
 */

/**
 * Busca a configuração completa de um plano pelo ID.
 */
export function getPlanoPorId(id: string | null): ConfigPlano | undefined {
    return LISTA_PLANOS.find(p => p.id === id);
}

// ════════════════════════════════════════
// FUNÇÕES DE PERMISSÃO (Gating)
// ════════════════════════════════════════

/**
 * Verifica se o plano permite acesso à análise de ROI e Custo de Inação.
 */
export function verificarAcessoROI(planoId: string | null): boolean {
    const plano = getPlanoPorId(planoId);
    return plano ? (plano.tier === 'elite' || plano.tier === 'enterprise') : false;
}

/**
 * Verifica se o plano permite acesso ao Simulador de Impacto.
 */
export function verificarAcessoSimulador(planoId: string | null): boolean {
    const plano = getPlanoPorId(planoId);
    return plano ? (plano.tier === 'pro' || plano.tier === 'elite' || plano.tier === 'enterprise') : false;
}

/**
 * Verifica se o plano permite a exportação do relatório em PDF.
 */
export function verificarAcessoPDF(planoId: string | null): boolean {
    const plano = getPlanoPorId(planoId);
    return plano ? plano.hasPDF : false;
}

/**
 * Verifica se o plano tem acesso ao Roadmap completo.
 */
export function verificarAcessoRoadmap(planoId: string | null): boolean {
    const plano = getPlanoPorId(planoId);
    return plano ? plano.hasRoadmapFull : false;
}

/**
 * Verifica se o plano permite ver o insight "oculto" (Sincronicidade).
 */
export function verificarAcessoHidden(planoId: string | null): boolean {
    const plano = getPlanoPorId(planoId);
    return plano ? plano.hasHidden : false;
}

// ════════════════════════════════════════
// POSICIONAMENTO NA MATRIZ WEF
// ════════════════════════════════════════

/**
 * Retorna as coordenadas (x, y) do quadrante correspondente ao cenário WEF.
 */
export function getCoordenadasQuadrante(cenario: Cenario2030): { x: string; y: string } {
    switch (cenario) {
        case 'Productivity Leap':
            return { x: '75%', y: '25%' };
        case 'Automation Overload':
            return { x: '75%', y: '75%' };
        case 'Human Advantage':
            return { x: '25%', y: '25%' };
        case 'Productivity Drought':
            return { x: '25%', y: '75%' };
        default:
            return { x: '50%', y: '50%' };
    }
}
