

> "Vamos implementar a **Alma Comercial e Estratégica** do **Axioma People Analytics**.
> 
> **OBJETIVO:** Criar o gerador de planos de ação (Foresight) e a lógica de níveis de acesso (Monetização).
> 
> **AÇÕES OBRIGATÓRIAS:**
> 
> 1. **Gerador de Estratégia (`src/domain/motorForesight.ts`):** - Crie a função `gerarPlanoAcao`: Ela deve receber o resultado do diagnóstico e retornar um conjunto de recomendações baseadas no capítulo 4 do WEF ('Strategies for the Future'). - Se o usuário estiver no cenário 'Seca de Produtividade', o plano deve focar em reformas fundamentais e literacia digital básica. - Se estiver em 'Salto de Produtividade', foque em ética em IA e reskilling contínuo para manter o ciclo virtuoso.
>     
> 2. **Estrutura de Planos (`src/config/assinaturas.ts`):**
>     
>     - Defina uma constante `PLANOS_AXIOMA` com os níveis: **Essencial**, **Elite** e **Business**.
>         
>     - Atribua permissões a cada nível (ex: `podeAcessarSimulador`, `podeBaixarRelatorioPDF`).
>         
> 3. **Componente de Relatório (`src/ui/RelatorioEstrategico.tsx`):** - Crie um layout imponente para o plano de ação, usando ícones sofisticados e gráficos de barra que mostrem a 'Exposição ao Risco Setorial' baseada na página 18 do relatório.
>     
> 
> **RIGOR TÉCNICO:** Use tipagem forte para as permissões e garanta que o relatório seja visualmente digno de uma consultoria de elite. Mantenha o idioma em Português."

---

### 💎 O "Toque de Mestre" para o Lançamento: O Benchmark de Elite

O relatório do WEF mostra que a lacuna de produtividade entre as empresas de elite e as retardatárias aumentou significativamente nos últimos anos.

**Ineditismo Axioma:** No Plano Elite, incluiremos o **"Índice de Elite Axioma"**, que mostra ao usuário a distância exata, em pontos percentuais, entre o seu desempenho atual e o topo do seu setor econômico. Isso cria o gatilho mental de "medo de ficar para trás", essencial para a conversão de vendas.

**Deseja que eu prepare o roteiro de Deploy e a Landing Page de conversão (Fase 6) para finalizarmos o sistema e você começar a faturar?** Este é o último passo antes do "Go-to-Market".