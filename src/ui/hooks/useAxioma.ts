import React, { useMemo, useState, useEffect } from 'react';
import { MetricasAxioma, Cenario2030 } from '../../types/contratos';
import { classificarCenario, calcularPotencialProdutividade } from '../../domain/motorDiagnostico';
import { storage } from '../../config/storage';

/**
 * Interface de Simulação Instantânea.
 */
export interface EstadoSimulacao {
    intensidadeIA: number;
    esforçoReskilling: number;
    clarezaLiderança: number;
}

/**
 * Hook de Otimização Axioma: Centraliza estado e cálculos de elite.
 */
export const useAxioma = () => {
    const [metricas, setMetricas] = useState<MetricasAxioma>({
        scoreTecnologico: 4,
        scoreCapitalHumano: 4,
        indiceVisaoLideranca: 4
    });

    const [simulacao, setSimulacao] = useState<EstadoSimulacao>({
        intensidadeIA: 4,
        esforçoReskilling: 4,
        clarezaLiderança: 4
    });

    const [setor, setSetor] = useState("Tecnologia e Comunicação");

    // Carregar dados iniciais
    useEffect(() => {
        const salvo = storage.carregarUltimoResultado();
        if (salvo) {
            setMetricas(salvo.metricas);
            setSetor(salvo.setor);
            setSimulacao({
                intensidadeIA: salvo.metricas.scoreTecnologico,
                esforçoReskilling: salvo.metricas.scoreCapitalHumano,
                clarezaLiderança: salvo.metricas.indiceVisaoLideranca
            });
        }
    }, []);

    const atualizarSimulacao = (key: keyof EstadoSimulacao, valor: number) => {
        setSimulacao(prev => ({ ...prev, [key]: valor }));
    };

    /**
     * Resultado da Simulação (useMemo para performance < 100ms)
     */
    const resultadoSimulacao = useMemo(() => {
        const cenario = classificarCenario(simulacao.intensidadeIA, simulacao.esforçoReskilling);
        const sinergia = calcularPotencialProdutividade(simulacao.intensidadeIA, simulacao.esforçoReskilling);
        return { cenario, sinergia };
    }, [simulacao]);

    return {
        metricas,
        setMetricas,
        setor,
        setSetor,
        simulacao,
        atualizarSimulacao,
        resultadoSimulacao,
        salvarDiagnostico: () => {
            const mockResultado = { cenario: resultadoSimulacao.cenario } as any;
            storage.salvarResultado(mockResultado, metricas, setor);
        }
    };
};
