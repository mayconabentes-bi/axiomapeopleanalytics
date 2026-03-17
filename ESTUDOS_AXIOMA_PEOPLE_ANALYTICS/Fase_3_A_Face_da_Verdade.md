

> "Vamos construir a camada visual do **Axioma People Analytics**. O objetivo é criar um fluxo de avaliação fluido que consuma nossa lógica de domínio.
> 
> **DIRETRIZES DE UI:**
> 
> 1. Estética 'Dark Mode' Profissional: Fundo profundo, tipografia serifada para autoridade (`Cormorant Garamond`) e sans-serif para dados (`Outfit`).
>     
> 2. Framework: Use React com Tailwind CSS.
>     
> 
> **AÇÕES OBRIGATÓRIAS:**
> 
> 1. **Biblioteca de Componentes (`src/ui/AxiomaKit.tsx`):**
>     
>     - Crie componentes base: `BotaoAxioma`, `CardCenario`, `IndicadorProgresso` e `SliderEscala1a7`.
>         
>     - Garanta que os componentes sejam puramente visuais (Presentational Components).
>         
> 2. **Fluxo de Avaliação (`src/ui/FluxoAvaliacao.tsx`):** - Implemente um 'Stepper' (passo-a-passo) que percorra as dimensões do WEF: **Maturidade Tecnológica**, **Capital Humano** e **Visão de Liderança**.
>     
>     - Integre este componente com a `src/domain/calculadoraAxioma.ts` para calcular o resultado em tempo real ao final do fluxo.
>         
> 3. **Painel de Resultado Inicial (`src/ui/VisualizadorCenario.tsx`):** - Crie um componente que exiba o cenário resultante (ex: 'Sobrecarga de Automação') com a descrição técnica e o **Índice de Sinergia** (o payoff de 4% vs 11%).
>     
> 
> **REGRA DE OURO:** Mantenha a lógica de cálculo estritamente no diretório `/domain`. A UI deve apenas 'pedir' o cálculo e exibir o resultado. O idioma deve ser Português de alto nível."

---

### 💎 A "Novidade" de Nível Elite: O Índice de Atrito Tecnológico

Para elevar o nível deste passo, incluiremos um conceito inédito: o **Índice de Atrito**. No relatório, 43% dos líderes falham por "falta de visão". Na interface, se o usuário tiver alta tecnologia mas baixa visão, mostraremos um "alerta de atrito estratégico", indicando que ele está desperdiçando potencial de produtividade devido a barreiras organizacionais.

**O que você acha dessa abordagem para a UI?** Assim que disparar este prompt, o **Axioma People Analytics** ganhará vida visual, permitindo que você comece a testar a jornada do usuário final. Concluiremos a separação movendo os dados estáticos do WEF para um arquivo próprio antes disso.