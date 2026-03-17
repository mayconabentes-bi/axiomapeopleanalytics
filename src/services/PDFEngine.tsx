import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font, 
  Image 
} from '@react-pdf/renderer';
import { ResultadoDiagnostico, Cenario2030 } from '../types/contratos';
import { GATILHOS_CENARIO } from '../data/frameworkWEF';
import { verificarAcessoROI, getPlanoPorId } from '../domain/motorGating';

// Registro de Fontes
Font.register({
  family: 'Times-Roman',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtK.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3dmX5slCNuHLi8bLeY9MK7whWMhyjYmHhN_N0.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#050611',
    color: '#ffffff',
    padding: 60,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#b8965a',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'center',
    color: '#7a7b80',
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  section: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 18,
    color: '#b8965a',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b8965a',
    paddingBottom: 5,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#d1d1d1',
    textAlign: 'justify'
  },
  footer: {
    fontSize: 8,
    textAlign: 'center',
    color: '#4a4a4a',
    borderTopWidth: 0.5,
    borderTopColor: '#2a2a2a',
    paddingTop: 10
  },
  roiBox: {
    backgroundColor: '#0a0c1a',
    borderWidth: 1,
    borderColor: '#b8965a',
    padding: 20,
    marginTop: 20
  },
  statLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
    color: '#b8965a',
    marginBottom: 5
  },
  statValue: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  gatedOverlay: {
    padding: 40,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#4a4a4a',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

interface PDFReportProps {
  resultado: ResultadoDiagnostico;
  plan: string | null;
  organizacao?: string;
}

export const PDFReport: React.FC<PDFReportProps> = ({ resultado, plan, organizacao = "Organização Líder" }) => {
  const config = getPlanoPorId(plan);
  const isEnterprise = config?.tier === 'enterprise';
  const brandColor = isEnterprise ? '#E5E4E2' : '#b8965a';
  
  // Custom Styles para White Label
  const dynamicStyles = {
    title: [styles.title, { color: brandColor }],
    heading: [styles.heading, { color: brandColor, borderBottomColor: brandColor }],
    roiBox: [styles.roiBox, { borderColor: brandColor }],
    statLabel: [styles.statLabel, { color: brandColor }],
  };

  return (
    <Document>
      {/* CAPA */}
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, backgroundColor: brandColor, marginBottom: 20 }} />
          <Text style={dynamicStyles.title}>
            {isEnterprise ? 'Intelligence Infrastructure Report' : 'Relatório de Inteligência Estratégica'}
          </Text>
          <Text style={styles.subtitle}>
            {isEnterprise ? 'Global Executive Analysis' : 'Horizonte 2030'}
          </Text>
          <Text style={{ fontSize: 12, color: '#ffffff', marginTop: 100 }}>Preparado para:</Text>
          <Text style={[styles.title, { fontSize: 18, marginTop: 5, color: brandColor }]}>{organizacao}</Text>
        </View>
        <Text style={{ ...styles.footer, position: 'absolute', bottom: 30, left: 60, right: 60 }}>
          {isEnterprise ? 'Confidencial · Internal Use Only · Enterprise Grade' : 'Confidencial · Axioma People Analytics · Framework WEF'}
        </Text>
      </Page>

      {/* PÁGINA DE CENÁRIO */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={dynamicStyles.heading}>Cenário Identificado: {resultado.cenario}</Text>
          <Text style={styles.text}>{resultado.descricao}</Text>
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.heading}>Gatilhos do Cenário (WEF 2025)</Text>
          {GATILHOS_CENARIO[resultado.cenario].map((gatilho, idx) => (
            <Text key={idx} style={[styles.text, { marginBottom: 4 }]}>• {gatilho}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={dynamicStyles.heading}>Impacto da Sinergia</Text>
          <Text style={styles.text}>
            De acordo com o relatório "Global Economic Futures", empresas que conseguem integrar harmoniosamente a tecnologia 
            de ponta com o desenvolvimento de talentos elevam seu ganho base de produtividade de 4% para impressionantes 11%.
          </Text>
        </View>
        <Text style={{ ...styles.footer, position: 'absolute', bottom: 30, left: 60, right: 60 }}>Confidencial · Página 2</Text>
      </Page>

      {/* PÁGINA DE ROI E GAPS */}
      <Page size="A4" style={styles.page}>
        <Text style={dynamicStyles.heading}>Análise de ROI e Custo de Inação</Text>
        
        <View style={dynamicStyles.roiBox}>
          <View style={{ marginBottom: 15 }}>
            <Text style={dynamicStyles.statLabel}>Sinergia Capturada</Text>
            <Text style={styles.statValue}>{(resultado.multiplicadorProdutividade - 1) * 100}%</Text>
          </View>
          <View>
            <Text style={dynamicStyles.statLabel}>Custo do Gap Anual (C_gap)</Text>
            <Text style={[styles.statValue, { color: isEnterprise ? '#ffffff' : '#ed4a4a' }]}>
              {isEnterprise 
                ? `R$ ${Math.round(resultado.custoGapAnual / 1000000).toLocaleString()}M` 
                : `R$ ${Math.round(resultado.custoGapAnual).toLocaleString()}`}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>
            {isEnterprise 
              ? "Este valor representa o arrasto de capital operacional anual em escala corporativa por desalinhamento sistêmico." 
              : "Este valor representa a perda de oportunidade financeira causada pelo desalinhamento entre sua infraestrutura tecnológica."}
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
           <Text style={dynamicStyles.heading}>Arquitetura de Recomendações</Text>
           <Text style={styles.text}>
             1. Fortalecimento da Infraestrutura Crítica: Priorizar a integração de sistemas IA-Nativos.{"\n"}
             2. Antecipação de Talento: Mapear os picos cognitivos da liderança para os próximos 36 meses.{"\n"}
             3. Reskilling Estratégico: Focar em competências que a IA não pode replicar.
           </Text>
        </View>
        <Text style={{ ...styles.footer, position: 'absolute', bottom: 30, left: 60, right: 60 }}>Confidencial · Registro ENT-{resultado.id}</Text>
      </Page>
    </Document>
  );
};
