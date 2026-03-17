
> "Agora que temos os contratos, vamos desenvolver o **Domínio Cognitivo** do **Axioma People Analytics**.
> 
> **OBJETIVO:** Criar o motor lógico que processa os inputs do usuário e gera o diagnóstico estratégico baseado no WEF 2025.
> 
> **AÇÕES OBRIGATÓRIAS:** 1. **Criação do Motor (`src/domain/calculadoraAxioma.ts`):** > - Implemente a função `classificarCenario`: Ela deve receber os scores de tecnologia e capital humano (1-7) e retornar um dos 4 cenários do WEF. - Implemente a função `calcularPotencialProdutividade`: Se o score de capital humano for baixo, o multiplicador de ganho deve ser próximo a 4%; se houver sinergia (ambos os scores altos), o ganho deve ser projetado em até 11%. - Implemente a lógica de `identificarBarreiras`: Se o índice de visão de liderança for baixo, retorne 'Falta de Visão Estratégica' (barreira para 43% dos líderes). Se o capital humano for baixo, retorne 'Lacuna de Competências' (48% de impacto).
> 
> 2. **Analise de Exposição (`src/domain/analisadorSetorial.ts`):** - Crie uma função que cruza o cenário do usuário com os 'Ventos Favoráveis' e 'Contrários' do seu setor específico (ex: TI vs Manufatura), normalizando os dados entre 0 e 1.
>     
> 
> **RIGOR TÉCNICO:** Use funções puras, TypeScript estrito e documente o código referenciando as premissas do relatório (ex: 'Baseado na tese de complementaridade tech-human'). Mantenha o idioma em Português."

---

## 💎 O que torna esta fase "Elite" em Vibe Coding?

- **Rigor Estatístico:** Estamos saindo do "acho que você é bom" para "sua probabilidade de estar no cenário de Sobrecarga de Automação é alta devido ao gap de X pontos".
    
- **Valor de Negócio Real:** Você está oferecendo ao usuário um dado que 40% das grandes empresas atualmente registram com crescimento negativo: a produtividade real.
    
- **Foresight:** O sistema não apenas avalia; ele prevê o impacto em áreas como **segurança da rede** e **estabilidade do mercado**, que são ameaçados por lacunas de competências.