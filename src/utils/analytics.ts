/**
 * Utilitário de Telemetria Axioma
 * Centraliza o rastreamento de eventos para o Dashboard Administrativo.
 */

export type AxiomaEventType = 
  | 'link_generated' 
  | 'session_start' 
  | 'survey_start' 
  | 'survey_complete' 
  | 'pdf_download' 
  | 'component_click';

export interface AxiomaEvent {
  id: string;
  type: AxiomaEventType;
  timestamp: string;
  data: any;
  sessionId: string;
  userId?: string; // Hash ou IP anonimizado
}

// Chave para armazenamento local (mock até ter Supabase)
const STORAGE_KEY = 'axioma_telemetry_logs';

/**
 * Registra um novo evento no sistema.
 * Por enquanto salva no LocalStorage para demonstração, 
 * mas está pronto para enviar para o Supabase.
 */
export const trackEvent = (type: AxiomaEventType, data: any = {}) => {
  const sessionId = getSessionId();
  const event: AxiomaEvent = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    timestamp: new Date().toISOString(),
    data,
    sessionId
  };

  console.log(`[Axioma Analytics] Event: ${type}`, event);

  // Persistência Mock (LocalStorage)
  const logs = getLogs();
  logs.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(-500))); // Manter últimos 500
  
  // TODO: Integrar Supabase aqui
  // supabase.from('telemetry').insert(event);
};

/**
 * Recupera todos os logs registrados (Mock)
 */
export const getLogs = (): AxiomaEvent[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

/**
 * Gera ou recupera um ID de sessão único
 */
const getSessionId = () => {
  let id = sessionStorage.getItem('axioma_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('axioma_session_id', id);
  }
  return id;
};

/**
 * Limpa os logs locais (Utility para Admin)
 */
export const clearLogs = () => {
  localStorage.removeItem(STORAGE_KEY);
};
