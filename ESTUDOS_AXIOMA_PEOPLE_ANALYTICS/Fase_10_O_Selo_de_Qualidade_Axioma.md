
"Estamos na fase final de **Hardening e Go-Live** do **Axioma People Analytics**. O objetivo é transformar a aplicação em um produto resiliente, de alta performance e visualmente deslumbrante.

**OBJETIVO:** Realizar uma auditoria técnica completa e polimento final para o lançamento oficial.

**AÇÕES OBRIGATÓRIAS:**

1. **Auditoria de Performance (`src/ui/optimization`):**
    
    - Aplique memoização nos componentes de gráfico e no 'Simulador de Impacto' para evitar re-renderizações desnecessárias.
        
    - Garanta que o cálculo do 'Score de Sobrevivência 2030' e dos 'Sentênios' ocorra de forma assíncrona e fluida.
        
2. **Refinamento Mobile (`src/ui/layout`):**
    
    - Revise todos os componentes Tailwind para garantir que o Stepper de avaliação e os Dashboards de resultado sejam 100% amigáveis ao toque e perfeitamente legíveis em telas pequenas.
        
3. **Camada de Resiliência (`src/ui/components/ErrorBoundary.tsx`):**
    
    - Implemente 'Error Boundaries' de alto nível com a estética Axioma. Se algo falhar, o usuário deve ver um convite para 'Recalibrar o Vetor' em vez de um erro técnico.
        
4. **Polimento de 'Vibe' (UX Final):**
    
    - Adicione transições suaves de gradiente quando o cenário do usuário mudar (ex: do cinza da 'Seca' para o dourado do 'Salto de Produtividade').
        
    - Revise todos os textos, garantindo que as citações ao WEF 2025 (como os ganhos de 11% de sinergia) estejam destacadas com elegância.
        

**RIGOR TÉCNICO:** Remova logs de console, minimize o bundle final e verifique a acessibilidade (A11y). O sistema deve ser a tradução técnica da 'Verdade Axiomática'."