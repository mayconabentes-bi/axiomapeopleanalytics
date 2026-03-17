import { DadosBioArc, DadosOndas, DadosTaleb } from '../types/contratos';

/**
 * Motor de Visualização Axioma: Matemática pura para renderização de luxo.
 * Transformamos dados brutos em primitivas geométricas (ângulos, coordenadas, caminhos SVG).
 */

/**
 * Calcula a posição no Arco de Sentênios (21 a 70 anos).
 * Semicírculo: Centro (100, 90), Raio 80.
 */
export function calcularDadosBioArc(idade: number): DadosBioArc {
    const minAge = 21;
    const maxAge = 70;
    const ratio = Math.min(1, Math.max(0, (idade - minAge) / (maxAge - minAge)));
    
    // De 180deg (esquerda) para 0deg (direita)
    const anguloDeg = 180 - (ratio * 180);
    const anguloRad = anguloDeg * (Math.PI / 180);
    
    const cx = 100 + 80 * Math.cos(anguloRad);
    const cy = 90 - 80 * Math.sin(anguloRad);
    
    let fase: 'Afirmação' | 'Consolidação' | 'Liderança' = 'Consolidação';
    if (idade < 28) fase = 'Afirmação';
    else if (idade > 49) fase = 'Liderança';

    return { cx, cy, fase, angulo: anguloDeg };
}

/**
 * Gera os dados para o gráfico de ondas ultradianas.
 * Largura base: 240px.
 */
export function calcularDadosOndas(picoIdx: number): DadosOndas {
    const peakWindowsText = ["04h-07h", "07h-10h", "10h-12h", "13h-15h", "15h-18h", "19h-23h"];
    const xBase = (picoIdx / 6) * 240;
    const xEnd = ((picoIdx + 1) / 6) * 240;
    const midX = (xBase + xEnd) / 2;

    // Caminho SVG para o destaque do pico (Curva suave Q)
    const path = `M ${xBase} 80 L ${xBase} 40 Q ${midX} 10, ${xEnd} 40 L ${xEnd} 80 Z`;

    const agora = new Date();
    const horaAtual = agora.getHours() + agora.getMinutes() / 60;
    const agoraX = (horaAtual / 24) * 240;

    return {
        path,
        picoX: midX,
        picoTexto: peakWindowsText[picoIdx] || '--',
        agoraX
    };
}

/**
 * Calcula o ângulo da agulha para o Gauge de Antifragilidade.
 * Escala: -60deg (Frágil) a +60deg (Antifrágil).
 */
export function calcularDadosTaleb(scoreIdx: number): DadosTaleb {
    let angulo = -60;
    let status: 'Frágil' | 'Robusto' | 'Antifrágil' = 'Frágil';
    let convexidade = "Tendência à fragilidade: sistemas que sofrem com a volatilidade.";

    if (scoreIdx === 2) {
        angulo = 60;
        status = 'Antifrágil';
        convexidade = "Alta Convexidade: Capacidade de converter caos em combustível.";
    } else if (scoreIdx === 1) {
        angulo = 0;
        status = 'Robusto';
        convexidade = "Robustez: Alta resistência e integridade sob pressão.";
    }

    return { angulo, status, convexidade };
}
