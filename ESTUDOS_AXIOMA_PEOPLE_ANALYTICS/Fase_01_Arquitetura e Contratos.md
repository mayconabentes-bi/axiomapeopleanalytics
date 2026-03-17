
Inicie o desenvolvimento da tecnologia **Axioma People Analytics**. O sistema é um motor de diagnóstico de produtividade inédito, fundamentado no relatório 'Global Economic Futures: Productivity in 2030' (Janeiro 2025) do World Economic Forum.

**DIRETRIZES DE ARQUITETURA:**

1. Adote **Clean Architecture** e **Separation of Concerns (SoC)**.
    
2. Estrutura de Pastas: `src/types` (Contratos), `src/data` (Conhecimento), `src/domain` (Regras de Negócio), `src/config` (Parâmetros).
    
3. Idioma: Todo o código, comentários e termos de negócio devem ser em **Português**.
    

**FASE 1: CONTRATOS E FRAMEWORK (AÇÃO IMEDIATA):**

1. **Definição de Tipos (`src/types/contratos.ts`):** Crie interfaces para: - `Cenario2030`: Enum com 'Salto de Produtividade', 'Sobrecarga de Automação', 'Vantagem Humana' e 'Seca de Produtividade'. - `MétricasAxioma`: Objeto com `scoreTecnologico` (1-7), `scoreCapitalHumano` (1-7) e `indiceVisaoLiderança` (citada como barreira por 43% dos executivos). - `MatrizImpacto`: Mapeamento de 'Ventos Favoráveis' (Tailwinds) e 'Ventos Contrários' (Headwinds) por setor econômico.
    
2. **Base de Conhecimento (`src/data/frameworkWEF.ts`):** Transfira os dados brutos do relatório para constantes: - As 12 indústrias e sua exposição a cada cenário. - A tese de complementaridade: empresas que unem tecnologia e talento podem saltar de 4% para 11% de ganho de produtividade. - Os gatilhos de cada cenário (ex: R&D spending, skills mismatch, automação de tarefas).
    

**REGRA DE OURO:** Não gere código React, HTML ou CSS. Se entendeu o rigor da Axioma, execute a fundação de tipos e dados."

---

### 🧠 Por que este sistema é disruptivo (Fundamentação WEF 2025)

Ao iniciar com este prompt, você garante que o **Axioma People Analytics** possua as seguintes diferenciações inéditas:

- **O Índice de Sinergia:** O sistema não apenas pontua o usuário, mas calcula o "Payoff de Produtividade". Ele demonstrará como a combinação de tecnologia e capital humano pode elevar o ganho de 4% (foco apenas em tech) para **11% (foco em sinergia)**.
    
- **Diagnóstico de Cenário de Risco:** O teste identificará se o profissional está em risco de cair na **'Sobrecarga de Automação'**, onde o avanço tecnológico supera o desenvolvimento humano, gerando uma dinâmica de 'vencedor leva tudo' e concentração de poder.
    
- **Foco em Barreiras Reais:** Quase metade dos líderes globais cita a falta de habilidades (48%) e de visão (43%) como os principais gargalos para a adoção de IA. O Axioma medirá esses pontos especificamente para diagnosticar a prontidão do usuário.
    
- **Contextualização Setorial:** O resultado será filtrado por 12 setores, analisando se o usuário está em um setor com **'Ventos Favoráveis'** (como TI e Finanças) ou **'Ventos Contrários'** (como Mineração e Engenharia) em cenários de escassez de talento.