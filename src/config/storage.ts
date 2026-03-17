import { MetricasAxioma, ResultadoDiagnostico } from "../types/contratos";

const STORAGE_KEY = "@axioma:resultado_diagnostico";

/**
 * Persistência local para resultados do Axioma.
 * Garante privacidade e agilidade no carregamento de perfis.
 */

export const storage = {
    /**
     * Salva o diagnóstico completo no localStorage.
     */
    salvarResultado: (resultado: ResultadoDiagnostico, metricas: MetricasAxioma, setor: string) => {
        try {
            const data = JSON.stringify({ resultado, metricas, setor, timestamp: new Date().toISOString() });
            localStorage.setItem(STORAGE_KEY, data);
        } catch (error) {
            console.error("Erro ao salvar no Axioma Storage:", error);
        }
    },

    /**
     * Recupera o último diagnóstico salvo.
     */
    carregarUltimoResultado: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Erro ao carregar do Axioma Storage:", error);
            return null;
        }
    },

    /**
     * Limpa os dados persistidos.
     */
    /**
     * Limpa todos os dados do Axioma (Logout/Reset).
     */
    limparTudo: () => {
        localStorage.removeItem(STORAGE_KEY);
        // Pode limpar outras chaves se existirem no futuro
    },

    limparDados: () => {
        localStorage.removeItem(STORAGE_KEY);
    }
};
