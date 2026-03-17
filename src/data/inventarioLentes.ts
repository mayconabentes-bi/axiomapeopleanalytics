import { LenteAxioma } from '../types/contratos';

/**
 * Inventário oficial das 10 Lentes Axioma Prime.
 * Migrado do legado para suporte a diagnóstico de alta fidelidade.
 */
export const INVENTARIO_LENTES: LenteAxioma[] = [
  { id:'wef', num:'I', name:'Cenários WEF 2030', sub:'Posicionamento macro', minPlan:1,
    title:'Onde você está nos futuros da produtividade',
    desc:'O relatório WEF × Accenture (janeiro 2025) mapeou 4 cenários determinados pela interação de tecnologia e capital humano. Esta lente identifica seu posicionamento atual.',
    fw:'WEF Global Economic Futures 2025 × Accenture',
    questions:[
      {id:'wef1', type:'spec', text:'Como você avalia sua velocidade de adoção e integração de novas tecnologias no trabalho?', left:'Adoto com cautela', right:'Experimento sistematicamente', val:50},
      {id:'wef2', type:'choice', text:'Sua trajetória de desenvolvimento de capital humano nos últimos 2 anos:',
        opts:[
            {t:'Aceleração intensa', d:'Investi significativamente — mudei capacidades de forma mensurável.'},
            {t:'Crescimento gradual', d:'Evolução constante mas sem saltos qualitativos expressivos.'},
            {t:'Estabilidade', d:'Mantive competências, pouco desenvolvimento ativo.'},
            {t:'Lacuna crescente', d:'A velocidade das mudanças supera minha capacidade de adaptação.'}
        ]}
    ]},
  { id:'cogn', num:'II', name:'Arquitetura Cognitiva', sub:'Como você pensa', minPlan:1,
    title:'O mapa da sua mente estratégica',
    desc:'Baseado em neurociência cognitiva e na teoria de duplo-processo de Kahneman. Mapeia como você processa informação complexa e toma decisões.',
    fw:'Kahneman Sistema 1/2 · Neurociência Cognitiva',
    questions:[
      {id:'cog1', type:'spec', text:'Diante de decisões complexas e ambíguas, você tende a:', left:'Confiar na intuição imediata', right:'Demandar análise estruturada', val:50},
      {id:'cog2', type:'matrix', cols:3, text:'Qual é sua vantagem cognitiva mais distintiva?',
        opts:[
            {t:'Análise profunda', d:'Decompõe sistemas'},
            {t:'Síntese criativa', d:'Conecta domínios'},
            {t:'Execução precisa', d:'Estratégia → ação'},
            {t:'Sensing humano', d:'Lê contextos'},
            {t:'Visão sistêmica', d:'Padrões e feedbacks'},
            {t:'Narração estratégica', d:'Dados → história'}
        ]}
    ]},
  { id:'bio', num:'III', name:'Impulso Biográfico', sub:'Seu momento de carreira', minPlan:1,
    title:'Em que ponto do arco da sua trajetória você está?',
    desc:'Daniel Levinson e Donald Super mapearam ciclos previsíveis de carreira. Esta lente detecta seu "impulso biográfico" — o vetor de energia do momento atual.',
    fw:'Levinson & Super · Ciclos de Vida de Carreira',
    questions:[
      {id:'bio0', type:'spec', text:'Qual é a sua idade atual?', left:'21', right:'70+', val:35},
      {id:'bio1', type:'choice', text:'Qual descrição melhor captura sua relação atual com a carreira?',
        opts:[
            {t:'Construção ativa', d:'Cada movimento é calculado para acumular posição e capacidade.'},
            {t:'Consolidação', d:'Atingi um patamar. O desafio é aprofundar, não expandir.'},
            {t:'Transição', d:'Uma fase terminou e outra ainda não começou. Estou no entre.'},
            {t:'Renovação', d:'Depois de um plateau, encontrei um segundo impulso.'}
        ]},
      {id:'bio2', type:'freq', text:'Com que frequência seu trabalho atual está à altura do seu potencial?', opts:[{t:'Raramente'},{t:'Às vezes'},{t:'Frequentemente'},{t:'Quase sempre'},{t:'Consistentemente'}]}
    ]},
  { id:'anti', num:'IV', name:'Antifragilidade', sub:'Resposta ao caos', minPlan:2,
    title:'Você cresce com o caos ou sobrevive a ele?',
    desc:'Nassim Taleb distingue frágil, robusto e antifrágil. Esta lente mede seu índice de antifragilidade — a capacidade de sair mais forte das rupturas.',
    fw:'Antifragilidade · Nassim Nicholas Taleb',
    questions:[
      {id:'anti1', type:'choice', text:'Quando você vivenciou uma ruptura significativa, qual foi o padrão predominante?',
        opts:[
            {t:'Crescimento por ruptura', d:'A crise revelou algo que não teria acessado de outra forma. Saí mais capaz.'},
            {t:'Recuperação resiliente', d:'Absorvi o impacto, mantive o núcleo, me reestabilizei.'},
            {t:'Recuperação lenta', d:'Levei tempo mas voltei ao patamar anterior.'},
            {t:'Ainda processando', d:'Tenho dificuldade de fazer sentido de rupturas maiores.'}
        ]},
      {id:'anti2', type:'spec', text:'Diante de alta incerteza e volatilidade, você tende a:', left:'Aguardar clareza para agir', right:'Agir estrategicamente com informação parcial', val:50}
    ]},
  { id:'tech', num:'V', name:'Metabolismo Tecnológico', sub:'AI Readiness real', minPlan:2,
    title:'Sua velocidade real de integração tecnológica',
    desc:'Baseado na curva de difusão de Rogers e em pesquisa de AI Readiness. Vai além da autopercepção — mede comportamentos observáveis.',
    fw:'Diffusion of Innovations · Rogers · AI Adoption Index',
    questions:[
      {id:'tech1', type:'matrix', cols:2, multi:true, text:'Selecione todos os comportamentos que descrevem sua relação com tecnologias emergentes:',
        opts:[
            {t:'Experimento ferramentas de IA semanalmente'},
            {t:'Integrei IA em fluxos de trabalho reais'},
            {t:'Ensino/apresento novas tecnologias'},
            {t:'Monitoro tendências sistematicamente'},
            {t:'Avalio ROI antes de adotar'},
            {t:'Sou o primeiro no meu time a testar novidades'}
        ]},
      {id:'tech2', type:'spec', text:'Profundidade da sua compreensão sobre como IA afeta especificamente seu campo:', left:'Conhecimento superficial', right:'Compreensão profunda e específica', val:50}
    ]},
  { id:'social', num:'VI', name:'Capital Social Estratégico', sub:'Posição na rede', minPlan:2,
    title:'A qualidade real do seu capital relacional',
    desc:'Pierre Bourdieu e Mark Granovetter mostraram que posição na rede — não tamanho — determina acesso a oportunidade. Esta lente mapeia onde você está.',
    fw:'Capital Social · Bourdieu · Network Science · Granovetter',
    questions:[
      {id:'soc1', type:'choice', text:'Como você descreveria sua posição típica em redes profissionais?',
        opts:[
            {t:'Conector entre mundos', d:'Faço a ponte entre comunidades diferentes. Sou quem apresenta pessoas que nunca se encontrariam.'},
            {t:'Núcleo de cluster', d:'Central em um grupo coeso de alta confiança. Profundidade sobre amplitude.'},
            {t:'Nó periférico ativo', d:'Transito por diferentes redes sem estar no centro de nenhuma.'},
            {t:'Construção em curso', d:'Minha rede está sendo construída de forma deliberada.'}
        ]},
      {id:'soc2', type:'spec', text:'Sua rede inclui pessoas radicalmente diferentes de você?', left:'Principalmente similar a mim', right:'Alta diversidade e amplitude', val:50}
    ]},
  { id:'sys', num:'VII', name:'Acuidade Sistêmica', sub:'Pensamento de segunda ordem', minPlan:2,
    title:'Você vê os sistemas que moldam os sistemas',
    desc:'Peter Senge e Donella Meadows documentaram que líderes que operam em pensamento linear perdem os pontos de alavanca. Esta lente mede sua capacidade de detectar loops de feedback.',
    fw:'A Quinta Disciplina · Senge · Thinking in Systems · Meadows',
    questions:[
      {id:'sys1', type:'choice', text:'Quando toma uma decisão importante, até onde você naturalmente projeta as consequências?',
        opts:[
            {t:'Resultado direto imediato', d:'Foco no objetivo da ação.'},
            {t:'Reações de segundo nível', d:'Penso em como os sistemas afetados vão reagir.'},
            {t:'Loops sistêmicos', d:'Identifico como as reações criam novas condições.'},
            {t:'Evolução do sistema', d:'Modelo como a decisão altera a estrutura ao longo do tempo.'}
        ]},
      {id:'sys2', type:'freq', text:'Com que frequência você identifica causas raiz de problemas?', opts:[{t:'Raramente'},{t:'Às vezes'},{t:'Frequentemente'},{t:'Quase sempre'},{t:'Sistematicamente'}]}
    ]},
  { id:'kegan', num:'VIII', name:'Estágio de Desenvolvimento', sub:'Vertical development', minPlan:2,
    title:'A profundidade do seu centro de gravidade de liderança',
    desc:'Robert Kegan mapeou estágios de desenvolvimento adulto que determinam a capacidade de operar com complexidade.',
    fw:'Teoria de Desenvolvimento Adulto · Robert Kegan',
    questions:[
      {id:'keg1', type:'choice', text:'Quando você encontra duas perspectivas opostas e válidas, sua reação é:',
        opts:[
            {t:'Selecionar a mais defensável', d:'Há uma resposta mais correta. Avalio os argumentos.'},
            {t:'Buscar síntese', d:'Ambas capturam algo real. Integro as duas perspectivas.'},
            {t:'Manter ambas ativas', d:'Consigo operar com a tensão produtiva entre opostos.'},
            {t:'Questionar o frame', d:'Pergunto que contexto faz uma ou outra parecer verdadeira.'}
        ]},
      {id:'keg2', type:'spec', text:'O quanto sua identidade profissional é independente de validação externa?', left:'Muito ligada ao cargo', right:'Completamente independente', val:50}
    ]},
  { id:'energy', num:'IX', name:'Arquitetura de Energia', sub:'Cronobiologia e performance', minPlan:3,
    title:'O ritmo real da sua performance cognitiva',
    desc:'Cronobiologia e neurofisiologia mostram que performance cognitiva de pico é cíclica e previsível.',
    fw:'Cronobiologia · Neurociência da Performance · Ultradian Rhythm',
    questions:[
      {id:'ene1', type:'matrix', cols:3, text:'Quando você experimenta seu pico de clareza cognitiva?',
        opts:[
            {t:'4–7h', d:'Madrugada'}, {t:'7–10h', d:'Manhã cedo'}, {t:'10–12h', d:'Meio-manhã'},
            {t:'13–15h', d:'Pós-almoço'}, {t:'15–18h', d:'Tarde'}, {t:'19h+', d:'Noite'}
        ]},
      {id:'ene2', type:'choice', text:'Como é sua relação atual com recuperação cognitiva?',
        opts:[
            {t:'Recuperação intencional', d:'Protejo ativamente períodos de recuperação.'},
            {t:'Recuperação reativa', d:'Recupero quando não tenho alternativa.'},
            {t:'Déficit crônico', d:'Opero consistentemente abaixo do pico.'},
            {t:'Construção em curso', d:'Desenvolvendo práticas de gestão de energia.'}
        ]}
    ]},
  { id:'fore', num:'X', name:'Visão Prospectiva', sub:'Detecção de futuros', minPlan:3,
    title:'A sua capacidade de ver o que ainda não chegou',
    desc:'A visão prospectiva é a meta-competência do século 21.',
    fw:'Strategic Foresight · Futures Studies · IFTF',
    questions:[
      {id:'fore1', type:'spec', text:'Qual é o horizonte de tempo com que você naturalmente planeja?', left:'3–6 meses', right:'5–10 anos', val:30},
      {id:'fore2', type:'choice', text:'Em relação a sinais fracos de mudança, você:',
        opts:[
            {t:'Detecção sistemática', d:'Tenho práticas deliberadas para capturar sinais fracos.'},
            {t:'Detecção intuitiva', d:'Percebo tendências, mas sem processo sistemático.'},
            {t:'Reativa', d:'Reconheço as tendências quando já estão amplamente visíveis.'},
            {t:'Construção necessária', d:'Preciso desenvolver essa capacidade deliberadamente.'}
        ]},
      {id:'fore3', type:'txt', text:'Qual é sua aposta estratégica sobre a evolução do seu campo?', ph:'Descreva a tendência que você acredita ser real antes de todo mundo...'}
    ]},
  { id:'ressonancia', num:'XI', name:'Ressonância Civilizacional', sub:'Seu lugar no tempo histórico', minPlan:3,
    title:'Onde você está no tempo histórico — não apenas no seu',
    desc:'Esta lente cruza os arcos biográficos com os ciclos civilizacionais de Peter Turchin e Strauss-Howe, consultando 5.200 anos de precedentes históricos verificados.',
    fw:'Turchin · Secular Cycles · Levinson · Strauss-Howe',
    questions:[
      {id:'civ1', type:'choice', text:'Qual destas descrições melhor captura o ambiente civilizacional em que você está operando hoje?',
        opts:[
          {t:'Ascensão e integração', d:'Instituições funcionando, coesão social crescente.'},
          {t:'Pico e tensão acumulada', d:'Sinais de saturação visíveis, desigualdade, desconfiança crescente.'},
          {t:'Fragmentação e turbulência', d:'Confiança nas instituições em queda, polarização acelerada.'},
          {t:'Crise e ruptura ativa', d:'Colapso de estruturas estabelecidas, reorganização sistêmica forçada.'}
        ]},
      {id:'civ2', type:'choice', text:'Como o seu momento biográfico atual interage com o ambiente civilizacional?',
        opts:[
          {t:'Alinhamento', d:'Estou em expansão num mundo em expansão.'},
          {t:'Contrafase', d:'Meu impulso de crescimento encontra resistência externa.'},
          {t:'Amplificação', d:'O caos externo está acelerando meu desenvolvimento.'},
          {t:'Fricção', d:'O mundo exige velocidade que meu momento interno não suporta.'}
        ]},
      {id:'civ3', type:'matrix', cols:3, text:'Qual destes arquétipos históricos mais ressoa com o seu papel agora?',
        opts:[
          {t:'O Arquiteto', d:'Constrói estruturas duráveis no caos.'},
          {t:'O Sentinela', d:'Detecta e sinaliza o que outros não veem.'},
          {t:'A Ponte', d:'Conecta mundos que se fragmentaram.'},
          {t:'O Guardião', d:'Preserva o essencial para o próximo ciclo.'},
          {t:'O Transformador', d:'Converte a crise em novo paradigma.'},
          {t:'O Testemunho', d:'Documenta para que a sabedoria não se perca.'}
        ]},
      {id:'civ4', type:'spec', text:'Como você avalia a sincronia entre seu ritmo interno e as mudanças externas?', left:'O mundo mudou mais rápido', right:'Estou à frente das mudanças', val:50}
    ]
  },
  { id:'narrativa', num:'XII', name:'Identidade Narrativa', sub:'A história que você conta sobre si', minPlan:3,
    title:'A história que você conta sobre sua vida revela mais do que qualquer questionário',
    desc:'Dan McAdams (Northwestern University) documentou que o modo como narramos a própria vida prediz com precisão como reagimos a crises e tomamos decisões sob pressão.',
    fw:'Dan McAdams · Northwestern University · Personal Narrative & Identity',
    questions:[
      {id:'narr1', type:'txt', text:'Descreva o evento mais formativo da sua vida profissional — como aconteceu e o que mudou depois.', ph:'Pode ser uma vitória, uma falha, uma ruptura...'},
      {id:'narr2', type:'choice', text:'Qual padrão melhor descreve como você narra momentos difíceis?',
        opts:[
          {t:'Redenção', d:'Começou difícil, mas gerou algo positivo.'},
          {t:'Crescimento gradual', d:'Desafios que me desenvolveram lentamente.'},
          {t:'Contaminação', d:'Algo bom foi comprometido por circunstâncias.'},
          {t:'Ainda sem narrativa', d:'Não tenho ainda um arco claro.'}
        ]},
      {id:'narr3', type:'spec', text:'Nas suas histórias, você se coloca mais como protagonista ou personagem reativo?', left:'Reativo', right:'Agente', val:50},
      {id:'narr4', type:'choice', text:'Existe um antagonista recorrente na sua trajetória?',
        opts:[
          {t:'Sim, claramente identificável'},
          {t:'Sim, mas difuso'},
          {t:'Não identifico um padrão'},
          {t:'O antagonista sou eu mesmo'}
        ]}
    ]},
  { id:'sombra', num:'XIII', name:'Sombra Estratégica', sub:'O que você sistematicamente não vê', minPlan:3,
    title:'O que você não consegue ver sobre si mesmo — e que determina 60% das suas decisões',
    desc:'Jung e Hollis documentaram que a sombra determina a maioria dos padrões inconscientes de comportamento e decisão.',
    fw:'Carl Jung · Psicologia Analítica · James Hollis',
    questions:[
      {id:'shad1', type:'txt', text:'Descreva um comportamento alheio que te incomoda de forma desproporcional.', ph:'Um estilo de trabalho, uma postura...'},
      {id:'shad2', type:'choice', text:'Qual afirmação reconhece como verdadeira para si?',
        opts:[
          {t:'Às vezes me comporto como quem critico'},
          {t:'Qualidades que admiro me parecem inacessíveis'},
          {t:'Evito pessoas que me causam reações viscerais'},
          {t:'Reconheço todas as anteriores'}
        ]},
      {id:'shad3', type:'spec', text:'Qual sua reação interna predominante ao cometer um erro?', left:'Autocrítica punitiva', right:'Autocompaixão/Curiosidade', val:50},
      {id:'shad4', type:'txt', text:'Se alguém honesto descrevesse seu ponto cego, o que diria?', ph:'Tente responder como a pessoa diria...'}
    ]}
];
