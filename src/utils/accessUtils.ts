/**
 * Utilitários para geração e validação de tokens de acesso temporário.
 * Nota: Como é uma aplicação client-side, o "segredo" está no código.
 * Para segurança total, seria necessário um backend.
 */

const SECRET_SALT = "AXIOMA-SECURITY-2025";

export interface AccessToken {
  planId: string;
  expiry: number; // Timestamp
  signature: string;
}

/**
 * Gera um token simples codificado em Base64.
 */
export function generateToken(planId: string, daysValid: number): string {
  const expiry = Date.now() + (daysValid * 24 * 60 * 60 * 1000);
  const data = {
    planId,
    expiry,
    sig: btoa(`${planId}-${expiry}-${SECRET_SALT}`).substring(0, 8)
  };
  return btoa(JSON.stringify(data));
}

/**
 * Valida um token e retorna o plano se estiver correto e no prazo.
 */
export function validateToken(token: string): { planId: string; valid: boolean; expired: boolean } {
  try {
    const decoded = JSON.parse(atob(token));
    const { planId, expiry, sig } = decoded;
    
    // Validar assinatura básica
    const expectedSig = btoa(`${planId}-${expiry}-${SECRET_SALT}`).substring(0, 8);
    if (sig !== expectedSig) {
      return { planId: '', valid: false, expired: false };
    }

    // Validar expiração
    if (Date.now() > expiry) {
      return { planId, valid: true, expired: true };
    }

    return { planId, valid: true, expired: false };
  } catch (e) {
    return { planId: '', valid: false, expired: false };
  }
}
