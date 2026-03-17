import { calcularDiagnosticoCompleto } from './src/domain/analisadorSetorial';

const dados = {
    scoreTecnologia: 85,
    scoreCapitalHumano: 90,
    numeroColaboradores: 150,
    salarioMedio: 6500
};

console.log("\n=================================================");
console.log("   AXIOMA PEOPLE ANALYTICS - MOTOR WEF 2030");
console.log("=================================================\n");

const res = calcularDiagnosticoCompleto(dados);

console.log(`Cenário Identificado:   ${res.cenario}`);
console.log(`Multiplicador (Ganhos): ${res.multiplicadorProdutividade}x`);
console.log(`Gap de Produtividade:   ${(res.percentualPerda * 100).toFixed(2)}%`);
console.log(`-------------------------------------------------`);
console.log(`CUSTO DO GAP ANUAL:     $${res.custoGapAnual.toLocaleString()}`);
console.log(`-------------------------------------------------`);
console.log(`Análise Estratégica:`);
console.log(res.descricao);
console.log("\n=================================================\n");
