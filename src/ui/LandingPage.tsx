import React, { useState, useEffect } from 'react';
import { SeletorSetorElite } from './AxiomaKit';
import { INDUSTRIAS_WEF } from '../data/frameworkWEF';
import './LandingPage.css';

interface LandingPageProps {
  onStart: (setor: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [setorPreSelecionado, setSetorPreSelecionado] = useState(INDUSTRIAS_WEF[0]);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((r) => obs.observe(r));

    return () => obs.disconnect();
  }, []);

  return (
    <div className="landing-root">
      {/* NAV */}
      <nav className="axioma-nav">
        <div className="nav-logo">
          <div className="nav-logo-mark"><span></span></div>
          Axioma People Analytics
        </div>
        <div className="nav-links">
          <a href="#produto">Produto</a>
          <a href="#cenarios">Cenários</a>
          <a href="#metodologia">Metodologia</a>
          <a href="#icp">Para quem</a>
        </div>
        <button className="nav-cta-btn" onClick={() => onStart(setorPreSelecionado)}>
          Solicitar diagnóstico
        </button>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg-grid"></div>
        <div className="hero-bg-line"></div>
        <div className="hero-badge-elite">
          <span className="hero-badge-dot-elite"></span>
          Baseado no relatório WEF × Accenture · Produtividade em 2030
        </div>
        <h1 className="hero-headline-elite">
          O capital humano é a<br />única vantagem<br /><em>que a tecnologia</em><br />não pode comprar.
        </h1>
        
        {/* Dropdown de Elite Integrado */}
        <div className="max-w-md mb-12 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Estratégia Setorial</p>
          <SeletorSetorElite 
            opcoes={INDUSTRIAS_WEF} 
            valor={setorPreSelecionado} 
            onChange={setSetorPreSelecionado} 
          />
        </div>

        <p className="hero-sub-elite">
          Diagnóstico de elite baseado nos cenários WEF 2025 e ritmos biográficos. A infraestrutura cognitiva para a elite da produtividade moderna.
        </p>
        <div className="hero-actions-elite">
          <button className="btn-hero-primary-elite" onClick={() => onStart(setorPreSelecionado)}>
            Solicitar diagnóstico
          </button>
          <a href="#metodologia" className="btn-hero-ghost-elite text-center no-underline inline-flex items-center justify-center">
            Ver metodologia
          </a>
        </div>
        <div className="hero-scroll-elite">
          <div className="hero-scroll-line-elite"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust-bar">
        <span className="trust-label-elite">Baseado em dados de</span>
        <div className="trust-logos-elite">
          <span className="trust-logo-elite">World Economic Forum</span>
          <span className="trust-logo-elite">Accenture Research</span>
          <span className="trust-logo-elite">IMF World Economic Outlook</span>
          <span className="trust-logo-elite">ILO Labour Statistics</span>
          <span className="trust-logo-elite">OECD Productivity</span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section" id="stats">
        <div className="stats-grid-elite">
          <div className="stat-item-elite reveal">
            <div className="stat-num-elite">46<sup>%</sup></div>
            <div className="stat-desc-elite">da força de trabalho global em desalinhamento de competências</div>
            <div className="stat-source-elite">OECD/ILO, 2021</div>
          </div>
          <div className="stat-item-elite reveal reveal-delay-1">
            <div className="stat-num-elite">50<sup>%+</sup></div>
            <div className="stat-desc-elite">da desaceleração global desde 2008 causada por queda de produtividade</div>
            <div className="stat-source-elite">FMI, 2024</div>
          </div>
          <div className="stat-item-elite reveal reveal-delay-2">
            <div className="stat-num-elite">43<sup>%</sup></div>
            <div className="stat-desc-elite">dos executivos citam falta de visão de liderança como barreira à IA</div>
            <div className="stat-source-elite">WEF Executive Survey, 2024</div>
          </div>
          <div className="stat-item-elite reveal reveal-delay-3">
            <div className="stat-num-elite">11<sup>%</sup></div>
            <div className="stat-desc-elite">de ganho adicional de produtividade quando dados, tecnologia e talento são integrados</div>
            <div className="stat-source-elite">Accenture, 2023</div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem-section" id="problema">
        <div className="problem-left-elite reveal">
          <div>
            <p className="section-eyebrow-elite">O problema</p>
            <h2 className="section-title-elite">Seu RH mede o passado.<br />O mercado exige <em>o futuro.</em></h2>
            <p className="section-body-elite">As ferramentas tradicionais de People Analytics foram construídas para registrar o que aconteceu — turnover, engajamento, satisfação. Nenhuma delas responde à pergunta que realmente importa: sua organização está preparada para os próximos cenários de produtividade?</p>
          </div>
          <div className="mt-12 p-7 border border-[#e2ddd6] bg-[#f5ede0]">
            <p className="font-serif text-[18px] italic text-[#0d0e0f] leading-relaxed">"Empresas frontier têm o dobro de competências em gestão e comunicação — e mais que o dobro em TI — comparadas às retardatárias."</p>
            <p className="text-[11px] text-[#7a7b80] mt-3 tracking-widest uppercase">OCDE, The Human Side of Productivity</p>
          </div>
        </div>
        <div className="problem-right-elite">
          <div className="problem-card-elite reveal reveal-delay-1">
            <p className="pc-title-elite">Você não sabe em qual cenário WEF está</p>
            <p className="pc-body-elite">O FEM mapeou 4 futuros para produtividade até 2030. A maioria das organizações opera sem saber qual é o mais provável para seu setor — e qual gap de capital humano as separa do cenário desejado.</p>
          </div>
          <div className="problem-card-elite reveal reveal-delay-2">
            <p className="pc-title-elite">Investimento em treinamento sem direção estratégica</p>
            <p className="pc-body-elite">OECD mostra queda de 0,2% para 0,1% do PIB em investimento em capacitação desde 2008, enquanto a aceleração tecnológica exige o oposto. O que é treinado hoje está alinhado ao cenário de amanhã?</p>
          </div>
          <div className="problem-card-elite reveal reveal-delay-3">
            <p className="pc-title-elite">Gap crescente entre empresas líderes e retardatárias</p>
            <p className="pc-body-elite">O diferencial de produtividade entre frontier firms e laggards saltou de 6,3 para 11,8 pontos percentuais entre 2016 e 2023. A janela de recuperação está fechando.</p>
          </div>
        </div>
      </section>

      {/* CENÁRIOS WEF */}
      <section className="scenarios-section" id="cenarios">
        <p className="section-eyebrow-elite">WEF Global Economic Futures 2025</p>
        <h2 className="section-title-elite reveal text-white">Quatro futuros.<br />Um diagnóstico para cada um.</h2>
        <p className="section-body-elite reveal reveal-delay-1 text-white/50">O Axioma mapeia a posição da sua organização em cada cenário — e identifica os gaps que precisam ser desenvolvidos antes que o futuro chegue.</p>
        <div className="scenarios-grid-elite">
          <div className="scenario-item-elite sc1 reveal">
            <div className="scenario-num-elite">1</div>
            <p className="scenario-tag-elite text-[#1D9E75]">Tecnologia Alta · Capital Humano Alto</p>
            <h3 className="scenario-name-elite">Productivity Leap</h3>
            <p className="scenario-desc-elite text-zinc-500">Círculo virtuoso entre inovação disruptiva e desenvolvimento humano. Ganhos amplos de produtividade e melhora real nos padrões de vida.</p>
            <div className="scenario-axis-elite">
              <div className="axis-row-elite">
                <span className="axis-label-elite">Tecnologia</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-up-elite" style={{ width: '90%' }}></div></div>
              </div>
              <div className="axis-row-elite">
                <span className="axis-label-elite">Capital humano</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-up-elite" style={{ width: '90%' }}></div></div>
              </div>
            </div>
          </div>
          <div className="scenario-item-elite sc2 reveal reveal-delay-1">
            <div className="scenario-num-elite">2</div>
            <p className="scenario-tag-elite text-[#BA7517]">Tecnologia Alta · Capital Humano Baixo</p>
            <h3 className="scenario-name-elite">Automation Overload</h3>
            <p className="scenario-desc-elite text-zinc-500">Tecnologia supera humanos. Dinâmica winner-takes-all. Concentração de riqueza e poder. Deslocamento em massa da força de trabalho.</p>
            <div className="scenario-axis-elite">
              <div className="axis-row-elite">
                <span className="axis-label-elite">Tecnologia</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-up-elite" style={{ width: '90%' }}></div></div>
              </div>
              <div className="axis-row-elite">
                <span className="axis-label-elite">Capital humano</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-down-elite" style={{ width: '20%' }}></div></div>
              </div>
            </div>
          </div>
          <div className="scenario-item-elite sc3 reveal reveal-delay-2">
            <div className="scenario-num-elite">3</div>
            <p className="scenario-tag-elite text-[#378ADD]">Tecnologia Baixa · Capital Humano Alto</p>
            <h3 className="scenario-name-elite">Human Advantage</h3>
            <p className="scenario-desc-elite text-zinc-500">Capital humano é o ativo central. Crescimento lento mas centrado em pessoas. Talento é a única vantagem competitiva sustentável.</p>
            <div className="scenario-axis-elite">
              <div className="axis-row-elite">
                <span className="axis-label-elite">Tecnologia</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-down-elite" style={{ width: '25%' }}></div></div>
              </div>
              <div className="axis-row-elite">
                <span className="axis-label-elite">Capital humano</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-up-elite" style={{ width: '85%' }}></div></div>
              </div>
            </div>
          </div>
          <div className="scenario-item-elite sc4 reveal reveal-delay-3">
            <div className="scenario-num-elite">4</div>
            <p className="scenario-tag-elite text-[#D85A30]">Tecnologia Baixa · Capital Humano Baixo</p>
            <h3 className="scenario-name-elite">Productivity Drought</h3>
            <p className="scenario-desc-elite text-zinc-500">Estagnação simultânea. Economias perdem força. Padrões de vida em queda. Tensões sociais crescentes e retração do investimento.</p>
            <div className="scenario-axis-elite">
              <div className="axis-row-elite">
                <span className="axis-label-elite">Tecnologia</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-down-elite" style={{ width: '20%' }}></div></div>
              </div>
              <div className="axis-row-elite">
                <span className="axis-label-elite">Capital humano</span>
                <div className="axis-bar-wrap-elite"><div className="axis-bar-elite axis-down-elite" style={{ width: '15%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTO */}
      <section className="product-section" id="produto">
        <div className="product-left-elite">
          <div>
            <p className="section-eyebrow-elite">O produto</p>
            <h2 className="section-title-elite reveal">Não é um sistema de RH.<br /><em>É inteligência</em><br />estratégica.</h2>
            <p className="section-body-elite reveal reveal-delay-1">Axioma conecta ritmos biográficos individuais com os cenários macroeconômicos do WEF para gerar diagnósticos acionáveis — no nível do indivíduo, da equipe e da organização.</p>
          </div>
          <div className="feature-list-elite reveal reveal-delay-2">
            <div className="feature-item-elite">
              <span className="feature-num-elite">01</span>
              <div>
                <p className="feature-title-elite">Diagnóstico biográfico individual</p>
                <p className="feature-body-elite">Mapeia ritmos de energia, picos cognitivos e ciclos de performance ao longo da carreira de cada colaborador.</p>
              </div>
            </div>
            <div className="feature-item-elite">
              <span className="feature-num-elite">02</span>
              <div>
                <p className="feature-title-elite">Posicionamento nos cenários WEF</p>
                <p className="feature-body-elite">Identifica em qual futuro de produtividade a equipe está — e qual capital humano precisa ser desenvolvido para cada cenário.</p>
              </div>
            </div>
            <div className="feature-item-elite">
              <span className="feature-num-elite">03</span>
              <div>
                <p className="feature-title-elite">Inteligência coletiva de time</p>
                <p className="feature-body-elite">Agrega perfis para revelar padrões, gaps de liderança e distribuição de competências por unidade estratégica.</p>
              </div>
            </div>
            <div className="feature-item-elite">
              <span className="feature-num-elite">04</span>
              <div>
                <p className="feature-title-elite">Roadmap de desenvolvimento personalizado</p>
                <p className="feature-body-elite">Gera planos de ação individuais e coletivos alinhados ao cenário estratégico escolhido pela organização.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="product-right-elite reveal reveal-delay-1">
          <div className="product-visual-elite">
            <p className="pv-header-elite">Exemplo de diagnóstico — Equipe de Liderança</p>

            <div className="pv-row-elite">
              <div className="pv-avatar-elite">MA</div>
              <div className="pv-info-elite">
                <p className="pv-name-elite">Maria Almeida</p>
                <p className="pv-role-elite">VP de Tecnologia · 8 anos de empresa</p>
                <div className="pv-bars-elite">
                  <div className="pv-bar-row-elite">
                    <span className="pv-bar-label-elite">Prontidão para IA</span>
                    <div className="pv-bar-track-elite"><div className="pv-bar-fill-elite gold" style={{ width: '82%' }}></div></div>
                    <span className="pv-score-elite">82</span>
                  </div>
                  <div className="pv-bar-row-elite">
                    <span className="pv-bar-label-elite">Adaptabilidade</span>
                    <div className="pv-bar-track-elite"><div className="pv-bar-fill-elite teal" style={{ width: '74%' }}></div></div>
                    <span className="pv-score-elite">74</span>
                  </div>
                  <div className="pv-bar-row-elite">
                    <span className="pv-bar-label-elite">Capital relacional</span>
                    <div className="pv-bar-track-elite"><div className="pv-bar-fill-elite blue" style={{ width: '91%' }}></div></div>
                    <span className="pv-score-elite">91</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-row-elite">
              <div className="pv-avatar-elite" style={{ background: '#E6F1FB', color: '#378ADD' }}>RC</div>
              <div className="pv-info-elite">
                <p className="pv-name-elite">Rafael Costa</p>
                <p className="pv-role-elite">Head de Estratégia · 3 anos de empresa</p>
                <div className="pv-bars-elite">
                  <div className="pv-bar-row-elite">
                    <span className="pv-bar-label-elite">Prontidão para IA</span>
                    <div className="pv-bar-track-elite"><div className="pv-bar-fill-elite gold" style={{ width: '61%' }}></div></div>
                    <span className="pv-score-elite">61</span>
                  </div>
                  <div className="pv-bar-row-elite">
                    <span className="pv-bar-label-elite">Adaptabilidade</span>
                    <div className="pv-bar-track-elite"><div className="pv-bar-fill-elite teal" style={{ width: '88%' }}></div></div>
                    <span className="pv-score-elite">88</span>
                  </div>
                  <div className="pv-bar-row-elite">
                    <span className="pv-bar-label-elite">Capital relacional</span>
                    <div className="pv-bar-track-elite"><div className="pv-bar-fill-elite blue" style={{ width: '55%' }}></div></div>
                    <span className="pv-score-elite">55</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-divider-elite"></div>

            <div className="pv-insight-elite">
              <strong>Diagnóstico Axioma:</strong> Esta equipe está bem posicionada para o Cenário 3 (Human Advantage) mas apresenta gap crítico em prontidão técnica para o Cenário 1 (Productivity Leap). Recomendação: programa de upskilling em IA nos próximos 18 meses para Rafael Costa e dois outros membros.
            </div>
          </div>
        </div>
      </section>

      {/* ICP */}
      <section className="icp-section" id="icp">
        <p className="section-eyebrow-elite">Para quem é o Axioma</p>
        <h2 className="section-title-elite reveal">Os executivos que já sabem<br />que <em>o problema é de pessoas.</em></h2>
        <div className="icp-grid-elite">
          <div className="icp-card-elite reveal">
            <p className="icp-card-role-elite">CHRO / VP de People</p>
            <p className="icp-card-title-elite">"Preciso provar ROI de desenvolvimento humano para o board."</p>
            <p className="icp-card-pain-elite">Você tem dados de engajamento, satisfação e turnover — mas o board quer saber como isso se traduz em produtividade e competitividade. O Axioma conecta desenvolvimento humano a resultados de negócio com linguagem estratégica.</p>
            <p className="icp-card-trigger-elite"><strong>Gatilho:</strong> Ciclo de planejamento estratégico anual ou revisão de budget de L&D</p>
          </div>
          <div className="icp-card-elite reveal reveal-delay-1">
            <p className="icp-card-role-elite">CEO / Chief Strategy Officer</p>
            <p className="icp-card-title-elite">"Qual dos 4 futuros WEF nossa equipe está preparada para enfrentar?"</p>
            <p className="icp-card-pain-elite">Você leu o relatório. Sabe que vem aí uma bifurcação entre Productivity Leap e Automation Overload. O Axioma mapeia onde sua organização está hoje — e o que falta para você estar no cenário certo.</p>
            <p className="icp-card-trigger-elite"><strong>Gatilho:</strong> Iniciativa de transformação digital ou adoção de IA</p>
          </div>
          <div className="icp-card-elite reveal reveal-delay-2">
            <p className="icp-card-role-elite">Head de People Analytics</p>
            <p className="icp-card-title-elite">"Tenho dados. Falta o framework que conecte tudo."</p>
            <p className="icp-card-pain-elite">Você já tem HRIS, pesquisa de clima, dados de performance. O Axioma não substitui — integra. Adiciona a camada de ritmos biográficos e cenários macroeconômicos que transforma dados operacionais em inteligência estratégica.</p>
            <p className="icp-card-trigger-elite"><strong>Gatilho:</strong> Novo mandato de analytics ou expansão do escopo de People</p>
          </div>
          <div className="icp-card-elite reveal reveal-delay-3">
            <p className="icp-card-role-elite">Chief Learning Officer / VP L&D</p>
            <p className="icp-card-title-elite">"Estamos treinando para o cenário certo?"</p>
            <p className="icp-card-pain-elite">OECD mostra queda contínua em investimento per capita em capacitação. Cada real precisa de ROI claro. O Axioma garante que o portfólio de desenvolvimento está alinhado com os gaps identificados para o cenário estratégico da organização.</p>
            <p className="icp-card-trigger-elite"><strong>Gatilho:</strong> Redesenho do portfólio de L&D ou processo de M&A</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-section-elite">
        <p className="blockquote-elite reveal">"A vantagem competitiva do próximo ciclo não será quem tem mais IA — será quem tem o capital humano para operar no nível mais alto com ela."</p>
        <p className="quote-attr-elite reveal reveal-delay-1">Axioma People Analytics · Tese de fundação, 2025</p>
      </div>

      {/* POSICIONAMENTO */}
      <section className="positioning-section" id="posicionamento">
        <p className="section-eyebrow-elite">Posicionamento</p>
        <h2 className="section-title-elite reveal">Uma mensagem diferente<br />para cada <em>sala.</em></h2>
        <div className="positioning-grid-elite">
          <div className="pos-col-elite reveal">
            <p className="pos-col-label-elite">Para o C-suite estratégico</p>
            <p className="pos-audience-elite">CEO · CSO · CFO</p>
            <p className="pos-message-elite">"Qual dos 4 cenários WEF sua organização está preparada para enfrentar em 2030?"</p>
            <p className="pos-sub-elite">Conversa de nível de board. O Axioma fala a língua do planejamento estratégico — não de RH.</p>
          </div>
          <div className="pos-col-elite reveal reveal-delay-1">
            <p className="pos-col-label-elite">Para o C-suite de pessoas</p>
            <p className="pos-audience-elite">CHRO · CLO · VP People</p>
            <p className="pos-message-elite">"Pela primeira vez, você terá dados que conectam desenvolvimento humano a resultados de produtividade."</p>
            <p className="pos-sub-elite">Eleva a conversa de RH para o nível estratégico com dados que o board entende e valoriza.</p>
          </div>
          <div className="pos-col-elite reveal reveal-delay-2">
            <p className="pos-col-label-elite">Para o time técnico</p>
            <p className="pos-audience-elite">Head Analytics · HRIS · Data</p>
            <p className="pos-message-elite">"Uma metodologia com respaldo WEF e dados biográficos que nenhum outro vendor oferece."</p>
            <p className="pos-sub-elite">Complementa sua stack atual. Adiciona a camada de inteligência estratégica que faltava nos dados operacionais.</p>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section className="method-section" id="metodologia">
        <p className="section-eyebrow-elite">Metodologia</p>
        <h2 className="section-title-elite reveal">Como o diagnóstico<br />é construído.</h2>
        <p className="section-body-elite reveal reveal-delay-1">Quatro etapas que transformam dados individuais e organizacionais em inteligência estratégica de capital humano.</p>
        <div className="method-steps-elite">
          <div className="method-step-elite reveal">
            <div className="ms-dot-elite"><span className="ms-dot-num-elite">01</span></div>
            <p className="ms-title-elite">Mapeamento biográfico</p>
            <p className="ms-body-elite">Coleta estruturada de dados individuais: trajetória, ritmos de energia, marcos de carreira e padrões de performance ao longo do tempo.</p>
          </div>
          <div className="method-step-elite reveal reveal-delay-1">
            <div className="ms-dot-elite"><span className="ms-dot-num-elite">02</span></div>
            <p className="ms-title-elite">Diagnóstico de competências</p>
            <p className="ms-body-elite">Avaliação das dimensões críticas identificadas pelo WEF: prontidão para IA, adaptabilidade, skills cognitivos e relacionais, liderança.</p>
          </div>
          <div className="method-step-elite reveal reveal-delay-2">
            <div className="ms-dot-elite"><span className="ms-dot-num-elite">03</span></div>
            <p className="ms-title-elite">Cruzamento com cenários</p>
            <p className="ms-body-elite">Posicionamento dos perfis individuais e coletivos nos 4 cenários WEF. Identificação de gaps críticos por cenário e por função.</p>
          </div>
          <div className="method-step-elite reveal reveal-delay-3">
            <div className="ms-dot-elite"><span className="ms-dot-num-elite">04</span></div>
            <p className="ms-title-elite">Roadmap estratégico</p>
            <p className="ms-body-elite">Plano de desenvolvimento personalizado, alinhado ao cenário estratégico da organização, com marcos, prioridades e métricas de ROI.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta-section">
        <div className="fc-text-elite">
          <p className="section-eyebrow-elite">Próximo passo</p>
          <h2 className="section-title-elite reveal">Descubra em qual<br />cenário sua organização<br /><em>está de verdade.</em></h2>
        </div>
        <div className="fc-actions-elite reveal reveal-delay-1">
          <button className="btn-fc-primary-elite" onClick={() => onStart(setorPreSelecionado)}>
            Solicitar diagnóstico gratuito
          </button>
          <button className="btn-fc-ghost-elite">Falar com um especialista</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="axioma-footer">
        <span className="footer-logo-elite">Axioma People Analytics</span>
        <div className="footer-links-elite">
          <a href="#produto">Produto</a>
          <a href="#metodologia">Metodologia</a>
          <a href="#icp">Para quem</a>
          <a href="#">Contato</a>
        </div>
        <span className="footer-copy-elite">© 2025 Axioma · Todos os direitos reservados</span>
      </footer>
    </div>
  );
};
